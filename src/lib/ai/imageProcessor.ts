import axios from 'axios';
import { ImageEditRequest, AIModel } from '@/types';

export class ImageProcessor {
  private apiKey: string;
  private baseUrl: string;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
    this.baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || '/api';
  }

  async processImageEdit(
    prompt: string, 
    originalImage?: File | string
  ): Promise<ImageEditRequest> {
    try {
      const formData = new FormData();
      formData.append('prompt', prompt);
      
      if (originalImage instanceof File) {
        formData.append('image', originalImage);
      } else if (typeof originalImage === 'string') {
        formData.append('imageUrl', originalImage);
      }

      const response = await axios.post(`${this.baseUrl}/edit`, formData, {
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      return response.data;
    } catch (error) {
      console.error('Image processing error:', error);
      throw new Error('Failed to process image edit');
    }
  }

  async getProcessingStatus(requestId: string): Promise<ImageEditRequest> {
    try {
      const response = await axios.get(`${this.baseUrl}/status/${requestId}`, {
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Status check error:', error);
      throw new Error('Failed to check processing status');
    }
  }

  async getAvailableModels(): Promise<AIModel[]> {
    try {
      const response = await axios.get(`${this.baseUrl}/models`, {
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Models fetch error:', error);
      throw new Error('Failed to fetch available models');
    }
  }

  async estimateCredits(prompt: string, hasImage: boolean = false): Promise<number> {
    // Simple credit estimation based on prompt complexity and image presence
    const baseCredits = hasImage ? 2 : 1;
    const complexityScore = this.calculatePromptComplexity(prompt);
    return Math.max(baseCredits, Math.ceil(complexityScore / 100));
  }

  private calculatePromptComplexity(prompt: string): number {
    const complexityFactors = {
      length: Math.min(prompt.length / 10, 30),
      specificTerms: (prompt.match(/(change|modify|edit|enhance|improve|adjust)/gi) || []).length * 10,
      artisticTerms: (prompt.match(/(style|artistic|aesthetic|beautiful|professional)/gi) || []).length * 15,
      technicalTerms: (prompt.match(/(resolution|quality|hd|4k|high-quality)/gi) || []).length * 20,
    };

    return Object.values(complexityFactors).reduce((sum, score) => sum + score, 0);
  }
}

// Singleton instance
export const imageProcessor = new ImageProcessor(process.env.NEXT_PUBLIC_API_KEY || '');