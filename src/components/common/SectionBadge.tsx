import React from 'react';

interface SectionBadgeProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
}

export const SectionBadge: React.FC<SectionBadgeProps> = ({
  children,
  className = '',
  id,
}) => {
  return (
    <div
      id={id}
      className={`inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-950/70 border border-blue-500/30 text-sky-400 text-xs font-semibold tracking-wider uppercase mb-3 backdrop-blur-sm shadow-xs ${className}`}
    >
      {children}
    </div>
  );
};
