"use client";

import React, { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';

const INTERACTIVE = 'a, button, [role="button"], input, textarea, select, [data-cursor-hover]';

export default function CustomCursor() {
  const [visible,  setVisible]  = useState(false);
  const [hovering, setHovering] = useState(false);
  const hasShown = useRef(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Ring follows cursor with spring lag
  const ringX = useSpring(mouseX, { stiffness: 150, damping: 18, mass: 0.5 });
  const ringY = useSpring(mouseY, { stiffness: 150, damping: 18, mass: 0.5 });

  // Ring size springs between resting (30) and hover (52)
  const ringSizeMV = useMotionValue(30);
  const ringSize   = useSpring(ringSizeMV, { stiffness: 280, damping: 22 });

  useEffect(() => {
    ringSizeMV.set(hovering ? 52 : 30);
  }, [hovering, ringSizeMV]);

  useEffect(() => {
    const onMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!hasShown.current) {
        hasShown.current = true;
        setVisible(true);
      }
    };

    // mouseover fires on every element entered — cheaply check closest interactive ancestor
    const onHoverCheck = (e) => {
      setHovering(!!e.target.closest(INTERACTIVE));
    };

    window.addEventListener('mousemove', onMove);
    document.addEventListener('mouseover', onHoverCheck);
    return () => {
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseover', onHoverCheck);
    };
  }, [mouseX, mouseY]);

  return (
    <>
      {/* Dot — snaps immediately, tints lavender on hover */}
      <motion.div
        style={{
          position: 'fixed',
          top: 0, left: 0,
          x: mouseX, y: mouseY,
          translateX: '-50%',
          translateY: '-50%',
          width: '5px',
          height: '5px',
          borderRadius: '50%',
          backgroundColor: hovering ? 'var(--accent)' : 'var(--text-primary)',
          pointerEvents: 'none',
          zIndex: 99999,
          opacity: visible ? 1 : 0,
          transition: 'opacity 0.3s ease, background-color 0.2s ease',
        }}
      />

      {/* Ring — spring-lagged, expands + turns lavender on hover */}
      <motion.div
        style={{
          position: 'fixed',
          top: 0, left: 0,
          x: ringX, y: ringY,
          translateX: '-50%',
          translateY: '-50%',
          width: ringSize,
          height: ringSize,
          borderRadius: '50%',
          border: hovering
            ? '1px solid rgba(168,155,242,0.72)'
            : '1px solid rgba(245,243,240,0.28)',
          backgroundColor: hovering ? 'rgba(168,155,242,0.06)' : 'transparent',
          pointerEvents: 'none',
          zIndex: 99998,
          opacity: visible ? 1 : 0,
          transition: 'opacity 0.3s ease, border-color 0.2s ease, background-color 0.2s ease',
        }}
      />
    </>
  );
}
