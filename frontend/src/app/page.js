"use client";

import React, { useEffect } from 'react';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import SkillsSection from '@/components/Skills/Skills';
import ProjectsSection from '@/components/Projects/ProjectsSection';
import Navbar from '@/components/Navbar';
import { getLenisInstance } from '@/lib/lenis-instance';

export default function PortfolioSinglePage() {
    useEffect(() => {
        const sections = document.querySelectorAll('section[id]');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const id = entry.target.id;
                    // Hash-based URLs load from / and are handled client-side,
                    // so reloading /#skills never hits a missing route.
                    const newUrl = id === 'home' ? '/' : `/#${id}`;
                    window.history.replaceState(null, '', newUrl);
                }
            });
        }, {
            threshold: 0.5
        });

        sections.forEach((section) => observer.observe(section));

        // On reload, read the hash and scroll to the matching section
        const hash = window.location.hash.replace('#', '');
        if (hash) {
            setTimeout(() => {
                const targetElement = document.getElementById(hash);
                if (targetElement) {
                    const lenis = getLenisInstance();
                    lenis ? lenis.scrollTo(targetElement) : targetElement.scrollIntoView({ behavior: 'smooth' });
                }
            }, 100);
        }

        return () => observer.disconnect();
    }, []);

    return (
        <main className="flex flex-col w-full relative">
            <Navbar />
            <HeroSection />
            <AboutSection />
            <SkillsSection />
            <ProjectsSection />
        </main>
    );
}
