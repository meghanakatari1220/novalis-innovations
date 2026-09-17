import React, { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';

export type ShapeVariant =
  | 'about'
  | 'innovation'
  | 'projects'
  | 'achievements'
  | 'team'
  | 'gallery'
  | 'testimonials'
  | 'contact';

interface Floating3DShapesProps {
  variant: ShapeVariant;
  className?: string;
}

export const Floating3DShapes: React.FC<Floating3DShapesProps> = ({ variant, className = '' }) => {
  const prefersReducedMotion = useReducedMotion();
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (prefersReducedMotion) return;

    let rafId: number;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      targetX = (e.clientX / innerWidth - 0.5) * 2; // -1 to 1
      targetY = (e.clientY / innerHeight - 0.5) * 2;
    };

    const updateParallax = () => {
      setMouseOffset((prev) => ({
        x: prev.x + (targetX - prev.x) * 0.05,
        y: prev.y + (targetY - prev.y) * 0.05,
      }));
      rafId = requestAnimationFrame(updateParallax);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    rafId = requestAnimationFrame(updateParallax);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(rafId);
    };
  }, [prefersReducedMotion]);

  if (prefersReducedMotion) {
    return null;
  }

  // Common styles for wireframe neon lines
  const wireStroke = "rgba(56, 189, 248, 0.4)";
  const wireSecondary = "rgba(129, 140, 248, 0.35)";

  return (
    <div
      className={`absolute inset-0 overflow-hidden pointer-events-none select-none z-0 ${className}`}
      aria-hidden="true"
    >
      {/* SECTION: ABOUT - Subtle 3D Geometric Prisms & Rings */}
      {variant === 'about' && (
        <>
          {/* Top-Right Rotating Isometric Octahedron / Cube */}
          <motion.div
            style={{
              x: mouseOffset.x * -25,
              y: mouseOffset.y * -20,
            }}
            className="absolute top-16 right-8 sm:right-16 w-36 h-36 opacity-35"
          >
            <motion.svg
              animate={{ rotateZ: 360, rotateY: [0, 180, 360] }}
              transition={{ duration: 32, repeat: Infinity, ease: 'linear' }}
              viewBox="0 0 100 100"
              className="w-full h-full drop-shadow-[0_0_12px_rgba(56,189,248,0.3)]"
            >
              <polygon points="50,10 90,30 90,70 50,90 10,70 10,30" fill="none" stroke={wireStroke} strokeWidth="1.2" />
              <line x1="50" y1="10" x2="50" y2="90" stroke={wireSecondary} strokeWidth="1" strokeDasharray="3 3" />
              <line x1="10" y1="30" x2="90" y2="70" stroke={wireSecondary} strokeWidth="1" strokeDasharray="3 3" />
              <line x1="90" y1="30" x2="10" y2="70" stroke={wireSecondary} strokeWidth="1" strokeDasharray="3 3" />
              <circle cx="50" cy="50" r="4" fill="rgba(56,189,248,0.7)" />
              <circle cx="50" cy="10" r="2.5" fill="rgba(129,140,248,0.8)" />
              <circle cx="90" cy="70" r="2.5" fill="rgba(56,189,248,0.8)" />
            </motion.svg>
          </motion.div>

          {/* Bottom-Left 3D Floating Gyroscope Ring */}
          <motion.div
            style={{
              x: mouseOffset.x * 20,
              y: mouseOffset.y * 22,
            }}
            className="absolute bottom-20 left-6 sm:left-14 w-44 h-44 opacity-25"
          >
            <motion.svg
              animate={{ rotateZ: -360 }}
              transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
              viewBox="0 0 120 120"
              className="w-full h-full"
            >
              <ellipse cx="60" cy="60" rx="50" ry="22" fill="none" stroke={wireStroke} strokeWidth="1.2" transform="rotate(-25 60 60)" />
              <ellipse cx="60" cy="60" rx="50" ry="22" fill="none" stroke={wireSecondary} strokeWidth="1.2" transform="rotate(50 60 60)" />
              <circle cx="60" cy="60" r="3" fill="rgba(56,189,248,0.6)" />
              <circle cx="20" cy="45" r="2" fill="rgba(168,85,247,0.7)" />
              <circle cx="100" cy="75" r="2" fill="rgba(56,189,248,0.7)" />
            </motion.svg>
          </motion.div>
        </>
      )}

      {/* SECTION: INNOVATION - Futuristic 3D Cyber-Ring & Quantum Lattice */}
      {variant === 'innovation' && (
        <>
          {/* Central-Right 3D Quantum Orbit */}
          <motion.div
            style={{
              x: mouseOffset.x * -30,
              y: mouseOffset.y * -25,
            }}
            className="absolute top-1/4 right-4 sm:right-12 w-52 h-52 opacity-30"
          >
            <motion.svg
              animate={{ rotateZ: 360 }}
              transition={{ duration: 36, repeat: Infinity, ease: 'linear' }}
              viewBox="0 0 140 140"
              className="w-full h-full drop-shadow-[0_0_15px_rgba(56,189,248,0.25)]"
            >
              <circle cx="70" cy="70" r="58" fill="none" stroke="rgba(56,189,248,0.2)" strokeWidth="1" strokeDasharray="4 6" />
              <ellipse cx="70" cy="70" rx="60" ry="24" fill="none" stroke={wireStroke} strokeWidth="1.4" transform="rotate(30 70 70)" />
              <ellipse cx="70" cy="70" rx="60" ry="24" fill="none" stroke={wireSecondary} strokeWidth="1.4" transform="rotate(-45 70 70)" />
              <ellipse cx="70" cy="70" rx="60" ry="24" fill="none" stroke="rgba(168,85,247,0.4)" strokeWidth="1.2" transform="rotate(85 70 70)" />
              <circle cx="70" cy="70" r="6" fill="rgba(56,189,248,0.5)" />
            </motion.svg>
          </motion.div>

          {/* Left Side Floating Neural Node Grid */}
          <motion.div
            style={{
              x: mouseOffset.x * 25,
              y: mouseOffset.y * 18,
            }}
            className="absolute bottom-16 left-4 sm:left-10 w-40 h-40 opacity-25"
          >
            <motion.svg
              animate={{ y: [0, -8, 0], rotateZ: [0, 5, 0] }}
              transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
              viewBox="0 0 100 100"
              className="w-full h-full"
            >
              <line x1="20" y1="20" x2="80" y2="30" stroke={wireStroke} strokeWidth="1" />
              <line x1="80" y1="30" x2="50" y2="80" stroke={wireSecondary} strokeWidth="1" />
              <line x1="50" y1="80" x2="20" y2="20" stroke={wireStroke} strokeWidth="1" />
              <line x1="50" y1="45" x2="80" y2="30" stroke={wireSecondary} strokeWidth="0.8" strokeDasharray="2 2" />
              <circle cx="20" cy="20" r="3.5" fill="rgba(56,189,248,0.8)" />
              <circle cx="80" cy="30" r="3.5" fill="rgba(129,140,248,0.8)" />
              <circle cx="50" cy="80" r="3.5" fill="rgba(168,85,247,0.8)" />
              <circle cx="50" cy="45" r="2.5" fill="rgba(255,255,255,0.7)" />
            </motion.svg>
          </motion.div>
        </>
      )}

      {/* SECTION: PROJECTS - 3D Wireframe Depth Planes */}
      {variant === 'projects' && (
        <>
          {/* Upper Left Floating Isometric Grid Box */}
          <motion.div
            style={{
              x: mouseOffset.x * 20,
              y: mouseOffset.y * 22,
            }}
            className="absolute top-12 left-6 sm:left-16 w-36 h-36 opacity-25"
          >
            <motion.svg
              animate={{ rotateZ: 360 }}
              transition={{ duration: 44, repeat: Infinity, ease: 'linear' }}
              viewBox="0 0 100 100"
              className="w-full h-full"
            >
              <polygon points="50,15 85,35 85,75 50,95 15,75 15,35" fill="none" stroke={wireStroke} strokeWidth="1.2" />
              <line x1="50" y1="15" x2="50" y2="55" stroke={wireSecondary} strokeWidth="1.2" />
              <line x1="15" y1="35" x2="50" y2="55" stroke={wireSecondary} strokeWidth="1.2" />
              <line x1="85" y1="35" x2="50" y2="55" stroke={wireSecondary} strokeWidth="1.2" />
              <line x1="50" y1="55" x2="50" y2="95" stroke={wireStroke} strokeWidth="1.2" />
            </motion.svg>
          </motion.div>

          {/* Lower Right Cybernetic Coordinate Frame */}
          <motion.div
            style={{
              x: mouseOffset.x * -24,
              y: mouseOffset.y * -18,
            }}
            className="absolute bottom-12 right-6 sm:right-14 w-40 h-40 opacity-25"
          >
            <motion.svg
              animate={{ rotateZ: -360 }}
              transition={{ duration: 38, repeat: Infinity, ease: 'linear' }}
              viewBox="0 0 100 100"
              className="w-full h-full"
            >
              <circle cx="50" cy="50" r="40" fill="none" stroke="rgba(56,189,248,0.25)" strokeWidth="1" strokeDasharray="3 5" />
              <ellipse cx="50" cy="50" rx="42" ry="16" fill="none" stroke={wireStroke} strokeWidth="1" transform="rotate(-30 50 50)" />
              <circle cx="50" cy="10" r="2.5" fill="rgba(56,189,248,0.8)" />
              <circle cx="50" cy="90" r="2.5" fill="rgba(129,140,248,0.8)" />
            </motion.svg>
          </motion.div>
        </>
      )}

      {/* SECTION: ACHIEVEMENTS - 3D Trophy Polyhedrons & Orbiting Stat Ring */}
      {variant === 'achievements' && (
        <>
          {/* Top-Right 3D Polyhedral Gem */}
          <motion.div
            style={{
              x: mouseOffset.x * -28,
              y: mouseOffset.y * -22,
            }}
            className="absolute top-16 right-10 sm:right-20 w-40 h-40 opacity-30"
          >
            <motion.svg
              animate={{ rotateZ: 360, rotateX: [0, 180, 360] }}
              transition={{ duration: 28, repeat: Infinity, ease: 'linear' }}
              viewBox="0 0 100 100"
              className="w-full h-full drop-shadow-[0_0_12px_rgba(56,189,248,0.3)]"
            >
              <polygon points="50,10 80,35 68,85 32,85 20,35" fill="none" stroke={wireStroke} strokeWidth="1.2" />
              <line x1="50" y1="10" x2="68" y2="85" stroke={wireSecondary} strokeWidth="0.9" />
              <line x1="50" y1="10" x2="32" y2="85" stroke={wireSecondary} strokeWidth="0.9" />
              <line x1="20" y1="35" x2="80" y2="35" stroke={wireStroke} strokeWidth="0.9" />
              <circle cx="50" cy="10" r="2.5" fill="rgba(250,204,21,0.8)" />
              <circle cx="50" cy="55" r="3" fill="rgba(56,189,248,0.7)" />
            </motion.svg>
          </motion.div>

          {/* Bottom-Left Multi-Axis Celestial Rings */}
          <motion.div
            style={{
              x: mouseOffset.x * 22,
              y: mouseOffset.y * 20,
            }}
            className="absolute bottom-16 left-8 sm:left-16 w-36 h-36 opacity-25"
          >
            <motion.svg
              animate={{ rotateZ: -360 }}
              transition={{ duration: 34, repeat: Infinity, ease: 'linear' }}
              viewBox="0 0 100 100"
              className="w-full h-full"
            >
              <circle cx="50" cy="50" r="38" fill="none" stroke="rgba(129,140,248,0.3)" strokeWidth="1" strokeDasharray="3 4" />
              <ellipse cx="50" cy="50" rx="38" ry="14" fill="none" stroke={wireStroke} strokeWidth="1.2" transform="rotate(45 50 50)" />
              <circle cx="50" cy="50" r="3" fill="rgba(56,189,248,0.6)" />
            </motion.svg>
          </motion.div>
        </>
      )}

      {/* SECTION: TEAM - Subtle 3D Depth Particles & Aura */}
      {variant === 'team' && (
        <>
          {/* Top-Left Floating Vector Hexagon */}
          <motion.div
            style={{
              x: mouseOffset.x * 24,
              y: mouseOffset.y * 18,
            }}
            className="absolute top-14 left-8 sm:left-16 w-32 h-32 opacity-25"
          >
            <motion.svg
              animate={{ rotateZ: 360 }}
              transition={{ duration: 32, repeat: Infinity, ease: 'linear' }}
              viewBox="0 0 100 100"
              className="w-full h-full"
            >
              <polygon points="50,15 80,32 80,68 50,85 20,68 20,32" fill="none" stroke={wireStroke} strokeWidth="1.2" />
              <circle cx="50" cy="50" r="16" fill="none" stroke={wireSecondary} strokeWidth="0.9" strokeDasharray="2 3" />
              <circle cx="50" cy="15" r="2" fill="rgba(56,189,248,0.8)" />
              <circle cx="50" cy="85" r="2" fill="rgba(168,85,247,0.8)" />
            </motion.svg>
          </motion.div>

          {/* Bottom-Right Floating Tech Ring */}
          <motion.div
            style={{
              x: mouseOffset.x * -20,
              y: mouseOffset.y * -22,
            }}
            className="absolute bottom-14 right-8 sm:right-16 w-36 h-36 opacity-25"
          >
            <motion.svg
              animate={{ rotateZ: -360 }}
              transition={{ duration: 42, repeat: Infinity, ease: 'linear' }}
              viewBox="0 0 100 100"
              className="w-full h-full"
            >
              <ellipse cx="50" cy="50" rx="42" ry="18" fill="none" stroke={wireStroke} strokeWidth="1.2" transform="rotate(-20 50 50)" />
              <circle cx="50" cy="50" r="2.5" fill="rgba(56,189,248,0.7)" />
            </motion.svg>
          </motion.div>
        </>
      )}

      {/* SECTION: GALLERY - 3D Aperture & Perspective Viewfinder */}
      {variant === 'gallery' && (
        <>
          {/* Top-Right 3D Perspective Viewfinder Frame */}
          <motion.div
            style={{
              x: mouseOffset.x * -25,
              y: mouseOffset.y * -20,
            }}
            className="absolute top-12 right-6 sm:right-14 w-40 h-40 opacity-25"
          >
            <motion.svg
              animate={{ rotateZ: [0, 8, 0] }}
              transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
              viewBox="0 0 100 100"
              className="w-full h-full"
            >
              {/* Corner tick marks */}
              <path d="M 20 30 L 20 20 L 30 20" fill="none" stroke={wireStroke} strokeWidth="1.5" />
              <path d="M 70 20 L 80 20 L 80 30" fill="none" stroke={wireStroke} strokeWidth="1.5" />
              <path d="M 80 70 L 80 80 L 70 80" fill="none" stroke={wireStroke} strokeWidth="1.5" />
              <path d="M 30 80 L 20 80 L 20 70" fill="none" stroke={wireStroke} strokeWidth="1.5" />
              <circle cx="50" cy="50" r="18" fill="none" stroke={wireSecondary} strokeWidth="1" strokeDasharray="3 3" />
              <circle cx="50" cy="50" r="3" fill="rgba(56,189,248,0.8)" />
            </motion.svg>
          </motion.div>

          {/* Bottom-Left 3D Geometric Depth Grid */}
          <motion.div
            style={{
              x: mouseOffset.x * 22,
              y: mouseOffset.y * 18,
            }}
            className="absolute bottom-12 left-6 sm:left-14 w-36 h-36 opacity-25"
          >
            <motion.svg
              animate={{ rotateZ: -360 }}
              transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
              viewBox="0 0 100 100"
              className="w-full h-full"
            >
              <ellipse cx="50" cy="50" rx="40" ry="16" fill="none" stroke={wireStroke} strokeWidth="1" transform="rotate(40 50 50)" />
              <ellipse cx="50" cy="50" rx="40" ry="16" fill="none" stroke={wireSecondary} strokeWidth="1" transform="rotate(-40 50 50)" />
            </motion.svg>
          </motion.div>
        </>
      )}

      {/* SECTION: TESTIMONIALS - Floating 3D Star Prisms & Orbital Halo */}
      {variant === 'testimonials' && (
        <>
          {/* Top-Right 3D Geometric Quote Prism */}
          <motion.div
            style={{
              x: mouseOffset.x * -24,
              y: mouseOffset.y * -20,
            }}
            className="absolute top-16 right-8 sm:right-16 w-36 h-36 opacity-25"
          >
            <motion.svg
              animate={{ rotateZ: 360 }}
              transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
              viewBox="0 0 100 100"
              className="w-full h-full"
            >
              <polygon points="50,15 80,75 20,75" fill="none" stroke={wireStroke} strokeWidth="1.2" />
              <polygon points="50,85 80,25 20,25" fill="none" stroke={wireSecondary} strokeWidth="1" strokeDasharray="3 3" />
              <circle cx="50" cy="50" r="3" fill="rgba(250,204,21,0.7)" />
            </motion.svg>
          </motion.div>

          {/* Bottom-Left 3D Floating Harmonic Ring */}
          <motion.div
            style={{
              x: mouseOffset.x * 20,
              y: mouseOffset.y * 22,
            }}
            className="absolute bottom-16 left-6 sm:left-14 w-40 h-40 opacity-25"
          >
            <motion.svg
              animate={{ rotateZ: -360 }}
              transition={{ duration: 36, repeat: Infinity, ease: 'linear' }}
              viewBox="0 0 100 100"
              className="w-full h-full"
            >
              <ellipse cx="50" cy="50" rx="42" ry="18" fill="none" stroke={wireStroke} strokeWidth="1.2" transform="rotate(-30 50 50)" />
              <circle cx="50" cy="50" r="2.5" fill="rgba(56,189,248,0.6)" />
            </motion.svg>
          </motion.div>
        </>
      )}

      {/* SECTION: CONTACT - 3D Communication Orbitals & Signal Wave Ring */}
      {variant === 'contact' && (
        <>
          {/* Top-Right 3D Satellite Signal Orbit */}
          <motion.div
            style={{
              x: mouseOffset.x * -26,
              y: mouseOffset.y * -20,
            }}
            className="absolute top-12 right-8 sm:right-16 w-44 h-44 opacity-25"
          >
            <motion.svg
              animate={{ rotateZ: 360 }}
              transition={{ duration: 34, repeat: Infinity, ease: 'linear' }}
              viewBox="0 0 120 120"
              className="w-full h-full"
            >
              <circle cx="60" cy="60" r="48" fill="none" stroke="rgba(56,189,248,0.2)" strokeWidth="1" strokeDasharray="4 6" />
              <ellipse cx="60" cy="60" rx="50" ry="20" fill="none" stroke={wireStroke} strokeWidth="1.2" transform="rotate(35 60 60)" />
              <ellipse cx="60" cy="60" rx="50" ry="20" fill="none" stroke={wireSecondary} strokeWidth="1.2" transform="rotate(-40 60 60)" />
              <circle cx="60" cy="60" r="3" fill="rgba(56,189,248,0.7)" />
              <circle cx="95" cy="40" r="2" fill="rgba(129,140,248,0.8)" />
            </motion.svg>
          </motion.div>

          {/* Bottom-Left 3D Wave Node */}
          <motion.div
            style={{
              x: mouseOffset.x * 22,
              y: mouseOffset.y * 18,
            }}
            className="absolute bottom-16 left-6 sm:left-14 w-36 h-36 opacity-25"
          >
            <motion.svg
              animate={{ rotateZ: -360 }}
              transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
              viewBox="0 0 100 100"
              className="w-full h-full"
            >
              <ellipse cx="50" cy="50" rx="38" ry="15" fill="none" stroke={wireStroke} strokeWidth="1" transform="rotate(-25 50 50)" />
              <circle cx="50" cy="50" r="2.5" fill="rgba(168,85,247,0.7)" />
            </motion.svg>
          </motion.div>
        </>
      )}
    </div>
  );
};
