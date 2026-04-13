// src/hooks/useAutoScroll.ts  ← CREATE THIS FILE
import { useEffect, useRef } from 'react';

export function useAutoScroll(speed = 0.6, resumeDelay = 3000) {
  const isPaused = useRef(false);
  const rafId = useRef<number | null>(null);
  const resumeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    // Respect reduced motion preference
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const scheduleResume = () => {
      if (resumeTimer.current) clearTimeout(resumeTimer.current);
      resumeTimer.current = setTimeout(() => {
        isPaused.current = false;
      }, resumeDelay);
    };

    const pause = () => {
      isPaused.current = true;
      scheduleResume();
    };

    const pausePermanently = () => {
      // For intentional scrolls — pause then resume normally
      isPaused.current = true;
      scheduleResume();
    };

    const scroll = () => {
      if (!isPaused.current) {
        const maxScroll = document.body.scrollHeight - window.innerHeight;
        if (window.scrollY >= maxScroll - 2) {
          // Reached bottom — stop
          isPaused.current = true;
          return;
        }
        window.scrollBy(0, speed);
      }
      rafId.current = requestAnimationFrame(scroll);
    };

    // Events that pause autoscroll
    window.addEventListener('wheel', pause, { passive: true });
    window.addEventListener('touchstart', pause, { passive: true });
    window.addEventListener('touchmove', pause, { passive: true });
    window.addEventListener('mousedown', pause);
    window.addEventListener('keydown', pause);

    rafId.current = requestAnimationFrame(scroll);

    return () => {
      if (rafId.current) cancelAnimationFrame(rafId.current);
      if (resumeTimer.current) clearTimeout(resumeTimer.current);
      window.removeEventListener('wheel', pause);
      window.removeEventListener('touchstart', pause);
      window.removeEventListener('touchmove', pause);
      window.removeEventListener('mousedown', pause);
      window.removeEventListener('keydown', pause);
    };

    // Add inside useAutoScroll useEffect, after event listeners:
    const pauseZones = document.querySelectorAll('[data-autoscroll-pause]');
    const handleZoneEnter = () => { isPaused.current = true; };
    const handleZoneLeave = () => { scheduleResume(); };

    pauseZones.forEach(el => {
    el.addEventListener('mouseenter', handleZoneEnter);
    el.addEventListener('mouseleave', handleZoneLeave);
    el.addEventListener('touchstart', handleZoneEnter, { passive: true });
    });

    // And in the cleanup:
    pauseZones.forEach(el => {
    el.removeEventListener('mouseenter', handleZoneEnter);
    el.removeEventListener('mouseleave', handleZoneLeave);
    el.removeEventListener('touchstart', handleZoneEnter);
    });
  }, [speed, resumeDelay]);
}