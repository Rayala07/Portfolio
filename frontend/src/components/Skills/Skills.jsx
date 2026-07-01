'use client';

import { useState, useRef, useEffect } from 'react';
import { useInView, useReducedMotion, motion, AnimatePresence } from 'motion/react';
import { CATEGORIES, SKILLS } from './skills.data';
import SkillTileGrid from './SkillTileGrid';
import AppliedAIList from './AppliedAIList';
import { getLenisInstance } from '@/lib/lenis-instance';

export default function SkillsSection() {
  const [selected, setSelected]     = useState(CATEGORIES[0]);
  const prefersReducedMotion         = useReducedMotion();
  const sectionRef                   = useRef(null);
  const hasEntered                   = useInView(sectionRef, { once: true, amount: 0.12 });

  const visibleSkills = SKILLS.filter((s) => s.category === selected);
  const isAI          = selected === 'Applied AI';

  // After every tab switch the AnimatePresence exit briefly collapses
  // the section height, which causes Lenis to cache a shorter scroll
  // limit. Force a resize after the animation fully settles.
  useEffect(() => {
    const id = setTimeout(() => {
      const lenis = getLenisInstance();
      if (lenis) lenis.resize();
    }, 500);
    return () => clearTimeout(id);
  }, [selected]);

  return (
    <section
      id="skills"
      ref={sectionRef}
      style={{
        padding:       'clamp(3.5rem, 7vh, 6rem) clamp(1.5rem, 5vw, 4rem)',
        minHeight:     '100vh',
        display:       'flex',
        flexDirection: 'column',
        justifyContent:'flex-start',
        position:      'relative',
      }}
    >
      {/* ── Section heading ── */}
      <div style={{ marginBottom: 'clamp(1.5rem, 3vh, 2.5rem)' }}>
        <p
          className="font-cormorant"
          style={{
            fontSize:      '1.1rem',
            color:         'var(--accent)',
            letterSpacing: '0.02em',
            marginBottom:  'clamp(0.8rem, 1.5vh, 1.2rem)',
          }}
        >
          What I build with...
        </p>
        <h2
          className="font-bricolage"
          style={{
            fontSize:      'clamp(3rem, 6.5vw, 6.5rem)',
            fontWeight:    800,
            letterSpacing: '-0.04em',
            lineHeight:    0.9,
            margin:        0,
          }}
        >
          <span style={{ color: 'var(--accent)', display: 'block' }}>The</span>
          <span style={{ color: 'var(--text-primary)', display: 'block' }}>Stack</span>
        </h2>
      </div>

      {/* ── Horizontal tab strip ── */}
      <div
        style={{
          position:      'relative',
          display:       'flex',
          alignItems:    'flex-end',
          gap:           0,
          marginBottom:  'clamp(1.5rem, 3vh, 2.5rem)',
          borderBottom:  '1px solid rgba(255,255,255,0.08)',
          overflowX:     'auto',
          scrollbarWidth:'none',
          msOverflowStyle: 'none',
        }}
      >
        {CATEGORIES.map((cat) => {
          const isActive = cat === selected;
          return (
            <button
              key={cat}
              onClick={() => setSelected(cat)}
              style={{
                position:    'relative',
                padding:     '0 0 16px',
                marginRight: 'clamp(20px, 3.5vw, 44px)',
                background:  'none',
                border:      'none',
                cursor:      'pointer',
                outline:     'none',
                whiteSpace:  'nowrap',
                fontFamily:  "'Bricolage Grotesque', sans-serif",
                fontSize:    'clamp(0.82rem, 1.15vw, 0.98rem)',
                fontWeight:  isActive ? 700 : 400,
                letterSpacing: '-0.01em',
                color:       isActive
                  ? 'var(--text-primary)'
                  : 'rgba(245,243,240,0.32)',
                transition:  'color 0.22s ease, font-weight 0.15s ease',
              }}
            >
              {cat}
              {/* Spring-animated underline indicator */}
              {isActive && (
                <motion.span
                  layoutId="tab-indicator"
                  style={{
                    position:     'absolute',
                    bottom:       -1,
                    left:         0,
                    right:        0,
                    height:       '2px',
                    background:   'var(--accent)',
                    borderRadius: '1px',
                  }}
                  transition={{ type: 'spring', stiffness: 460, damping: 32 }}
                />
              )}
            </button>
          );
        })}
      </div>

      {/* ── Content area — crossfade when switching between grid and AI list ── */}
      <AnimatePresence mode="wait" initial={false}>
        {isAI ? (
          <motion.div
            key="ai-panel"
            initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{
              opacity: 0,
              y: prefersReducedMotion ? 0 : -8,
              transition: { duration: 0.17, ease: 'easeIn' },
            }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          >
            <AppliedAIList
              skills={visibleSkills}
              hasEntered={hasEntered}
            />
          </motion.div>
        ) : (
          <motion.div
            key="grid-panel"
            initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{
              opacity: 0,
              y: prefersReducedMotion ? 0 : -8,
              transition: { duration: 0.17, ease: 'easeIn' },
            }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          >
            <SkillTileGrid
              skills={visibleSkills}
              category={selected}
              hasEntered={hasEntered}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hide scrollbar cross-browser */}
      <style>{`
        #skills [style*="overflow-x: auto"]::-webkit-scrollbar { display: none; }
      `}</style>
    </section>
  );
}
