"use client";

import React, { useEffect } from 'react';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';

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
            threshold: 0.5 // Trigger when 50% of the section is visible
        });

        sections.forEach((section) => observer.observe(section));

        // Auto-scroll on initial load if the URL is a rewritten SPA route
        const currentPath = window.location.pathname.replace('/', '');
        if (currentPath) {
            // setTimeout ensures the DOM is fully rendered before scrolling
            setTimeout(() => {
                const targetElement = document.getElementById(currentPath);
                if (targetElement) {
                    targetElement.scrollIntoView({ behavior: 'smooth' });
                }
            }, 100);
        }

        return () => observer.disconnect();
    }, []);

    return (
        <main className="flex flex-col w-full relative">
            <HeroSection />
            <AboutSection />
        </main>
    );
}
