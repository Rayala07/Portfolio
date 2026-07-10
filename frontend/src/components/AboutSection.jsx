"use client";

import React, { useRef, useState, useEffect } from 'react';
import { motion, useMotionValue, useTransform } from 'motion/react';

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
  const end       = Math.min(0.92, start + wordWidth * 1.6);

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
  // Manual motion value — updated by RAF so it works with any scroll driver (Lenis, native, etc.)
  const scrollYProgress = useMotionValue(0);

  const [reducedMotion, setReducedMotion] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mq.matches);
    const onChange = (e) => setReducedMotion(e.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let rafId;

    const update = () => {
      // getBoundingClientRect returns the VISUAL position including any CSS transforms
      // applied by Lenis — so this is correct whether Lenis uses scrollTo() or transforms.
      const rect   = container.getBoundingClientRect();
      const total  = container.offsetHeight - window.innerHeight;
      if (total > 0) {
        const raw = -rect.top / total;
        scrollYProgress.set(Math.min(1, Math.max(0, raw)));
      }
      rafId = requestAnimationFrame(update);
    };

    rafId = requestAnimationFrame(update);
    return () => cancelAnimationFrame(rafId);
  }, [scrollYProgress]);

  const words = PARAGRAPH.split(/\s+/);

  return (
    /* 280vh outer gives 180vh of sticky scroll budget */
    <div ref={containerRef} style={{ height: '280vh', flexShrink: 0 }}>
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
        {/* Eyebrow + name */}
        <div className="pt-32">
          <p
            className="font-cormorant mb-1"
            style={{ fontSize: '1.35rem', color: 'var(--accent)' }}
          >
            Hey, I&apos;m
          </p>
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

        {/* Paragraph — centred, word-by-word scroll reveal */}
        <div className="flex-1 flex items-center justify-center">
          <p
            className="font-bricolage"
            style={{
              textAlign: 'center',
              maxWidth: '54rem',
              fontSize: 'clamp(1.35rem, 2.3vw, 1.85rem)',
              lineHeight: 1.65,
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
