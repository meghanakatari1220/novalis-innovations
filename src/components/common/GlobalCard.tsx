import React from 'react';
import { Card3D } from '../ui/Card3D';

interface GlobalCardProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  onClick?: () => void;
  hoverEffect?: boolean;
  maxTilt?: number;
  glare?: boolean;
  depth?: number;
}

export const GlobalCard: React.FC<GlobalCardProps> = ({
  children,
  className = '',
  id,
  onClick,
  hoverEffect = true,
  maxTilt = 6,
  glare = true,
  depth = 15,
}) => {
  return (
    <Card3D
      id={id}
      onClick={onClick}
      hoverEffect={hoverEffect}
      maxTilt={maxTilt}
      glare={glare}
      depth={depth}
      className={`bg-[#0B1020]/75 backdrop-blur-md border border-white/10 shadow-lg shadow-black/40 group ${
        hoverEffect
          ? 'hover:border-blue-500/40 hover:bg-[#0B1020]/90'
          : ''
      } ${className}`}
    >
      {children}
    </Card3D>
  );
};

