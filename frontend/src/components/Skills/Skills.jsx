'use client';

import { useState, useRef } from 'react';
import { useInView, useReducedMotion, motion } from 'motion/react';
import { CATEGORIES, SKILLS } from './skills.data';
import SkillTileGrid from './SkillTileGrid';
import AppliedAIList from './AppliedAIList';

export default function SkillsSection() {
  const [selected, setSelected]     = useState(CATEGORIES[0]);
  const prefersReducedMotion         = useReducedMotion();
  const sectionRef                   = useRef(null);
  const hasEntered                   = useInView(sectionRef, { once: true, amount: 0.12 });

  const visibleSkills = SKILLS.filter((s) => s.category === selected);
  const isAI          = selected === 'Applied AI';

  return (
    <section
      id="skills"
      ref={sectionRef}
      style={{
        padding:       'clamp(5rem, 10vh, 8rem) clamp(1.5rem, 5vw, 4rem)',
        minHeight:     '100vh',
        display:       'flex',
        flexDirection: 'column',
        justifyContent:'center',
        position:      'relative',
      }}
    >
      {/* ── Eyebrow label ── */}
      <p
        className="font-cormorant"
        style={{
          fontSize:      '1.1rem',
          color:         'var(--accent)',
          letterSpacing: '0.02em',
          marginBottom:  'clamp(1.8rem, 3.5vh, 2.8rem)',
        }}
      >
        What I work with...
      </p>

      {/* ── Horizontal tab strip ── */}
      <div
        style={{
          position:      'relative',
          display:       'flex',
          alignItems:    'flex-end',
          gap:           0,
          marginBottom:  'clamp(2.5rem, 5vh, 4rem)',
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

      {/* ── Content area ── */}
      {isAI ? (
        <AppliedAIList
          skills={visibleSkills}
          hasEntered={hasEntered}
        />
      ) : (
        <SkillTileGrid
          skills={visibleSkills}
          category={selected}
          hasEntered={hasEntered}
        />
      )}

      {/* Hide scrollbar cross-browser */}
      <style>{`
        #skills [style*="overflow-x: auto"]::-webkit-scrollbar { display: none; }
      `}</style>
    </section>
  );
}
