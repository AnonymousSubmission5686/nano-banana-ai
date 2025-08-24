'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Users, 
  Crown, 
  Star, 
  Sword,
  Heart,
  Map,
  Camera,
  Filter,
  Search
} from 'lucide-react';
import { animeFusionService } from '@/lib/animeFusionService';
import Navigation from '@/components/Navigation';
import { pageSEO, generateStructuredData } from '@/lib/seo';
import Head from 'next/head';

export default function CharactersPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedRarity, setSelectedRarity] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');

  const characters = animeFusionService.getAllCharacters();
  const categories = ['all', 'popular', 'zhong-kui', 'classic', 'modern'];
  const rarities = ['all', 'common', 'rare', 'epic', 'legendary'];

  const filteredCharacters = characters.filter(char => {
    const matchesCategory = selectedCategory === 'all' || char.category === selectedCategory;
    const matchesRarity = selectedRarity === 'all' || char.rarity === selectedRarity;
    const matchesSearch = char.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         char.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesCategory && matchesRarity && matchesSearch;
  });

  const rarityColors = {
    common: 'bg-gray-100 text-gray-800',
    rare: 'bg-blue-100 text-blue-800',
    epic: 'bg-purple-100 text-purple-800',
    legendary: 'bg-orange-100 text-orange-800'
  };

  const rarityIcons = {
    common: <Star className="w-4 h-4" />,
    rare: <Star className="w-4 h-4" />,
    epic: <Crown className="w-4 h-4" />,
    legendary: <Crown className="w-4 h-4" />
  };

  const getCategoryIcon = (category: string) => {
    const icons = {
      popular: <Heart className="w-5 h-5" />,
      'zhong-kui': <Sword className="w-5 h-5" />,
      classic: <Map className="w-5 h-5" />,
      modern: <Camera className="w-5 h-5" />
    };
    return icons[category as keyof typeof icons] || <Star className="w-5 h-5" />;
  };

  return (
    <div className="min-h-screen hero-gradient">
      <Head>
        <title>{pageSEO.characters.title}</title>
        <meta name="description" content={pageSEO.characters.description} />
        <meta name="keywords" content={pageSEO.characters.keywords.join(', ')} />
        <meta property="og:title" content={pageSEO.characters.title} />
        <meta property="og:description" content={pageSEO.characters.description} />
        <meta property="og:type" content="website" />
        <meta name="twitter:title" content={pageSEO.characters.title} />
        <meta name="twitter:description" content={pageSEO.characters.description} />
        <meta name="twitter:card" content="summary_large_image" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(generateStructuredData('characters')),
          }}
        />
      </Head>
      <Navigation />
      
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Anime Characters Collection
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Discover and choose from our extensive collection of anime characters for magical fusions
            </p>
            
            {/* Search Bar */}
            <div className="max-w-md mx-auto relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search characters..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-anime-500 focus:border-transparent"
              />
            </div>
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
                {characters.length}
              </div>
              <div className="text-sm text-gray-600">Total Characters</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-orange-500 mb-2">
                {characters.filter(c => c.isPremium).length}
              </div>
              <div className="text-sm text-gray-600">Premium Characters</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-purple-500 mb-2">
                {characters.filter(c => c.category === 'zhong-kui').length}
              </div>
              <div className="text-sm text-gray-600">Zhong Kui Variants</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-blue-500 mb-2">
                {characters.filter(c => c.rarity === 'legendary').length}
              </div>
              <div className="text-sm text-gray-600">Legendary Characters</div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex flex-wrap items-center gap-4 mb-4">
            <Filter className="w-5 h-5 text-gray-500" />
            <span className="font-medium text-gray-700">Filters:</span>
            
            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className="flex items-center gap-2"
                >
                  {category !== 'all' && getCategoryIcon(category)}
                  {category.charAt(0).toUpperCase() + category.slice(1).replace('-', ' ')}
                  <Badge variant="secondary" className="text-xs">
                    {category === 'all' ? characters.length : characters.filter(c => c.category === category).length}
                  </Badge>
                </Button>
              ))}
            </div>
          </div>

          {/* Rarity Filter */}
          <div className="flex flex-wrap items-center gap-4">
            <span className="font-medium text-gray-700">Rarity:</span>
            <div className="flex flex-wrap gap-2">
              {rarities.map((rarity) => (
                <Button
                  key={rarity}
                  variant={selectedRarity === rarity ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedRarity(rarity)}
                  className="flex items-center gap-2"
                >
                  {rarity !== 'all' && rarityIcons[rarity as keyof typeof rarityIcons]}
                  {rarity.charAt(0).toUpperCase() + rarity.slice(1)}
                  <Badge variant="secondary" className="text-xs">
                    {rarity === 'all' ? characters.length : characters.filter(c => c.rarity === rarity).length}
                  </Badge>
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Character Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredCharacters.map((character) => (
            <Card
              key={character.id}
              className={`hover:shadow-lg transition-all duration-200 card-hover ${
                character.isPremium ? 'border-orange-200' : ''
              }`}
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`p-3 rounded-lg ${
                      character.isPremium 
                        ? 'bg-orange-100 text-orange-600' 
                        : 'bg-gray-100 text-gray-600'
                    }`}>
                      {getCategoryIcon(character.category)}
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-lg">{character.name}</CardTitle>
                      <p className="text-sm text-gray-600 mt-1">{character.description}</p>
                    </div>
                  </div>
                  {character.isPremium && (
                    <Crown className="w-5 h-5 text-orange-500" />
                  )}
                </div>
              </CardHeader>
              
              <CardContent className="pt-0">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Badge className={`text-xs ${rarityColors[character.rarity]}`}>
                      {character.rarity.charAt(0).toUpperCase() + character.rarity.slice(1)}
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      {character.creditCost} credit{character.creditCost > 1 ? 's' : ''}
                    </Badge>
                  </div>
                  
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Users className="w-4 h-4" />
                    <span>{character.category.replace('-', ' ')}</span>
                  </div>
                  
                  {character.isPremium && (
                    <div className="bg-orange-50 border border-orange-200 rounded-lg p-2">
                      <div className="flex items-center gap-2 text-orange-700">
                        <Crown className="w-4 h-4" />
                        <span className="text-xs font-medium">Premium Character</span>
                      </div>
                      <p className="text-xs text-orange-600 mt-1">
                        Requires Anime Fan plan or higher
                      </p>
                    </div>
                  )}
                  
                  <Button 
                    className="w-full anime-button"
                    size="sm"
                  >
                    Select Character
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* No Results */}
        {filteredCharacters.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Search className="w-16 h-16 mx-auto" />
            </div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No characters found</h3>
            <p className="text-gray-500">Try adjusting your filters or search terms</p>
          </div>
        )}
      </div>
    </div>
  );
}