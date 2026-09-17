import React from 'react';
import { motion, useReducedMotion } from 'motion/react';

interface SectionReveal3DProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: 'up' | 'down' | 'none';
}

export const SectionReveal3D: React.FC<SectionReveal3DProps> = ({
  children,
  className = '',
  delay = 0,
  direction = 'up',
}) => {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  const initialY = direction === 'up' ? 32 : direction === 'down' ? -32 : 0;
  const initialRotateX = direction === 'up' ? 3 : direction === 'down' ? -3 : 0;

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: initialY,
        rotateX: initialRotateX,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
        rotateX: 0,
      }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{
        duration: 0.8,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
      style={{
        perspective: 1200,
        transformStyle: 'preserve-3d',
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};
