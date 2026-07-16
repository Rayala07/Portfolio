'use client';

import { useState, useRef, useEffect } from 'react';
import { useInView, motion, AnimatePresence } from 'motion/react';

/* ─────────────────────────────────────────────────────────────────
   CONVERSATION STEPS
   Each step has a question + chip options.
   The user picks a chip OR types a custom answer.
───────────────────────────────────────────────────────────────── */
const STEPS = [
  {
    id: 'reason',
    question: "What brings you here?",
    hint: 'Pick one or describe it yourself',
    chips: [
      'I have a project idea',
      'I want to hire you',
      'I want to collaborate',
      'Just saying hi 👋',
    ],
  },
  {
    id: 'work',
    question: "What kind of work are you looking for?",
    hint: 'Select the best fit or tell me more',
    chips: [
      'Full-stack web app',
      'AI integration',
      'Frontend only',
      'Backend / API',
    ],
  },
  {
    id: 'timeline',
    question: "What's your timeline?",
    hint: 'No pressure, just helps me plan',
    chips: [
      'ASAP',
      'Within a month',
      '3+ months',
      'Not sure yet',
    ],
  },
];

const SOCIALS = [
  { id: 'x',        icon: 'hn hn-x',        href: 'https://github.com/Rayala07',           label: 'X (Twitter)' },
  { id: 'linkedin', icon: 'hn hn-linkedin',  href: 'https://www.linkedin.com/in/rayala07/', label: 'LinkedIn' },
];

const CONTACT_CSS = `
  .contact-grid {
    display: grid;
    grid-template-columns: minmax(0,1fr) minmax(0,1fr);
    gap: clamp(2.5rem, 5vw, 5rem);
    width: 100%;
    max-width: 1280px;
    margin: 0 auto;
    align-items: stretch;
  }
  @media (max-width: 767px) {
    .contact-grid {
      grid-template-columns: 1fr;
      gap: 2rem;
    }
  }
`;

const INPUT_BG       = '#171717';
const BORDER_DEFAULT = 'rgba(255,255,255,0.22)';
const BORDER_FOCUS   = 'rgba(168,155,242,0.55)';
const BORDER_ERROR   = 'rgba(239,68,68,0.45)';

/* ─────────────────────────────────────────────────────────────────
   STEP INDICATOR — e.g. "2 / 3"
───────────────────────────────────────────────────────────────── */
function StepIndicator({ current, total }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: '2rem' }}>
      {/* Track */}
      <div
        style={{
          flex: 1,
          height: 2,
          background: 'rgba(255,255,255,0.08)',
          borderRadius: 99,
          overflow: 'hidden',
        }}
      >
        <motion.div
          style={{ height: '100%', background: 'var(--accent)', borderRadius: 99 }}
          initial={{ width: 0 }}
          animate={{ width: `${((current + 1) / total) * 100}%` }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>

      {/* Counter */}
      <span
        style={{
          fontFamily:    'Inter, sans-serif',
          fontSize:      '0.7rem',
          fontWeight:    600,
          letterSpacing: '0.1em',
          color:         'rgba(245,243,240,0.35)',
          flexShrink:    0,
        }}
      >
        {current + 1} / {total}
      </span>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────
   CHIP — selectable option
───────────────────────────────────────────────────────────────── */
function Chip({ label, selected, onClick }) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileHover={{ backgroundColor: selected ? 'var(--accent)' : 'rgba(168,155,242,0.15)' }}
      transition={{ duration: 0.15 }}
      style={{
        padding:         '9px 18px',
        border:          `1px solid ${selected ? 'var(--accent)' : 'rgba(255,255,255,0.14)'}`,
        backgroundColor: selected ? 'var(--accent)' : 'rgba(255,255,255,0.03)',
        color:           selected ? '#050505' : 'rgba(245,243,240,0.55)',
        fontFamily:      'Inter, sans-serif',
        fontSize:        '0.82rem',
        fontWeight:      selected ? 600 : 400,
        letterSpacing:   '0.01em',
        borderRadius:    0,
        cursor:          'pointer',
        transition:      'border-color 0.18s ease, background-color 0.18s ease, color 0.18s ease',
        whiteSpace:      'nowrap',
      }}
    >
      {label}
    </motion.button>
  );
}

/* ─────────────────────────────────────────────────────────────────
   MAIN SECTION
───────────────────────────────────────────────────────────────── */
export default function ContactSection() {
  const sectionRef = useRef(null);
  const hasEntered = useInView(sectionRef, { once: true, amount: 0.15 });

  // step index 0..STEPS.length-1 → then "email" step → then "done"
  const [stepIndex,  setStepIndex]  = useState(0);
  const [answers,    setAnswers]    = useState({});   // { reason: '...', work: '...', timeline: '...' }
  const [customText, setCustomText] = useState('');   // live value of the custom textarea
  const [email,      setEmail]      = useState('');
  const [emailError, setEmailError] = useState('');
  const [phase,      setPhase]      = useState('steps'); // 'steps' | 'email' | 'sent'
  const [direction,  setDirection]  = useState(1);    // 1 = forward, -1 = back (for slide animation)

  const inputRef = useRef(null);
  const didMount = useRef(false);

  // reset custom text when step changes
  useEffect(() => { setCustomText(''); }, [stepIndex]);

  // Focus textarea when the user advances to a new step.
  // Skip the initial mount: focusing on load would scroll this bottom-of-page
  // section into view, jumping the whole page to #contact on every load/refresh.
  // preventScroll keeps focus from yanking the viewport even on later steps.
  useEffect(() => {
    if (!didMount.current) { didMount.current = true; return; }
    inputRef.current?.focus({ preventScroll: true });
  }, [stepIndex]);

  const step = STEPS[stepIndex];
  const currentAnswer = answers[step?.id] ?? '';
  const hasAnswer     = currentAnswer.trim().length > 0 || customText.trim().length > 0;

  /* ── Handle chip click ── */
  const selectChip = (label) => {
    setAnswers(prev => ({ ...prev, [step.id]: label }));
    setCustomText('');
  };

  /* ── Advance step ── */
  const advance = () => {
    const value = (customText.trim() || currentAnswer).trim();
    if (!value) return;

    // lock in custom text if typed
    if (customText.trim()) {
      setAnswers(prev => ({ ...prev, [step.id]: customText.trim() }));
    }

    setDirection(1);

    if (stepIndex < STEPS.length - 1) {
      setStepIndex(i => i + 1);
    } else {
      setPhase('email');
    }
  };

  /* ── Go back ── */
  const goBack = () => {
    setDirection(-1);
    if (phase === 'email') {
      setPhase('steps');
    } else if (stepIndex > 0) {
      setStepIndex(i => i - 1);
    }
  };

  /* ── Submit ── */
  const submit = async () => {
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setEmailError('Please enter a valid email address');
      return;
    }
    setEmailError('');
    // Simulate send
    await new Promise(r => setTimeout(r, 700));
    setPhase('sent');
  };

  /* ── Key handler — Enter advances ── */
  const onKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      advance();
    }
  };

  /* ── Slide variants ── */
  const slideVariants = {
    enter:   (dir) => ({ opacity: 0, x: dir > 0 ? 40 : -40 }),
    center:  { opacity: 1, x: 0 },
    exit:    (dir) => ({ opacity: 0, x: dir > 0 ? -40 : 40 }),
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      style={{
        minHeight:   '100vh',
        display:     'flex',
        alignItems:  'center',
        padding:     'clamp(3rem, 6vh, 5rem) clamp(1.5rem, 5vw, 4rem)',
        boxSizing:   'border-box',
      }}
    >
      <style>{CONTACT_CSS}</style>
      <div className="contact-grid">
        {/* ── LEFT: heading + socials ───────────────────────────── */}
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
              Have a project or need help? Answer a few quick questions and I'll get back to you soon.
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

        {/* ── RIGHT: conversational form card ─────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={hasEntered ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
          transition={{ delay: 0.1, duration: 0.76, ease: [0.22, 1, 0.36, 1] }}
          style={{
            background:    '#0E0E0E',
            border:        '1px solid rgba(255,255,255,0.07)',
            borderRadius:  20,
            padding:       'clamp(2rem, 4vh, 3rem) clamp(2rem, 3vw, 2.8rem)',
            display:       'flex',
            flexDirection: 'column',
            minHeight:     400,
          }}
        >
          <AnimatePresence mode="wait" custom={direction}>

            {/* ──── QUESTION STEPS ──── */}
            {phase === 'steps' && (
              <motion.div
                key={`step-${stepIndex}`}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
                style={{ display: 'flex', flexDirection: 'column', flex: 1 }}
              >
                {/* Progress */}
                <StepIndicator current={stepIndex} total={STEPS.length} />

                {/* Question */}
                <p
                  className="font-bricolage"
                  style={{
                    fontSize:      'clamp(1.25rem, 2.2vw, 1.8rem)',
                    fontWeight:    700,
                    letterSpacing: '-0.02em',
                    color:         'var(--text-primary)',
                    margin:        '0 0 0.4rem',
                    lineHeight:    1.2,
                  }}
                >
                  {step.question}
                </p>

                <p
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize:   '0.78rem',
                    color:      'rgba(245,243,240,0.3)',
                    margin:     '0 0 1.6rem',
                  }}
                >
                  {step.hint}
                </p>

                {/* Chips */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: '1.4rem' }}>
                  {step.chips.map(label => (
                    <Chip
                      key={label}
                      label={label}
                      selected={currentAnswer === label && !customText}
                      onClick={() => selectChip(label)}
                    />
                  ))}
                </div>

                {/* Custom text field */}
                <textarea
                  ref={inputRef}
                  rows={2}
                  placeholder="Or describe it in your own words…"
                  value={customText}
                  onChange={e => {
                    setCustomText(e.target.value);
                    // deselect chip when user starts typing
                    if (e.target.value) setAnswers(prev => ({ ...prev, [step.id]: '' }));
                  }}
                  onKeyDown={onKeyDown}
                  data-lenis-prevent
                  style={{
                    width:        '100%',
                    padding:      '11px 14px',
                    background:   INPUT_BG,
                    border:       `1px solid ${BORDER_DEFAULT}`,
                    borderRadius: 10,
                    color:        'var(--text-primary)',
                    fontFamily:   'Inter, sans-serif',
                    fontSize:     '0.9rem',
                    outline:      'none',
                    resize:       'none',
                    boxSizing:    'border-box',
                    lineHeight:   1.5,
                    transition:   'border-color 0.2s ease',
                  }}
                  onFocus={e  => { e.target.style.borderColor = BORDER_FOCUS; }}
                  onBlur={e   => { e.target.style.borderColor = BORDER_DEFAULT; }}
                />

                {/* Next button */}
                <div style={{ marginTop: 'auto', paddingTop: '1.6rem', display: 'flex', gap: 12 }}>
                  {stepIndex > 0 && (
                    <motion.button
                      type="button"
                      onClick={goBack}
                      whileHover={{ opacity: 0.88 }}
                      whileTap={{ scale: 0.96 }}
                      style={{
                        padding:       '13px 20px',
                        background:    'rgba(255,255,255,0.05)',
                        color:         'rgba(245,243,240,0.6)',
                        border:        '1px solid rgba(255,255,255,0.1)',
                        borderRadius:  10,
                        fontFamily:    "'Bricolage Grotesque', sans-serif",
                        fontWeight:    700,
                        fontSize:      '0.88rem',
                        cursor:        'pointer',
                        flexShrink:    0,
                      }}
                    >
                      ← Back
                    </motion.button>
                  )}
                  <motion.button
                    type="button"
                    onClick={advance}
                    disabled={!hasAnswer}
                    whileHover={hasAnswer ? { opacity: 0.88 } : {}}
                    whileTap={hasAnswer ? { scale: 0.97 } : {}}
                    style={{
                      flex:          1,
                      padding:       '13px 24px',
                      background:    hasAnswer ? 'var(--accent)' : 'rgba(168,155,242,0.15)',
                      color:         hasAnswer ? '#050505' : 'rgba(168,155,242,0.45)',
                      border:        'none',
                      borderRadius:  10,
                      fontFamily:    "'Bricolage Grotesque', sans-serif",
                      fontWeight:    700,
                      fontSize:      '0.88rem',
                      letterSpacing: '0.01em',
                      cursor:        hasAnswer ? 'pointer' : 'not-allowed',
                      transition:    'background 0.22s ease, color 0.22s ease',
                    }}
                  >
                    {stepIndex < STEPS.length - 1 ? 'Continue →' : 'Last step →'}
                  </motion.button>
                </div>
              </motion.div>
            )}

            {/* ──── EMAIL STEP ──── */}
            {phase === 'email' && (
              <motion.div
                key="email-step"
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
                style={{ display: 'flex', flexDirection: 'column', flex: 1 }}
              >
                {/* Completed progress */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: '2rem' }}>
                  <div style={{ flex: 1, height: 2, background: 'rgba(255,255,255,0.08)', borderRadius: 99, overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: '100%', background: 'var(--accent)', borderRadius: 99 }} />
                  </div>
                  <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.1em', color: 'rgba(245,243,240,0.35)', flexShrink: 0 }}>
                    ✓ Done
                  </span>
                </div>

                <p
                  className="font-bricolage"
                  style={{
                    fontSize:      'clamp(1.25rem, 2.2vw, 1.8rem)',
                    fontWeight:    700,
                    letterSpacing: '-0.02em',
                    color:         'var(--text-primary)',
                    margin:        '0 0 0.4rem',
                    lineHeight:    1.2,
                  }}
                >
                  Almost there, where should I reach you?
                </p>

                <p
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize:   '0.78rem',
                    color:      'rgba(245,243,240,0.3)',
                    margin:     '0 0 1.6rem',
                  }}
                >
                  I'll reply within 24 hours.
                </p>

                <input
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={e => { setEmail(e.target.value); setEmailError(''); }}
                  onKeyDown={e => { if (e.key === 'Enter') submit(); }}
                  style={{
                    width:        '100%',
                    padding:      '13px 16px',
                    background:   INPUT_BG,
                    border:       `1px solid ${emailError ? BORDER_ERROR : BORDER_DEFAULT}`,
                    borderRadius: 10,
                    color:        'var(--text-primary)',
                    fontFamily:   'Inter, sans-serif',
                    fontSize:     '1rem',
                    outline:      'none',
                    boxSizing:    'border-box',
                    transition:   'border-color 0.2s ease',
                  }}
                  onFocus={e => { e.target.style.borderColor = emailError ? BORDER_ERROR : BORDER_FOCUS; }}
                  onBlur={e  => { e.target.style.borderColor = emailError ? BORDER_ERROR : BORDER_DEFAULT; }}
                  autoFocus
                />
                {emailError && (
                  <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.75rem', color: 'rgba(239,68,68,0.85)', marginTop: 6, marginBottom: 0 }}>
                    {emailError}
                  </p>
                )}

                <div style={{ marginTop: 'auto', paddingTop: '1.6rem', display: 'flex', gap: 12 }}>
                  <motion.button
                    type="button"
                    onClick={goBack}
                    whileHover={{ opacity: 0.88 }}
                    whileTap={{ scale: 0.96 }}
                    style={{
                      padding:       '13px 20px',
                      background:    'rgba(255,255,255,0.05)',
                      color:         'rgba(245,243,240,0.6)',
                      border:        '1px solid rgba(255,255,255,0.1)',
                      borderRadius:  10,
                      fontFamily:    "'Bricolage Grotesque', sans-serif",
                      fontWeight:    700,
                      fontSize:      '0.88rem',
                      cursor:        'pointer',
                      flexShrink:    0,
                    }}
                  >
                    ← Back
                  </motion.button>
                  <motion.button
                    type="button"
                    onClick={submit}
                    whileHover={{ opacity: 0.9 }}
                    whileTap={{ scale: 0.97 }}
                    style={{
                      flex:          1,
                      minWidth:      0,
                      padding:       '13px 20px',
                      background:    'var(--text-primary)',
                      color:         '#050505',
                      border:        'none',
                      borderRadius:  10,
                      fontFamily:    "'Bricolage Grotesque', sans-serif",
                      fontWeight:    700,
                      fontSize:      '0.88rem',
                      cursor:        'pointer',
                      whiteSpace:    'nowrap',
                      overflow:      'hidden',
                      textOverflow:  'ellipsis',
                    }}
                  >
                    Send message →
                  </motion.button>
                </div>
              </motion.div>
            )}

            {/* ──── SUCCESS STATE ──── */}
            {phase === 'sent' && (
              <motion.div
                key="sent"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
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
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
