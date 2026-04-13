import { useEffect, useRef } from 'react';

/**
 * useAutoScroll
 * ─────────────────────────────────────────────────────────────────────────────
 * Slowly auto-scrolls the page downward.
 *
 * Fixes vs previous version:
 *  1. `mousedown` removed from global pause triggers — it was firing on page
 *     load in some browsers and immediately pausing autoscroll.
 *  2. Pause-zone query is deferred (rAF after mount) so DOM is fully painted
 *     before we look for [data-autoscroll-pause] elements.
 *  3. Added `startDelay` (default 1 s) so hero animations finish first.
 * ─────────────────────────────────────────────────────────────────────────────
 * @param speed        px per animation frame   (default 0.6)
 * @param resumeDelay  ms before resuming after user interaction (default 3000)
 * @param startDelay   ms before autoscroll begins at all (default 1000)
 */
export function useAutoScroll(speed = 0.6, resumeDelay = 3000, startDelay = 1000) {
  const isPaused    = useRef(true); // starts paused; released after startDelay
  const rafId       = useRef<number | null>(null);
  const resumeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const startTimer  = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    // Respect reduced-motion accessibility preference
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    // ── Helpers ────────────────────────────────────────────────────────────
    const clearResume = () => {
      if (resumeTimer.current) clearTimeout(resumeTimer.current);
    };

    const scheduleResume = () => {
      clearResume();
      resumeTimer.current = setTimeout(() => {
        isPaused.current = false;
      }, resumeDelay);
    };

    const pauseTemporarily = () => {
      isPaused.current = true;
      scheduleResume();
    };

    // ── Animation loop ─────────────────────────────────────────────────────
    const tick = () => {
      if (!isPaused.current) {
        const maxScroll = document.body.scrollHeight - window.innerHeight;
        if (window.scrollY >= maxScroll - 2) {
          return; // reached bottom — stop forever
        }
        window.scrollBy(0, speed);
      }
      rafId.current = requestAnimationFrame(tick);
    };

    // ── Global interaction listeners ───────────────────────────────────────
    // NOTE: mousedown intentionally excluded — it caused false pauses on load
    window.addEventListener('wheel',      pauseTemporarily, { passive: true });
    window.addEventListener('touchstart', pauseTemporarily, { passive: true });
    window.addEventListener('touchmove',  pauseTemporarily, { passive: true });
    window.addEventListener('keydown',    pauseTemporarily);

    // ── Pause-zone setup (deferred one frame so DOM elements exist) ─────────
    let pauseZones: HTMLElement[] = [];

    const handleZoneEnter    = () => { isPaused.current = true; clearResume(); };
    const handleZoneLeave    = () => { scheduleResume(); };
    const handleZoneTouch    = () => { isPaused.current = true; clearResume(); };
    const handleZoneTouchEnd = () => { scheduleResume(); };

    const zoneRaf = requestAnimationFrame(() => {
      pauseZones = Array.from(
        document.querySelectorAll<HTMLElement>('[data-autoscroll-pause]')
      );
      pauseZones.forEach((el) => {
        el.addEventListener('mouseenter', handleZoneEnter);
        el.addEventListener('mouseleave', handleZoneLeave);
        el.addEventListener('touchstart', handleZoneTouch,    { passive: true });
        el.addEventListener('touchend',   handleZoneTouchEnd, { passive: true });
      });
    });

    // ── Start after initial delay ──────────────────────────────────────────
    startTimer.current = setTimeout(() => {
      isPaused.current = false;
      rafId.current = requestAnimationFrame(tick);
    }, startDelay);

    // ── Cleanup ────────────────────────────────────────────────────────────
    return () => {
      cancelAnimationFrame(zoneRaf);
      if (rafId.current)       cancelAnimationFrame(rafId.current);
      if (resumeTimer.current) clearTimeout(resumeTimer.current);
      if (startTimer.current)  clearTimeout(startTimer.current);

      window.removeEventListener('wheel',      pauseTemporarily);
      window.removeEventListener('touchstart', pauseTemporarily);
      window.removeEventListener('touchmove',  pauseTemporarily);
      window.removeEventListener('keydown',    pauseTemporarily);

      pauseZones.forEach((el) => {
        el.removeEventListener('mouseenter', handleZoneEnter);
        el.removeEventListener('mouseleave', handleZoneLeave);
        el.removeEventListener('touchstart', handleZoneTouch);
        el.removeEventListener('touchend',   handleZoneTouchEnd);
      });
    };
  }, [speed, resumeDelay, startDelay]);
}
