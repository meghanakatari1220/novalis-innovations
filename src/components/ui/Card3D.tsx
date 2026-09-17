import React, { useRef, useState, useEffect, useCallback } from 'react';
import { motion, useReducedMotion } from 'motion/react';

interface Card3DProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  onClick?: () => void;
  hoverEffect?: boolean;
  maxTilt?: number; // Maximum tilt angle in degrees, default: 7
  glare?: boolean; // Whether to show subtle cursor-following glow
  depth?: number; // translateZ depth in px
}

export const Card3D: React.FC<Card3DProps> = ({
  children,
  className = '',
  id,
  onClick,
  hoverEffect = true,
  maxTilt = 7,
  glare = true,
  depth = 20,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50, opacity: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || prefersReducedMotion || !hoverEffect) return;

    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    // Calculate mouse position from -1 to 1 relative to center
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const normalizedX = (x / width) * 2 - 1;
    const normalizedY = (y / height) * 2 - 1;

    // Invert Y for intuitive 3D rotation
    const rotX = -normalizedY * maxTilt;
    const rotY = normalizedX * maxTilt;

    setRotateX(rotX);
    setRotateY(rotY);

    if (glare) {
      setGlarePos({
        x: (x / width) * 100,
        y: (y / height) * 100,
        opacity: 0.18,
      });
    }
  }, [maxTilt, glare, hoverEffect, prefersReducedMotion]);

  const handleMouseEnter = useCallback(() => {
    if (!prefersReducedMotion && hoverEffect) {
      setIsHovered(true);
    }
  }, [hoverEffect, prefersReducedMotion]);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    setRotateX(0);
    setRotateY(0);
    setGlarePos((prev) => ({ ...prev, opacity: 0 }));
  }, []);

  return (
    <div
      ref={cardRef}
      id={id}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        perspective: 1200,
      }}
      className={`relative ${onClick ? 'cursor-pointer' : ''}`}
    >
      <motion.div
        animate={{
          rotateX: prefersReducedMotion ? 0 : rotateX,
          rotateY: prefersReducedMotion ? 0 : rotateY,
          transformStyle: 'preserve-3d',
        }}
        transition={{
          type: 'spring',
          stiffness: 300,
          damping: 25,
          mass: 0.5,
        }}
        className={`relative w-full h-full rounded-2xl transition-shadow duration-300 ${
          isHovered ? 'shadow-2xl shadow-blue-500/15' : ''
        } ${className}`}
      >
        {/* Subtle Specular Glare Layer */}
        {glare && !prefersReducedMotion && (
          <div
            className="absolute inset-0 pointer-events-none rounded-2xl overflow-hidden z-30 transition-opacity duration-300"
            style={{
              opacity: glarePos.opacity,
              background: `radial-gradient(circle 320px at ${glarePos.x}% ${glarePos.y}%, rgba(56, 189, 248, 0.22), rgba(99, 102, 241, 0.08), transparent 70%)`,
            }}
          />
        )}

        {/* 3D Depth Content Layer */}
        <div
          style={{
            transform: isHovered && !prefersReducedMotion ? `translateZ(${depth}px)` : 'translateZ(0px)',
            transition: 'transform 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
            transformStyle: 'preserve-3d',
          }}
          className="w-full h-full"
        >
          {children}
        </div>
      </motion.div>
    </div>
  );
};
