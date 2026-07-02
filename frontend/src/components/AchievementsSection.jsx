'use client';

import { useRef } from 'react';
import { useInView, motion } from 'motion/react';

const ACHIEVEMENTS = [
  {
    id:        'hackathon-2026',
    index:     '01',
    badge:     'Hackathon',
    title:     'Top Best Pitchers',
    event:     'Startup Build Hackathon 2026',
    organizer: 'Sheryians Coding School',
    date:      'May 2026',
    brief:     'Recognized as the Top Best Pitchers for building and presenting an AI based application solution for Software Incident Management.',
  },
];

/* Injected once — @property enables smooth conic-gradient angle animation */
const BORDER_CSS = `
  @property --bangle {
    syntax: '<angle>';
    inherits: false;
    initial-value: 0deg;
  }

  @keyframes borderSweep {
    to { --bangle: 360deg; }
  }

  .achieve-card {
    position: relative;
    border-radius: 24px;
    background: #0E0E0E;
    border: 2px solid rgba(168, 155, 242, 0.1);
    transition: border-color 0.35s ease;
  }

  /* Running gradient light lives on the ::before — masked to show only the 2px border ring */
  .achieve-card::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: 24px;
    padding: 2px;
    background: conic-gradient(
      from var(--bangle),
      transparent 0%,
      rgba(168, 155, 242, 0) 22%,
      rgba(168, 155, 242, 0.95) 38%,
      rgba(255, 255, 255, 0.6) 42%,
      rgba(168, 155, 242, 0.95) 46%,
      rgba(168, 155, 242, 0) 62%,
      transparent 100%
    );
    -webkit-mask:
      linear-gradient(#fff 0 0) content-box,
      linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    opacity: 0;
    transition: opacity 0.4s ease;
    pointer-events: none;
  }

  .achieve-card:hover {
    border-color: transparent;
  }

  .achieve-card:hover::before {
    opacity: 1;
    animation: borderSweep 3s linear infinite;
  }
`;

export default function AchievementsSection() {
  const sectionRef = useRef(null);
  const hasEntered = useInView(sectionRef, { once: true, amount: 0.1 });

  return (
    <section
      id="achievements"
      ref={sectionRef}
      style={{
        minHeight:      '100vh',
        display:        'flex',
        flexDirection:  'column',
        justifyContent: 'center',
        padding:        'clamp(4rem, 8vh, 7rem) clamp(1.5rem, 5vw, 4rem)',
        boxSizing:      'border-box',
        position:       'relative',
      }}
    >
      <style>{BORDER_CSS}</style>

      <div style={{ width: '100%', maxWidth: 1280, margin: '0 auto' }}>

        {/* ── Section heading — centered, one line, no clipping ── */}
        <div
          style={{
            textAlign:    'center',
            marginBottom: 'clamp(2.5rem, 5vh, 4.5rem)',
            /* Extra padding-bottom so descenders (y, g, p) clear the overflow clip */
            overflow:     'hidden',
            paddingBottom:'0.18em',
          }}
        >
          <motion.div
            initial={{ y: '105%' }}
            animate={hasEntered ? { y: '0%' } : { y: '105%' }}
            transition={{ duration: 0.82, ease: [0.22, 1, 0.36, 1], delay: 0.06 }}
            className="font-bricolage"
            style={{
              fontSize:      'clamp(3rem, 7vw, 7rem)',
              fontWeight:    800,
              letterSpacing: '-0.04em',
              lineHeight:    1,
              display:       'inline',
            }}
          >
            <span style={{ color: 'var(--accent)' }}>My </span>
            <span style={{ color: 'var(--text-primary)' }}>Wins</span>
          </motion.div>
        </div>

        {/* ── Achievement spotlight cards ── */}
        {ACHIEVEMENTS.map((item) => (
          <SpotlightCard key={item.id} item={item} hasEntered={hasEntered} />
        ))}
      </div>
    </section>
  );
}

function SpotlightCard({ item, hasEntered }) {
  return (
    <motion.div
      className="achieve-card"
      initial={{ opacity: 0, y: 24 }}
      animate={hasEntered ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
      transition={{ duration: 0.65, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
      style={{
        padding: 'clamp(2.5rem, 5vh, 4.5rem) clamp(2rem, 4vw, 4rem)',
      }}
    >
      {/* Faint ghost index number — decorative only */}
      <div
        aria-hidden
        style={{
          position:         'absolute',
          right:            '-0.5rem',
          bottom:           '-2rem',
          fontFamily:       "'Bricolage Grotesque', sans-serif",
          fontWeight:       800,
          fontSize:         'clamp(14rem, 26vw, 26rem)',
          lineHeight:       1,
          color:            'transparent',
          WebkitTextStroke: '1px rgba(168,155,242,0.055)',
          letterSpacing:    '-0.06em',
          pointerEvents:    'none',
          userSelect:       'none',
          zIndex:           0,
        }}
      >
        {item.index}
      </div>

      {/* All content above the decorative layer */}
      <div style={{ position: 'relative', zIndex: 1 }}>

        {/* Row 1 — badge + date */}
        <div
          style={{
            display:        'flex',
            alignItems:     'center',
            justifyContent: 'space-between',
            flexWrap:       'wrap',
            gap:            '1rem',
            marginBottom:   'clamp(2rem, 4vh, 3.5rem)',
          }}
        >
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={hasEntered ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
            transition={{ duration: 0.55, delay: 0.36, ease: [0.22, 1, 0.36, 1] }}
          >
            <span
              style={{
                display:       'inline-flex',
                alignItems:    'center',
                gap:           8,
                padding:       '7px 18px',
                borderRadius:  0,
                border:        '1px solid rgba(168,155,242,0.3)',
                background:    'rgba(168,155,242,0.07)',
                boxShadow:     '0 0 22px rgba(168,155,242,0.1), inset 0 1px 0 rgba(255,255,255,0.05)',
                color:         'var(--accent)',
                fontFamily:    'Inter, sans-serif',
                fontSize:      '0.68rem',
                fontWeight:    600,
                letterSpacing: '0.11em',
              }}
            >
              <TrophyIcon />
              {item.badge.toUpperCase()}
            </span>
          </motion.div>

          <motion.p
            className="font-cormorant"
            initial={{ opacity: 0, x: 20 }}
            animate={hasEntered ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
            transition={{ duration: 0.55, delay: 0.36, ease: [0.22, 1, 0.36, 1] }}
            style={{
              fontSize:      'clamp(1.2rem, 2vw, 1.9rem)',
              color:         'rgba(245,243,240,0.28)',
              margin:        0,
              letterSpacing: '0.02em',
            }}
          >
            {item.date}
          </motion.p>
        </div>

        {/* Row 2 — award title (masked slide-up reveal, paddingBottom prevents descender clip) */}
        <div
          style={{
            overflow:      'hidden',
            paddingBottom: '0.12em',
            marginBottom:  'calc(clamp(0.6rem, 1.5vh, 1rem) - 0.12em)',
          }}
        >
          <motion.h3
            className="font-bricolage"
            initial={{ y: '106%' }}
            animate={hasEntered ? { y: '0%' } : { y: '106%' }}
            transition={{ duration: 0.95, delay: 0.44, ease: [0.22, 1, 0.36, 1] }}
            style={{
              fontSize:      'clamp(3.8rem, 8vw, 8.5rem)',
              fontWeight:    800,
              letterSpacing: '-0.04em',
              lineHeight:    0.92,
              color:         'var(--text-primary)',
              margin:        0,
            }}
          >
            {item.title}
          </motion.h3>
        </div>

        {/* Row 3 — event name */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={hasEntered ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
          transition={{ duration: 0.5, delay: 0.56, ease: [0.22, 1, 0.36, 1] }}
          style={{
            fontFamily:    'Inter, sans-serif',
            fontSize:      'clamp(0.88rem, 1.2vw, 1.05rem)',
            color:         'rgba(245,243,240,0.36)',
            margin:        '0 0 clamp(2rem, 4vh, 3.2rem)',
            letterSpacing: '0.01em',
          }}
        >
          {item.event}
        </motion.p>

        {/* Gradient accent divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={hasEntered ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{ duration: 0.9, delay: 0.62, ease: [0.22, 1, 0.36, 1] }}
          style={{
            height:          '1px',
            background:      'linear-gradient(90deg, rgba(168,155,242,0.55) 0%, rgba(168,155,242,0.12) 45%, transparent 80%)',
            marginBottom:    'clamp(2rem, 4vh, 3.2rem)',
            transformOrigin: 'left center',
          }}
        />

        {/* Row 4 — organizer + brief */}
        <div
          style={{
            display:             'grid',
            gridTemplateColumns: '200px 1fr',
            gap:                 'clamp(2rem, 4vw, 5rem)',
            alignItems:          'start',
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={hasEntered ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            transition={{ duration: 0.5, delay: 0.72, ease: [0.22, 1, 0.36, 1] }}
          >
            <p
              style={{
                fontFamily:    'Inter, sans-serif',
                fontSize:      '0.65rem',
                fontWeight:    600,
                letterSpacing: '0.13em',
                color:         'rgba(245,243,240,0.22)',
                textTransform: 'uppercase',
                margin:        '0 0 8px',
              }}
            >
              Organized by
            </p>
            <p
              className="font-bricolage"
              style={{
                fontSize:      'clamp(0.95rem, 1.3vw, 1.1rem)',
                fontWeight:    600,
                color:         'rgba(245,243,240,0.68)',
                margin:        0,
                letterSpacing: '-0.01em',
                lineHeight:    1.3,
              }}
            >
              {item.organizer}
            </p>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={hasEntered ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            transition={{ duration: 0.5, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize:   'clamp(0.88rem, 1.1vw, 0.98rem)',
              color:      'rgba(245,243,240,0.44)',
              lineHeight: 1.78,
              margin:     0,
            }}
          >
            {item.brief}
          </motion.p>
        </div>
      </div>
    </motion.div>
  );
}

function TrophyIcon() {
  return (
    <svg
      width="11" height="11" viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="2.2"
      strokeLinecap="round" strokeLinejoin="round"
      style={{ flexShrink: 0 }}
    >
      <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
      <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
      <path d="M4 22h16" />
      <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
      <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
      <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
    </svg>
  );
}
