'use client';

import { useState } from 'react';
import { motion } from 'motion/react';

const CARD_CSS = `
  @media (pointer: coarse) {
    .project-link  { cursor: pointer !important; }
    .project-arrow { opacity: 1 !important; transform: scale(1) !important; }
  }
`;

export default function ProjectCard({ project, index, hasEntered }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 52 }}
      animate={hasEntered ? { opacity: 1, y: 0 } : { opacity: 0, y: 52 }}
      transition={{
        delay: 0.08 + index * 0.16,
        duration: 0.76,
        ease: [0.22, 1, 0.36, 1],
      }}
      style={{ display: 'flex', flexDirection: 'column' }}
    >
      <style>{CARD_CSS}</style>
      {/* ── Card ──
          Aspect ratio 2/1 matches the screenshot dimensions (1536×784 ≈ 2:1).
          This lets the screenshot fill the inner frame with equal margins
          on all four sides and minimal cropping. */}
      <a
        href={project.liveUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="project-link"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        aria-label={`Open ${project.name}`}
        style={{
          display: 'block',
          position: 'relative',
          overflow: 'hidden',
          borderRadius: 20,
          aspectRatio: '16 / 9',
          textDecoration: 'none',
          cursor: 'none',
        }}
      >
        {/* Card background image — static, never moves */}
        <img
          src={project.cardBg}
          alt=""
          aria-hidden
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center',
            pointerEvents: 'none',
            userSelect: 'none',
          }}
        />

        {/* ── Screenshot wrapper
            Equal 5% margin on all four sides so the card background
            forms a uniform frame. Only this element scales on hover. ── */}
        <div
          style={{
            position: 'absolute',
            top: '12%',
            left: '8%',
            right: '8%',
            bottom: '12%',
            borderRadius: 5,
            overflow: 'hidden',
            transform: hovered ? 'scale(1.05)' : 'scale(1)',
            transformOrigin: 'center center',
            /* Slow delayed enter (premium feel) — fast exit (responsive feel) */
            transition: hovered
              ? 'transform 1.6s cubic-bezier(0.16, 1, 0.3, 1) 100ms, box-shadow 0.9s ease 100ms'
              : 'transform 0.85s cubic-bezier(0.4, 0, 0.2, 1) 0ms, box-shadow 0.5s ease 0ms',
            willChange: 'transform',
            boxShadow: hovered
              ? '0 20px 60px rgba(0,0,0,0.55), 0 0 0 1px rgba(255,255,255,0.07)'
              : '0 8px 32px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.04)',
          }}
        >
          {/* Natural rendering — no objectFit so nothing is cropped.
              Both screenshots are 1536×~780 (≈2:1). The 16/9 card
              with 10% top/bottom insets gives a wrapper ratio of ~1.78:1
              which matches the image ratio, so the image fills the
              wrapper width exactly with only a few px of bottom gap. */}
          <img
            src={project.screenshot}
            alt={`${project.name} preview`}
            style={{
              width: '100%',
              height: 'auto',
              display: 'block',
            }}
          />
        </div>

        {/* Arrow indicator — fades in on hover; always visible on touch via .project-arrow CSS */}
        <div
          className="project-arrow"
          style={{
            position: 'absolute',
            bottom: 16,
            right: 16,
            width: 36,
            height: 36,
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.14)',
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
            border: '1px solid rgba(255,255,255,0.22)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            opacity: hovered ? 1 : 0.5,
            transform: hovered ? 'scale(1)' : 'scale(0.82)',
            transition: 'opacity 0.3s ease, transform 0.35s cubic-bezier(0.22, 1, 0.36, 1)',
            pointerEvents: 'none',
            zIndex: 10,
          }}
        >
          <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
            <path
              d="M2 11L11 2M11 2H4.5M11 2V8.5"
              stroke="white"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </a>

      {/* ── Card footer ── */}
      <div style={{ marginTop: 18 }}>
        <h3
          style={{
            fontSize: 'clamp(1.7rem, 2.8vw, 2.4rem)',
            fontWeight: 700,
            fontFamily: "'Bricolage Grotesque', sans-serif",
            letterSpacing: '-0.03em',
            color: 'var(--text-primary)',
            margin: '0 0 4px',
            lineHeight: 1.1,
          }}
        >
          {project.name}
        </h3>
        <p
          style={{
            fontSize: 'clamp(0.875rem, 1vw, 1rem)',
            color: 'var(--text-primary)',
            fontFamily: 'Inter, sans-serif',
            fontWeight: 300,
            margin: 0,
          }}
        >
          {project.tagline}
        </p>
      </div>
    </motion.div>
  );
}
