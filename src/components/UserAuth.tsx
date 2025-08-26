'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { User, LogOut, CreditCard, Settings, Mail } from 'lucide-react';
import { useAppStore } from '@/lib/store';

export default function UserAuth() {
  const { user, setUser } = useAppStore();
  const [isLoading, setIsLoading] = useState(false);

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    try {
      // Simulate Gmail OAuth login
      // In real implementation, this would use NextAuth.js
      const mockUser = {
        id: 'user_' + Date.now(),
        email: 'user@gmail.com',
        name: 'Anime Fan',
        avatar: 'https://ui-avatars.com/api/?name=Anime+Fan&background=6366f1&color=fff',
        credits: 10,
        subscription: 'free' as const,
        createdAt: new Date(),
        updatedAt: new Date(),
        lastLoginAt: new Date()
      };
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setUser(mockUser);
    } catch (error) {
      console.error('Sign in error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignOut = () => {
    setUser(null);
  };

  if (user) {
    return (
      <div className="flex items-center gap-4">
        {/* Credits Display */}
        <div className="hidden sm:flex items-center gap-2 bg-anime-50 px-3 py-1 rounded-full">
          <CreditCard className="w-4 h-4 text-anime-600" />
          <span className="text-sm font-medium text-anime-700">
            {user.credits} credits
          </span>
        </div>

        {/* User Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-10 w-10 rounded-full">
              <Avatar className="h-10 w-10">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback className="bg-anime-500 text-white">
                  <User className="h-5 w-5" />
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end" forceMount>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">{user.name}</p>
                <p className="text-xs leading-none text-muted-foreground">
                  {user.email}
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            
            <DropdownMenuItem className="sm:hidden">
              <CreditCard className="mr-2 h-4 w-4" />
              <span>{user.credits} Credits</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator className="sm:hidden" />
            
            <DropdownMenuItem>
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <CreditCard className="mr-2 h-4 w-4" />
              <span>Billing</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleSignOut}>
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-3">
      <Button 
        variant="outline" 
        onClick={handleGoogleSignIn}
        disabled={isLoading}
        className="flex items-center gap-2"
      >
        {isLoading ? (
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-500"></div>
        ) : (
          <Mail className="w-4 h-4" />
        )}
        {isLoading ? 'Signing in...' : 'Sign In'}
      </Button>
      <Button 
        className="anime-button"
        onClick={handleGoogleSignIn}
        disabled={isLoading}
      >
        Get Started
      </Button>
    </div>
  );
}
