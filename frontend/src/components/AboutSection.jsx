"use client";

import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';

// Mirror the CSS design tokens as literals so useTransform can interpolate them
const MUTED   = '#A0A0A0'; // var(--text-muted)
const PRIMARY = '#F5F3F0'; // var(--text-primary)

// Recruiter-focused paragraph — who you are, what you build, what you're after
const PARAGRAPH =
  'Fullstack AI Engineer who designs and ships complete digital products — ' +
  'from pixel-perfect interfaces to reliable backends, with AI integrated ' +
  'where it creates real leverage. I care about software that solves real ' +
  'problems, moves fast, and earns trust in production. ' +
  'Currently open to full-time opportunities where craft and impact are the expectation.';

// ── RevealWord ────────────────────────────────────────────────────────────
// Lives in its own component so useTransform is called once per instance —
// not inside a map — satisfying the Rules of Hooks.
function RevealWord({ scrollYProgress, index, total, word }) {
  // Each word gets a sub-range within [0.20, 0.70] of the section's scroll travel.
  // Outside that band the value stays clamped, so all words start muted (progress=0)
  // and all words are fully revealed well before the section exits (progress=1).
  const start = 0.20 + (index / total) * 0.50;
  const end   = 0.20 + ((index + 1) / total) * 0.50;

  const color = useTransform(scrollYProgress, [start, end], [MUTED, PRIMARY]);

  return (
    // Inline-block lets the browser break words naturally across lines
    <motion.span style={{ color, display: 'inline' }}>
      {word}{' '}
    </motion.span>
  );
}

// ─────────────────────────────────────────────────────────────────────────
export default function AboutSection() {
  const sectionRef = useRef(null);

  // Track the section's travel through the viewport.
  // progress = 0: section top at viewport bottom  (section just entering)
  // progress = 1: section bottom at viewport top  (section just exiting)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  // Respect prefers-reduced-motion — show fully-revealed text with no scrub
  const [reducedMotion, setReducedMotion] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mq.matches);
    const onChange = (e) => setReducedMotion(e.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  const words = PARAGRAPH.split(/\s+/);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="h-screen w-full flex flex-col"
      style={{ padding: '0 clamp(1.5rem, 5vw, 4rem)' }}
    >
      {/* ── Eyebrow + name ────────────────────────────────────────── */}
      <div className="pt-20">
        <p
          className="text-sm mb-2"
          style={{ color: 'var(--text-muted)' }}
        >
          Hey, I&apos;m
        </p>

        <h2
          className="font-space-grotesk tracking-tight"
          style={{
            fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
            lineHeight: 0.9,
            color: 'var(--text-primary)',
          }}
        >
          RAYALA VISWANATH
        </h2>
      </div>

      {/* ── Scroll-scrubbed paragraph — centred in remaining space ── */}
      <div className="flex-1 flex items-center">
        <p
          className="max-w-2xl"
          style={{
            fontSize: 'clamp(1rem, 1.8vw, 1.3rem)',
            lineHeight: 1.85,
          }}
        >
          {reducedMotion ? (
            // No scroll animation — just show the text at full colour
            <span style={{ color: PRIMARY }}>{PARAGRAPH}</span>
          ) : (
            words.map((word, i) => (
              <RevealWord
                key={i}
                scrollYProgress={scrollYProgress}
                index={i}
                total={words.length}
                word={word}
              />
            ))
          )}
        </p>
      </div>
    </section>
  );
}
