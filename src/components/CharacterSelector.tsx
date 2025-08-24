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
  onCharacterSelect: (characterId: string) => void;
  fusionMode: string;
}

export default function CharacterSelector({ selectedCharacter, onCharacterSelect, fusionMode }: CharacterSelectorProps) {
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

      {/* Character Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredCharacters.map((character) => (
          <Card
            key={character.id}
            className={`cursor-pointer transition-all duration-200 hover:shadow-lg card-hover ${
              selectedCharacter === character.id
                ? 'ring-2 ring-anime-500 bg-anime-50'
                : 'hover:scale-105'
            } ${character.isPremium ? 'border-orange-200' : ''}`}
            onClick={() => onCharacterSelect(character.id)}
          >
            <CardContent className="p-4">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${
                    selectedCharacter === character.id
                      ? 'bg-anime-500 text-white'
                      : character.isPremium
                      ? 'bg-orange-100 text-orange-600'
                      : 'bg-gray-100 text-gray-600'
                  }`}>
                    {character.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{character.name}</h3>
                    <p className="text-sm text-gray-600">{character.description}</p>
                  </div>
                </div>
                {character.isPremium && (
                  <Crown className="w-5 h-5 text-orange-500" />
                )}
              </div>
              
              <div className="flex items-center justify-between">
                <Badge 
                  className={`text-xs ${rarityColors[character.rarity]}`}
                >
                  {character.rarity.charAt(0).toUpperCase() + character.rarity.slice(1)}
                </Badge>
                
                {recommendedCharacters.includes(character.id) && (
                  <Badge variant="outline" className="text-xs border-blue-300 text-blue-700">
                    Recommended
                  </Badge>
                )}
              </div>
              
              {character.isPremium && (
                <div className="mt-2 text-xs text-orange-600 bg-orange-50 px-2 py-1 rounded">
                  Premium Character
                </div>
              )}
            </CardContent>
          </Card>
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