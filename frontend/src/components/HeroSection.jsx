"use client";

import React, { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';

const GithubIcon = () => <i className="hn hn-github text-3xl" />;
const LinkedinIcon = () => <i className="hn hn-linkedin text-3xl" />;

const DotGrid = () => {
  const canvasRef = useRef(null);
  const mouseRef  = useRef({ x: -9999, y: -9999 });
  const velRef    = useRef({ x: 0, y: 0 });
  const dotsRef   = useRef(null);
  const animRef   = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const SPACING   = 30;
    const DOT_R     = 1.1;
    const REPEL_R   = 150;
    const MAX_REPEL = 26;
    // Spring constants — these together produce the slime feel:
    // low stiffness = lazy acceleration (lag), high friction = viscous damping (no wild oscillation)
    const STIFFNESS = 0.08;
    const FRICTION  = 0.88;
    // Soft-floor for repulsion direction: prevents flicker when cursor sits directly on a dot
    const MIN_DIST  = 6;

    const init = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width  = canvas.offsetWidth  * dpr;
      canvas.height = canvas.offsetHeight * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const W    = canvas.offsetWidth;
      const H    = canvas.offsetHeight;
      const cols = Math.ceil(W / SPACING) + 2;
      const rows = Math.ceil(H / SPACING) + 2;
      dotsRef.current = Array.from({ length: rows }, (_, r) =>
        Array.from({ length: cols }, (_, c) => ({
          ox: 0, oy: 0,
          vx: 0, vy: 0,   // spring velocity — carries momentum between frames
          phase:    (r * 0.28 + c * 0.19) + Math.random() * 0.4,
          freqMult: 0.50 + Math.random() * 0.30,
          ampR:     0.14 + Math.random() * 0.08,
          ampA:     0.035 + Math.random() * 0.020,
        }))
      );
    };

    const draw = (ts) => {
      animRef.current = requestAnimationFrame(draw);
      const grid = dotsRef.current;
      if (!grid) return;

      const t    = ts * 0.001;
      const W    = canvas.offsetWidth;
      const H    = canvas.offsetHeight;
      ctx.clearRect(0, 0, W, H);

      const mx     = mouseRef.current.x;
      const my     = mouseRef.current.y;
      const active = mx > -9000;
      const rows   = grid.length;
      const cols   = grid[0].length;

      // Center the grid so it sits symmetrically within the viewport
      const startX = (W - (cols - 1) * SPACING) / 2;
      const startY = (H - (rows - 1) * SPACING) / 2;

      const speed    = Math.sqrt(velRef.current.x ** 2 + velRef.current.y ** 2);
      const dynForce = MAX_REPEL * (1 + Math.min(speed * 0.025, 0.40));

      const displaced = [];

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const d  = grid[r][c];
          const bx = startX + c * SPACING;
          const by = startY + r * SPACING;
          let tx = 0, ty = 0;

          if (active) {
            const dx   = bx - mx;
            const dy   = by - my;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < REPEL_R) {
              const norm = 1 - dist / REPEL_R;
              // Smoothstep S-curve: smooth from 0 at edge to 1 at center.
              // Continuous derivative (no hard cliff) → clean, even circular push.
              const s    = norm * norm * (3 - 2 * norm) * dynForce;
              // effD adds MIN_DIST in quadrature: keeps direction stable even when
              // cursor is nearly on top of a dot (prevents random scatter)
              const effD = Math.sqrt(dx * dx + dy * dy + MIN_DIST * MIN_DIST);
              tx = (dx / effD) * s;
              ty = (dy / effD) * s;
            }
          }

          // Spring integration: vx accumulates force, FRICTION drains it each frame.
          // Dots have momentum → they lag, overshoot slightly, and trail — the slime feel.
          // Moving cursor fast: leading dots pushed hard, trailing dots still carry outward
          // velocity after cursor passes → elongated "slime smear" in direction of travel.
          d.vx += (tx - d.ox) * STIFFNESS;
          d.vy += (ty - d.oy) * STIFFNESS;
          d.vx *= FRICTION;
          d.vy *= FRICTION;
          d.ox += d.vx;
          d.oy += d.vy;

          const x   = bx + d.ox;
          const y   = by + d.oy;
          const mag = Math.sqrt(d.ox * d.ox + d.oy * d.oy);

          // Diagonal breathing wave — idle organic life
          const wave    = Math.sin(t * d.freqMult + d.phase);
          const breathR = DOT_R * (1 + d.ampR * wave);
          const baseA   = 0.065 + d.ampA * (wave + 1);

          if (mag > 2.5) {
            displaced.push({ x, y, mag, breathR });
          } else {
            ctx.fillStyle = `rgba(245,243,240,${Math.max(0.035, baseA).toFixed(4)})`;
            ctx.beginPath();
            ctx.arc(x, y, Math.max(0.3, breathR), 0, Math.PI * 2);
            ctx.fill();
          }
        }
      }

      // Ambient lavender glow at cursor
      if (active) {
        const ar = REPEL_R * 1.2;
        const g  = ctx.createRadialGradient(mx, my, 0, mx, my, ar);
        g.addColorStop(0,    'rgba(168,155,242,0.15)');
        g.addColorStop(0.35, 'rgba(168,155,242,0.06)');
        g.addColorStop(1,    'rgba(168,155,242,0)');
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(mx, my, ar, 0, Math.PI * 2);
        ctx.fill();
      }

      // Displaced dots — lavender, fade by displacement depth
      for (const { x, y, mag, breathR } of displaced) {
        const p = Math.min(mag / MAX_REPEL, 1);
        ctx.fillStyle = `rgba(168,155,242,${(0.25 + p * 0.75).toFixed(4)})`;
        ctx.beginPath();
        ctx.arc(x, y, breathR + p * 1.0, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const onMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      const nx = e.clientX - rect.left;
      const ny = e.clientY - rect.top;
      velRef.current = {
        x: velRef.current.x * 0.65 + (nx - mouseRef.current.x) * 0.35,
        y: velRef.current.y * 0.65 + (ny - mouseRef.current.y) * 0.35,
      };
      mouseRef.current = { x: nx, y: ny };
    };

    const onLeave = () => {
      mouseRef.current = { x: -9999, y: -9999 };
      velRef.current   = { x: 0, y: 0 };
    };

    init();
    animRef.current = requestAnimationFrame(draw);
    window.addEventListener('resize',     init);
    window.addEventListener('mousemove',  onMove);
    window.addEventListener('mouseleave', onLeave);

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener('resize',     init);
      window.removeEventListener('mousemove',  onMove);
      window.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      aria-hidden="true"
    />
  );
};

// ── Magnetic wrapper — element springs gently toward the cursor
function Magnetic({ children, strength = 0.5 }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, { stiffness: 150, damping: 15, mass: 0.5 });
  const springY = useSpring(y, { stiffness: 150, damping: 15, mass: 0.5 });

  const handlePointerMove = (e) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    x.set((clientX - centerX) * strength);
    y.set((clientY - centerY) * strength);
  };

  const handlePointerLeave = () => {
    x.set(0);
    y.set(0);
  };

  return React.cloneElement(children, {
    ref,
    onPointerMove: handlePointerMove,
    onPointerLeave: handlePointerLeave,
    style: {
      ...children.props.style,
      x: springX,
      y: springY,
    },
  });
}

function EmailCopyButton() {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText("developer.rayala@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Magnetic strength={0.25}>
      <motion.button
        onClick={handleCopy}
        initial={{ borderColor: '#1A1A1A', color: '#A0A0A0', backgroundColor: 'rgba(0,0,0,0)' }}
        whileHover={{ backgroundColor: '#A89BF2', color: '#050505', borderColor: '#A89BF2' }}
        transition={{ duration: 0.22 }}
        style={{ fontSize: '0.72rem', display: 'inline-block' }}
        className="tracking-[0.12em] uppercase border px-5 py-2.5 cursor-pointer"
      >
        {copied ? 'Copied!' : 'Email Me ↗'}
      </motion.button>
    </Magnetic>
  );
};

// ── Line that draws itself left-to-right on mount
const DrawLine = ({ delay = 0 }) => (
  <motion.div
    style={{ height: '1px', backgroundColor: 'var(--border)', transformOrigin: 'left center' }}
    initial={{ scaleX: 0 }}
    animate={{ scaleX: 1 }}
    transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay }}
  />
);

// ── Per-letter clip-reveal: each letter slides up from an overflow mask
const RevealLine = ({ text, startDelay = 0, accentPeriod = false }) => (
  <div style={{ overflow: 'hidden', lineHeight: 1 }}>
    <div>
      {text.split('').map((char, i) => (
        <motion.span
          key={i}
          style={{ display: 'inline-block', ...(char === ' ' && { width: '0.3em' }) }}
          initial={{ y: '110%' }}
          animate={{ y: '0%' }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1], delay: startDelay + i * 0.038 }}
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
      {accentPeriod && (
        <motion.span
          style={{ display: 'inline-block', color: 'var(--accent)' }}
          initial={{ y: '110%' }}
          animate={{ y: '0%' }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1], delay: startDelay + text.length * 0.038 }}
        >
          .
        </motion.span>
      )}
    </div>
  </div>
);

export default function HeroSection() {
  return (
    <section
      id="home"
      className="h-screen w-full flex flex-col relative overflow-hidden"
      style={{ padding: '0 clamp(1.5rem, 5vw, 4rem)' }}
    >
      {/* Breathing membrane dot field */}
      <DotGrid />

      {/* ── Title block — pinned to bottom of flex-1 area */}
      <div className="flex-1 flex flex-col justify-end pb-3 z-10">
        <h1
          className="font-syne tracking-tight"
          style={{
            fontSize: 'clamp(4rem, 11vw, 9rem)',
            lineHeight: 0.9,
            textShadow: '0 0 120px rgba(168, 155, 242, 0.07)',
          }}
        >
          <RevealLine text="FULLSTACK AI" startDelay={0.5} />
          <div style={{ marginTop: '0.05em' }}>
            <RevealLine text="ENGINEER" startDelay={0.65} accentPeriod />
          </div>
        </h1>
      </div>

      {/* Bottom divider */}
      <div className="z-10 mt-8">
        <DrawLine delay={1.05} />
      </div>

      {/* Bottom info bar */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 1.15 }}
        className="z-10 py-6 grid grid-cols-1 md:grid-cols-3 items-center gap-6 md:gap-4"
      >
        {/* Socials — left */}
        <div className="flex items-center gap-5">
          <Magnetic>
            <motion.a
              href="https://github.com/Rayala07"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0.4, color: '#F5F3F0' }}
              whileHover={{ opacity: 1, scale: 1.12, color: '#A89BF2' }}
              transition={{ duration: 0.2 }}
              style={{ display: 'block' }}
            >
              <GithubIcon />
            </motion.a>
          </Magnetic>

          <Magnetic>
            <motion.a
              href="https://www.linkedin.com/in/rayala07/"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0.4, color: '#F5F3F0' }}
              whileHover={{ opacity: 1, scale: 1.12, color: '#A89BF2' }}
              transition={{ duration: 0.2 }}
              style={{ display: 'block' }}
            >
              <LinkedinIcon />
            </motion.a>
          </Magnetic>
        </div>

        {/* Tagline — center */}
        <p className="font-cormorant text-lg md:text-center" style={{ color: 'var(--text-muted)', lineHeight: 1.45 }}>
          Building scalable production grade
          <br className="hidden md:block" /> AI web platforms.
        </p>

        {/* Buttons — right */}
        <div className="flex items-center md:justify-end gap-4">
          <EmailCopyButton />

          <Magnetic strength={0.25}>
            <motion.a
              href="https://drive.google.com/file/d/1gL-ziJTzkVin7no3dHpVQWUiPVB1LHyb/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ borderColor: '#1A1A1A', color: '#A0A0A0', backgroundColor: 'rgba(0,0,0,0)' }}
              whileHover={{ backgroundColor: '#A89BF2', color: '#050505', borderColor: '#A89BF2' }}
              transition={{ duration: 0.22 }}
              style={{ fontSize: '0.72rem', textDecoration: 'none', display: 'inline-block' }}
              className="tracking-[0.12em] uppercase border px-5 py-2.5"
            >
              Resume →
            </motion.a>
          </Magnetic>
        </div>
      </motion.div>
    </section>
  );
}
