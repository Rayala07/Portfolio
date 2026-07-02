'use client';

import { useState, useRef, useEffect } from 'react';
import { useInView, motion, AnimatePresence } from 'motion/react';
import { z } from 'zod';

const schema = z.object({
  name:    z.string().min(2, 'Name must be at least 2 characters'),
  email:   z.string().email('Please enter a valid email address'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

const SOCIALS = [
  { id: 'x',       icon: 'hn hn-x',        href: 'https://github.com/Rayala07',             label: 'X (Twitter)' },
  { id: 'linkedin', icon: 'hn hn-linkedin', href: 'https://www.linkedin.com/in/rayala07/',   label: 'LinkedIn' },
];

/* ── Shared token-level styles ─────────────────────────────────── */
const CARD_BG    = '#0E0E0E';
const INPUT_BG   = '#171717';          // one shade lighter than card
const BORDER_DEFAULT = 'rgba(255,255,255,0.22)';
const BORDER_FOCUS   = 'rgba(168,155,242,0.55)';
const BORDER_ERROR   = 'rgba(239,68,68,0.45)';

const labelBase = {
  display:        'block',
  fontFamily:     'Inter, sans-serif',
  fontSize:       '0.85rem',
  fontWeight:     500,
  letterSpacing:  '0.01em',
  color:          'rgba(245,243,240,0.75)',
  marginBottom:   7,
};

function getFieldStyle(hasError) {
  return {
    width:        '100%',
    padding:      '12px 15px',
    background:   INPUT_BG,
    border:       `1px solid ${hasError ? BORDER_ERROR : BORDER_DEFAULT}`,
    borderRadius: 10,
    color:        'var(--text-primary)',
    fontFamily:   'Inter, sans-serif',
    fontSize:     '0.98rem',
    fontWeight:   400,
    outline:      'none',
    transition:   'border-color 0.2s ease',
    boxSizing:    'border-box',
    lineHeight:   1.5,
  };
}

export default function ContactSection() {
  const sectionRef = useRef(null);
  const hasEntered = useInView(sectionRef, { once: true, amount: 0.15 });

  const [form,   setForm]   = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | sending | sent

  const clearError = (field) =>
    setErrors((prev) => { const n = { ...prev }; delete n[field]; return n; });

  const handleChange = (field) => (e) => {
    setForm((f) => ({ ...f, [field]: e.target.value }));
    if (errors[field]) clearError(field);
  };

  // Auto-dismiss errors after 3 s with a fade-out (AnimatePresence handles the exit)
  useEffect(() => {
    if (!Object.values(errors).some(Boolean)) return;
    const id = setTimeout(() => setErrors({}), 3000);
    return () => clearTimeout(id);
  }, [errors]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = schema.safeParse(form);
    if (!result.success) {
      const flat = result.error.flatten().fieldErrors;
      setErrors({
        name:    flat.name?.[0],
        email:   flat.email?.[0],
        message: flat.message?.[0],
      });
      return;
    }
    setErrors({});
    setStatus('sending');
    await new Promise((r) => setTimeout(r, 900));
    setStatus('sent');
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      style={{
        minHeight:  '100vh',
        display:    'flex',
        alignItems: 'center',
        padding:    'clamp(3rem, 6vh, 5rem) clamp(1.5rem, 5vw, 4rem)',
        boxSizing:  'border-box',
      }}
    >
      <div
        style={{
          display:             'grid',
          gridTemplateColumns: '1fr 1fr',
          gap:                 'clamp(2.5rem, 5vw, 5rem)',
          width:               '100%',
          maxWidth:            1280,
          margin:              '0 auto',
          alignItems:          'stretch',
        }}
      >
        {/* ── Left: heading · subtitle · socials ─────────────── */}
        <motion.div
          initial={{ opacity: 0, x: -28 }}
          animate={hasEntered ? { opacity: 1, x: 0 } : { opacity: 0, x: -28 }}
          transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1] }}
          style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
        >
          <div>
            <h2
              className="font-bricolage"
              style={{
                fontSize:      'clamp(3.8rem, 7.5vw, 7.5rem)',
                fontWeight:    800,
                letterSpacing: '-0.04em',
                lineHeight:    0.88,
                margin:        '0 0 clamp(1.2rem, 2.5vh, 1.8rem)',
              }}
            >
              <span style={{ color: 'var(--accent)',       display: 'block' }}>Let's</span>
              <span style={{ color: 'var(--text-primary)', display: 'block' }}>talk.</span>
            </h2>

            <p
              style={{
                fontFamily: 'Inter, sans-serif',
                fontSize:   'clamp(0.88rem, 1.15vw, 1rem)',
                color:      'rgba(245,243,240,0.42)',
                lineHeight: 1.7,
                maxWidth:   360,
                margin:     0,
              }}
            >
              Have a project or need help? Fill out the form, and I'll get back
              to you soon.
            </p>
          </div>

          {/* Social icon buttons */}
          <div style={{ display: 'flex', gap: 10, marginTop: 'clamp(2.5rem, 6vh, 4rem)' }}>
            {SOCIALS.map(({ id, icon, href, label }) => (
              <a
                key={id}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(168,155,242,0.45)';
                  e.currentTarget.style.color       = 'var(--accent)';
                  e.currentTarget.style.background  = 'rgba(168,155,242,0.07)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.11)';
                  e.currentTarget.style.color       = 'rgba(245,243,240,0.48)';
                  e.currentTarget.style.background  = 'rgba(255,255,255,0.03)';
                }}
                style={{
                  width:          44,
                  height:         44,
                  borderRadius:   10,
                  border:         '1px solid rgba(255,255,255,0.11)',
                  background:     'rgba(255,255,255,0.03)',
                  display:        'flex',
                  alignItems:     'center',
                  justifyContent: 'center',
                  color:          'rgba(245,243,240,0.48)',
                  fontSize:       '1rem',
                  textDecoration: 'none',
                  transition:     'border-color 0.2s ease, color 0.2s ease, background 0.2s ease',
                  flexShrink:     0,
                }}
              >
                <i className={icon} />
              </a>
            ))}
          </div>
        </motion.div>

        {/* ── Right: form card ────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={hasEntered ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
          transition={{ delay: 0.1, duration: 0.76, ease: [0.22, 1, 0.36, 1] }}
          style={{
            background:    CARD_BG,
            border:        '1px solid rgba(255,255,255,0.07)',
            borderRadius:  20,
            padding:       'clamp(1.8rem, 3.5vh, 2.6rem) clamp(1.8rem, 3vw, 2.6rem)',
            display:       'flex',
            flexDirection: 'column',
          }}
        >
          {status === 'sent' ? (
            <div
              style={{
                flex:           1,
                display:        'flex',
                flexDirection:  'column',
                alignItems:     'center',
                justifyContent: 'center',
                textAlign:      'center',
                gap:            14,
                minHeight:      320,
              }}
            >
              <div
                style={{
                  width:          52,
                  height:         52,
                  borderRadius:   '50%',
                  border:         '1.5px solid rgba(168,155,242,0.4)',
                  display:        'flex',
                  alignItems:     'center',
                  justifyContent: 'center',
                  color:          'var(--accent)',
                  fontSize:       '1.3rem',
                }}
              >
                ✓
              </div>
              <h3
                className="font-bricolage"
                style={{ fontWeight: 700, fontSize: '1.4rem', color: 'var(--text-primary)', margin: 0 }}
              >
                Message sent!
              </h3>
              <p style={{ color: 'rgba(245,243,240,0.42)', fontFamily: 'Inter, sans-serif', fontSize: '0.9rem', margin: 0 }}>
                I'll get back to you as soon as possible.
              </p>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              noValidate
              style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(1rem, 2vh, 1.4rem)', flex: 1 }}
            >
              {/* Name */}
              <div>
                <label style={labelBase}>Name</label>
                <input
                  type="text"
                  placeholder="Enter your name"
                  value={form.name}
                  onChange={handleChange('name')}
                  onFocus={(e) => { e.target.style.borderColor = errors.name ? BORDER_ERROR : BORDER_FOCUS; }}
                  onBlur={(e)  => { e.target.style.borderColor = errors.name ? BORDER_ERROR : BORDER_DEFAULT; }}
                  style={getFieldStyle(!!errors.name)}
                />
                <AnimatePresence>
                  {errors.name && <ErrorMsg key="err-name" text={errors.name} />}
                </AnimatePresence>
              </div>

              {/* Email */}
              <div>
                <label style={labelBase}>Email</label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={form.email}
                  onChange={handleChange('email')}
                  onFocus={(e) => { e.target.style.borderColor = errors.email ? BORDER_ERROR : BORDER_FOCUS; }}
                  onBlur={(e)  => { e.target.style.borderColor = errors.email ? BORDER_ERROR : BORDER_DEFAULT; }}
                  style={getFieldStyle(!!errors.email)}
                />
                <AnimatePresence>
                  {errors.email && <ErrorMsg key="err-email" text={errors.email} />}
                </AnimatePresence>
              </div>

              {/* Your Message */}
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                <label style={labelBase}>Your Message</label>
                <textarea
                  placeholder="Type here..."
                  value={form.message}
                  onChange={handleChange('message')}
                  onFocus={(e) => { e.target.style.borderColor = errors.message ? BORDER_ERROR : BORDER_FOCUS; }}
                  onBlur={(e)  => { e.target.style.borderColor = errors.message ? BORDER_ERROR : BORDER_DEFAULT; }}
                  data-lenis-prevent
                  style={{
                    ...getFieldStyle(!!errors.message),
                    resize:    'none',
                    flex:      1,
                    minHeight: 110,
                  }}
                />
                <AnimatePresence>
                  {errors.message && <ErrorMsg key="err-message" text={errors.message} />}
                </AnimatePresence>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={status === 'sending'}
                onMouseEnter={(e) => { if (status !== 'sending') e.currentTarget.style.opacity = '0.88'; }}
                onMouseLeave={(e) => { e.currentTarget.style.opacity = status === 'sending' ? '0.55' : '1'; }}
                style={{
                  width:        '100%',
                  padding:      '14px 24px',
                  background:   'var(--text-primary)',
                  color:        '#050505',
                  border:       'none',
                  borderRadius: 10,
                  fontFamily:   "'Bricolage Grotesque', sans-serif",
                  fontWeight:   600,
                  fontSize:     '0.95rem',
                  letterSpacing:'-0.01em',
                  transition:   'opacity 0.2s ease',
                  opacity:      status === 'sending' ? 0.55 : 1,
                  marginTop:    4,
                }}
              >
                {status === 'sending' ? 'Sending…' : 'Submit'}
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}

function ErrorMsg({ text }) {
  return (
    <motion.p
      initial={{ opacity: 0, y: -4 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, transition: { duration: 0.4, ease: 'easeOut' } }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      style={{
        fontFamily:   'Inter, sans-serif',
        fontSize:     '0.75rem',
        color:        'rgba(239,68,68,0.85)',
        marginTop:    5,
        marginBottom: 0,
        lineHeight:   1.4,
      }}
    >
      {text}
    </motion.p>
  );
}
