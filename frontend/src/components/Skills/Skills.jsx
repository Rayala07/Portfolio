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

  // ── Horizontal-scroll affordance for the tab strip ──
  // On narrow screens the category tabs overflow with a hidden scrollbar,
  // so edge fades + a chevron signal there's more to scroll. They toggle
  // off automatically as the user reaches each end of the strip.
  const tabStripRef = useRef(null);
  const [canScrollLeft,  setCanScrollLeft]  = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const updateScrollHints = () => {
    const el = tabStripRef.current;
    if (!el) return;
    const { scrollLeft, scrollWidth, clientWidth } = el;
    setCanScrollLeft(scrollLeft > 1);
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 1);
  };

  useEffect(() => {
    updateScrollHints();
    // Re-check after fonts/layout settle in case widths shift post-mount.
    const t = setTimeout(updateScrollHints, 300);
    window.addEventListener('resize', updateScrollHints, { passive: true });
    return () => {
      clearTimeout(t);
      window.removeEventListener('resize', updateScrollHints);
    };
  }, []);

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

      {/* ── Horizontal tab strip (scrollable on narrow screens) ── */}
      <div style={{ position: 'relative', marginBottom: 'clamp(1.5rem, 3vh, 2.5rem)' }}>
        <div
          ref={tabStripRef}
          onScroll={updateScrollHints}
          style={{
            position:      'relative',
            display:       'flex',
            alignItems:    'flex-end',
            gap:           0,
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

        {/* Left edge fade — shows once scrolled away from the start */}
        <motion.div
          aria-hidden="true"
          initial={false}
          animate={{ opacity: canScrollLeft ? 1 : 0 }}
          transition={{ duration: 0.25 }}
          style={{
            position:      'absolute',
            top:           0,
            bottom:        1,
            left:          0,
            width:         36,
            pointerEvents: 'none',
            background:    'linear-gradient(to left, rgba(5,5,5,0), #050505 78%)',
          }}
        />

        {/* Right edge fade + nudging chevron — signals more tabs off-screen */}
        <motion.div
          aria-hidden="true"
          initial={false}
          animate={{ opacity: canScrollRight ? 1 : 0 }}
          transition={{ duration: 0.25 }}
          style={{
            position:       'absolute',
            top:            0,
            bottom:         1,
            right:          0,
            width:          54,
            display:        'flex',
            alignItems:     'center',
            justifyContent: 'flex-end',
            paddingBottom:  8,
            pointerEvents:  'none',
            background:     'linear-gradient(to right, rgba(5,5,5,0), #050505 62%)',
          }}
        >
          <motion.span
            animate={{ x: [0, 5, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            style={{
              color:      'var(--accent)',
              fontSize:   '1.35rem',
              lineHeight: 1,
              fontFamily: 'system-ui, sans-serif',
            }}
          >
            ›
          </motion.span>
        </motion.div>
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
