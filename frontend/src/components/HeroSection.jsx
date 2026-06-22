"use client";

import React from 'react';
import { motion } from 'motion/react';

const GithubIcon = () => <i className="hn hn-github text-xl" />;
const LinkedinIcon = () => <i className="hn hn-linkedin text-xl" />;

// Animated line that draws itself left-to-right
const DrawLine = ({ delay = 0 }) => (
  <motion.div
    style={{ height: '1px', backgroundColor: 'var(--border)', transformOrigin: 'left center' }}
    initial={{ scaleX: 0 }}
    animate={{ scaleX: 1 }}
    transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay }}
  />
);

// Per-letter clip-reveal: each letter slides up from behind an overflow mask
const RevealLine = ({ text, startDelay = 0, accentPeriod = false }) => (
  <div style={{ overflow: 'hidden', lineHeight: 1 }}>
    <div>
      {text.split('').map((char, i) => (
        <motion.span
          key={i}
          style={{ display: 'inline-block' }}
          initial={{ y: '110%' }}
          animate={{ y: '0%' }}
          transition={{
            duration: 0.75,
            ease: [0.22, 1, 0.36, 1],
            delay: startDelay + i * 0.038,
          }}
        >
          {char === ' ' ? ' ' : char}
        </motion.span>
      ))}
      {accentPeriod && (
        <motion.span
          style={{ display: 'inline-block', color: 'var(--accent)' }}
          initial={{ y: '110%' }}
          animate={{ y: '0%' }}
          transition={{
            duration: 0.75,
            ease: [0.22, 1, 0.36, 1],
            delay: startDelay + text.length * 0.038,
          }}
        >
          .
        </motion.span>
      )}
    </div>
  </div>
);

export default function HeroSection() {
  return (
    <section
      id="home"
      className="h-screen w-full flex flex-col relative overflow-hidden"
      style={{ padding: '0 clamp(1.5rem, 5vw, 4rem)' }}
    >
      {/* Background watermark — "RV" initials, barely visible */}
      <div
        className="absolute inset-0 flex items-center justify-end pointer-events-none select-none overflow-hidden"
        style={{ paddingRight: 'clamp(1.5rem, 5vw, 4rem)' }}
        aria-hidden="true"
      >
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.028 }}
          transition={{ duration: 2.5, delay: 0.8 }}
          style={{
            fontSize: 'clamp(10rem, 24vw, 22rem)',
            fontFamily: "'Space Grotesk', sans-serif",
            fontWeight: 700,
            lineHeight: 1,
            userSelect: 'none',
            letterSpacing: '-0.04em',
            color: 'var(--text-primary)',
          }}
        >
          RV
        </motion.span>
      </div>

      {/* Top bar */}
      <div className="flex items-center justify-between pt-8 z-10">
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-xs tracking-[0.18em] uppercase"
          style={{ color: 'var(--text-muted)' }}
        >
          Portfolio — 2026
        </motion.span>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex items-center gap-2.5"
        >
          <span
            className="blink rounded-full flex-shrink-0"
            style={{
              width: '7px',
              height: '7px',
              display: 'inline-block',
              backgroundColor: '#22c55e',
              boxShadow: '0 0 8px rgba(34,197,94,0.6)',
            }}
          />
          <span
            className="text-xs tracking-[0.15em] uppercase"
            style={{ color: 'var(--text-muted)' }}
          >
            Open to Full-time
          </span>
        </motion.div>
      </div>

      {/* Top divider — draws in from left */}
      <div className="mt-4 z-10">
        <DrawLine delay={0.3} />
      </div>

      {/* Main title block — pinned to bottom of flex-1 area */}
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
          style={{ fontSize: 'clamp(4rem, 11vw, 9rem)', lineHeight: 0.9 }}
        >
          <RevealLine text="FULLSTACK AI" startDelay={0.5} />
          <div style={{ marginTop: '0.05em' }}>
            <RevealLine text="ENGINEER" startDelay={0.65} accentPeriod />
          </div>
        </h1>
      </div>

      {/* Bottom divider — draws in from left */}
      <div className="z-10 mt-8">
        <DrawLine delay={1.05} />
      </div>

      {/* Bottom info bar — name / tagline / socials+cta */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 1.15 }}
        className="z-10 py-6 grid grid-cols-1 md:grid-cols-3 items-center gap-6 md:gap-4"
      >
        {/* Identity */}
        <div>
          <p
            className="text-xs tracking-[0.15em] uppercase mb-1.5"
            style={{ color: 'var(--text-muted)' }}
          >
            Engineer
          </p>
          <p
            className="font-medium tracking-wide"
            style={{ color: 'var(--text-primary)', fontSize: '0.95rem' }}
          >
            Rayala Viswanath
          </p>
        </div>

        {/* Tagline */}
        <p
          className="font-cormorant text-lg md:text-center"
          style={{ color: 'var(--text-muted)', lineHeight: 1.45 }}
        >
          Building scalable production
          <br className="hidden md:block" /> AI web platforms.
        </p>

        {/* Socials + Resume */}
        <div className="flex items-center gap-5 md:justify-end">
          <a
            href=""
            target="_blank"
            rel="noopener noreferrer"
            className="opacity-40 hover:opacity-100 transition-opacity duration-300"
            style={{ color: 'var(--text-primary)' }}
          >
            <GithubIcon />
          </a>
          <a
            href=""
            target="_blank"
            rel="noopener noreferrer"
            className="opacity-40 hover:opacity-100 transition-opacity duration-300"
            style={{ color: 'var(--text-primary)' }}
          >
            <LinkedinIcon />
          </a>
          <motion.button
            whileHover={{
              backgroundColor: 'var(--text-primary)',
              color: '#050505',
              borderColor: 'var(--text-primary)',
            }}
            transition={{ duration: 0.22 }}
            style={{
              borderColor: 'var(--border)',
              color: 'var(--text-muted)',
              cursor: 'pointer',
              fontSize: '0.72rem',
            }}
            className="tracking-[0.12em] uppercase border px-5 py-2.5"
          >
            Resume →
          </motion.button>
        </div>
      </motion.div>
    </section>
  );
}
