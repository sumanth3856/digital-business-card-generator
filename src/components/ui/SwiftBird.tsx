'use client';

import { motion, useSpring, useTransform, useMotionValue, useVelocity, useAnimationFrame } from 'framer-motion';
import { useEffect, useRef } from 'react';

export const SwiftBird = () => {
    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);

    // Spring physics for "swift" movement - slightly underdamped for a bit of overshoot/life
    const springConfig = { damping: 15, stiffness: 150, mass: 0.5 };
    const birdX = useSpring(cursorX, springConfig);
    const birdY = useSpring(cursorY, springConfig);

    // Calculate velocity to determine rotation
    const velocityX = useVelocity(birdX);
    const velocityY = useVelocity(birdY);

    const rotation = useTransform<number, number>([velocityX, velocityY], ([vx, vy]) => {
        if (Math.abs(vx) < 0.1 && Math.abs(vy) < 0.1) return 0; // Default to 0 if not moving
        const angle = Math.atan2(vy, vx) * (180 / Math.PI);
        return angle + 90; // Add 90deg because the bird SVG points up by default
    });

    // Smooth out the rotation
    const smoothRotation = useSpring(rotation, { damping: 20, stiffness: 200 });

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            cursorX.set(e.clientX);
            cursorY.set(e.clientY);
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [cursorX, cursorY]);

    return (
        <motion.div
            style={{
                x: birdX,
                y: birdY,
                rotate: smoothRotation,
                translateX: '-50%',
                translateY: '-50%',
            }}
            className="fixed top-0 left-0 z-50 pointer-events-none will-change-transform"
        >
            {/* Colorful Swift Bird SVG */}
            <svg
                width="40"
                height="40"
                viewBox="0 0 100 100"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="drop-shadow-lg"
            >
                <defs>
                    <linearGradient id="birdGradient" x1="0%" y1="100%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#DC2626" /> {/* Red-600 */}
                        <stop offset="50%" stopColor="#F43F5E" /> {/* Rose-500 */}
                        <stop offset="100%" stopColor="#F59E0B" /> {/* Amber-500 */}
                    </linearGradient>
                    <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                        <feGaussianBlur stdDeviation="2" result="blur" />
                        <feComposite in="SourceGraphic" in2="blur" operator="over" />
                    </filter>
                </defs>
                <g filter="url(#glow)">
                    {/* Stylized Bird Shape (pointing up) */}
                    <path
                        d="M50 0 C50 0 70 30 90 40 C 70 50 60 55 50 80 C 40 55 30 50 10 40 C 30 30 50 0 50 0 Z"
                        fill="url(#birdGradient)"
                    />
                    {/* Wing detail */}
                    <path
                        d="M50 20 C 50 20 65 40 80 45 M 50 20 C 50 20 35 40 20 45"
                        stroke="white"
                        strokeWidth="2"
                        strokeOpacity="0.5"
                        strokeLinecap="round"
                    />
                </g>
            </svg>
        </motion.div>
    );
};
// Verified by Antigravity on 2025-12-02
