"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import './project-card.css';

const ScrambledText = ({ text }) => {
  const [displayText, setDisplayText] = useState('');

  useEffect(() => {
    let active = true;
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*';
    const staggerMs = 30;
    
    // Initialize with completely random characters
    let currentArray = Array(text.length).fill('').map(() => chars[Math.floor(Math.random() * chars.length)]);
    setDisplayText(currentArray.join(''));

    // Array of intervals to clear them later
    const intervals = [];

    text.split('').forEach((realChar, index) => {
      // Keep randomizing this character until its stagger time resolves
      const intervalId = setInterval(() => {
        if (!active) return;
        currentArray[index] = chars[Math.floor(Math.random() * chars.length)];
        setDisplayText([...currentArray].join(''));
      }, 50);
      intervals.push(intervalId);

      // After stagger time, stop randomizing and set the real character
      setTimeout(() => {
        if (!active) return;
        clearInterval(intervalId);
        currentArray[index] = realChar;
        setDisplayText([...currentArray].join(''));
      }, 800 + (index * staggerMs));
    });

    return () => {
      active = false;
      intervals.forEach(clearInterval);
    };
  }, [text]);

  return <>{displayText}</>;
};

// Fan transform configurations
const FAN_CONFIGS = [
  { rotateY: '-45deg', rotateZ: '-12deg', translateX: '-560px', translateZ: '-180px', scale: 0.55, opacity: 0.4, zIndex: 5 }, // -2
  { rotateY: '-28deg', rotateZ: '-7deg', translateX: '-300px', translateZ: '-80px', scale: 0.75, opacity: 0.7, zIndex: 8 }, // -1
  { rotateY: '0deg', rotateZ: '0deg', translateX: '0px', translateZ: '0px', scale: 1.0, opacity: 1.0, zIndex: 10 },        // 0
  { rotateY: '28deg', rotateZ: '7deg', translateX: '300px', translateZ: '-80px', scale: 0.75, opacity: 0.7, zIndex: 8 },  // +1
  { rotateY: '45deg', rotateZ: '12deg', translateX: '560px', translateZ: '-180px', scale: 0.55, opacity: 0.4, zIndex: 5 }   // +2
];

export default function ProjectCard({
  title = "Relic AI",
  subtitle = "Visually stunning dashboards that turn raw numbers into actionable business insights.",
  ctaLabel = "Explore it Live",
  ctaHref = "#",
  images = [],
  features = []
}) {
  return (
    <section id="projects" className="project-card-container">
      
      {/* Top Typography Section */}
      <div className="flex flex-col items-center text-center w-full z-10 px-4">
        <h2 
          className="text-white font-bold leading-[1.1] tracking-[-0.02em] whitespace-pre-line text-center max-w-4xl"
          style={{ fontFamily: "'Playfair Display', 'Georgia', 'Times New Roman', serif", fontSize: 'clamp(2.8rem, 6vw, 5rem)' }}
        >
          <ScrambledText text={title} />
        </h2>
        
        <p className="mt-4 max-w-[480px] mx-auto text-center" style={{ fontFamily: 'system-ui, sans-serif', fontSize: '1rem', fontWeight: 400, color: 'rgba(255,255,255,0.55)' }}>
          {subtitle}
        </p>

        <motion.a
          href={ctaHref}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-flex items-center justify-center rounded-full text-white uppercase tracking-[0.04em]"
          style={{ 
            fontSize: '0.875rem', 
            padding: '0.6rem 1.6rem', 
            background: 'rgba(255,255,255,0.08)', 
            border: '1px solid rgba(255,255,255,0.18)' 
          }}
          whileHover={{ background: 'rgba(255,255,255,0.15)', borderColor: 'rgba(255,255,255,0.35)' }}
          whileTap={{ scale: 0.98 }}
          transition={{ duration: 0.2 }}
        >
          {ctaLabel} <span style={{ marginLeft: '4px' }}>→</span>
        </motion.a>
      </div>

      {/* Image Fan Gallery */}
      <motion.div 
        className="gallery-container"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
      >
        <div className="gallery-glow"></div>
        
        {FAN_CONFIGS.map((config, index) => {
          const imgUrl = images[index];
          return (
            <motion.div
              key={index}
              className="fan-card"
              style={{
                transform: `rotateY(${config.rotateY}) rotateZ(${config.rotateZ}) translateX(${config.translateX}) translateZ(${config.translateZ}) scale(${config.scale})`,
                opacity: config.opacity,
                zIndex: config.zIndex
              }}
              whileHover={{
                scale: config.scale + 0.05,
                rotateZ: '2deg', // slight tilt toward center
                opacity: 1.0,
                boxShadow: '0 24px 60px rgba(0,0,0,0.6)'
              }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
            >
              {imgUrl && <img src={imgUrl} alt={`Gallery view ${index + 1}`} />}
            </motion.div>
          );
        })}
      </motion.div>

      {/* Feature Strip - Bottom Section */}
      <motion.div 
        className="feature-strip z-10"
        variants={{
          initial: { opacity: 0 },
          animate: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.5 } }
        }}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
      >
        {features.map((feature, i) => (
          <motion.div 
            key={i} 
            className="flex flex-col items-center text-center"
            variants={{
              initial: { opacity: 0, y: 20 },
              animate: { opacity: 1, y: 0 }
            }}
          >
            <h3 className="feature-title">{feature.title}</h3>
            <p className="feature-desc">{feature.description}</p>
          </motion.div>
        ))}
      </motion.div>

    </section>
  );
}
