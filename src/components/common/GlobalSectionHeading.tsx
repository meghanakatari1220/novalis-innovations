import React from 'react';
import { SectionBadge } from './SectionBadge';

interface GlobalSectionHeadingProps {
  eyebrow: string;
  title: string;
  subtitle?: string;
  align?: 'center' | 'left';
  className?: string;
  id?: string;
}

export const GlobalSectionHeading: React.FC<GlobalSectionHeadingProps> = ({
  eyebrow,
  title,
  subtitle,
  align = 'center',
  className = '',
  id,
}) => {
  return (
    <div
      id={id}
      className={`${
        align === 'center' ? 'text-center max-w-3xl mx-auto' : 'text-left max-w-3xl'
      } mb-14 sm:mb-16 ${className}`}
    >
      <SectionBadge>{eyebrow}</SectionBadge>
      <h2 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight leading-[1.15]">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 text-slate-300 text-base sm:text-lg leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
};
