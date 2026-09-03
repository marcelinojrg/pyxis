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

// Durasi idle: 2 jam (7.200.000 ms)
const IDLE_TIMEOUT_MS = 2 * 60 * 60 * 1000;
// Modal peringatan muncul 5 menit sebelum logout (300.000 ms)
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

  const performLogout = useCallback(
    async (reason: 'session_expired' | 'manual' = 'session_expired') => {
      if (isLoggingOutRef.current) return;
      isLoggingOutRef.current = true;

      try {
        // Notifikasi tab lain
        if (typeof window !== 'undefined' && 'BroadcastChannel' in window) {
          const bc = new BroadcastChannel(CHANNEL_NAME);
          bc.postMessage({ type: 'LOGOUT', reason });
          bc.close();
        }
      } catch {
        // Abaikan error BroadcastChannel fallback
      }

      try {
        await signOut();
      } catch (err) {
        console.error('Error saat sign out otomatis:', err);
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
      // Abaikan jika tidak didukung
    }
  }, []);

  const handleExtendSession = useCallback(() => {
    resetActivity();
    setShowWarning(false);
  }, [resetActivity]);

  // Listener interaksi user
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Inisialisasi timestamp jika belum ada
    if (!localStorage.getItem(STORAGE_KEY)) {
      localStorage.setItem(STORAGE_KEY, Date.now().toString());
    }

    let lastRecorded = 0;
    const handleUserInteraction = () => {
      // Throttling 2 detik agar tidak membebani performa
      const now = Date.now();
      if (now - lastRecorded > 2000) {
        lastRecorded = now;
        // Hanya reset jika modal peringatan belum muncul
        if (!showWarning) {
          resetActivity();
        }
      }
    };

    const events = ['mousemove', 'mousedown', 'keydown', 'scroll', 'touchstart'];
    events.forEach((event) => {
      window.addEventListener(event, handleUserInteraction, { passive: true });
    });

    // Multi-tab sync via BroadcastChannel
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

    // Storage event sync untuk browser tanpa BroadcastChannel atau tab switch
    const handleStorage = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY && e.newValue) {
        setShowWarning(false);
      }
    };
    window.addEventListener('storage', handleStorage);

    // Interval checker tiap 1 detik
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
  }, [performLogout, resetActivity, router, showWarning]);

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
            Sesi Admin Akan Berakhir
          </DialogTitle>
          <DialogDescription className="text-center text-sm text-slate-600 mt-2">
            Tidak ada aktivitas yang terdeteksi selama hampir 2 jam. Demi keamanan data, Anda akan
            otomatis dikeluarkan dalam:
          </DialogDescription>
        </DialogHeader>

        <div className="my-2 flex flex-col items-center justify-center rounded-lg bg-slate-50 border border-slate-200 py-4">
          <div className="flex items-center gap-2 text-2xl font-mono font-bold text-amber-600">
            <Clock className="h-6 w-6 animate-pulse" />
            <span>{formatCountdown(remainingSeconds)}</span>
          </div>
          <p className="text-xs text-slate-500 mt-1">menit tersisa</p>
        </div>

        <DialogFooter className="flex-col sm:flex-row gap-2 mt-2">
          <Button
            type="button"
            variant="outline"
            className="w-full sm:w-auto"
            onClick={() => performLogout('manual')}
          >
            Keluar Sekarang
          </Button>
          <Button
            type="button"
            variant="default"
            className="w-full sm:w-auto bg-primary text-white hover:bg-primary/90"
            onClick={handleExtendSession}
          >
            Tetap Masuk (Perpanjang Sesi)
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
