"use client";

import React from 'react';
import CTAButton from '@/components/CTAButton';
import { motion } from 'motion/react';

/* ── Pixel Art Icons (Inline SVGs from pixelarticons) ── */
const GithubIcon = () => (
    <i className="hn hn-github text-3xl"></i>
);

const LinkedinIcon = () => (
    <i className="hn hn-linkedin text-3xl"></i>
);

const ArrowDownIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
        <path d="M13 12h6v2h-2v2h-2v2h-2v2h-2v-2H9v-2H7v-2H5v-2h6V4h2v8Z" />
    </svg>
);

/* ── Animation Variants ── */
const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 }
};

/* ── Page ─────────────────────────────────────────────────────────── */
export default function Home() {
    return (
        <main className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden">
            <div className="flex flex-col items-center justify-center text-center max-w-6xl w-full px-4 mt-8">
                <motion.div
                    initial="hidden"
                    animate="visible"
                    transition={{ staggerChildren: 0.2 }}
                    className="flex flex-col items-center w-full"
                >
                    {/* Shrink-wrapped inner container to align Hola with F exactly */}
                    <div className="flex flex-col items-start w-max max-w-full mx-auto">
                        <motion.p 
                            variants={fadeUp}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            className="text-xl mb-4 flex items-center gap-2 self-start" 
                            style={{ color: 'var(--text-muted)' }}
                        >
                            <span className='font-cormorant text-2xl' style={{ color: 'var(--accent)' }}>Hola,</span>
                            <span>I am <span style={{ color: 'var(--text-primary)', fontWeight: 500 }}>Rayala Viswanath</span></span>
                        </motion.p>

                        <motion.h1
                            variants={fadeUp}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            className="font-space-grotesk leading-[0.9] mb-6 tracking-tight text-center w-full"
                            style={{ fontSize: 'clamp(3rem, 9vw, 6.5rem)' }}
                        >
                            FULLSTACK AI<br/>ENGINEER
                        </motion.h1>
                    </div>

                    <motion.p
                        variants={fadeUp}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="font-cormorant text-2xl mb-8 max-w-2xl text-center"
                        style={{ color: 'var(--text-muted)' }}
                    >
                        Building scalable production AI Web platforms.
                    </motion.p>

                    {/* Social Links below the hero text */}
                    <motion.div
                        variants={fadeUp}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="flex justify-center items-center gap-6 mb-12"
                    >
                        <a href="" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-16 h-16 rounded-full border opacity-70 hover:opacity-100 hover:bg-[var(--text-primary)] hover:text-[#0D0D0D] transition-all duration-300" style={{ borderColor: 'var(--border)' }}>
                            <GithubIcon />
                        </a>
                        <a href="" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-16 h-16 rounded-full border opacity-70 hover:opacity-100 hover:bg-[var(--text-primary)] hover:text-[#0D0D0D] transition-all duration-300" style={{ borderColor: 'var(--border)' }}>
                            <LinkedinIcon />
                        </a>
                    </motion.div>

                    {/* Availability and CTAs grouped with the hero block */}
                    <motion.div
                        variants={fadeUp}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="flex flex-col items-center w-full"
                    >
                        <div className="flex items-center justify-center gap-3 mb-8">
                            <span
                                className="blink rounded-full flex-shrink-0"
                                style={{ width: '10px', height: '10px', backgroundColor: '#22c55e', boxShadow: '0 0 10px rgba(34, 197, 94, 0.5)' }}
                            />
                            <span className="text-sm font-medium tracking-wide uppercase" style={{ color: 'var(--text-muted)' }}>
                                Open To Full-time Roles
                            </span>
                        </div>
                        <div className="flex gap-6 justify-center w-full max-w-md">
                            <CTAButton href="/resume" label="Resume" />
                            <CTAButton href="/projects" label="Projects" />
                        </div>
                    </motion.div>
                </motion.div>
            </div>



            {/* Scroll Indicator */}
            <motion.div
                className="absolute bottom-8 flex flex-col items-center gap-2 text-[var(--text-muted)]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5, duration: 1 }}
            >
                <motion.div
                    animate={{ y: [0, 6, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                >
                    <ArrowDownIcon />
                </motion.div>
            </motion.div>
        </main>
    )
}