import { useRef, type ReactNode, type MouseEvent } from 'react';
import { motion, useMotionTemplate, useMotionValue, useReducedMotion, useSpring, useTransform } from 'framer-motion';

/** Card that tilts toward the pointer in 3D, with a soft light following it. */
export function Tilt({ children, className = '', max = 10, glare = true }: { children: ReactNode; className?: string; max?: number; glare?: boolean }) {
  const reduce = useReducedMotion();
  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);
  const sx = useSpring(x, { stiffness: 200, damping: 20 });
  const sy = useSpring(y, { stiffness: 200, damping: 20 });
  const rotateY = useTransform(sx, [0, 1], [-max, max]);
  const rotateX = useTransform(sy, [0, 1], [max, -max]);
  const gx = useTransform(sx, (v) => `${v * 100}%`);
  const gy = useTransform(sy, (v) => `${v * 100}%`);
  const light = useMotionTemplate`radial-gradient(420px circle at ${gx} ${gy}, rgba(255,255,255,.22), transparent 45%)`;
  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - r.left) / r.width);
    y.set((e.clientY - r.top) / r.height);
  };
  const reset = () => {
    x.set(0.5);
    y.set(0.5);
  };
  if (reduce) return <div className={className}>{children}</div>;
  return (
    <motion.div onMouseMove={onMove} onMouseLeave={reset} style={{ rotateX, rotateY, transformPerspective: 900, transformStyle: 'preserve-3d' }} className={`relative ${className}`}>
      {children}
      {glare && <motion.div aria-hidden="true" style={{ background: light }} className="pointer-events-none absolute inset-0 rounded-[inherit]" />}
    </motion.div>
  );
}

/** Wraps a button or link so it leans toward the pointer. */
export function Magnetic({ children, strength = 0.35, className = '' }: { children: ReactNode; strength?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const x = useSpring(0, { stiffness: 250, damping: 15 });
  const y = useSpring(0, { stiffness: 250, damping: 15 });
  return (
    <motion.div
      ref={ref}
      style={{ x, y }}
      className={`inline-flex ${className}`}
      onMouseMove={(e) => {
        if (reduce || !ref.current) return;
        const r = ref.current.getBoundingClientRect();
        x.set((e.clientX - r.left - r.width / 2) * strength);
        y.set((e.clientY - r.top - r.height / 2) * strength);
      }}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      {children}
    </motion.div>
  );
}

/** A section whose background glow follows the pointer. */
export function Spotlight({ children, className = '', color = 'rgba(245,196,0,.16)' }: { children: ReactNode; className?: string; color?: string }) {
  const mx = useMotionValue(-1000);
  const my = useMotionValue(-1000);
  const bg = useMotionTemplate`radial-gradient(600px circle at ${mx}px ${my}px, ${color}, transparent 60%)`;
  return (
    <div
      className={`relative ${className}`}
      onMouseMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        mx.set(e.clientX - r.left);
        my.set(e.clientY - r.top);
      }}
    >
      <motion.div aria-hidden="true" style={{ background: bg }} className="pointer-events-none absolute inset-0 z-0" />
      {children}
    </div>
  );
}

export function Marquee({ children, speed = 40, reverse = false, className = '' }: { children: ReactNode; speed?: number; reverse?: boolean; className?: string }) {
  return (
    <div className={`group flex overflow-hidden ${className}`}>
      {[0, 1].map((k) => (
        <div
          key={k}
          aria-hidden={k === 1}
          className="flex min-w-full flex-none items-center justify-around gap-10 pr-10 animate-marqueeFull group-hover:[animation-play-state:paused] motion-reduce:animate-none"
          style={{ animationDuration: `${speed}s`, animationDirection: reverse ? 'reverse' : 'normal' }}
        >
          {children}
        </div>
      ))}
    </div>
  );
}
