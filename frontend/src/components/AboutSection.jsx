"use client";

import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';

const PARAGRAPH =
  'Fullstack Engineer. Who designs and ships scalable production web applications. ' +
  'From pixel-perfect interfaces to reliable backends, with AI integration ' +
  'where it creates real leverage. I care about software that solves real ' +
  'business problems. ' +
  'Interested in environments where craft and impact are the expectation.';

function RevealWord({ scrollYProgress, index, total, word }) {
  const BAND_START = 0.04;
  const BAND_RANGE = 0.84;

  const wordWidth = BAND_RANGE / total;
  const start     = BAND_START + index * wordWidth;
  const end       = Math.min(0.92, start + wordWidth * 1.6); // 60% overlap → fluid wave

  const color = useTransform(
    scrollYProgress,
    [start, end],
    ['rgba(245,243,240,0.10)', '#F5F3F0']
  );

  return (
    <motion.span style={{ display: 'inline', color }}>
      {word}{' '}
    </motion.span>
  );
}

export default function AboutSection() {
  const containerRef = useRef(null);

  // progress=0 when container top = viewport top (pin starts)
  // progress=1 when container bottom = viewport bottom (pin ends)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

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
    /* Outer: 280vh gives 180vh of "sticky scroll budget" for the reveal */
    <div ref={containerRef} style={{ height: '280vh' }}>
      <section
        id="about"
        className="w-full flex flex-col"
        style={{
          position: 'sticky',
          top: 0,
          height: '100vh',
          padding: '0 clamp(1.5rem, 5vw, 4rem)',
          overflow: 'hidden',
        }}
      >
        {/* ── Eyebrow + name ── */}
        <div className="pt-32">
          {/* "Hey, I'm" — Cormorant Garamond italic, same as hero tagline */}
          <p
            className="font-cormorant mb-1"
            style={{ fontSize: '1.35rem', color: 'var(--accent)' }}
          >
            Hey, I&apos;m
          </p>

          {/* Name — Bricolage Grotesque */}
          <h2
            className="font-bricolage tracking-tight"
            style={{
              fontWeight: 700,
              fontSize: 'clamp(3rem, 5.5vw, 5rem)',
              lineHeight: 0.95,
              color: 'var(--text-primary)',
            }}
          >
            Rayala Viswanath
          </h2>
        </div>

        {/* ── Paragraph — centred both axes, Majd-style reveal ── */}
        <div className="flex-1 flex items-center justify-center">
          <p
            style={{
              textAlign: 'center',
              maxWidth: '54rem',
              fontSize: 'clamp(1.15rem, 1.9vw, 1.5rem)',
              lineHeight: 1.75,
              fontWeight: 500,
            }}
          >
            {reducedMotion ? (
              <span style={{ color: '#F5F3F0' }}>{PARAGRAPH}</span>
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
    </div>
  );
}
