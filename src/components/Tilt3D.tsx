import React, { useRef, useState, useEffect, useCallback } from 'react';

interface Tilt3DProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  maxTilt?: number;
  scale?: number;
  glare?: boolean;
  revealOnScroll?: boolean;
  revealDelayMs?: number;
}

/**
 * Interactive 3D perspective container with pointer-tracked tilt,
 * specular glare, and optional scroll-triggered 3D entrance.
 */
export function Tilt3D({
  children,
  className = '',
  style,
  maxTilt = 9,
  scale = 1.02,
  glare = true,
  revealOnScroll = false,
  revealDelayMs = 0,
}: Tilt3DProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(!revealOnScroll);
  const [tilt, setTilt] = useState({ rx: 0, ry: 0, gx: 50, gy: 50, active: false });
  const prefersReducedMotion = useRef(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    prefersReducedMotion.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }, []);

  useEffect(() => {
    if (!revealOnScroll || !ref.current) return;
    if (typeof IntersectionObserver === 'undefined') {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.disconnect();
            break;
          }
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -24px 0px' },
    );

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [revealOnScroll]);

  const handlePointerMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (prefersReducedMotion.current || e.pointerType === 'touch') return;
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width;
      const py = (e.clientY - rect.top) / rect.height;
      const ry = (px - 0.5) * 2 * maxTilt;
      const rx = (0.5 - py) * 2 * maxTilt;
      setTilt({
        rx,
        ry,
        gx: Math.round(px * 100),
        gy: Math.round(py * 100),
        active: true,
      });
    },
    [maxTilt],
  );

  const handlePointerLeave = useCallback(() => {
    setTilt((prev) => ({ ...prev, rx: 0, ry: 0, active: false }));
  }, []);

  const transform = tilt.active
    ? `perspective(950px) rotateX(${tilt.rx.toFixed(2)}deg) rotateY(${tilt.ry.toFixed(2)}deg) scale3d(${scale}, ${scale}, ${scale})`
    : 'perspective(950px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';

  return (
    <div
      ref={ref}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className={`tilt3d-wrapper ${revealOnScroll ? 'reveal3d' : ''} ${isVisible ? 'is-visible' : ''} ${tilt.active ? 'is-tilting' : ''} ${className}`.trim()}
      style={{
        ...style,
        ['--tilt-transform' as string]: transform,
        ['--glare-x' as string]: `${tilt.gx}%`,
        ['--glare-y' as string]: `${tilt.gy}%`,
        ['--reveal-delay' as string]: `${revealDelayMs}ms`,
      }}
    >
      <div className="tilt3d-inner">
        {children}
        {glare ? <span className="tilt3d-glare" aria-hidden="true" /> : null}
      </div>
    </div>
  );
}
