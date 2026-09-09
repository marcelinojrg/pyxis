'use client';

import { useEffect, useState, useCallback, useRef } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { signOut } from '@/lib/authClient';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Clock, ShieldAlert } from 'lucide-react';

// Idle duration: 2 hours (7,200,000 ms)
const IDLE_TIMEOUT_MS = 2 * 60 * 60 * 1000;
// Warning modal appears 5 minutes before logout (300,000 ms)
const WARNING_BEFORE_MS = 5 * 60 * 1000;
const WARNING_THRESHOLD_MS = IDLE_TIMEOUT_MS - WARNING_BEFORE_MS;

const STORAGE_KEY = 'pyxis_admin_last_active';
const CHANNEL_NAME = 'pyxis_admin_session_channel';

export function AdminIdleTracker() {
  const router = useRouter();
  const pathname = usePathname();
  const [showWarning, setShowWarning] = useState(false);
  const [remainingSeconds, setRemainingSeconds] = useState(300);
  const isLoggingOutRef = useRef(false);
  const showWarningRef = useRef(false);

  const performLogout = useCallback(
    async (reason: 'session_expired' | 'manual' = 'session_expired') => {
      if (isLoggingOutRef.current) return;
      isLoggingOutRef.current = true;

      try {
        // Notify other tabs
        if (typeof window !== 'undefined' && 'BroadcastChannel' in window) {
          const bc = new BroadcastChannel(CHANNEL_NAME);
          bc.postMessage({ type: 'LOGOUT', reason });
          bc.close();
        }
      } catch {
        // Ignore BroadcastChannel fallback errors
      }

      try {
        await signOut();
      } catch (err) {
        console.error('Automatic sign-out failed:', err);
      } finally {
        if (typeof window !== 'undefined') {
          localStorage.removeItem(STORAGE_KEY);
          const redirectTarget = pathname || '/admin';
          router.push(`/login?reason=${reason}&callbackUrl=${encodeURIComponent(redirectTarget)}`);
          router.refresh();
        }
      }
    },
    [pathname, router]
  );

  const resetActivity = useCallback(() => {
    if (typeof window === 'undefined') return;
    const now = Date.now();
    localStorage.setItem(STORAGE_KEY, now.toString());

    try {
      if ('BroadcastChannel' in window) {
        const bc = new BroadcastChannel(CHANNEL_NAME);
        bc.postMessage({ type: 'ACTIVITY', timestamp: now });
        bc.close();
      }
    } catch {
      // Ignore when unsupported
    }
  }, []);

  const handleExtendSession = useCallback(() => {
    resetActivity();
    setShowWarning(false);
  }, [resetActivity]);

  useEffect(() => {
    showWarningRef.current = showWarning;
  }, [showWarning]);

  // Listen for user interaction.
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Initialize the timestamp if needed
    if (!localStorage.getItem(STORAGE_KEY)) {
      localStorage.setItem(STORAGE_KEY, Date.now().toString());
    }

    let lastRecorded = 0;
    const handleUserInteraction = () => {
      // Throttle to avoid unnecessary work
      const now = Date.now();
      if (now - lastRecorded > 2000) {
        lastRecorded = now;
        // Reset only while the warning modal is hidden
        if (!showWarningRef.current) {
          resetActivity();
        }
      }
    };

    const events = ['mousemove', 'mousedown', 'keydown', 'scroll', 'touchstart'];
    events.forEach((event) => {
      window.addEventListener(event, handleUserInteraction, { passive: true });
    });

    // Sync multiple tabs via BroadcastChannel
    let broadcastChannel: BroadcastChannel | null = null;
    if ('BroadcastChannel' in window) {
      broadcastChannel = new BroadcastChannel(CHANNEL_NAME);
      broadcastChannel.onmessage = (event) => {
        if (event.data?.type === 'LOGOUT') {
          if (!isLoggingOutRef.current) {
            isLoggingOutRef.current = true;
            router.push('/login?reason=session_expired');
            router.refresh();
          }
        } else if (event.data?.type === 'ACTIVITY' || event.data?.type === 'EXTEND') {
          setShowWarning(false);
        }
      };
    }

    // Sync storage events for unsupported browsers and tab switches
    const handleStorage = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY && e.newValue) {
        setShowWarning(false);
      }
    };
    window.addEventListener('storage', handleStorage);

    // Check the session once per second.
    const interval = setInterval(() => {
      if (isLoggingOutRef.current) return;

      const stored = localStorage.getItem(STORAGE_KEY);
      const lastActive = stored ? parseInt(stored, 10) : Date.now();
      const elapsed = Date.now() - lastActive;

      if (elapsed >= IDLE_TIMEOUT_MS) {
        performLogout('session_expired');
      } else if (elapsed >= WARNING_THRESHOLD_MS) {
        const remaining = Math.max(0, Math.ceil((IDLE_TIMEOUT_MS - elapsed) / 1000));
        setRemainingSeconds(remaining);
        setShowWarning(true);
      } else {
        setShowWarning(false);
      }
    }, 1000);

    return () => {
      events.forEach((event) => {
        window.removeEventListener(event, handleUserInteraction);
      });
      window.removeEventListener('storage', handleStorage);
      if (broadcastChannel) {
        broadcastChannel.close();
      }
      clearInterval(interval);
    };
  }, [performLogout, resetActivity, router]);

  const formatCountdown = (totalSec: number) => {
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <Dialog open={showWarning} onOpenChange={() => {}}>
      <DialogContent showCloseButton={false} className="sm:max-w-md">
        <DialogHeader className="items-center text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-amber-100 text-amber-600 mb-2">
            <ShieldAlert className="h-6 w-6" />
          </div>
          <DialogTitle className="text-lg font-bold text-slate-900">
            Admin session expiring
          </DialogTitle>
          <DialogDescription className="text-center text-sm text-slate-600 mt-2">
            No activity has been detected for almost 2 hours. For data security, you will be signed
            out in:
          </DialogDescription>
        </DialogHeader>

        <div className="my-2 flex flex-col items-center justify-center rounded-lg bg-slate-50 border border-slate-200 py-4">
          <div className="flex items-center gap-2 text-2xl font-mono font-bold text-amber-600">
            <Clock className="h-6 w-6 animate-pulse" />
            <span>{formatCountdown(remainingSeconds)}</span>
          </div>
          <p className="text-xs text-slate-500 mt-1">minutes remaining</p>
        </div>

        <DialogFooter className="flex-col sm:flex-row gap-2 mt-2">
          <Button
            type="button"
            variant="outline"
            className="w-full sm:w-auto"
            onClick={() => performLogout('manual')}
          >
            Sign out now
          </Button>
          <Button
            type="button"
            variant="default"
            className="w-full sm:w-auto bg-primary text-white hover:bg-primary/90"
            onClick={handleExtendSession}
          >
            Stay signed in (extend session)
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
