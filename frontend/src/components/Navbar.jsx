"use client";

import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';

const NAV_LINKS = [
  { label: 'About',           href: '#about'           },
  { label: 'Skills',          href: '#skills'          },
  { label: 'Projects',        href: '#projects'        },
  { label: 'Work Experience', href: '#work-experience' },
  { label: 'Achievements',    href: '#achievements'    },
];

// ── Individual nav link — color-only hover ────────────────────────────────
const NavLink = ({ label, href, index }) => {
  const [hovered, setHovered] = useState(false);

  const handleClick = (e) => {
    e.preventDefault();
    const id = href.replace('#', '');
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
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
        display: 'inline-flex',
        alignItems: 'center',
        padding: '0.3rem 0.75rem',
        fontSize: '0.72rem',
        letterSpacing: '0.13em',
        textTransform: 'uppercase',
        /* Pure CSS transition — completely independent of the entry animation */
        color: hovered ? '#C4B5FD' : 'var(--text-muted)',
        transition: 'color 0.2s ease',
        textDecoration: 'none',
        cursor: 'pointer',
        whiteSpace: 'nowrap',
      }}
    >
      {label}
    </motion.a>
  );
};

// ── Magnetic "Let's Connect" CTA ───────────────────────────────────────────
const ConnectButton = () => {
  const ref = useRef(null);
  const x  = useMotionValue(0);
  const y  = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 300, damping: 20 });
  const sy = useSpring(y, { stiffness: 300, damping: 20 });
  const [hovered, setHovered] = useState(false);

  const onMove = (e) => {
    if (!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width  / 2)) * 0.28);
    y.set((e.clientY - (r.top  + r.height / 2)) * 0.28);
  };

  const handleClick = (e) => {
    e.preventDefault();
    const el = document.getElementById('contact');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
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
          backgroundColor: hovered ? 'rgba(168,155,242,1)' : 'rgba(168,155,242,0.06)',
          color: hovered ? '#050505' : 'var(--accent)',
        }}
        transition={{ duration: 0.22 }}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '6px',
          padding: '0.45rem 1.1rem',
          borderRadius: '8px',
          border: '1px solid rgba(168,155,242,0.45)',
          fontSize: '0.72rem',
          letterSpacing: '0.13em',
          textTransform: 'uppercase',
          textDecoration: 'none',
          cursor: 'pointer',
          fontWeight: 500,
          whiteSpace: 'nowrap',
        }}
      >
        Let&apos;s Connect
        <motion.span
          animate={{ x: hovered ? 3 : 0, opacity: hovered ? 1 : 0.55 }}
          transition={{ duration: 0.18 }}
          style={{ display: 'inline-block' }}
        >
          →
        </motion.span>
      </motion.a>
    </motion.div>
  );
};

// ── Main Navbar ────────────────────────────────────────────────────────────
export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll(); // check immediately on mount
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleLogoClick = (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    /*
     * Outer shell: plain div owns position:fixed + translateX(-50%) centering.
     * This div is NEVER animated by Framer Motion, so the centering transform
     * is never clobbered. The inner motion.nav only animates opacity & translateY.
     */
    <div
      style={{
        position: 'fixed',
        top: '1rem',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 100,
        width: 'min(92vw, 960px)',
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

          /* Glassmorphism */
          background: 'rgba(8, 8, 10, 0.62)',
          backdropFilter: 'blur(20px) saturate(160%)',
          WebkitBackdropFilter: 'blur(20px) saturate(160%)',
          border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: '16px',
          boxShadow:
            '0 8px 40px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.07)',

          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0.5rem 1rem 0.5rem 1.25rem',
          gap: '1rem',
        }}
      >
        {/* ── Logo ── */}
        <motion.a
          href="/"
          onClick={handleLogoClick}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          transition={{ duration: 0.18 }}
          style={{
            display: 'inline-flex',
            alignItems: 'baseline',
            gap: '1px',
            textDecoration: 'none',
            cursor: 'pointer',
            flexShrink: 0,
            /* Generously padded invisible hit area */
            padding: '0.5rem 0.75rem',
            margin: '-0.5rem -0.75rem',
            borderRadius: '10px',
          }}
        >
          <span
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: '1rem',
              fontWeight: 700,
              letterSpacing: '-0.02em',
              color: 'var(--text)',
              lineHeight: 1,
            }}
          >
            Rayala
          </span>
          <span
            style={{
              fontSize: '1.15rem',
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
            <NavLink key={link.href} label={link.label} href={link.href} index={i} />
          ))}
        </nav>

        {/* ── Right CTA ── */}
        <ConnectButton />
      </motion.nav>
    </div>
  );
}
