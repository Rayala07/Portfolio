"use client";

import React from 'react';
import { motion } from 'motion/react';

/* ── Animation Variants ── */
const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 }
};

export default function AboutSection() {
    return (
        <section id="about" className="h-screen w-full flex flex-col items-center justify-center py-12 px-4 relative overflow-hidden">
            <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-20 items-center mt-8">
                
                {/* Image Placeholder (Left Column, spans 5 cols) */}
                <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="md:col-span-5 w-full flex justify-center md:justify-start"
                >
                    <div className="w-full max-w-sm aspect-[4/5] bg-[#0A0A0A] border border-[var(--border)] rounded flex items-center justify-center relative overflow-hidden">
                        <span className="text-sm tracking-widest uppercase text-[var(--text-muted)] opacity-50">
                            [ Character Image ]
                        </span>
                        {/* Subtle corner accents for a premium architectural feel */}
                        <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-[var(--text-muted)] opacity-30"></div>
                        <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-[var(--text-muted)] opacity-30"></div>
                        <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-[var(--text-muted)] opacity-30"></div>
                        <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-[var(--text-muted)] opacity-30"></div>
                    </div>
                </motion.div>

                {/* Content (Right Column, spans 7 cols) */}
                <motion.div 
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ staggerChildren: 0.2 }}
                    className="md:col-span-7 flex flex-col items-start text-left"
                >
                    <motion.h1 
                        variants={fadeUp}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="font-space-grotesk text-4xl md:text-5xl tracking-tight mb-10 text-[var(--text-primary)] uppercase"
                    >
                        About Me
                    </motion.h1>

                    <div className="flex flex-col gap-6 text-[var(--text-muted)] text-lg leading-relaxed max-w-2xl">
                        <motion.p variants={fadeUp} transition={{ duration: 0.8, ease: "easeOut" }} className="text-[var(--text-primary)] font-medium text-xl md:text-2xl font-cormorant italic mb-2">
                            "Technology should be an asset, not an expense."
                        </motion.p>

                        <motion.p variants={fadeUp} transition={{ duration: 0.8, ease: "easeOut" }}>
                            I build complete production-ready applications from UI to deployment, integrating modern AI capabilities where they create real business value with a focus on outcome. Automating operations, improving user experiences, reducing manual effort, and turning ideas into products. Rather than viewing development as a collection of features and tasks, I approach it as a process of solving problems and removing obstacles that prevent growth.
                        </motion.p>

                        <motion.p variants={fadeUp} transition={{ duration: 0.8, ease: "easeOut" }}>
                            The most effective software isn't necessarily the most complex. It's the software that helps a business move faster, serve customers better, and operate more efficiently. That philosophy shapes how I think, build, and make decisions throughout the development process.
                        </motion.p>

                        <motion.p variants={fadeUp} transition={{ duration: 0.8, ease: "easeOut" }} className="pt-2">
                            <span style={{ color: 'var(--text-primary)' }}>From concept to execution, the goal is simple</span> → To create reliable digital products and systems that deliver meaningful results for the people who use them and the businesses that depend on them.
                        </motion.p>
                    </div>
                </motion.div>

            </div>
        </section>
    );
}
