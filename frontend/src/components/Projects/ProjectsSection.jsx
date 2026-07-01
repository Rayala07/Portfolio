'use client';

import { useRef } from 'react';
import { useInView, motion } from 'motion/react';
import { PROJECTS, SECTION } from './projectData';
import ProjectCard from './ProjectCard';

export default function ProjectsSection() {
  const sectionRef = useRef(null);
  const hasEntered = useInView(sectionRef, { once: true, amount: 0.1 });

  return (
    <section
      id="projects"
      ref={sectionRef}
      style={{
        padding: 'clamp(5rem, 10vh, 8rem) clamp(1.5rem, 5vw, 4rem)',
        position: 'relative',
        maxWidth: 1280,
        margin: '0 auto',
        width: '100%',
        boxSizing: 'border-box',
      }}
    >
      {/* ── Header: heading left, View All Work right ── */}
      <div
        style={{
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
          marginBottom: 'clamp(2.5rem, 5vh, 4rem)',
          gap: '2rem',
        }}
      >
        {/* LEFT — "Featured\nProjects" */}
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          animate={hasEntered ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1] }}
          style={{
            fontSize: 'clamp(3rem, 6.5vw, 6.5rem)',
            fontWeight: 800,
            fontFamily: "'Bricolage Grotesque', sans-serif",
            letterSpacing: '-0.04em',
            lineHeight: 0.9,
            margin: 0,
          }}
        >
          {/* "Featured" in accent purple */}
          <span style={{ color: 'var(--accent)', display: 'block' }}>Featured</span>
          {/* "Projects" in white */}
          <span style={{ color: 'var(--text-primary)', display: 'block' }}>Projects</span>
        </motion.h2>

        {/* RIGHT — "View All Work ↗" bottom-aligned */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={hasEntered ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          transition={{ duration: 0.55, delay: 0.14, ease: [0.22, 1, 0.36, 1] }}
          style={{ flexShrink: 0 }}
        >
          <a
            href={SECTION.viewAllUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 10,
              textDecoration: 'none',
            }}
          >
            <span
              style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: 'clamp(0.82rem, 1.05vw, 1rem)',
                fontWeight: 500,
                color: 'var(--text-primary)',
                letterSpacing: '-0.01em',
              }}
            >
              View All Work
            </span>
            {/* Square arrow button matching reference */}
            <ViewAllArrow />
          </a>
        </motion.div>
      </div>

      {/* ── Project card grid ── */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: 'clamp(1.2rem, 2.5vw, 2rem)',
          alignItems: 'start',
        }}
      >
        {PROJECTS.map((project, i) => (
          <ProjectCard
            key={project.id}
            project={project}
            index={i}
            hasEntered={hasEntered}
          />
        ))}
      </div>

      <style>{`
        @media (max-width: 640px) {
          #projects > div:last-of-type {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}

function ViewAllArrow() {
  return (
    <div
      style={{
        width: 34,
        height: 34,
        borderRadius: 8,
        border: '1px solid rgba(255,255,255,0.18)',
        background: 'rgba(255,255,255,0.04)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'background 0.2s ease, border-color 0.2s ease',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.35)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = 'rgba(255,255,255,0.04)';
        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.18)';
      }}
    >
      <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
        <path
          d="M2 11L11 2M11 2H4.5M11 2V8.5"
          stroke="white"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}
