'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { 
  Home, 
  Wand2, 
  Image as ImageIcon, 
  Menu,
  X,
  CreditCard
} from 'lucide-react';
import Logo from '@/components/Logo';
import UserAuth from '@/components/UserAuth';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const navigation = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'Generate', href: '/generate', icon: Wand2 },
    { name: 'Gallery', href: '/gallery', icon: ImageIcon },
    { name: 'Pricing', href: '/pricing', icon: CreditCard },
  ];

  const isActive = (href: string) => {
    if (href === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(href);
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Logo size="md" />

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 relative group ${
                  isActive(item.href)
                    ? 'text-anime-600'
                    : 'text-gray-700 hover:text-anime-500'
                }`}
              >
                <item.icon className="w-4 h-4" />
                <span>{item.name}</span>
                {isActive(item.href) && (
                  <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-anime-500 rounded-full"></div>
                )}
                <span className="absolute -bottom-2 left-0 w-0 h-0.5 bg-anime-500 transition-all group-hover:w-full"></span>
              </Link>
            ))}
          </div>

          {/* Desktop Auth */}
          <div className="hidden md:flex">
            <UserAuth />
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X className="w-5 w-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden border-t border-gray-200 bg-white/95 backdrop-blur-sm">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center space-x-2 px-3 py-2 rounded-md text-base font-medium transition-colors ${
                  isActive(item.href)
                    ? 'bg-anime-50 text-anime-600'
                    : 'text-gray-700 hover:text-anime-500 hover:bg-gray-50'
                }`}
                onClick={() => setIsOpen(false)}
              >
                <item.icon className="w-5 h-5" />
                <span>{item.name}</span>
              </Link>
            ))}
            
            <div className="border-t border-gray-200 pt-4 mt-4">
              <div className="px-3 py-2">
                <UserAuth />
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
