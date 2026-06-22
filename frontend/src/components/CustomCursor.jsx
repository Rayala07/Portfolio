"use client";

import React, { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';

export default function CustomCursor() {
  const [visible, setVisible] = useState(false);
  const hasShown = useRef(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Ring lags behind the dot with a spring
  const ringX = useSpring(mouseX, { stiffness: 150, damping: 18, mass: 0.5 });
  const ringY = useSpring(mouseY, { stiffness: 150, damping: 18, mass: 0.5 });

  useEffect(() => {
    const onMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!hasShown.current) {
        hasShown.current = true;
        setVisible(true);
      }
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, [mouseX, mouseY]);

  return (
    <>
      {/* Dot — snaps immediately to cursor position */}
      <motion.div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          x: mouseX,
          y: mouseY,
          translateX: '-50%',
          translateY: '-50%',
          width: '5px',
          height: '5px',
          borderRadius: '50%',
          backgroundColor: 'var(--text-primary)',
          pointerEvents: 'none',
          zIndex: 99999,
          opacity: visible ? 1 : 0,
          transition: 'opacity 0.3s ease',
        }}
      />
      {/* Ring — follows with spring lag */}
      <motion.div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          x: ringX,
          y: ringY,
          translateX: '-50%',
          translateY: '-50%',
          width: '30px',
          height: '30px',
          borderRadius: '50%',
          border: '1px solid rgba(245, 243, 240, 0.28)',
          pointerEvents: 'none',
          zIndex: 99998,
          opacity: visible ? 1 : 0,
          transition: 'opacity 0.3s ease',
        }}
      />
    </>
  );
}
