"use client";

import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';
import { getLenisInstance } from '@/lib/lenis-instance';

const NAV_LINKS = [
  { label: 'About',           href: '#about'           },
  { label: 'Skills',          href: '#skills'          },
  { label: 'Projects',        href: '#projects'        },
  { label: 'Work Experience', href: '#work-experience' },
  { label: 'Achievements',    href: '#achievements'    },
];

// ── Individual nav link ───────────────────────────────────────────────────────
const NavLink = ({ label, href, index, isActive }) => {
  const [hovered, setHovered] = useState(false);

  const handleClick = (e) => {
    e.preventDefault();
    const el = document.getElementById(href.replace('#', ''));
    if (!el) return;
    const lenis = getLenisInstance();
    lenis ? lenis.scrollTo(el) : el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <motion.a
      href={href}
      onClick={handleClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      initial={{ opacity: 0, y: -6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1], delay: 0.05 + index * 0.06 }}
      style={{
        position: 'relative',
        display: 'inline-flex',
        alignItems: 'center',
        padding: '0.3rem 0.75rem',
        fontSize: '0.68rem',
        letterSpacing: '0.13em',
        textTransform: 'uppercase',
        color: hovered ? '#C4B5FD' : isActive ? 'var(--text-primary)' : 'var(--text-muted)',
        transition: 'color 0.2s ease',
        textDecoration: 'none',
        cursor: 'pointer',
        whiteSpace: 'nowrap',
      }}
    >
      {label}

      {/* Slide-in underline on hover */}
      <motion.span
        aria-hidden="true"
        style={{
          position: 'absolute',
          bottom: '2px',
          left: '0.75rem',
          right: '0.75rem',
          height: '1px',
          backgroundColor: 'var(--accent)',
          transformOrigin: 'left center',
        }}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: hovered ? 1 : 0 }}
        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
      />

      {/* Active section dot */}
      {isActive && (
        <motion.span
          layoutId="nav-active-dot"
          aria-hidden="true"
          style={{
            display: 'inline-block',
            width: '3px',
            height: '3px',
            borderRadius: '50%',
            backgroundColor: 'var(--accent)',
            marginLeft: '5px',
            flexShrink: 0,
          }}
          transition={{ type: 'spring', stiffness: 380, damping: 30 }}
        />
      )}
    </motion.a>
  );
};

// ── CONTACT CTA — sharp edges, left-to-right lavender wipe on hover ───────────
const ContactButton = () => {
  const ref = useRef(null);
  const x   = useMotionValue(0);
  const y   = useMotionValue(0);
  const sx  = useSpring(x, { stiffness: 300, damping: 20 });
  const sy  = useSpring(y, { stiffness: 300, damping: 20 });
  const [hovered, setHovered] = useState(false);

  const onMove = (e) => {
    if (!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width  / 2)) * 0.15);
    y.set((e.clientY - (r.top  + r.height / 2)) * 0.15);
  };

  const handleClick = (e) => {
    e.preventDefault();
    const el = document.getElementById('contact');
    if (!el) return;
    const lenis = getLenisInstance();
    lenis ? lenis.scrollTo(el) : el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <motion.div
      ref={ref}
      style={{ x: sx, y: sy, display: 'inline-flex', flexShrink: 0 }}
      onMouseMove={onMove}
      onMouseLeave={() => { x.set(0); y.set(0); setHovered(false); }}
      onMouseEnter={() => setHovered(true)}
    >
      <motion.a
        href="#contact"
        onClick={handleClick}
        animate={{
          borderColor: hovered ? 'rgba(168,155,242,0.9)' : 'rgba(168,155,242,0)',
        }}
        transition={{ duration: 0.25 }}
        style={{
          position: 'relative',
          overflow: 'hidden',
          display: 'inline-flex',
          alignItems: 'center',
          gap: '7px',
          padding: '0.5rem 1.25rem',
          borderRadius: 0, // sharp edges
          border: '1px solid rgba(168,155,242,0)',
          fontSize: '0.68rem',
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
          textDecoration: 'none',
          cursor: 'pointer',
          fontWeight: 600,
          whiteSpace: 'nowrap',
          color: hovered ? '#050505' : 'var(--accent)',
          transition: 'color 0.28s ease',
        }}
      >
        {/* Left-to-right lavender wipe */}
        <motion.span
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            backgroundColor: '#A89BF2',
            transformOrigin: 'left center',
          }}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: hovered ? 1 : 0 }}
          transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
        />

        <span style={{ position: 'relative', zIndex: 1 }}>CONTACT</span>
      </motion.a>
    </motion.div>
  );
};

// ── Main Navbar ────────────────────────────────────────────────────────────
export default function Navbar() {
  const [scrolled,   setScrolled]   = useState(false);
  const [activeHref, setActiveHref] = useState('');

  // Appear after user scrolls past 50% of the hero section height
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > window.innerHeight * 0.5);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Track which section is currently in view
  useEffect(() => {
    const sections = NAV_LINKS
      .map(l => document.getElementById(l.href.replace('#', '')))
      .filter(Boolean);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) setActiveHref('#' + entry.target.id);
        });
      },
      { threshold: 0.1 }
    );

    sections.forEach(s => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  const handleLogoClick = (e) => {
    e.preventDefault();
    const lenis = getLenisInstance();
    lenis ? lenis.scrollTo(0) : window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div
      style={{
        position: 'fixed',
        top: '1rem',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 100,
        width: 'min(92vw, 1020px)',
        pointerEvents: scrolled ? 'auto' : 'none',
      }}
    >
      <motion.nav
        aria-label="Main navigation"
        initial={{ opacity: 0, y: -16 }}
        animate={{
          opacity: scrolled ? 1 : 0,
          y: scrolled ? 0 : -16,
        }}
        transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
        style={{
          width: '100%',

          /* Refined glass — slightly more opaque for legibility, lavender-tinted glow */
          background: 'rgba(6, 6, 8, 0.70)',
          backdropFilter: 'blur(24px) saturate(180%)',
          WebkitBackdropFilter: 'blur(24px) saturate(180%)',
          border: '1px solid rgba(255,255,255,0.09)',
          borderRadius: 0, // sharp edges
          boxShadow: [
            '0 8px 48px rgba(0,0,0,0.55)',
            'inset 0 1px 0 rgba(255,255,255,0.08)',
            '0 0 0 1px rgba(168,155,242,0.04)',
          ].join(', '),

          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0.55rem 1rem 0.55rem 1.4rem',
          gap: '1rem',
        }}
      >
        {/* ── Logo ── */}
        <motion.a
          href="/"
          onClick={handleLogoClick}
          whileHover={{ opacity: 0.8 }}
          transition={{ duration: 0.18 }}
          style={{
            display: 'inline-flex',
            alignItems: 'baseline',
            gap: 0,
            textDecoration: 'none',
            cursor: 'pointer',
            flexShrink: 0,
            padding: '0.4rem 0.6rem',
            margin: '-0.4rem -0.6rem',
          }}
        >
          <span
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: '0.82rem',
              fontWeight: 700,
              letterSpacing: '-0.01em',
              color: 'var(--text-primary)',
              lineHeight: 1,
            }}
          >
            Rayala&apos;s Portfolio
          </span>
          <span
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: '1rem',
              fontWeight: 900,
              color: 'var(--accent)',
              lineHeight: 1,
            }}
          >
            .
          </span>
        </motion.a>

        {/* ── Center nav links ── */}
        <nav
          aria-label="Site sections"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.1rem',
            flex: 1,
            justifyContent: 'center',
          }}
        >
          {NAV_LINKS.map((link, i) => (
            <NavLink
              key={link.href}
              label={link.label}
              href={link.href}
              index={i}
              isActive={activeHref === link.href}
            />
          ))}
        </nav>

        {/* ── Right CTA ── */}
        <ContactButton />
      </motion.nav>
    </div>
  );
}
