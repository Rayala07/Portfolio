"use client";

import React, { useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';

const GithubIcon = () => <i className="hn hn-github text-2xl" />;
const LinkedinIcon = () => <i className="hn hn-linkedin text-2xl" />;

// ── Dot grid — dots repel from cursor; displaced dots glow lavender
const DotGrid = () => {
  const canvasRef = useRef(null);
  const mouse = useRef({ x: -9999, y: -9999 });
  const dots = useRef(null);
  const animRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const SPACING = 30;
    const DOT_R = 1.1;
    const REPEL_R = 115;
    const MAX_FORCE = 24;
    const LERP = 0.1;

    const init = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = canvas.offsetWidth * dpr;
      canvas.height = canvas.offsetHeight * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const cols = Math.ceil(canvas.offsetWidth / SPACING) + 1;
      const rows = Math.ceil(canvas.offsetHeight / SPACING) + 1;
      dots.current = Array.from({ length: rows }, () =>
        Array.from({ length: cols }, () => ({ ox: 0, oy: 0 }))
      );
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);

      const grid = dots.current;
      if (!grid) { animRef.current = requestAnimationFrame(draw); return; }

      const mx = mouse.current.x;
      const my = mouse.current.y;
      const displaced = [];

      // Pass 1 — update offsets + draw resting dots
      ctx.fillStyle = 'rgba(245, 243, 240, 0.1)';

      for (let r = 0; r < grid.length; r++) {
        for (let c = 0; c < grid[0].length; c++) {
          const bx = c * SPACING;
          const by = r * SPACING;
          const dx = bx - mx;
          const dy = by - my;
          const dist = Math.sqrt(dx * dx + dy * dy);

          let tx = 0, ty = 0;
          if (dist < REPEL_R && dist > 0) {
            // Linear falloff — uniform push across the full radius → clean circular ring
            const s = (1 - dist / REPEL_R) * MAX_FORCE;
            tx = (dx / dist) * s;
            ty = (dy / dist) * s;
          }

          grid[r][c].ox += (tx - grid[r][c].ox) * LERP;
          grid[r][c].oy += (ty - grid[r][c].oy) * LERP;

          const mag = Math.sqrt(grid[r][c].ox ** 2 + grid[r][c].oy ** 2);
          const x = bx + grid[r][c].ox;
          const y = by + grid[r][c].oy;

          if (mag > 1.5) {
            displaced.push({ x, y, mag });
          } else {
            ctx.beginPath();
            ctx.arc(x, y, DOT_R, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      }

      // Pass 2 — single unified ambient glow at cursor position
      // One smooth radial light source looks natural; dozens of per-dot halos look like floating stars
      if (mx > -100) {
        const ambientR = REPEL_R * 1.1;
        const ambient = ctx.createRadialGradient(mx, my, 0, mx, my, ambientR);
        ambient.addColorStop(0,   'rgba(168, 155, 242, 0.13)');
        ambient.addColorStop(0.3, 'rgba(168, 155, 242, 0.06)');
        ambient.addColorStop(0.7, 'rgba(168, 155, 242, 0.015)');
        ambient.addColorStop(1,   'rgba(168, 155, 242, 0)');
        ctx.fillStyle = ambient;
        ctx.beginPath();
        ctx.arc(mx, my, ambientR, 0, Math.PI * 2);
        ctx.fill();
      }

      // Pass 3 — displaced dots: solid lavender, opacity scales with displacement depth
      for (const { x, y, mag } of displaced) {
        const t = Math.min(mag / MAX_FORCE, 1);
        ctx.fillStyle = `rgba(168, 155, 242, ${0.28 + t * 0.62})`;
        ctx.beginPath();
        ctx.arc(x, y, DOT_R + t * 0.5, 0, Math.PI * 2);
        ctx.fill();
      }

      animRef.current = requestAnimationFrame(draw);
    };

    const onMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };

    init();
    draw();
    window.addEventListener('resize', init);
    window.addEventListener('mousemove', onMove);

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener('resize', init);
      window.removeEventListener('mousemove', onMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      aria-hidden="true"
    />
  );
};

// ── Magnetic wrapper — element springs gently toward the cursor
const Magnetic = ({ children, strength = 0.35 }) => {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 350, damping: 22 });
  const sy = useSpring(y, { stiffness: 350, damping: 22 });

  const onMove = (e) => {
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * strength);
    y.set((e.clientY - (r.top + r.height / 2)) * strength);
  };

  return (
    <motion.div
      ref={ref}
      style={{ x: sx, y: sy, display: 'inline-flex' }}
      onMouseMove={onMove}
      onMouseLeave={() => { x.set(0); y.set(0); }}
    >
      {children}
    </motion.div>
  );
};

// ── Line that draws itself left-to-right on mount
const DrawLine = ({ delay = 0 }) => (
  <motion.div
    style={{ height: '1px', backgroundColor: 'var(--border)', transformOrigin: 'left center' }}
    initial={{ scaleX: 0 }}
    animate={{ scaleX: 1 }}
    transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay }}
  />
);

// ── Per-letter clip-reveal: each letter slides up from an overflow mask
const RevealLine = ({ text, startDelay = 0, accentPeriod = false }) => (
  <div style={{ overflow: 'hidden', lineHeight: 1 }}>
    <div>
      {text.split('').map((char, i) => (
        <motion.span
          key={i}
          style={{ display: 'inline-block' }}
          initial={{ y: '110%' }}
          animate={{ y: '0%' }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1], delay: startDelay + i * 0.038 }}
        >
          {char === ' ' ? ' ' : char}
        </motion.span>
      ))}
      {accentPeriod && (
        <motion.span
          style={{ display: 'inline-block', color: 'var(--accent)' }}
          initial={{ y: '110%' }}
          animate={{ y: '0%' }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1], delay: startDelay + text.length * 0.038 }}
        >
          .
        </motion.span>
      )}
    </div>
  </div>
);

export default function HeroSection() {

  const handleClick = () => {

  }

  return (
    <section
      id="home"
      className="h-screen w-full flex flex-col relative overflow-hidden"
      style={{ padding: '0 clamp(1.5rem, 5vw, 4rem)' }}
    >
      {/* Cursor-reactive dot field */}
      <DotGrid />

      {/* Top bar */}
      <div className="flex items-center justify-between pt-8 z-10">
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-xs tracking-[0.18em] uppercase"
          style={{ color: 'var(--text-muted)' }}
        >
          Portfolio.2026
        </motion.span>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex items-center gap-2.5"
        >
          <span
            className="blink rounded-full shrink-0"
            style={{
              width: '7px',
              height: '7px',
              display: 'inline-block',
              backgroundColor: '#22c55e',
              boxShadow: '0 0 8px rgba(34,197,94,0.6)',
            }}
          />
          <span className="text-xs tracking-[0.15em] uppercase" style={{ color: 'var(--text-muted)' }}>
            Open to Full-Time Opportunities
          </span>
        </motion.div>
      </div>

      {/* Top divider */}
      <div className="mt-4 z-10">
        <DrawLine delay={0.3} />
      </div>

      {/* Main title block — pinned to bottom of the flex-1 area */}
      <div className="flex-1 flex flex-col justify-end pb-3 z-10">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.45 }}
          className="text-xs tracking-[0.2em] uppercase mb-5"
          style={{ color: 'var(--text-muted)' }}
        >
          01 / Identity
        </motion.p>

        <h1
          className="font-space-grotesk tracking-tight"
          style={{
            fontSize: 'clamp(4rem, 11vw, 9rem)',
            lineHeight: 0.9,
            textShadow: '0 0 120px rgba(168, 155, 242, 0.07)',
          }}
        >
          <RevealLine text="FULLSTACK AI" startDelay={0.5} />
          <div style={{ marginTop: '0.05em' }}>
            <RevealLine text="ENGINEER" startDelay={0.65} accentPeriod />
          </div>
        </h1>
      </div>

      {/* Bottom divider */}
      <div className="z-10 mt-8">
        <DrawLine delay={1.05} />
      </div>

      {/* Bottom info bar */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 1.15 }}
        className="z-10 py-6 grid grid-cols-1 md:grid-cols-3 items-center gap-6 md:gap-4"
      >
        {/* Identity */}
        <div>
          <p className="text-xs tracking-[0.15em] mb-1.5" style={{ color: 'var(--text-muted)' }}>
            Hey there, I&apos;am
          </p>
          <p className="font-medium tracking-wide" style={{ color: 'var(--accent)', fontSize: '0.95rem' }}>
            Rayala Viswanath
          </p>
        </div>

        {/* Tagline */}
        <p className="font-cormorant text-lg md:text-center" style={{ color: 'var(--text-muted)', lineHeight: 1.45 }}>
          Building scalable production grade
          <br className="hidden md:block" /> AI web platforms.
        </p>

        {/* Socials + Resume */}
        <div className="flex items-center gap-5 md:justify-end">
          <Magnetic>
            <motion.a
              href="https://github.com/Rayala07"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0.4, color: '#F5F3F0' }}
              whileHover={{ opacity: 1, scale: 1.12, color: '#A89BF2' }}
              transition={{ duration: 0.2 }}
              style={{ display: 'block' }}
            >
              <GithubIcon />
            </motion.a>
          </Magnetic>

          <Magnetic>
            <motion.a
              href="https://www.linkedin.com/in/rayala07/"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0.4, color: '#F5F3F0' }}
              whileHover={{ opacity: 1, scale: 1.12, color: '#A89BF2' }}
              transition={{ duration: 0.2 }}
              style={{ display: 'block' }}
            >
              <LinkedinIcon />
            </motion.a>
          </Magnetic>

          <Magnetic strength={0.25}>
            <motion.button
              initial={{ borderColor: '#1A1A1A', color: '#A0A0A0', backgroundColor: 'transparent' }}
              whileHover={{ backgroundColor: '#F5F3F0', color: '#050505', borderColor: '#F5F3F0' }}
              transition={{ duration: 0.22 }}
              style={{ cursor: 'pointer', fontSize: '0.72rem' }}
              className="tracking-[0.12em] uppercase border px-5 py-2.5"
            >
              Resume →
            </motion.button>
          </Magnetic>
        </div>
      </motion.div>
    </section>
  );
}
