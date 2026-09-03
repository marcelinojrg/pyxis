import { NextRequest, NextResponse } from 'next/server';
import { auth } from './lib/auth';
import { prisma } from './lib/prisma';

function createContentSecurityPolicy(nonce: string) {
  const developmentEval = process.env.NODE_ENV === 'development' ? " 'unsafe-eval'" : '';

  return [
    "default-src 'self'",
    `script-src 'self' 'nonce-${nonce}' 'strict-dynamic'${developmentEval}`,
    `style-src 'self' 'nonce-${nonce}'`,
    "img-src 'self' data: blob: https://images.unsplash.com https://ik.imagekit.io",
    "font-src 'self'",
    "connect-src 'self' https://ik.imagekit.io",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "frame-ancestors 'self'",
    'upgrade-insecure-requests',
  ].join('; ');
}

function withSecurityHeaders(response: NextResponse, csp: string) {
  response.headers.set('Content-Security-Policy', csp);
  return response;
}

function redirectWithSecurityHeaders(url: URL, csp: string) {
  return withSecurityHeaders(NextResponse.redirect(url), csp);
}

/**
 * Next.js 16 Proxy implementation for Route Protection
 */
export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const nonce = Buffer.from(crypto.randomUUID()).toString('base64');
  const csp = createContentSecurityPolicy(nonce);
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-nonce', nonce);
  requestHeaders.set('Content-Security-Policy', csp);
  const next = () =>
    withSecurityHeaders(NextResponse.next({ request: { headers: requestHeaders } }), csp);
  const isAdminPath = pathname.startsWith('/admin');
  const isAuthPath = pathname.startsWith('/login');

  if (!isAdminPath && !isAuthPath) {
    return next();
  }

  try {
    // Ambil session secara langsung dari database via Better Auth
    const session = await auth.api.getSession({
      headers: request.headers,
    });

    // Cek apakah session benar-benar valid dan belum kedaluwarsa
    const isAuthenticated = !!(
      session &&
      session.user &&
      session.session &&
      new Date(session.session.expiresAt) > new Date()
    );

    if (isAdminPath && !isAuthenticated) {
      return redirectWithSecurityHeaders(new URL('/login', request.url), csp);
    }

    // Ambil permissions jika sudah login
    let permissionsSet = new Set<string>();
    if (isAuthenticated) {
      const user = await prisma.user.findUnique({
        where: { id: session.user.id },
        include: {
          roles: {
            include: {
              permissions: {
                select: { name: true },
              },
            },
          },
        },
      });

      if (user) {
        // Ambil permissions dari relasi many-to-many (roles)
        user.roles.forEach((role) => {
          role.permissions.forEach((p) => permissionsSet.add(p.name));
        });

        // Jika ada roleId (one-to-many), ambil juga permissions-nya
        if (user.roleId) {
          const singleRole = await prisma.role.findUnique({
            where: { id: user.roleId },
            include: { permissions: { select: { name: true } } },
          });
          singleRole?.permissions.forEach((p) => permissionsSet.add(p.name));
        }
      } else {
        return redirectWithSecurityHeaders(new URL('/login', request.url), csp);
      }
    }

    const hasAdminAccess = permissionsSet.has('admin.access');

    if (isAdminPath && isAuthenticated && !hasAdminAccess) {
      return redirectWithSecurityHeaders(new URL('/', request.url), csp);
    }

    if (isAuthPath && isAuthenticated) {
      return redirectWithSecurityHeaders(
        new URL(hasAdminAccess ? '/admin' : '/', request.url),
        csp
      );
    }
  } catch (error) {
    console.error('[PROXY_AUTH_ERROR]', {
      pathname,
      error: error instanceof Error ? error.message : String(error),
      timestamp: new Date().toISOString(),
    });
    // Fail-safe: Jika sistem auth down, proteksi halaman admin tetap berjalan
    if (isAdminPath) {
      return redirectWithSecurityHeaders(new URL('/login', request.url), csp);
    }
  }

  return next();
}

export const config = {
  matcher: [
    {
      source: '/((?!api|_next/static|_next/image|favicon.ico|assets).*)',
      missing: [
        { type: 'header', key: 'next-router-prefetch' },
        { type: 'header', key: 'purpose', value: 'prefetch' },
      ],
    },
  ],
};
