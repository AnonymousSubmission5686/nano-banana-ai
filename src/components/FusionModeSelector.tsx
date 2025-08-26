'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Users, 
  User, 
  MapPin, 
  Zap,
  Crown,
  Sparkles,
  Info
} from 'lucide-react';

interface FusionMode {
  id: string;
  name: string;
  description: string;
  icon: JSX.Element;
  features: string[];
  difficulty: 'easy' | 'medium' | 'hard';
  creditCost: number;
  isPopular?: boolean;
  isPremium?: boolean;
}

interface FusionModeSelectorProps {
  selectedMode: string;
  onSelectMode: (mode: string) => void;
}

export default function FusionModeSelector({ selectedMode, onSelectMode }: FusionModeSelectorProps) {
  const [showDetails, setShowDetails] = useState<string | null>(null);

  const fusionModes: FusionMode[] = [
    {
      id: 'group-photo',
      name: 'Group Photo Fusion',
      description: 'Add anime characters to your photos for epic group shots',
      icon: <Users className="w-8 h-8" />,
      features: [
        'Multiple character support',
        'Automatic position detection',
        'Lighting and shadow matching',
        'Natural interaction poses'
      ],
      difficulty: 'easy',
      creditCost: 1,
      isPopular: true
    },
    {
      id: 'character-replacement',
      name: 'Character Replacement',
      description: 'Transform yourself into your favorite anime character',
      icon: <User className="w-8 h-8" />,
      features: [
        'Face structure adaptation',
        'Style transfer technology',
        'Expression preservation',
        'Costume and accessory integration'
      ],
      difficulty: 'medium',
      creditCost: 2,
      isPremium: true
    },
    {
      id: 'scene-integration',
      name: 'Scene Integration',
      description: 'Place yourself in iconic anime scenes and backgrounds',
      icon: <MapPin className="w-8 h-8" />,
      features: [
        'Background replacement',
        'Perspective matching',
        'Atmospheric effects',
        'Seasonal and time variations'
      ],
      difficulty: 'medium',
      creditCost: 2
    },
    {
      id: 'interactive-effects',
      name: 'Interactive Effects',
      description: 'Add magical anime effects and powers to your photos',
      icon: <Zap className="w-8 h-8" />,
      features: [
        'Energy auras and effects',
        'Particle systems',
        'Dynamic lighting',
        'Motion blur and action effects'
      ],
      difficulty: 'hard',
      creditCost: 3,
      isPremium: true
    }
  ];

  const difficultyColors = {
    easy: 'bg-green-100 text-green-800',
    medium: 'bg-yellow-100 text-yellow-800',
    hard: 'bg-red-100 text-red-800'
  };

  const difficultyLabels = {
    easy: 'Easy',
    medium: 'Medium',
    hard: 'Hard'
  };

  const getDifficultyInfo = (difficulty: string) => {
    const info = {
      easy: {
        description: 'Perfect for beginners, quick and reliable results',
        estimatedTime: '15-20 seconds'
      },
      medium: {
        description: 'Moderate complexity with enhanced customization',
        estimatedTime: '20-30 seconds'
      },
      hard: {
        description: 'Advanced features with professional quality results',
        estimatedTime: '30-45 seconds'
      }
    };
    return info[difficulty as keyof typeof info] || info.easy;
  };

  return (
    <div className="space-y-4">
      {/* Simple Grid Selection */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {fusionModes.map((mode) => (
          <div
            key={mode.id}
            className={`relative p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
              selectedMode === mode.id
                ? 'border-anime-500 bg-anime-50 shadow-md'
                : 'border-gray-200 hover:border-anime-300 hover:shadow-sm'
            }`}
            onClick={() => onSelectMode(mode.id)}
          >
            {/* Premium Badge */}
            {mode.isPremium && (
              <div className="absolute -top-2 -right-2">
                <Crown className="w-4 h-4 text-orange-500 bg-white rounded-full p-0.5 border" />
              </div>
            )}
            
            {/* Popular Badge */}
            {mode.isPopular && (
              <div className="absolute -top-2 -left-2">
                <Badge className="bg-anime-500 text-white text-xs px-2 py-0.5">
                  Hot
                </Badge>
              </div>
            )}

            {/* Icon */}
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-2 mx-auto ${
              selectedMode === mode.id
                ? 'bg-anime-500 text-white'
                : 'bg-gray-100 text-gray-600'
            }`}>
              {mode.icon}
            </div>

            {/* Name */}
            <h3 className="text-sm font-medium text-center text-gray-900 mb-1">
              {mode.name}
            </h3>

            {/* Credit Cost */}
            <div className="text-center">
              <Badge variant="outline" className="text-xs">
                {mode.creditCost} credit{mode.creditCost > 1 ? 's' : ''}
              </Badge>
            </div>
          </div>
        ))}
      </div>

      {/* Selected Mode Info */}
      {selectedMode && (
        <div className="bg-anime-50 border border-anime-200 rounded-lg p-3">
          {(() => {
            const mode = fusionModes.find(m => m.id === selectedMode);
            return mode ? (
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-anime-500 text-white flex items-center justify-center flex-shrink-0">
                  {mode.icon}
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-anime-900">{mode.name}</h4>
                  <p className="text-sm text-anime-700">{mode.description}</p>
                </div>
                <Badge variant="outline" className="text-xs">
                  {mode.creditCost} credit{mode.creditCost > 1 ? 's' : ''}
                </Badge>
              </div>
            ) : null;
          })()}
        </div>
      )}
    </div>
  );
}