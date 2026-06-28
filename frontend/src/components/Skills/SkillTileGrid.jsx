'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { LOGO_MAP } from './SkillLogos';

// ── Helpers ───────────────────────────────────────────────────────────────────

function hexToRgb(hex = '#A89BF2') {
  const h = hex.replace('#', '');
  const r = parseInt(h.slice(0, 2), 16);
  const g = parseInt(h.slice(2, 4), 16);
  const b = parseInt(h.slice(4, 6), 16);
  return `${r},${g},${b}`;
}

// ── SkillTile ─────────────────────────────────────────────────────────────────

function SkillTile({ skill }) {
  const [hovered, setHovered] = useState(false);
  const Logo = LOGO_MAP[skill.id];
  const rgb  = hexToRgb(skill.color ?? '#A89BF2');

  return (
    <motion.div
      variants={{
        hidden:   { opacity: 0, y: 18, scale: 0.93 },
        visible:  { opacity: 1, y: 0,  scale: 1,
                    transition: { duration: 0.42, ease: [0.16, 1, 0.3, 1] } },
      }}
      whileHover={{ y: -7, transition: { type: 'spring', stiffness: 360, damping: 24 } }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display:        'flex',
        flexDirection:  'column',
        alignItems:     'center',
        gap:            '14px',
        padding:        '28px 16px 20px',
        borderRadius:   '14px',
        background:     hovered
          ? `rgba(${rgb},0.07)`
          : 'rgba(255,255,255,0.035)',
        border: `1px solid ${hovered
          ? `rgba(${rgb},0.4)`
          : 'rgba(255,255,255,0.08)'}`,
        boxShadow: hovered
          ? `0 16px 40px rgba(0,0,0,0.36), 0 0 0 1px rgba(${rgb},0.12) inset`
          : '0 2px 8px rgba(0,0,0,0.22)',
        transition: 'background 0.25s ease, border 0.25s ease, box-shadow 0.28s ease',
        cursor:   'default',
        userSelect: 'none',
      }}
    >
      {/* Logo — desaturated at rest, full color on hover */}
      <div style={{
        width:        64,
        height:       64,
        borderRadius: 10,
        overflow:     'hidden',
        display:      'flex',
        alignItems:   'center',
        justifyContent: 'center',
        filter:       hovered ? 'none' : 'saturate(0.6) brightness(0.8)',
        transition:   'filter 0.28s ease',
        flexShrink:   0,
      }}>
        {Logo
          ? <Logo size={64} />
          : <div style={{ width: 64, height: 64, background: 'rgba(255,255,255,0.1)', borderRadius: 8 }} />
        }
      </div>

      {/* Skill name */}
      <span style={{
        fontSize:      '0.62rem',
        fontWeight:    600,
        letterSpacing: '0.1em',
        textTransform: 'uppercase',
        fontFamily:    "'Space Grotesk', sans-serif",
        color: hovered
          ? 'rgba(245,243,240,0.92)'
          : 'rgba(245,243,240,0.38)',
        transition:    'color 0.22s ease',
        textAlign:     'center',
        lineHeight:    1.3,
      }}>
        {skill.name}
      </span>
    </motion.div>
  );
}

// ── SkillTileGrid ─────────────────────────────────────────────────────────────

export default function SkillTileGrid({ skills, category, hasEntered }) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={category}
        initial="hidden"
        animate={hasEntered ? 'visible' : 'hidden'}
        exit={{ opacity: 0, transition: { duration: 0.14 } }}
        variants={{
          hidden:  {},
          visible: { transition: { staggerChildren: 0.055 } },
        }}
        style={{
          display:             'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(128px, 1fr))',
          gap:                 '14px',
          padding:             '6px 0',
        }}
      >
        {skills.map((skill) => (
          <SkillTile key={skill.id} skill={skill} />
        ))}
      </motion.div>
    </AnimatePresence>
  );
}
