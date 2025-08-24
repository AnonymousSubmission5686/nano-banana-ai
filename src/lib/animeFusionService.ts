// Anime Fusion AI Service
export interface FusionRequest {
  prompt: string;
  uploadedImage?: File;
  selectedCharacter: string;
  fusionMode: string;
  userId?: string;
}

export interface FusionResult {
  success: boolean;
  imageUrl?: string;
  processedImageUrl?: string;
  creditsUsed: number;
  processingTime: number;
  characterName: string;
  fusionModeName: string;
  error?: string;
}

export interface AnimeCharacter {
  id: string;
  name: string;
  description: string;
  category: 'popular' | 'zhong-kui' | 'classic' | 'modern';
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  isPremium: boolean;
  creditCost: number;
}

export interface FusionMode {
  id: string;
  name: string;
  description: string;
  difficulty: 'easy' | 'medium' | 'hard';
  creditCost: number;
  isPremium: boolean;
}

class AnimeFusionService {
  private readonly API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || '/api';

  // Available anime characters
  private characters: AnimeCharacter[] = [
    {
      id: 'zhong-kui-warrior',
      name: 'Zhong Kui Warrior',
      description: 'Legendary demon hunter with traditional Chinese armor and sword',
      category: 'zhong-kui',
      rarity: 'legendary',
      isPremium: true,
      creditCost: 3
    },
    {
      id: 'zhong-kui-guardian',
      name: 'Zhong Kui Guardian',
      description: 'Mystical guardian form with spiritual energy and protective aura',
      category: 'zhong-kui',
      rarity: 'epic',
      isPremium: true,
      creditCost: 2
    },
    {
      id: 'sakura-dreamer',
      name: 'Sakura Dreamer',
      description: 'Gentle anime character with cherry blossom aesthetic',
      category: 'popular',
      rarity: 'rare',
      isPremium: false,
      creditCost: 1
    },
    {
      id: 'ninja-shadow',
      name: 'Ninja Shadow',
      description: 'Mysterious ninja character with stealth abilities',
      category: 'classic',
      rarity: 'rare',
      isPremium: false,
      creditCost: 1
    },
    {
      id: 'magical-girl',
      name: 'Magical Girl',
      description: 'Classic magical anime character with transformation powers',
      category: 'popular',
      rarity: 'common',
      isPremium: false,
      creditCost: 1
    },
    {
      id: 'samurai-spirit',
      name: 'Samurai Spirit',
      description: 'Honorable samurai with traditional katana and armor',
      category: 'classic',
      rarity: 'epic',
      isPremium: false,
      creditCost: 2
    },
    {
      id: 'cyber-hero',
      name: 'Cyber Hero',
      description: 'Futuristic anime character with neon cybernetic enhancements',
      category: 'modern',
      rarity: 'rare',
      isPremium: true,
      creditCost: 2
    },
    {
      id: 'school-idol',
      name: 'School Idol',
      description: 'Cheerful high school anime character with pop star dreams',
      category: 'popular',
      rarity: 'common',
      isPremium: false,
      creditCost: 1
    }
  ];

  // Available fusion modes
  private fusionModes: FusionMode[] = [
    {
      id: 'group-photo',
      name: 'Group Photo Fusion',
      description: 'Add anime characters to your photos for epic group shots',
      difficulty: 'easy',
      creditCost: 1,
      isPremium: false
    },
    {
      id: 'character-replacement',
      name: 'Character Replacement',
      description: 'Transform yourself into your favorite anime character',
      difficulty: 'medium',
      creditCost: 2,
      isPremium: true
    },
    {
      id: 'scene-integration',
      name: 'Scene Integration',
      description: 'Place yourself in iconic anime scenes and backgrounds',
      difficulty: 'medium',
      creditCost: 2,
      isPremium: false
    },
    {
      id: 'interactive-effects',
      name: 'Interactive Effects',
      description: 'Add magical anime effects and powers to your photos',
      difficulty: 'hard',
      creditCost: 3,
      isPremium: true
    }
  ];

  // Get character by ID
  getCharacter(id: string): AnimeCharacter | undefined {
    return this.characters.find(char => char.id === id);
  }

  // Get fusion mode by ID
  getFusionMode(id: string): FusionMode | undefined {
    return this.fusionModes.find(mode => mode.id === id);
  }

  // Calculate total credit cost
  calculateCreditCost(characterId: string, fusionModeId: string): number {
    const character = this.getCharacter(characterId);
    const mode = this.getFusionMode(fusionModeId);
    
    if (!character || !mode) return 0;
    
    // Base cost is character cost + mode cost
    let totalCost = character.creditCost + mode.creditCost;
    
    // Premium discount for premium users
    if (character.isPremium || mode.isPremium) {
      totalCost = Math.max(1, totalCost - 1);
    }
    
    return totalCost;
  }

  // Process anime fusion request
  async processFusion(request: FusionRequest): Promise<FusionResult> {
    const startTime = Date.now();
    
    try {
      // Validate request
      if (!request.selectedCharacter || !request.fusionMode) {
        throw new Error('Character and fusion mode are required');
      }

      const character = this.getCharacter(request.selectedCharacter);
      const mode = this.getFusionMode(request.fusionMode);
      
      if (!character || !mode) {
        throw new Error('Invalid character or fusion mode');
      }

      // Calculate credit cost
      const creditsUsed = this.calculateCreditCost(request.selectedCharacter, request.fusionMode);

      // Prepare form data for API request
      const formData = new FormData();
      formData.append('prompt', request.prompt);
      formData.append('characterId', request.selectedCharacter);
      formData.append('fusionMode', request.fusionMode);
      formData.append('creditsUsed', creditsUsed.toString());
      
      if (request.uploadedImage) {
        formData.append('image', request.uploadedImage);
      }

      if (request.userId) {
        formData.append('userId', request.userId);
      }

      // Make API request
      const response = await fetch(`${this.API_BASE_URL}/fusion`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Fusion processing failed');
      }

      const result = await response.json();
      
      const processingTime = Date.now() - startTime;

      return {
        success: true,
        imageUrl: result.originalImageUrl,
        processedImageUrl: result.processedImageUrl,
        creditsUsed,
        processingTime,
        characterName: character.name,
        fusionModeName: mode.name
      };

    } catch (error) {
      const processingTime = Date.now() - startTime;
      const character = this.getCharacter(request.selectedCharacter);
      const mode = this.getFusionMode(request.fusionMode);

      return {
        success: false,
        creditsUsed: 0,
        processingTime,
        characterName: character?.name || 'Unknown',
        fusionModeName: mode?.name || 'Unknown',
        error: error instanceof Error ? error.message : 'Unknown error occurred'
      };
    }
  }

  // Generate fusion preview (for immediate feedback)
  generatePreview(characterId: string, fusionMode: string): string {
    const character = this.getCharacter(characterId);
    const mode = this.getFusionMode(fusionMode);
    
    if (!character || !mode) return '';
    
    // Return a preview description or placeholder
    return `Preview: ${character.name} with ${mode.name} effect`;
  }

  // Get all characters
  getAllCharacters(): AnimeCharacter[] {
    return this.characters;
  }

  // Get all fusion modes
  getAllFusionModes(): FusionMode[] {
    return this.fusionModes;
  }

  // Get characters by category
  getCharactersByCategory(category: string): AnimeCharacter[] {
    return this.characters.filter(char => char.category === category);
  }

  // Get characters by rarity
  getCharactersByRarity(rarity: string): AnimeCharacter[] {
    return this.characters.filter(char => char.rarity === rarity);
  }

  // Check if user can afford fusion
  canUserAfford(userCredits: number, characterId: string, fusionModeId: string): boolean {
    const cost = this.calculateCreditCost(characterId, fusionModeId);
    return userCredits >= cost;
  }

  // Get recommended characters for fusion mode
  getRecommendedCharacters(fusionModeId: string): AnimeCharacter[] {
    const recommendations: Record<string, string[]> = {
      'group-photo': ['sakura-dreamer', 'school-idol', 'ninja-shadow'],
      'character-replacement': ['zhong-kui-warrior', 'samurai-spirit', 'cyber-hero'],
      'scene-integration': ['zhong-kui-guardian', 'magical-girl', 'samurai-spirit'],
      'interactive-effects': ['cyber-hero', 'ninja-shadow', 'magical-girl']
    };

    const recommendedIds = recommendations[fusionModeId] || [];
    return this.characters.filter(char => recommendedIds.includes(char.id));
  }
}

// Export singleton instance
export const animeFusionService = new AnimeFusionService();

