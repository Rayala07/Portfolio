"use client";

import React, { useEffect, useLayoutEffect, useRef } from 'react';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import SkillsSection from '@/components/Skills/Skills';
import ProjectsSection from '@/components/Projects/ProjectsSection';
import AchievementsSection from '@/components/AchievementsSection';
import ContactSection from '@/components/ContactSection';
import Navbar from '@/components/Navbar';

export default function PortfolioSinglePage() {
    const hasScrolled = useRef(false);

    // Second line of defence: useLayoutEffect fires before the browser paints,
    // so even if the beforeInteractive script fires a fraction late we still
    // correct scroll before the user sees anything.
    useLayoutEffect(() => {
        const hash = window.location.hash.replace('#', '');
        if (hash) {
            const el = document.getElementById(hash);
            if (el) window.scrollTo(0, el.offsetTop);
        } else {
            // No hash — always start at top. Cancels any residual scroll position
            // the browser may have applied before scrollRestoration='manual' took effect.
            window.scrollTo(0, 0);
        }
    }, []);

    useEffect(() => {
        // Flip the guard only on genuine user input.
        // 'scroll' is excluded because: browser scroll-restoration, Lenis synthetic
        // events, and the initial load all fire 'scroll' but NOT wheel/touch/key.
        const markScrolled = () => { hasScrolled.current = true; };
        const once = { once: true, passive: true };
        window.addEventListener('wheel',      markScrolled, once);
        window.addEventListener('touchstart', markScrolled, once);
        window.addEventListener('keydown',    markScrolled, once);

        // URL tracking via scroll position — works for any section height.
        // IntersectionObserver threshold:0.5 fails when a section is taller than
        // 2×viewport (50% of it can never be visible simultaneously), which causes
        // the URL to stall at the previous section forever.
        const sections = Array.from(document.querySelectorAll('section[id]'));

        let rafId = null;
        const updateHash = () => {
            if (!hasScrolled.current) return;
            const trigger = window.scrollY + window.innerHeight * 0.4;
            let current = null;
            for (const section of sections) {
                if (section.offsetTop <= trigger) current = section;
            }
            if (!current) return;
            const id = current.id;
            const nextHash = id === 'home' ? '' : `#${id}`;
            if (window.location.hash !== nextHash) {
                window.history.replaceState(null, '', id === 'home' ? '/' : `/#${id}`);
            }
        };

        const onScroll = () => {
            if (rafId) cancelAnimationFrame(rafId);
            rafId = requestAnimationFrame(updateHash);
        };

        window.addEventListener('scroll', onScroll, { passive: true });

        return () => {
            if (rafId) cancelAnimationFrame(rafId);
            window.removeEventListener('scroll',     onScroll);
            window.removeEventListener('wheel',      markScrolled);
            window.removeEventListener('touchstart', markScrolled);
            window.removeEventListener('keydown',    markScrolled);
        };
    }, []);

    return (
        <main className="flex flex-col w-full relative">
            <Navbar />
            <HeroSection />
            <AboutSection />
            <SkillsSection />
            <ProjectsSection />
            <AchievementsSection />
            <ContactSection />
        </main>
    );
}
