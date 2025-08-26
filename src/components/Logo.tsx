'use client';

import { Wand2, Sparkles } from 'lucide-react';
import Link from 'next/link';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
  className?: string;
}

export default function Logo({ size = 'md', showText = true, className = '' }: LogoProps) {
  const sizeClasses = {
    sm: 'text-lg',
    md: 'text-xl', 
    lg: 'text-2xl'
  };

  const iconSizes = {
    sm: 'w-5 h-5',
    md: 'w-6 h-6',
    lg: 'w-8 h-8'
  };

  return (
    <Link href="/" className={`flex items-center gap-2 hover:opacity-80 transition-opacity ${className}`}>
      <div className="relative">
        <Wand2 className={`${iconSizes[size]} text-anime-500`} />
        <Sparkles className="w-3 h-3 text-yellow-400 absolute -top-1 -right-1 animate-pulse" />
      </div>
      {showText && (
        <div className={`font-bold ${sizeClasses[size]} gradient-text`}>
          Anime Fusion AI
        </div>
      )}
    </Link>
  );
}
