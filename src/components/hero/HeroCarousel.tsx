'use client';

import React, { useState, useEffect } from 'react';
import { CardRenderer } from '@/components/preview/CardRenderer';
import { CardData } from '@/types/card';
import { motion } from 'framer-motion';

const carouselData: CardData[] = [
    {
        personal: {
            fullName: "Alex Morgan",
            jobTitle: "Creative Director",
            tagline: "Designing the future",
            about: "Passionate about creating intuitive and beautiful digital experiences.",
            email: "alex@example.com",
            phone: "+1 234 567 890",
            location: "New York, NY",
            company: "Design Co.",
            website: "https://alex.design",
        },
        socialLinks: [],
        theme: {
            primaryColor: "#2563eb",
            secondaryColor: "#4f46e5",
            backgroundColor: "#ffffff",
            textColor: "#0f172a",
            fontPair: "sans",
        },
        templateId: "modern",
    },
    {
        personal: {
            fullName: "Sarah Cole",
            jobTitle: "Product Designer",
            tagline: "Less is more",
            about: "Minimalist designer focusing on clean interfaces.",
            email: "sarah@example.com",
            phone: "+1 987 654 321",
            location: "San Francisco, CA",
            company: "TechFlow",
            website: "https://sarah.design",
        },
        socialLinks: [],
        theme: {
            primaryColor: "#000000",
            secondaryColor: "#333333",
            backgroundColor: "#ffffff",
            textColor: "#000000",
            fontPair: "serif",
        },
        templateId: "minimal",
    },
    {
        personal: {
            fullName: "James Wilson",
            jobTitle: "Software Engineer",
            tagline: "Building scalable systems",
            about: "Full-stack developer with a passion for open source.",
            email: "james@example.com",
            phone: "+44 7700 900077",
            location: "London, UK",
            company: "DevCorp",
            website: "https://james.dev",
        },
        socialLinks: [],
        theme: {
            primaryColor: "#7c3aed",
            secondaryColor: "#6d28d9",
            backgroundColor: "#ffffff",
            textColor: "#1e293b",
            fontPair: "sans",
        },
        templateId: "modern",
    }
];

export const HeroCarousel = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % carouselData.length);
        }, 4000); // Change every 4 seconds

        return () => clearInterval(interval);
    }, []);

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative w-full max-w-[320px] aspect-[9/16] mx-auto perspective-1000"
        >
            {carouselData.map((data, index) => {
                // Calculate position relative to current index
                const offset = (index - currentIndex + carouselData.length) % carouselData.length;

                // Determine styles based on position
                let style = {};

                if (offset === 0) {
                    // Active card
                    style = {
                        transform: 'translateX(0) scale(1) translateZ(0)',
                        opacity: 1,
                        zIndex: 20,
                    };
                } else if (offset === 1) {
                    // Next card (right)
                    style = {
                        transform: 'translateX(60%) scale(0.8) translateZ(-50px) rotateY(-15deg)',
                        opacity: 0.6,
                        zIndex: 10,
                    };
                } else if (offset === carouselData.length - 1) {
                    // Previous card (left)
                    style = {
                        transform: 'translateX(-60%) scale(0.8) translateZ(-50px) rotateY(15deg)',
                        opacity: 0.6,
                        zIndex: 10,
                    };
                } else {
                    // Hidden
                    style = {
                        transform: 'scale(0.5)',
                        opacity: 0,
                        zIndex: 0,
                    };
                }

                return (
                    <div
                        key={index}
                        className="absolute inset-0 transition-all duration-700 ease-in-out"
                        style={style}
                    >
                        <div className="w-full h-full rounded-2xl overflow-hidden shadow-2xl bg-white">
                            <CardRenderer data={data} templateId={data.templateId} />
                        </div>
                    </div>
                );
            })}

            {/* Indicators */}
            <div className="absolute -bottom-12 left-0 right-0 flex justify-center gap-2">
                {carouselData.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentIndex(index)}
                        className={`w-2 h-2 rounded-full transition-all duration-300 ${index === currentIndex
                            ? 'bg-blue-500 w-6'
                            : 'bg-slate-600 hover:bg-slate-500'
                            }`}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>
        </motion.div>
    );
};
