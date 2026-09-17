import React from 'react';

interface IconContainerProps {
  children: React.ReactNode;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  activeOnHover?: boolean;
}

export const IconContainer: React.FC<IconContainerProps> = ({
  children,
  className = '',
  size = 'md',
  activeOnHover = true,
}) => {
  const sizeClasses = {
    sm: 'w-10 h-10 rounded-xl',
    md: 'w-12 h-12 rounded-xl',
    lg: 'w-14 h-14 rounded-2xl',
  };

  return (
    <div
      className={`${sizeClasses[size]} bg-blue-500/10 border border-blue-500/25 flex items-center justify-center text-sky-400 transition-all duration-300 shadow-sm shrink-0 ${
        activeOnHover
          ? 'group-hover:bg-blue-600/20 group-hover:text-sky-300 group-hover:border-blue-400/50 group-hover:shadow-[0_0_15px_rgba(59,130,246,0.3)]'
          : ''
      } ${className}`}
    >
      {children}
    </div>
  );
};
