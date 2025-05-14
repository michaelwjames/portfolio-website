'use client';

import * as React from 'react';
import { useEffect } from 'react';

// This component ensures dark mode is always applied
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Force dark mode on the html element
    const html = document.documentElement;
    html.classList.add('dark');
    html.style.colorScheme = 'dark';
    
    // Also set it in localStorage for consistency
    localStorage.setItem('theme', 'dark');
    
    // Cleanup function
    return () => {
      html.classList.remove('dark');
      html.style.colorScheme = '';
    };
  }, []);

  return <>{children}</>;
}
