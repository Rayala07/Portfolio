"use client";

import { useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';

export default function ScrollProgress() {
  const progress = useMotionValue(0);
  const smoothed = useSpring(progress, { stiffness: 80, damping: 20, restDelta: 0.001 });

  useEffect(() => {
    const update = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      progress.set(total > 0 ? window.scrollY / total : 0);
    };
    window.addEventListener('scroll', update, { passive: true });
    update();
    return () => window.removeEventListener('scroll', update);
  }, [progress]);

  return (
    <motion.div
      aria-hidden="true"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: '1.5px',
        background: 'linear-gradient(90deg, #A89BF2, rgba(168,155,242,0.45))',
        transformOrigin: '0% 50%',
        scaleX: smoothed,
        zIndex: 99997,
        pointerEvents: 'none',
      }}
    />
  );
}
