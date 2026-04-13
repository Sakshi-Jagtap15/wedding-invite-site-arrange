import { useEffect, useRef } from 'react';

/**
 * useAutoScroll
 * Slowly auto-scrolls the page downward.
 * Pauses on any user interaction (wheel, touch, click, keydown).
 * Resumes after `resumeDelay` ms of inactivity.
 * Stops permanently at the bottom of the page.
 * Respects prefers-reduced-motion.
 *
 * @param speed        Pixels per animation frame  (default 0.6)
 * @param resumeDelay  ms before resuming after user interaction (default 3000)
 */
export function useAutoScroll(speed = 0.6, resumeDelay = 3000) {
  const isPaused      = useRef(false);
  const rafId         = useRef<number | null>(null);
  const resumeTimer   = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    // ── Respect reduced-motion preference ──
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    // ── Helpers ──
    const clearResume = () => {
      if (resumeTimer.current) clearTimeout(resumeTimer.current);
    };

    const scheduleResume = () => {
      clearResume();
      resumeTimer.current = setTimeout(() => {
        isPaused.current = false;
      }, resumeDelay);
    };

    const pause = () => {
      isPaused.current = true;
      scheduleResume();
    };

    // Pause permanently while inside an [data-autoscroll-pause] zone,
    // resume only when the mouse/touch leaves.
    const pausePermanent = () => {
      isPaused.current = true;
      clearResume(); // do NOT schedule resume here — leave handles that
    };

    // ── Animation loop ──
    const tick = () => {
      if (!isPaused.current) {
        const maxScroll = document.body.scrollHeight - window.innerHeight;
        if (window.scrollY >= maxScroll - 2) {
          // Bottom reached — stop forever
          return;
        }
        window.scrollBy(0, speed);
      }
      rafId.current = requestAnimationFrame(tick);
    };

    // ── Global interaction listeners (pause + schedule resume) ──
    window.addEventListener('wheel',      pause, { passive: true });
    window.addEventListener('touchstart', pause, { passive: true });
    window.addEventListener('touchmove',  pause, { passive: true });
    window.addEventListener('mousedown',  pause);
    window.addEventListener('keydown',    pause);

    // ── Pause-zone elements ([data-autoscroll-pause]) ──
    // These elements pause autoscroll while hovered/touched and only resume
    // once the user leaves — protecting scratch card, RSVP, gallery, etc.
    const pauseZones = document.querySelectorAll<HTMLElement>('[data-autoscroll-pause]');

    const handleZoneEnter = () => {
      isPaused.current = true;
      clearResume();
    };
    const handleZoneLeave = () => {
      scheduleResume();
    };
    const handleZoneTouch = () => {
      isPaused.current = true;
      clearResume();
    };

    pauseZones.forEach((el) => {
      el.addEventListener('mouseenter', handleZoneEnter);
      el.addEventListener('mouseleave', handleZoneLeave);
      el.addEventListener('touchstart', handleZoneTouch, { passive: true });
    });

    // ── Start ──
    rafId.current = requestAnimationFrame(tick);

    // ── Cleanup ──
    return () => {
      if (rafId.current)   cancelAnimationFrame(rafId.current);
      if (resumeTimer.current) clearTimeout(resumeTimer.current);

      window.removeEventListener('wheel',      pause);
      window.removeEventListener('touchstart', pause);
      window.removeEventListener('touchmove',  pause);
      window.removeEventListener('mousedown',  pause);
      window.removeEventListener('keydown',    pause);

      pauseZones.forEach((el) => {
        el.removeEventListener('mouseenter', handleZoneEnter);
        el.removeEventListener('mouseleave', handleZoneLeave);
        el.removeEventListener('touchstart', handleZoneTouch);
      });
    };
  }, [speed, resumeDelay]);
}