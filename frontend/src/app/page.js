"use client";

import React, { useEffect } from 'react';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import Navbar from '@/components/Navbar';
import { getLenisInstance } from '@/lib/lenis-instance';

export default function PortfolioSinglePage() {
    useEffect(() => {
        const sections = document.querySelectorAll('section[id]');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const id = entry.target.id;
                    const newUrl = id === 'home' ? '/' : `/${id}`;
                    
                    if (window.location.pathname !== newUrl) {
                        window.history.replaceState(null, '', newUrl);
                    }
                }
            });
        }, {
            threshold: 0.5
        });

        sections.forEach((section) => observer.observe(section));

        const currentPath = window.location.pathname.replace('/', '');
        if (currentPath) {
            setTimeout(() => {
                const targetElement = document.getElementById(currentPath);
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
        </main>
    );
}
