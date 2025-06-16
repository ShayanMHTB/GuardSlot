// hooks/useSidebarWidth.ts
'use client';

import { useEffect, useState } from 'react';
import { useSidebar } from '@/components/ui/sidebar';

export function useSidebarWidth() {
  const { state, open } = useSidebar();
  const [contentMargin, setContentMargin] = useState<string>('0px');
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIsMobile = () => {
      const mobile = window.innerWidth < 1024; // lg breakpoint
      setIsMobile(mobile);

      if (mobile) {
        // On mobile, content always takes full width
        setContentMargin('0px');
      } else {
        // On desktop, calculate based on sidebar state
        if (state === 'collapsed') {
          // Collapsed sidebar: icon-only (64px including margins)
          setContentMargin('80px'); // 64px sidebar + 16px margin
        } else if (open) {
          // Expanded sidebar: full width (304px including margins)
          setContentMargin('320px'); // 304px sidebar + 16px margin
        } else {
          // Hidden sidebar
          setContentMargin('0px');
        }
      }
    };

    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);

    return () => window.removeEventListener('resize', checkIsMobile);
  }, [state, open]);

  return {
    contentMargin,
    isMobile,
    sidebarWidth: isMobile ? '0px' : state === 'collapsed' ? '64px' : '304px',
  };
}
