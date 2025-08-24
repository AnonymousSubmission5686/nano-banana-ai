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
  onModeSelect: (modeId: string) => void;
}

export default function FusionModeSelector({ selectedMode, onModeSelect }: FusionModeSelectorProps) {
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
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Choose Your Fusion Mode</h2>
        <p className="text-gray-600">Select how you want to fuse your photo with anime characters</p>
      </div>

      {/* Fusion Mode Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {fusionModes.map((mode) => (
          <div key={mode.id} className="space-y-3">
            <Card
              className={`cursor-pointer transition-all duration-200 hover:shadow-lg card-hover ${
                selectedMode === mode.id
                  ? 'ring-2 ring-anime-500 bg-anime-50'
                  : 'hover:scale-105'
              } ${mode.isPremium ? 'border-orange-200' : ''}`}
              onClick={() => onModeSelect(mode.id)}
            >
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${
                      selectedMode === mode.id
                        ? 'bg-anime-500 text-white'
                        : mode.isPremium
                        ? 'bg-orange-100 text-orange-600'
                        : 'bg-gray-100 text-gray-600'
                    }`}>
                      {mode.icon}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-gray-900">{mode.name}</h3>
                        {mode.isPopular && (
                          <Badge className="bg-anime-500 text-white text-xs">
                            Popular
                          </Badge>
                        )}
                        {mode.isPremium && (
                          <Crown className="w-4 h-4 text-orange-500" />
                        )}
                      </div>
                      <p className="text-sm text-gray-600">{mode.description}</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Badge className={`text-xs ${difficultyColors[mode.difficulty]}`}>
                      {difficultyLabels[mode.difficulty]}
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      {mode.creditCost} credit{mode.creditCost > 1 ? 's' : ''}
                    </Badge>
                  </div>
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowDetails(showDetails === mode.id ? null : mode.id);
                    }}
                  >
                    <Info className="w-4 h-4" />
                  </Button>
                </div>

                {/* Quick Features Preview */}
                <div className="flex flex-wrap gap-1">
                  {mode.features.slice(0, 2).map((feature, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {feature}
                    </Badge>
                  ))}
                  {mode.features.length > 2 && (
                    <Badge variant="secondary" className="text-xs">
                      +{mode.features.length - 2} more
                    </Badge>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Detailed Information */}
            {showDetails === mode.id && (
              <Card className="border-blue-200 bg-blue-50">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center gap-2 text-blue-900">
                    <Sparkles className="w-5 h-5" />
                    {mode.name} Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-medium text-blue-900 mb-2">Difficulty Information</h4>
                    <div className="bg-white rounded-lg p-3">
                      <p className="text-sm text-gray-700 mb-1">
                        {getDifficultyInfo(mode.difficulty).description}
                      </p>
                      <p className="text-xs text-gray-500">
                        Estimated time: {getDifficultyInfo(mode.difficulty).estimatedTime}
                      </p>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-blue-900 mb-2">All Features</h4>
                    <div className="space-y-2">
                      {mode.features.map((feature, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                          <span className="text-sm text-gray-700">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-blue-900 mb-2">Requirements</h4>
                    <div className="bg-white rounded-lg p-3">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Credit Cost:</span>
                        <span className="font-medium text-orange-600">{mode.creditCost} credit{mode.creditCost > 1 ? 's' : ''}</span>
                      </div>
                      {mode.isPremium && (
                        <div className="flex items-center justify-between text-sm mt-1">
                          <span className="text-gray-600">Required Plan:</span>
                          <span className="font-medium text-orange-600">Anime Fan or higher</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <Button
                    className="w-full bg-blue-500 hover:bg-blue-600 text-white"
                    onClick={() => {
                      onModeSelect(mode.id);
                      setShowDetails(null);
                    }}
                  >
                    Select {mode.name}
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        ))}
      </div>

      {/* Selected Mode Display */}
      {selectedMode && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="w-5 h-5 text-green-600" />
            <h3 className="font-semibold text-green-900">Selected Fusion Mode</h3>
          </div>
          {(() => {
            const mode = fusionModes.find(m => m.id === selectedMode);
            return mode ? (
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-green-100 text-green-600">
                  {mode.icon}
                </div>
                <div className="flex-1">
                  <p className="font-medium text-green-900">{mode.name}</p>
                  <p className="text-sm text-green-700 mb-2">{mode.description}</p>
                  <div className="flex items-center gap-2">
                    <Badge className={`text-xs ${difficultyColors[mode.difficulty]}`}>
                      {difficultyLabels[mode.difficulty]}
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      {mode.creditCost} credit{mode.creditCost > 1 ? 's' : ''}
                    </Badge>
                  </div>
                </div>
              </div>
            ) : null;
          })()}
        </div>
      )}
    </div>
  );
}