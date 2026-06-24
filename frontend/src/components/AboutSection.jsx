"use client";

import React, { useRef, useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useInView } from 'motion/react';

// ── Scroll-triggered horizontal rule ──────────────────────────────────────
const DrawLine = ({ delay = 0 }) => (
  <motion.div
    style={{ height: '1px', backgroundColor: 'var(--border)', transformOrigin: 'left center' }}
    initial={{ scaleX: 0 }}
    whileInView={{ scaleX: 1 }}
    viewport={{ once: true, margin: '-50px' }}
    transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay }}
  />
);

// ── Character that scrambles through random glyphs, then settles ──────────
const GLYPHS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ@#$%&';

function ScrambleLetter({ char, startDelay = 0, accent = false }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const [display, setDisplay] = useState(
    () => GLYPHS[Math.floor(Math.random() * GLYPHS.length)]
  );

  useEffect(() => {
    if (!inView) return;
    let count = 0;
    const cycles = 12;
    let interval;
    const timeout = setTimeout(() => {
      interval = setInterval(() => {
        count++;
        setDisplay(
          count >= cycles
            ? char
            : GLYPHS[Math.floor(Math.random() * GLYPHS.length)]
        );
        if (count >= cycles) clearInterval(interval);
      }, 42);
    }, startDelay);
    return () => { clearTimeout(timeout); clearInterval(interval); };
  }, [inView, char, startDelay]);

  return (
    <span
      ref={ref}
      aria-hidden="true"
      style={{ display: 'inline-block', color: accent ? 'var(--accent)' : 'inherit' }}
    >
      {display}
    </span>
  );
}

// ── Shared fade-up variant ────────────────────────────────────────────────
const fadeUp = { hidden: { opacity: 0, y: 18 }, visible: { opacity: 1, y: 0 } };

const TECH = [
  'React / Next.js',
  'TypeScript',
  'Python',
  'Node.js',
  'AI / LLMs',
  'PostgreSQL',
  'Docker',
];

// ─────────────────────────────────────────────────────────────────────────
export default function AboutSection() {
  // Magnetic spring for the heading word
  const headingRef = useRef(null);
  const hx = useMotionValue(0);
  const hy = useMotionValue(0);
  const shx = useSpring(hx, { stiffness: 260, damping: 20 });
  const shy = useSpring(hy, { stiffness: 260, damping: 20 });

  const onHeadingMove = (e) => {
    const r = headingRef.current?.getBoundingClientRect();
    if (!r) return;
    hx.set((e.clientX - (r.left + r.width / 2)) * 0.22);
    hy.set((e.clientY - (r.top + r.height / 2)) * 0.22);
  };

  return (
    <section
      id="about"
      className="h-screen w-full flex flex-col relative overflow-hidden"
      style={{ padding: '0 clamp(1.5rem, 5vw, 4rem)' }}
    >
      {/* Depth watermark — near-invisible "02" anchored to bottom-right */}
      <span
        aria-hidden="true"
        className="absolute font-space-grotesk pointer-events-none select-none"
        style={{
          fontSize: 'clamp(16rem, 40vw, 34rem)',
          lineHeight: 1,
          color: 'var(--text-primary)',
          opacity: 0.025,
          bottom: '-6%',
          right: '-1vw',
        }}
      >
        02
      </span>

      {/* ── Zone 1 — top bar (fixed height) ──────────────────────── */}
      <div className="pt-20 pb-5 shrink-0">
        <DrawLine />
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-xs tracking-[0.2em] uppercase mb-8 shrink-0"
        style={{ color: 'var(--text-muted)' }}
      >
        02 / About
      </motion.p>

      {/* ── Zone 2 — main grid (fills remaining space) ───────────── */}
      <div className="flex-1 grid grid-cols-1 md:grid-cols-12 gap-16 min-h-0">

        {/* Left: identity column */}
        <div className="md:col-span-5 flex flex-col min-h-0">

          {/* Scramble + magnetic heading */}
          <motion.h2
            ref={headingRef}
            aria-label="ABOUT."
            className="font-space-grotesk tracking-tight"
            style={{
              x: shx,
              y: shy,
              fontSize: 'clamp(3.5rem, 7.5vw, 7.5rem)',
              lineHeight: 0.88,
              color: 'var(--text-primary)',
              display: 'block',
            }}
            onMouseMove={onHeadingMove}
            onMouseLeave={() => { hx.set(0); hy.set(0); }}
          >
            {['A', 'B', 'O', 'U', 'T'].map((char, i) => (
              <ScrambleLetter key={i} char={char} startDelay={i * 85} />
            ))}
            <ScrambleLetter char="." startDelay={5 * 85} accent />
          </motion.h2>

          {/* Cormorant descriptor */}
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1], delay: 0.35 }}
            className="font-cormorant mt-5"
            style={{ fontSize: 'clamp(1rem, 1.5vw, 1.2rem)', lineHeight: 1.65, color: 'var(--text-muted)' }}
          >
            Fullstack AI Engineer crafting<br />
            production-grade web systems<br />
            that create real business value.
          </motion.p>

          {/* Thin separator before tech list */}
          <div className="mt-8">
            <DrawLine delay={0.4} />
          </div>

          {/* Tech stack list — fills left column with useful content */}
          <div className="mt-3 flex flex-col">
            {TECH.map((tech, i) => (
              <motion.div
                key={tech}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-30px' }}
                transition={{ duration: 0.5, delay: 0.45 + i * 0.06, ease: [0.22, 1, 0.36, 1] }}
                className="flex items-center gap-3 py-2.5"
                style={{ borderBottom: '1px solid var(--border)' }}
              >
                <span style={{ color: 'var(--accent)', fontSize: '0.45rem', lineHeight: 1, flexShrink: 0 }}>■</span>
                <span className="text-xs tracking-[0.12em] uppercase" style={{ color: 'var(--text-muted)' }}>
                  {tech}
                </span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Right: voice column */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          transition={{ staggerChildren: 0.13, delayChildren: 0.18 }}
          className="md:col-span-7 flex flex-col min-h-0"
          style={{ color: 'var(--text-muted)' }}
        >
          {/* Display-size quote with accent left border */}
          <motion.div
            variants={fadeUp}
            transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
            className="mb-8 pl-5"
            style={{ borderLeft: '2px solid var(--accent)' }}
          >
            <p
              className="font-cormorant"
              style={{ fontSize: 'clamp(1.5rem, 2.6vw, 2.15rem)', lineHeight: 1.4, color: 'var(--text-primary)' }}
            >
              &ldquo;Technology should be an asset,<br />not an expense.&rdquo;
            </p>
          </motion.div>

          <motion.p
            variants={fadeUp}
            transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
            className="mb-5"
            style={{ fontSize: '0.9rem', lineHeight: 1.85 }}
          >
            I build production-ready applications from UI to deployment, integrating AI
            capabilities where they create real business value — automating operations,
            improving user experiences, and turning ideas into shippable products.
          </motion.p>

          <motion.p
            variants={fadeUp}
            transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
            style={{ fontSize: '0.9rem', lineHeight: 1.85 }}
          >
            <span style={{ color: 'var(--text-primary)' }}>
              The most effective software isn&apos;t the most complex
            </span>{' '}
            — it&apos;s the kind that helps a business move faster, serve customers better,
            and operate more efficiently. That philosophy shapes every decision I make.
          </motion.p>

          {/* Status — mt-auto anchors this to the column bottom */}
          <motion.div
            variants={fadeUp}
            transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
            className="mt-auto pt-5 flex items-center gap-3"
            style={{ borderTop: '1px solid var(--border)' }}
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
        </motion.div>
      </div>

      {/* ── Zone 3 — bottom rule (fixed height) ──────────────────── */}
      <div className="shrink-0 mt-8 pb-6">
        <DrawLine delay={0.12} />
      </div>
    </section>
  );
}
