# SECURITY.md
# Security Baseline

## 1. Authentication

- password hashed with bcrypt;
- no plaintext password;
- admin session protected;
- logout works;
- failed login does not reveal whether email exists.

## 2. Authorization

Every admin mutation:
- verify session;
- verify admin identity;
- validate ownership if ownership is introduced later.

## 3. Input Validation

Use Zod server-side for:
- product;
- partner;
- legal;
- career;
- site settings;
- contact;
- upload metadata.

## 4. XSS

Risk areas:
- legal content;
- about content;
- long descriptions;
- admin messages.

Do not dangerously render HTML unless sanitized and explicitly designed for rich text.

## 5. Rate Limiting

Public contact endpoint:
- 5 requests/minute/IP baseline;
- return 429;
- production store must work across serverless instances.

## 6. Upload Security

- max 2MB;
- allowed formats;
- server-side validation;
- upload only through backend controlled flow;
- store public URL only;
- never expose API secret.

## 7. Environment

Secrets only in environment:
- DATABASE_URL;
- NEXTAUTH_SECRET;
- Cloudinary secrets;
- admin seed credentials.

## 8. Headers

Production should use:
- secure referrer policy;
- X-Content-Type-Options;
- frame policy appropriate to site;
- Content-Security-Policy after checking third-party requirements.

## 9. Data Minimization

Contact form stores only the fields needed by PRD.
No sensitive user data should be requested.

## 10. Logging

Never log:
- password;
- raw session token;
- API secret;
- full credential payload.
