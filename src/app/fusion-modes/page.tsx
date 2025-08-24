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
  Info,
  Clock,
  Star,
  TrendingUp
} from 'lucide-react';
import { animeFusionService } from '@/lib/animeFusionService';
import Navigation from '@/components/Navigation';
import { pageSEO, generateStructuredData } from '@/lib/seo';
import Head from 'next/head';

export default function FusionModesPage() {
  const [selectedMode, setSelectedMode] = useState<string | null>(null);
  const [showComparison, setShowComparison] = useState(false);

  const fusionModes = animeFusionService.getAllFusionModes();

  const getDifficultyColor = (difficulty: string) => {
    const colors = {
      easy: 'bg-green-100 text-green-800',
      medium: 'bg-yellow-100 text-yellow-800',
      hard: 'bg-red-100 text-red-800'
    };
    return colors[difficulty as keyof typeof colors] || colors.easy;
  };

  const getDifficultyInfo = (difficulty: string) => {
    const info = {
      easy: {
        description: 'Perfect for beginners, quick and reliable results',
        estimatedTime: '15-20 seconds',
        successRate: '95%'
      },
      medium: {
        description: 'Moderate complexity with enhanced customization',
        estimatedTime: '20-30 seconds',
        successRate: '88%'
      },
      hard: {
        description: 'Advanced features with professional quality results',
        estimatedTime: '30-45 seconds',
        successRate: '82%'
      }
    };
    return info[difficulty as keyof typeof info] || info.easy;
  };

  const getModeIcon = (modeId: string) => {
    const icons = {
      'group-photo': <Users className="w-8 h-8" />,
      'character-replacement': <User className="w-8 h-8" />,
      'scene-integration': <MapPin className="w-8 h-8" />,
      'interactive-effects': <Zap className="w-8 h-8" />
    };
    return icons[modeId as keyof typeof icons] || <Sparkles className="w-8 h-8" />;
  };

  const getRecommendedCharacters = (modeId: string) => {
    return animeFusionService.getRecommendedCharacters(modeId);
  };

  return (
    <div className="min-h-screen hero-gradient">
      <Head>
        <title>{pageSEO.fusionModes.title}</title>
        <meta name="description" content={pageSEO.fusionModes.description} />
        <meta name="keywords" content={pageSEO.fusionModes.keywords.join(', ')} />
        <meta property="og:title" content={pageSEO.fusionModes.title} />
        <meta property="og:description" content={pageSEO.fusionModes.description} />
        <meta property="og:type" content="website" />
        <meta name="twitter:title" content={pageSEO.fusionModes.title} />
        <meta name="twitter:description" content={pageSEO.fusionModes.description} />
        <meta name="twitter:card" content="summary_large_image" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(generateStructuredData('fusion-modes')),
          }}
        />
      </Head>
      <Navigation />
      
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Fusion Modes
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Explore different ways to fuse your photos with anime characters
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-anime-500 mb-2">
                {fusionModes.length}
              </div>
              <div className="text-sm text-gray-600">Fusion Modes</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-green-500 mb-2">
                {fusionModes.filter(m => !m.isPremium).length}
              </div>
              <div className="text-sm text-gray-600">Free Modes</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-orange-500 mb-2">
                {fusionModes.filter(m => m.isPremium).length}
              </div>
              <div className="text-sm text-gray-600">Premium Modes</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-purple-500 mb-2">
                {Math.round(fusionModes.reduce((acc, mode) => acc + (mode.difficulty === 'easy' ? 95 : mode.difficulty === 'medium' ? 88 : 82), 0) / fusionModes.length)}%
              </div>
              <div className="text-sm text-gray-600">Avg Success Rate</div>
            </CardContent>
          </Card>
        </div>

        {/* Comparison Toggle */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Compare Fusion Modes</h2>
              <p className="text-gray-600">View detailed comparison of all fusion modes</p>
            </div>
            <Button 
              onClick={() => setShowComparison(!showComparison)}
              variant="outline"
              className="flex items-center gap-2"
            >
              <TrendingUp className="w-4 h-4" />
              {showComparison ? 'Hide Comparison' : 'Show Comparison'}
            </Button>
          </div>
        </div>

        {/* Fusion Modes Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {fusionModes.map((mode) => (
            <div key={mode.id} className="space-y-4">
              <Card 
                className={`cursor-pointer transition-all duration-200 hover:shadow-lg card-hover ${
                  selectedMode === mode.id ? 'ring-2 ring-anime-500 bg-anime-50' : ''
                } ${mode.isPremium ? 'border-orange-200' : ''}`}
                onClick={() => setSelectedMode(selectedMode === mode.id ? null : mode.id)}
              >
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-4">
                      <div className={`p-3 rounded-lg ${
                        selectedMode === mode.id
                          ? 'bg-anime-500 text-white'
                          : mode.isPremium
                          ? 'bg-orange-100 text-orange-600'
                          : 'bg-gray-100 text-gray-600'
                      }`}>
                        {getModeIcon(mode.id)}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <CardTitle className="text-xl">{mode.name}</CardTitle>
                          {mode.isPremium && (
                            <Crown className="w-5 h-5 text-orange-500" />
                          )}
                        </div>
                        <p className="text-gray-600">{mode.description}</p>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="pt-0">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Badge className={`text-sm ${getDifficultyColor(mode.difficulty)}`}>
                          {mode.difficulty.charAt(0).toUpperCase() + mode.difficulty.slice(1)}
                        </Badge>
                        <Badge variant="outline" className="text-sm">
                          {mode.creditCost} credit{mode.creditCost > 1 ? 's' : ''}
                        </Badge>
                      </div>
                      
                      <div className="flex items-center gap-1 text-sm text-gray-500">
                        <Clock className="w-4 h-4" />
                        <span>{getDifficultyInfo(mode.difficulty).estimatedTime}</span>
                      </div>
                    </div>
                    
                    {mode.isPremium && (
                      <div className="bg-orange-50 border border-orange-200 rounded-lg p-3">
                        <div className="flex items-center gap-2 text-orange-700 mb-1">
                          <Crown className="w-4 h-4" />
                          <span className="text-sm font-medium">Premium Mode</span>
                        </div>
                        <p className="text-xs text-orange-600">
                          Requires Anime Fan plan or higher
                        </p>
                      </div>
                    )}
                    
                    {/* Success Rate */}
                    <div className="flex items-center gap-2">
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-green-500 h-2 rounded-full" 
                          style={{ width: getDifficultyInfo(mode.difficulty).successRate }}
                        ></div>
                      </div>
                      <span className="text-sm text-gray-600">
                        {getDifficultyInfo(mode.difficulty).successRate} success rate
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Detailed Information */}
              {selectedMode === mode.id && (
                <Card className="border-blue-200 bg-blue-50">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg flex items-center gap-2 text-blue-900">
                      <Info className="w-5 h-5" />
                      {mode.name} Details
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Mode Information */}
                    <div>
                      <h4 className="font-medium text-blue-900 mb-3">Mode Details</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-white rounded-lg p-4">
                          <div className="flex items-center gap-2 mb-2">
                            <Clock className="w-4 h-4 text-blue-600" />
                            <span className="font-medium text-blue-900">Processing Time</span>
                          </div>
                          <p className="text-sm text-gray-700">{getDifficultyInfo(mode.difficulty).estimatedTime}</p>
                        </div>
                        <div className="bg-white rounded-lg p-4">
                          <div className="flex items-center gap-2 mb-2">
                            <Star className="w-4 h-4 text-blue-600" />
                            <span className="font-medium text-blue-900">Success Rate</span>
                          </div>
                          <p className="text-sm text-gray-700">{getDifficultyInfo(mode.difficulty).successRate}</p>
                        </div>
                      </div>
                    </div>

                    {/* Description */}
                    <div>
                      <h4 className="font-medium text-blue-900 mb-2">What This Mode Does</h4>
                      <p className="text-sm text-gray-700 bg-white rounded-lg p-4">
                        {getDifficultyInfo(mode.difficulty).description}
                      </p>
                    </div>

                    {/* Recommended Characters */}
                    <div>
                      <h4 className="font-medium text-blue-900 mb-3">Recommended Characters</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {getRecommendedCharacters(mode.id).map((character) => (
                          <div key={character.id} className="bg-white rounded-lg p-3 flex items-center gap-3">
                            <div className={`p-2 rounded-lg ${
                              character.isPremium ? 'bg-orange-100 text-orange-600' : 'bg-gray-100 text-gray-600'
                            }`}>
                              <Users className="w-4 h-4" />
                            </div>
                            <div className="flex-1">
                              <p className="font-medium text-sm text-gray-900">{character.name}</p>
                              <p className="text-xs text-gray-600">{character.category.replace('-', ' ')}</p>
                            </div>
                            {character.isPremium && (
                              <Crown className="w-4 h-4 text-orange-500" />
                            )}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Cost Information */}
                    <div>
                      <h4 className="font-medium text-blue-900 mb-2">Cost Information</h4>
                      <div className="bg-white rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-gray-600">Base Credit Cost:</span>
                          <span className="font-medium text-orange-600">{mode.creditCost} credit{mode.creditCost > 1 ? 's' : ''}</span>
                        </div>
                        {mode.isPremium && (
                          <div className="flex items-center justify-between">
                            <span className="text-gray-600">Required Plan:</span>
                            <span className="font-medium text-orange-600">Anime Fan or higher</span>
                          </div>
                        )}
                      </div>
                    </div>

                    <Button 
                      className="w-full bg-blue-500 hover:bg-blue-600 text-white"
                      onClick={() => {
                        // Navigate to home page with this mode selected
                        window.location.href = `/?mode=${mode.id}`;
                      }}
                    >
                      Try {mode.name}
                    </Button>
                  </CardContent>
                </Card>
              )}
            </div>
          ))}
        </div>

        {/* Comparison Table */}
        {showComparison && (
          <Card className="mt-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                Fusion Modes Comparison
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-3">Mode</th>
                      <th className="text-left p-3">Difficulty</th>
                      <th className="text-left p-3">Credit Cost</th>
                      <th className="text-left p-3">Time</th>
                      <th className="text-left p-3">Success Rate</th>
                      <th className="text-left p-3">Premium</th>
                    </tr>
                  </thead>
                  <tbody>
                    {fusionModes.map((mode) => (
                      <tr key={mode.id} className="border-b hover:bg-gray-50">
                        <td className="p-3 font-medium">{mode.name}</td>
                        <td className="p-3">
                          <Badge className={`text-xs ${getDifficultyColor(mode.difficulty)}`}>
                            {mode.difficulty.charAt(0).toUpperCase() + mode.difficulty.slice(1)}
                          </Badge>
                        </td>
                        <td className="p-3">{mode.creditCost} credits</td>
                        <td className="p-3">{getDifficultyInfo(mode.difficulty).estimatedTime}</td>
                        <td className="p-3">{getDifficultyInfo(mode.difficulty).successRate}</td>
                        <td className="p-3">
                          {mode.isPremium ? (
                            <Badge className="bg-orange-100 text-orange-800 text-xs">Yes</Badge>
                          ) : (
                            <Badge className="bg-green-100 text-green-800 text-xs">Free</Badge>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}