'use client';

import { useState } from 'react';
import { motion } from 'motion/react';

// Short descriptors for each Applied AI concept
const DESCRIPTORS = {
  langchain:  'Building LLM application chains',
  langgraph:  'Stateful multi-agent workflows',
  rag:        'Retrieval-Augmented Generation',
  vectoremb:  'Semantic search & similarity',
  llmint:     'GPT · Claude · Gemini integration',
  aiorch:     'End-to-end AI pipeline design',
};

function AppliedAIItem({ skill, index, hasEntered }) {
  const [hovered, setHovered] = useState(false);
  const descriptor = DESCRIPTORS[skill.id] ?? '';

  return (
    <motion.div
      initial={{ opacity: 0, x: -24 }}
      animate={hasEntered ? { opacity: 1, x: 0 } : { opacity: 0, x: -24 }}
      transition={{
        delay:    index * 0.08,
        duration: 0.55,
        ease:     [0.22, 1, 0.36, 1],
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ cursor: 'default' }}
    >
      {/* Divider — no divider before first item */}
      {index > 0 && (
        <div style={{
          height:     '1px',
          background: 'rgba(255,255,255,0.06)',
          margin:     '0',
        }} />
      )}

      <div style={{
        display:        'flex',
        alignItems:     'baseline',
        justifyContent: 'space-between',
        gap:            '24px',
        padding:        'clamp(9px, 1.5vh, 15px) 0',
      }}>
        {/* Index counter */}
        <span style={{
          fontSize:      '0.7rem',
          fontWeight:    500,
          fontFamily:    "'Space Grotesk', sans-serif",
          color:         hovered
            ? 'var(--accent)'
            : 'rgba(245,243,240,0.2)',
          transition:    'color 0.22s ease',
          letterSpacing: '0.08em',
          flexShrink:    0,
          minWidth:      '28px',
        }}>
          {String(index + 1).padStart(2, '0')}
        </span>

        {/* Concept name — large, light weight */}
        <span
          className="font-bricolage"
          style={{
            flex:          1,
            fontSize:      'clamp(1.4rem, 2.2vw, 2.1rem)',
            fontWeight:    300,
            letterSpacing: '-0.02em',
            lineHeight:    1,
            color:         hovered
              ? 'var(--accent)'
              : 'rgba(245,243,240,0.88)',
            transition:    'color 0.22s ease',
          }}
        >
          {skill.name}
        </span>

        {/* Descriptor — right-aligned, italic, very muted */}
        <span
          className="font-cormorant"
          style={{
            fontSize:      'clamp(0.85rem, 1.1vw, 1.05rem)',
            color:         hovered
              ? 'rgba(245,243,240,0.45)'
              : 'rgba(245,243,240,0.22)',
            transition:    'color 0.22s ease',
            flexShrink:    0,
            textAlign:     'right',
            maxWidth:      '240px',
          }}
        >
          {descriptor}
        </span>
      </div>
    </motion.div>
  );
}

export default function AppliedAIList({ skills, hasEntered }) {
  return (
    <div style={{ width: '100%' }}>
      {skills.map((skill, i) => (
        <AppliedAIItem
          key={skill.id}
          skill={skill}
          index={i}
          hasEntered={hasEntered}
        />
      ))}
    </div>
  );
}
