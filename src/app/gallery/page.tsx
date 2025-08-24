'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Heart, 
  Share2, 
  Eye,
  Filter,
  Search,
  Sparkles,
  Users,
  MapPin,
  Zap,
  Crown
} from 'lucide-react';
import Navigation from '@/components/Navigation';
import { pageSEO, generateStructuredData } from '@/lib/seo';
import Head from 'next/head';

interface FusionExample {
  id: string;
  title: string;
  description: string;
  character: string;
  fusionMode: string;
  imageUrl: string;
  likes: number;
  views: number;
  tags: string[];
  isPremium: boolean;
  processingTime: number;
  creditCost: number;
}

export default function GalleryPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [sortBy, setSortBy] = useState<string>('popular');

  const fusionExamples: FusionExample[] = [
    {
      id: '1',
      title: 'Warrior Spirit Fusion',
      description: 'Transformed with Zhong Kui Warrior in traditional Japanese setting',
      character: 'Zhong Kui Warrior',
      fusionMode: 'Character Replacement',
      imageUrl: '/api/placeholder/400/300',
      likes: 2847,
      views: 15420,
      tags: ['zhong-kui', 'warrior', 'traditional'],
      isPremium: true,
      processingTime: 25,
      creditCost: 5
    },
    {
      id: '2',
      title: 'Sakura Group Photo',
      description: 'Magical group photo with Sakura Dreamer and friends',
      character: 'Sakura Dreamer',
      fusionMode: 'Group Photo',
      imageUrl: '/api/placeholder/400/300',
      likes: 1923,
      views: 8934,
      tags: ['sakura', 'group', 'magical'],
      isPremium: false,
      processingTime: 18,
      creditCost: 2
    },
    {
      id: '3',
      title: 'Cyber Ninja Effects',
      description: 'Futuristic ninja with interactive cyber effects',
      character: 'Ninja Shadow',
      fusionMode: 'Interactive Effects',
      imageUrl: '/api/placeholder/400/300',
      likes: 3156,
      views: 22341,
      tags: ['ninja', 'cyber', 'effects'],
      isPremium: true,
      processingTime: 32,
      creditCost: 4
    },
    {
      id: '4',
      title: 'Samurai Temple Scene',
      description: 'Honorable samurai integrated into ancient temple scene',
      character: 'Samurai Spirit',
      fusionMode: 'Scene Integration',
      imageUrl: '/api/placeholder/400/300',
      likes: 2456,
      views: 12890,
      tags: ['samurai', 'temple', 'scene'],
      isPremium: false,
      processingTime: 28,
      creditCost: 3
    },
    {
      id: '5',
      title: 'Magical Girl Transformation',
      description: 'Classic magical girl with sparkly transformation effects',
      character: 'Magical Girl',
      fusionMode: 'Character Replacement',
      imageUrl: '/api/placeholder/400/300',
      likes: 4123,
      views: 31256,
      tags: ['magical-girl', 'transformation', 'sparkles'],
      isPremium: false,
      processingTime: 22,
      creditCost: 3
    },
    {
      id: '6',
      title: 'Zhong Kui Guardian',
      description: 'Mystical guardian with spiritual energy aura',
      character: 'Zhong Kui Guardian',
      fusionMode: 'Interactive Effects',
      imageUrl: '/api/placeholder/400/300',
      likes: 3678,
      views: 28134,
      tags: ['zhong-kui', 'guardian', 'spiritual'],
      isPremium: true,
      processingTime: 35,
      creditCost: 5
    },
    {
      id: '7',
      title: 'School Idol Concert',
      description: 'Cheerful school idol in concert scene with stage effects',
      character: 'School Idol',
      fusionMode: 'Scene Integration',
      imageUrl: '/api/placeholder/400/300',
      likes: 2891,
      views: 16789,
      tags: ['school-idol', 'concert', 'stage'],
      isPremium: false,
      processingTime: 24,
      creditCost: 2
    },
    {
      id: '8',
      title: 'Cyber Hero Neon City',
      description: 'Futuristic hero in neon-lit cyberpunk cityscape',
      character: 'Cyber Hero',
      fusionMode: 'Scene Integration',
      imageUrl: '/api/placeholder/400/300',
      likes: 3342,
      views: 25678,
      tags: ['cyber-hero', 'neon', 'cyberpunk'],
      isPremium: true,
      processingTime: 30,
      creditCost: 4
    }
  ];

  const categories = ['all', 'zhong-kui', 'popular', 'classic', 'modern'];
  const sortOptions = ['popular', 'recent', 'likes', 'views'];

  const filteredExamples = fusionExamples
    .filter(example => {
      const matchesCategory = selectedCategory === 'all' || 
        example.tags.includes(selectedCategory);
      const matchesSearch = example.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        example.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        example.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      
      return matchesCategory && matchesSearch;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'likes':
          return b.likes - a.likes;
        case 'views':
          return b.views - a.views;
        case 'recent':
          return b.id.localeCompare(a.id);
        default: // popular
          return b.likes - a.likes;
      }
    });

  const getModeIcon = (mode: string) => {
    const icons = {
      'Group Photo': <Users className="w-4 h-4" />,
      'Character Replacement': <Eye className="w-4 h-4" />,
      'Scene Integration': <MapPin className="w-4 h-4" />,
      'Interactive Effects': <Zap className="w-4 h-4" />
    };
    return icons[mode as keyof typeof icons] || <Sparkles className="w-4 h-4" />;
  };

  const formatNumber = (num: number) => {
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };

  return (
    <div className="min-h-screen hero-gradient">
      <Head>
        <title>{pageSEO.gallery.title}</title>
        <meta name="description" content={pageSEO.gallery.description} />
        <meta name="keywords" content={pageSEO.gallery.keywords.join(', ')} />
        <meta property="og:title" content={pageSEO.gallery.title} />
        <meta property="og:description" content={pageSEO.gallery.description} />
        <meta property="og:type" content="website" />
        <meta name="twitter:title" content={pageSEO.gallery.title} />
        <meta name="twitter:description" content={pageSEO.gallery.description} />
        <meta name="twitter:card" content="summary_large_image" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(generateStructuredData('gallery')),
          }}
        />
      </Head>
      <Navigation />
      
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Fusion Gallery
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Get inspired by amazing anime fusions created by our community
            </p>
            
            {/* Search Bar */}
            <div className="max-w-md mx-auto relative mb-6">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search fusions..."
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
                {fusionExamples.length}
              </div>
              <div className="text-sm text-gray-600">Total Fusions</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-red-500 mb-2">
                {fusionExamples.reduce((acc, example) => acc + example.likes, 0)}
              </div>
              <div className="text-sm text-gray-600">Total Likes</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-blue-500 mb-2">
                {fusionExamples.reduce((acc, example) => acc + example.views, 0)}
              </div>
              <div className="text-sm text-gray-600">Total Views</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-purple-500 mb-2">
                {Math.round(fusionExamples.filter(e => e.isPremium).length / fusionExamples.length * 100)}%
              </div>
              <div className="text-sm text-gray-600">Premium Fusions</div>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Sorting */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            {/* Category Filter */}
            <div className="flex items-center gap-2">
              <Filter className="w-5 h-5 text-gray-500" />
              <span className="font-medium text-gray-700">Category:</span>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(category)}
                  >
                    {category.charAt(0).toUpperCase() + category.slice(1).replace('-', ' ')}
                  </Button>
                ))}
              </div>
            </div>

            {/* Sort Options */}
            <div className="flex items-center gap-2">
              <span className="font-medium text-gray-700">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-anime-500 focus:border-transparent"
              >
                {sortOptions.map((option) => (
                  <option key={option} value={option}>
                    {option.charAt(0).toUpperCase() + option.slice(1)}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredExamples.map((example) => (
            <Card
              key={example.id}
              className="group hover:shadow-lg transition-all duration-200 card-hover overflow-hidden"
            >
              <div className="relative">
                {/* Image Placeholder */}
                <div className="aspect-[4/3] bg-gradient-to-br from-anime-100 to-blue-100 flex items-center justify-center">
                  <div className="text-center">
                    <Sparkles className="w-12 h-12 text-anime-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-600">Fusion Preview</p>
                  </div>
                </div>
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-200 flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <div className="flex gap-2">
                    <Button size="sm" variant="secondary" className="bg-white/90">
                      <Eye className="w-4 h-4 mr-1" />
                      View
                    </Button>
                    <Button size="sm" variant="secondary" className="bg-white/90">
                      <Heart className="w-4 h-4 mr-1" />
                      Like
                    </Button>
                  </div>
                </div>

                {/* Premium Badge */}
                {example.isPremium && (
                  <div className="absolute top-2 right-2">
                    <Badge className="bg-orange-500 text-white">
                      <Crown className="w-3 h-3 mr-1" />
                      Premium
                    </Badge>
                  </div>
                )}
              </div>

              <CardContent className="p-4">
                <div className="space-y-3">
                  {/* Title */}
                  <h3 className="font-semibold text-gray-900 line-clamp-1">
                    {example.title}
                  </h3>
                  
                  {/* Description */}
                  <p className="text-sm text-gray-600 line-clamp-2">
                    {example.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1">
                    {example.tags.slice(0, 2).map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                    {example.tags.length > 2 && (
                      <Badge variant="outline" className="text-xs">
                        +{example.tags.length - 2}
                      </Badge>
                    )}
                  </div>

                  {/* Character and Mode */}
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <div className="flex items-center gap-1">
                      <Users className="w-3 h-3" />
                      <span>{example.character}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      {getModeIcon(example.fusionMode)}
                      <span>{example.fusionMode}</span>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1">
                        <Heart className="w-3 h-3" />
                        <span>{formatNumber(example.likes)}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Eye className="w-3 h-3" />
                        <span>{formatNumber(example.views)}</span>
                      </div>
                    </div>
                    <div className="text-xs">
                      {example.processingTime}s
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2 pt-2">
                    <Button 
                      size="sm" 
                      className="flex-1 anime-button"
                      onClick={() => {
                        // Navigate to create similar fusion
                        window.location.href = '/?character=' + example.character.toLowerCase().replace(' ', '-');
                      }}
                    >
                      Try Similar
                    </Button>
                    <Button size="sm" variant="outline">
                      <Share2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* No Results */}
        {filteredExamples.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Search className="w-16 h-16 mx-auto" />
            </div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No fusions found</h3>
            <p className="text-gray-500">Try adjusting your filters or search terms</p>
          </div>
        )}

        {/* Load More */}
        {filteredExamples.length > 0 && (
          <div className="text-center mt-8">
            <Button variant="outline" size="lg">
              Load More Fusions
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}