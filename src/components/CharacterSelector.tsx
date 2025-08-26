'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Crown, 
  Star, 
  Sparkles, 
  Sword,
  Heart,
  Users,
  Map,
  Camera
} from 'lucide-react';

interface AnimeCharacter {
  id: string;
  name: string;
  description: string;
  category: 'popular' | 'zhong-kui' | 'classic' | 'modern';
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  icon: JSX.Element;
  isPremium?: boolean;
}

interface CharacterSelectorProps {
  selectedCharacter: string;
  onSelectCharacter: (character: string) => void;
  fusionMode?: string;
}

export default function CharacterSelector({ selectedCharacter, onSelectCharacter, fusionMode = '' }: CharacterSelectorProps) {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  
  const characters: AnimeCharacter[] = [
    {
      id: 'zhong-kui-warrior',
      name: 'Zhong Kui Warrior',
      description: 'Legendary demon hunter with traditional Chinese armor and sword',
      category: 'zhong-kui',
      rarity: 'legendary',
      icon: <Sword className="w-8 h-8" />,
      isPremium: true
    },
    {
      id: 'zhong-kui-guardian',
      name: 'Zhong Kui Guardian',
      description: 'Mystical guardian form with spiritual energy and protective aura',
      category: 'zhong-kui',
      rarity: 'epic',
      icon: <Crown className="w-8 h-8" />,
      isPremium: true
    },
    {
      id: 'sakura-dreamer',
      name: 'Sakura Dreamer',
      description: 'Gentle anime character with cherry blossom aesthetic',
      category: 'popular',
      rarity: 'rare',
      icon: <Sparkles className="w-8 h-8" />
    },
    {
      id: 'ninja-shadow',
      name: 'Ninja Shadow',
      description: 'Mysterious ninja character with stealth abilities',
      category: 'classic',
      rarity: 'rare',
      icon: <Users className="w-8 h-8" />
    },
    {
      id: 'magical-girl',
      name: 'Magical Girl',
      description: 'Classic magical anime character with transformation powers',
      category: 'popular',
      rarity: 'common',
      icon: <Heart className="w-8 h-8" />
    },
    {
      id: 'samurai-spirit',
      name: 'Samurai Spirit',
      description: 'Honorable samurai with traditional katana and armor',
      category: 'classic',
      rarity: 'epic',
      icon: <Map className="w-8 h-8" />
    },
    {
      id: 'cyber-hero',
      name: 'Cyber Hero',
      description: 'Futuristic anime character with neon cybernetic enhancements',
      category: 'modern',
      rarity: 'rare',
      icon: <Camera className="w-8 h-8" />
    },
    {
      id: 'school-idol',
      name: 'School Idol',
      description: 'Cheerful high school anime character with pop star dreams',
      category: 'popular',
      rarity: 'common',
      icon: <Star className="w-8 h-8" />
    }
  ];

  const categories = [
    { id: 'all', name: 'All Characters', count: characters.length },
    { id: 'popular', name: 'Popular', count: characters.filter(c => c.category === 'popular').length },
    { id: 'zhong-kui', name: 'Zhong Kui', count: characters.filter(c => c.category === 'zhong-kui').length },
    { id: 'classic', name: 'Classic', count: characters.filter(c => c.category === 'classic').length },
    { id: 'modern', name: 'Modern', count: characters.filter(c => c.category === 'modern').length }
  ];

  const rarityColors = {
    common: 'bg-gray-100 text-gray-800',
    rare: 'bg-blue-100 text-blue-800',
    epic: 'bg-purple-100 text-purple-800',
    legendary: 'bg-orange-100 text-orange-800'
  };

  const filteredCharacters = activeCategory === 'all' 
    ? characters 
    : characters.filter(char => char.category === activeCategory);

  const getRecommendedCharacters = () => {
    const recommendations: Record<string, string[]> = {
      'group-photo': ['sakura-dreamer', 'school-idol', 'ninja-shadow'],
      'character-replacement': ['zhong-kui-warrior', 'samurai-spirit', 'cyber-hero'],
      'scene-integration': ['zhong-kui-guardian', 'magical-girl', 'samurai-spirit'],
      'interactive-effects': ['cyber-hero', 'ninja-shadow', 'magical-girl']
    };
    return recommendations[fusionMode] || [];
  };

  const recommendedCharacters = getRecommendedCharacters();

  return (
    <div className="space-y-6">
      {/* Category Filter */}
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <Button
            key={category.id}
            variant={activeCategory === category.id ? "default" : "outline"}
            size="sm"
            onClick={() => setActiveCategory(category.id)}
            className="flex items-center gap-2"
          >
            {category.name}
            <Badge variant="secondary" className="text-xs">
              {category.count}
            </Badge>
          </Button>
        ))}
      </div>

      {/* Recommendation Banner */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-center gap-2 mb-2">
          <Star className="w-5 h-5 text-blue-600" />
          <h3 className="font-semibold text-blue-900">Recommended for {fusionMode.replace('-', ' ')}</h3>
        </div>
        <p className="text-sm text-blue-700 mb-3">
          These characters work best with your selected fusion mode
        </p>
        <div className="flex flex-wrap gap-2">
          {recommendedCharacters.map((charId) => {
            const char = characters.find(c => c.id === charId);
            return char ? (
              <Badge key={charId} variant="outline" className="border-blue-300 text-blue-700">
                {char.name}
              </Badge>
            ) : null;
          })}
        </div>
      </div>

      {/* Character Grid - Simplified */}
      <div className="grid grid-cols-3 md:grid-cols-6 lg:grid-cols-8 gap-3">
        {filteredCharacters.map((character) => (
          <div
            key={character.id}
            className={`relative p-3 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
              selectedCharacter === character.id
                ? 'border-anime-500 bg-anime-50 shadow-md'
                : 'border-gray-200 hover:border-anime-300 hover:shadow-sm'
            }`}
            onClick={() => onSelectCharacter(character.id)}
          >
            {/* Premium Badge */}
            {character.isPremium && (
              <div className="absolute -top-1 -right-1">
                <Crown className="w-3 h-3 text-orange-500 bg-white rounded-full p-0.5 border" />
              </div>
            )}
            
            {/* Recommended Dot */}
            {recommendedCharacters.includes(character.id) && (
              <div className="absolute -top-1 -left-1">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              </div>
            )}

            {/* Character Avatar */}
            <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-2 mx-auto ${
              selectedCharacter === character.id
                ? 'bg-anime-500 text-white'
                : character.rarity === 'legendary' ? 'bg-gradient-to-r from-yellow-400 to-orange-500 text-white' :
                character.rarity === 'epic' ? 'bg-gradient-to-r from-purple-400 to-pink-500 text-white' :
                character.rarity === 'rare' ? 'bg-gradient-to-r from-blue-400 to-cyan-500 text-white' :
                'bg-gray-100 text-gray-600'
            }`}>
              <div className="w-6 h-6">
                {character.icon}
              </div>
            </div>

            {/* Name */}
            <h3 className="text-xs font-medium text-center text-gray-900 mb-1 line-clamp-2">
              {character.name}
            </h3>

            {/* Rarity indicator */}
            <div className="text-center">
              <div className={`inline-block w-2 h-2 rounded-full ${
                character.rarity === 'legendary' ? 'bg-yellow-400' :
                character.rarity === 'epic' ? 'bg-purple-400' :
                character.rarity === 'rare' ? 'bg-blue-400' :
                'bg-gray-400'
              }`}></div>
            </div>
          </div>
        ))}
      </div>

      {/* Selected Character Display */}
      {selectedCharacter && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="w-5 h-5 text-green-600" />
            <h3 className="font-semibold text-green-900">Selected Character</h3>
          </div>
          {(() => {
            const char = characters.find(c => c.id === selectedCharacter);
            return char ? (
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-green-100 text-green-600">
                  {char.icon}
                </div>
                <div>
                  <p className="font-medium text-green-900">{char.name}</p>
                  <p className="text-sm text-green-700">{char.description}</p>
                </div>
              </div>
            ) : null;
          })()}
        </div>
      )}
    </div>
  );
}