"use client";

import { useEffect } from 'react';

export default function DarkModeScript() {
  useEffect(() => {
    // Check for dark mode preference at the root level
    const root = document.documentElement;
    
    // Get stored theme or use system preference
    let theme = 'system';
    try {
      theme = localStorage.getItem('theme') || 'system';
    } catch (e) {}
    
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (theme === 'dark' || (theme === 'system' && prefersDark)) {
      root.classList.add('dark');
      root.style.colorScheme = 'dark';
    } else {
      root.classList.remove('dark');
      root.style.colorScheme = 'light';
    }
    
    // Listen for system theme changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleChange = (e: MediaQueryListEvent) => {
      try {
        const currentTheme = localStorage.getItem('theme') || 'system';
        if (currentTheme === 'system') {
          if (e.matches) {
            root.classList.add('dark');
            root.style.colorScheme = 'dark';
          } else {
            root.classList.remove('dark');
            root.style.colorScheme = 'light';
          }
        }
      } catch (e) {}
    };
    
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  return null;
}
