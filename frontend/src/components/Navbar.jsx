"use client";

import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, AnimatePresence } from 'motion/react';
import { getLenisInstance } from '@/lib/lenis-instance';

const NAV_LINKS = [
  { label: 'About',           href: '#about'           },
  { label: 'Skills',          href: '#skills'          },
  { label: 'Projects',        href: '#projects'        },
  { label: 'Work Experience', href: '#work-experience' },
  { label: 'Achievements',    href: '#achievements'    },
];

const ALL_MOBILE_LINKS = [...NAV_LINKS, { label: 'Contact', href: '#contact' }];

const NAV_CSS = `
  .nb-links    { display: flex;         }
  .nb-cta      { display: inline-flex;  }
  .nb-hamburger{ display: none;         }

  @media (max-width: 767px) {
    .nb-links     { display: none  !important; }
    .nb-cta       { display: none  !important; }
    .nb-hamburger { display: flex  !important; }
  }
`;

// ── Hamburger → X morph (animated bars, no SVG swap) ─────────────────────────
const HamburgerIcon = ({ open }) => (
  <div
    aria-hidden="true"
    style={{
      width: 22, height: 12, position: 'relative',
      display: 'flex', flexDirection: 'column',
      justifyContent: 'space-between',
    }}
  >
    {/* Top bar: rotates 45° and translates to centre */}
    <motion.span
      style={{ display: 'block', height: '1.5px', background: 'currentColor', borderRadius: 2, transformOrigin: 'center' }}
      animate={{ rotate: open ? 45 : 0, y: open ? 5.25 : 0 }}
      transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
    />
    {/* Middle bar: fades + collapses */}
    <motion.span
      style={{ display: 'block', height: '1.5px', background: 'currentColor', borderRadius: 2 }}
      animate={{ opacity: open ? 0 : 1, scaleX: open ? 0.3 : 1 }}
      transition={{ duration: 0.2, ease: 'easeInOut' }}
    />
    {/* Bottom bar: rotates -45° and translates to centre */}
    <motion.span
      style={{ display: 'block', height: '1.5px', background: 'currentColor', borderRadius: 2, transformOrigin: 'center' }}
      animate={{ rotate: open ? -45 : 0, y: open ? -5.25 : 0 }}
      transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
    />
  </div>
);

// ── Desktop nav link ───────────────────────────────────────────────────────────
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
        position: 'relative', display: 'inline-flex', alignItems: 'center',
        minHeight: 44, padding: '0 0.75rem',
        fontSize: '0.68rem', letterSpacing: '0.13em', textTransform: 'uppercase',
        color: hovered ? '#C4B5FD' : isActive ? 'var(--text-primary)' : 'var(--text-muted)',
        transition: 'color 0.2s ease', textDecoration: 'none',
        cursor: 'pointer', whiteSpace: 'nowrap',
      }}
    >
      {label}
      <motion.span
        aria-hidden="true"
        style={{
          position: 'absolute', bottom: '10px', left: '0.75rem', right: '0.75rem',
          height: '1px', backgroundColor: 'var(--accent)', transformOrigin: 'left center',
        }}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: hovered ? 1 : 0 }}
        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
      />
      {isActive && (
        <motion.span
          layoutId="nav-active-dot"
          aria-hidden="true"
          style={{
            display: 'inline-block', width: 3, height: 3, borderRadius: '50%',
            backgroundColor: 'var(--accent)', marginLeft: 5, flexShrink: 0,
          }}
          transition={{ type: 'spring', stiffness: 380, damping: 30 }}
        />
      )}
    </motion.a>
  );
};

// ── Mobile nav link — driven by stagger parent variants ───────────────────────
const MobileNavLink = ({ label, href, isActive, onClose }) => {
  const handleClick = (e) => {
    e.preventDefault();
    onClose();
    setTimeout(() => {
      const el = document.getElementById(href.replace('#', ''));
      if (!el) return;
      const lenis = getLenisInstance();
      lenis ? lenis.scrollTo(el) : el.scrollIntoView({ behavior: 'smooth' });
    }, 320);
  };

  return (
    <motion.a
      href={href}
      onClick={handleClick}
      variants={{
        closed: { opacity: 0, x: -28 },
        open:   { opacity: 1, x: 0, transition: { duration: 0.42, ease: [0.22, 1, 0.36, 1] } },
      }}
      style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        borderBottom: '1px solid rgba(255,255,255,0.07)',
        fontSize: '1.35rem', fontWeight: isActive ? 600 : 400,
        fontFamily: "'Bricolage Grotesque', sans-serif",
        letterSpacing: '-0.025em',
        color: isActive ? 'var(--accent)' : 'rgba(245,243,240,0.82)',
        textDecoration: 'none', minHeight: 64, cursor: 'pointer',
      }}
    >
      {label}
      {isActive && (
        <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--accent)', flexShrink: 0 }} />
      )}
    </motion.a>
  );
};

// ── Desktop contact CTA ────────────────────────────────────────────────────────
const ContactButton = ({ isActive }) => {
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
        animate={{ borderColor: hovered ? 'rgba(168,155,242,0.9)' : 'rgba(168,155,242,0)' }}
        transition={{ duration: 0.25 }}
        style={{
          position: 'relative', overflow: 'hidden',
          display: 'inline-flex', alignItems: 'center', gap: '7px',
          minHeight: 44, padding: '0 1.25rem',
          borderRadius: 0, border: '1px solid rgba(168,155,242,0)',
          fontSize: '0.68rem', letterSpacing: '0.18em',
          textTransform: 'uppercase', textDecoration: 'none',
          cursor: 'pointer', fontWeight: 600, whiteSpace: 'nowrap',
          color: hovered ? '#050505' : 'var(--accent)', transition: 'color 0.28s ease',
        }}
      >
        <motion.span
          aria-hidden="true"
          style={{ position: 'absolute', inset: 0, backgroundColor: '#A89BF2', transformOrigin: 'left center' }}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: hovered ? 1 : 0 }}
          transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
        />
        <span style={{ position: 'relative', zIndex: 1 }}>CONTACT</span>
        <motion.span
          aria-hidden="true"
          style={{
            position: 'absolute', bottom: '2px', left: '1.25rem', right: '1.25rem',
            height: '1px', backgroundColor: 'var(--accent)', transformOrigin: 'left center', zIndex: 2,
          }}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: (isActive && !hovered) ? 1 : 0 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
        />
      </motion.a>
    </motion.div>
  );
};

// ── Main Navbar ────────────────────────────────────────────────────────────────
export default function Navbar() {
  const [scrolled,   setScrolled]   = useState(false);
  const [activeHref, setActiveHref] = useState('');
  const [menuOpen,   setMenuOpen]   = useState(false);
  const [isMobile,   setIsMobile]   = useState(false);

  // Detect touch/mobile — drives always-visible navbar on small screens
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 767);
    check();
    window.addEventListener('resize', check, { passive: true });
    return () => window.removeEventListener('resize', check);
  }, []);

  // Lock body scroll while menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  // Track scrolled state (desktop fade-in trigger)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > window.innerHeight * 0.5);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close menu when user scrolls
  useEffect(() => {
    if (!menuOpen) return;
    const onScroll = () => setMenuOpen(false);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [menuOpen]);

  // Track active section via IntersectionObserver
  useEffect(() => {
    const allHrefs = [...NAV_LINKS.map(l => l.href), '#contact'];
    const sections = allHrefs
      .map(h => document.getElementById(h.replace('#', '')))
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
    setMenuOpen(false);
    const lenis = getLenisInstance();
    lenis ? lenis.scrollTo(0) : window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // On mobile, navbar is always visible; on desktop only after scrolling past hero
  const navVisible = scrolled || isMobile;

  return (
    <>
      <style>{NAV_CSS}</style>

      {/* ── Mobile full-screen overlay — slides from top ── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ y: '-100%' }}
            animate={{ y: '0%' }}
            exit={{ y: '-100%', transition: { duration: 0.3, ease: [0.4, 0, 1, 1] } }}
            transition={{ duration: 0.48, ease: [0.22, 1, 0.36, 1] }}
            style={{
              position: 'fixed', inset: 0, zIndex: 98,
              background: 'rgba(5,5,5,0.97)',
              backdropFilter: 'blur(24px)',
              WebkitBackdropFilter: 'blur(24px)',
              display: 'flex', flexDirection: 'column',
              padding: '5.5rem 1.75rem 2.5rem',
              overflowY: 'auto',
            }}
            aria-label="Mobile navigation"
          >
            {/* Staggered nav links */}
            <motion.div
              variants={{
                closed: {},
                open: { transition: { staggerChildren: 0.07, delayChildren: 0.22 } },
              }}
              initial="closed"
              animate="open"
              style={{ flex: 1 }}
            >
              {ALL_MOBILE_LINKS.map(link => (
                <MobileNavLink
                  key={link.href}
                  label={link.label}
                  href={link.href}
                  isActive={activeHref === link.href}
                  onClose={() => setMenuOpen(false)}
                />
              ))}
            </motion.div>

            {/* Subtle footer label */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.4 }}
              style={{
                marginTop: '2rem',
                fontFamily: 'Inter, sans-serif',
                fontSize: '0.68rem',
                letterSpacing: '0.12em',
                color: 'rgba(245,243,240,0.18)',
                textTransform: 'uppercase',
              }}
            >
              Rayala&apos;s Portfolio
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Floating navbar pill ── */}
      <div
        style={{
          position: 'fixed', top: '1rem', left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 100,
          width: 'min(92vw, 1020px)',
          pointerEvents: navVisible ? 'auto' : 'none',
        }}
      >
        <motion.nav
          aria-label="Main navigation"
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: navVisible ? 1 : 0, y: navVisible ? 0 : -16 }}
          transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
          style={{
            width: '100%',
            background: 'rgba(6,6,8,0.70)',
            backdropFilter: 'blur(24px) saturate(180%)',
            WebkitBackdropFilter: 'blur(24px) saturate(180%)',
            border: '1px solid rgba(255,255,255,0.09)',
            borderRadius: 0,
            boxShadow: [
              '0 8px 48px rgba(0,0,0,0.55)',
              'inset 0 1px 0 rgba(255,255,255,0.08)',
              '0 0 0 1px rgba(168,155,242,0.04)',
            ].join(', '),
            display: 'flex', alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 1rem 0 1.4rem', gap: '1rem',
          }}
        >
          {/* Logo */}
          <motion.a
            href="/"
            onClick={handleLogoClick}
            whileHover={{ opacity: 0.8 }}
            whileTap={{ opacity: 0.6 }}
            transition={{ duration: 0.18 }}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 0,
              textDecoration: 'none', cursor: 'pointer', flexShrink: 0,
              minHeight: 44, padding: '0 0.6rem', margin: '0 -0.6rem',
            }}
          >
            <span style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: '0.82rem', fontWeight: 700, letterSpacing: '-0.01em',
              color: 'var(--text-primary)', lineHeight: 1,
            }}>
              Rayala&apos;s Portfolio
            </span>
            <span style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: '1rem', fontWeight: 900,
              color: 'var(--accent)', lineHeight: 1,
            }}>.</span>
          </motion.a>

          {/* Desktop center nav links */}
          <nav
            className="nb-links"
            aria-label="Site sections"
            style={{ alignItems: 'center', gap: '0.1rem', flex: 1, justifyContent: 'center' }}
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

          {/* Desktop contact CTA */}
          <div className="nb-cta">
            <ContactButton isActive={activeHref === '#contact'} />
          </div>

          {/* Hamburger button (CSS reveals on mobile) */}
          <button
            className="nb-hamburger"
            onClick={() => setMenuOpen(prev => !prev)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            style={{
              display: 'none', // overridden by NAV_CSS at ≤767px
              alignItems: 'center', justifyContent: 'center',
              width: 44, height: 44,
              background: 'none', border: 'none',
              cursor: 'pointer', flexShrink: 0,
              color: 'var(--text-primary)', padding: 0,
            }}
          >
            <HamburgerIcon open={menuOpen} />
          </button>
        </motion.nav>
      </div>
    </>
  );
}
