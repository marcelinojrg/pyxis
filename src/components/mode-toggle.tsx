'use client';

import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import type { FC } from 'react';
import { useEffect, useState } from 'react';

export const ModeToggle: FC = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme, resolvedTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <button
      aria-label="Toggle Dark Mode"
      onClick={() => setTheme(theme === 'dark' || resolvedTheme === 'dark' ? 'light' : 'dark')}
      className="ml-3"
    >
      {mounted && (theme === 'dark' || resolvedTheme === 'dark') ? (
        <Sun className="h-6 w-6 text-black outline-none" />
      ) : (
        <Moon className="h-6 w-6 text-black outline-none" />
      )}
    </button>
  );
};

export default ModeToggle;
