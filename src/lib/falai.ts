'use client';

import { fal } from '@fal-ai/client';

// No need for explicit config in newer versions
// The API key will be passed directly in requests

export interface FusionRequest {
  prompt: string;
  imageUrl?: string;
  character: string;
  fusionMode: string;
  negativePrompt?: string;
  strength?: number;
  guidanceScale?: number;
}

export interface FusionResult {
  success: boolean;
  imageUrl?: string;
  error?: string;
  processingTime: number;
  creditsUsed: number;
}

class FalAIService {
  private getCharacterPrompt(characterId: string): string {
    const characterPrompts: Record<string, string> = {
      'zhong-kui-warrior': 'Zhong Kui, legendary Chinese demon hunter warrior, traditional armor, mystical sword, fierce expression, divine power aura',
      'zhong-kui-guardian': 'Zhong Kui guardian spirit, mystical energy, protective stance, traditional Chinese robes, spiritual power',
      'sakura-dreamer': 'anime girl with cherry blossom (sakura) aesthetic, gentle expression, pink petals, spring atmosphere',
      'ninja-shadow': 'mysterious ninja character, dark clothing, stealth pose, shadow effects, traditional Japanese setting',
      'magical-girl': 'magical anime girl, transformation outfit, sparkles, magical wand, cute style, bright colors',
      'samurai-spirit': 'honorable samurai warrior, traditional katana, armor, noble stance, Japanese aesthetic',
      'cyber-hero': 'futuristic anime character, cyberpunk style, neon colors, high-tech enhancements, digital effects',
      'school-idol': 'cheerful anime school girl, idol costume, energetic pose, colorful outfit, pop star vibes'
    };
    
    return characterPrompts[characterId] || 'anime character';
  }

  private getFusionModeSettings(mode: string) {
    const settings = {
      'group-photo': {
        strength: 0.7,
        guidanceScale: 7.5,
        negativePrompt: 'blurry, low quality, distorted faces, multiple people overlapping'
      },
      'character-replacement': {
        strength: 0.85,
        guidanceScale: 8.0,
        negativePrompt: 'original face visible, incomplete transformation, blurred features'
      },
      'scene-integration': {
        strength: 0.6,
        guidanceScale: 7.0,
        negativePrompt: 'inconsistent lighting, mismatched perspective, floating objects'
      },
      'interactive-effects': {
        strength: 0.75,
        guidanceScale: 8.5,
        negativePrompt: 'static image, no effects, plain background, boring composition'
      }
    };
    
    return settings[mode as keyof typeof settings] || settings['group-photo'];
  }

  async generateFusion(request: FusionRequest): Promise<FusionResult> {
    const startTime = Date.now();
    
    try {
      if (!process.env.NEXT_PUBLIC_FAL_API_KEY && !process.env.FAL_API_KEY) {
        // Return mock result for development
        return this.getMockResult(request, Date.now() - startTime);
      }

      const characterPrompt = this.getCharacterPrompt(request.character);
      const modeSettings = this.getFusionModeSettings(request.fusionMode);
      
      // Build complete prompt
      const fullPrompt = `${request.prompt}, ${characterPrompt}, high quality, detailed, anime style, professional lighting, vibrant colors`;
      
      // Choose appropriate fal.ai model based on fusion mode
      const modelId = request.imageUrl 
        ? 'fal-ai/flux-pro/v1.1-ultra' // For image-to-image
        : 'fal-ai/flux-pro/v1.1'; // For text-to-image

      const requestPayload: any = {
        prompt: fullPrompt,
        negative_prompt: modeSettings.negativePrompt,
        guidance_scale: modeSettings.guidanceScale,
        num_inference_steps: 28,
        seed: Math.floor(Math.random() * 1000000),
        image_size: 'square_hd', // 1024x1024
      };

      // Add image input for image-to-image modes
      if (request.imageUrl && (request.fusionMode === 'character-replacement' || request.fusionMode === 'group-photo')) {
        requestPayload.image_url = request.imageUrl;
        requestPayload.strength = modeSettings.strength;
      }

      console.log('Sending request to fal.ai:', { modelId, requestPayload });

      // Submit the request to fal.ai
      const result = await fal.subscribe(modelId, {
        input: requestPayload,
        logs: true,
        onQueueUpdate: (update) => {
          console.log('Queue update:', update);
        },
      });

      const processingTime = Date.now() - startTime;
      
      if (result.data && result.data.images && result.data.images.length > 0) {
        return {
          success: true,
          imageUrl: result.data.images[0].url,
          processingTime,
          creditsUsed: this.calculateCredits(request.fusionMode)
        };
      } else {
        throw new Error('No image generated');
      }

    } catch (error) {
      console.error('Fal.ai generation error:', error);
      
      // Return mock result on error for development
      if (process.env.NODE_ENV === 'development') {
        return this.getMockResult(request, Date.now() - startTime);
      }
      
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
        processingTime: Date.now() - startTime,
        creditsUsed: 0
      };
    }
  }

  private getMockResult(request: FusionRequest, processingTime: number): FusionResult {
    // Generate a placeholder image URL based on the request
    const mockImageUrl = `https://picsum.photos/1024/1024?random=${Math.floor(Math.random() * 1000)}`;
    
    return {
      success: true,
      imageUrl: mockImageUrl,
      processingTime: Math.max(processingTime, 2000), // Minimum 2 seconds
      creditsUsed: this.calculateCredits(request.fusionMode)
    };
  }

  private calculateCredits(fusionMode: string): number {
    const creditCosts: Record<string, number> = {
      'group-photo': 1,
      'character-replacement': 2,
      'scene-integration': 2,
      'interactive-effects': 3
    };
    
    return creditCosts[fusionMode] || 1;
  }

  async uploadImage(file: File): Promise<string> {
    try {
      if (!process.env.NEXT_PUBLIC_FAL_API_KEY && !process.env.FAL_API_KEY) {
        // Return mock URL for development
        return URL.createObjectURL(file);
      }

      // Upload to fal.ai storage
      const uploadResult = await fal.storage.upload(file);
      return uploadResult;
    } catch (error) {
      console.error('Image upload error:', error);
      // Fallback to object URL for development
      return URL.createObjectURL(file);
    }
  }
}

export const falaiService = new FalAIService();
