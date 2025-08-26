'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { 
  Wand2, 
  Upload, 
  Download, 
  Loader2, 
  Sparkles,
  Image as ImageIcon,
  Zap
} from 'lucide-react';
import { animeFusionService } from '@/lib/animeFusionService';
import CharacterSelector from '@/components/CharacterSelector';
import FusionModeSelector from '@/components/FusionModeSelector';

export default function GeneratePage() {
  const [prompt, setPrompt] = useState('');
  const [selectedCharacter, setSelectedCharacter] = useState('');
  const [selectedMode, setSelectedMode] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string | null>(null);
  const [credits, setCredits] = useState(10); // Demo credits

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedImage(file);
      const url = URL.createObjectURL(file);
      setUploadedImageUrl(url);
    }
  };

  const handleGenerate = async () => {
    if (!prompt || !selectedCharacter || !selectedMode) {
      alert('Please fill in all required fields');
      return;
    }

    setIsGenerating(true);
    setGeneratedImage(null);

    try {
      // Simulate API call for demo
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // For demo purposes, use a placeholder image
      setGeneratedImage('https://via.placeholder.com/512x512/667eea/ffffff?text=Generated+Image');
      
      // Deduct credits
      const cost = animeFusionService.calculateCreditCost(selectedCharacter, selectedMode);
      setCredits(prev => Math.max(0, prev - cost));
      
    } catch (error) {
      console.error('Generation failed:', error);
      alert('Generation failed. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const creditCost = selectedCharacter && selectedMode 
    ? animeFusionService.calculateCreditCost(selectedCharacter, selectedMode)
    : 0;

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-purple-900/20 to-slate-900 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">
            AI Anime Fusion Generator
          </h1>
          <p className="text-gray-300">Transform your photos with anime magic</p>
          
          {/* Credits Display */}
          <div className="inline-flex items-center gap-2 mt-4 px-4 py-2 rounded-full bg-purple-500/20 border border-purple-500/30">
            <Zap className="w-4 h-4 text-yellow-400" />
            <span className="text-sm font-medium text-purple-300">
              {credits} Credits Available
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Panel - Input */}
          <div className="space-y-6">
            {/* Image Upload */}
            <Card className="p-6 bg-slate-800/50 border-slate-700">
              <h3 className="text-lg font-semibold text-white mb-4">
                Upload Image (Optional)
              </h3>
              <div className="border-2 border-dashed border-slate-600 rounded-lg p-8 text-center">
                {uploadedImageUrl ? (
                  <div className="relative">
                    <img 
                      src={uploadedImageUrl} 
                      alt="Uploaded" 
                      className="max-w-full h-auto rounded-lg mx-auto"
                    />
                    <Button
                      onClick={() => {
                        setUploadedImage(null);
                        setUploadedImageUrl(null);
                      }}
                      className="absolute top-2 right-2"
                      variant="destructive"
                      size="sm"
                    >
                      Remove
                    </Button>
                  </div>
                ) : (
                  <label className="cursor-pointer">
                    <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-400 mb-2">Click to upload or drag and drop</p>
                    <p className="text-sm text-gray-500">PNG, JPG up to 10MB</p>
                    <input
                      type="file"
                      className="hidden"
                      accept="image/*"
                      onChange={handleImageUpload}
                    />
                  </label>
                )}
              </div>
            </Card>

            {/* Prompt Input */}
            <Card className="p-6 bg-slate-800/50 border-slate-700">
              <h3 className="text-lg font-semibold text-white mb-4">
                Describe Your Vision
              </h3>
              <Textarea
                placeholder="E.g., Transform me into a warrior with glowing armor and magical effects..."
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                className="min-h-[120px] bg-slate-900/50 border-slate-600 text-white"
              />
            </Card>

            {/* Character Selection */}
            <Card className="p-6 bg-slate-800/50 border-slate-700">
              <h3 className="text-lg font-semibold text-white mb-4">
                Select Character
              </h3>
              <CharacterSelector
                selectedCharacter={selectedCharacter}
                onSelectCharacter={setSelectedCharacter}
              />
            </Card>

            {/* Fusion Mode Selection */}
            <Card className="p-6 bg-slate-800/50 border-slate-700">
              <h3 className="text-lg font-semibold text-white mb-4">
                Select Fusion Mode
              </h3>
              <FusionModeSelector
                selectedMode={selectedMode}
                onSelectMode={setSelectedMode}
              />
            </Card>

            {/* Generate Button */}
            <Button
              onClick={handleGenerate}
              disabled={isGenerating || !prompt || !selectedCharacter || !selectedMode || credits < creditCost}
              className="w-full h-12 text-lg bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Generating Magic...
                </>
              ) : (
                <>
                  <Wand2 className="mr-2 h-5 w-5" />
                  Generate ({creditCost} Credits)
                </>
              )}
            </Button>
          </div>

          {/* Right Panel - Output */}
          <div className="space-y-6">
            <Card className="p-6 bg-slate-800/50 border-slate-700 min-h-[600px] flex flex-col items-center justify-center">
              {isGenerating ? (
                <div className="text-center">
                  <div className="relative">
                    <div className="w-32 h-32 border-4 border-purple-500/20 rounded-full"></div>
                    <div className="absolute top-0 left-0 w-32 h-32 border-4 border-purple-500 rounded-full animate-spin border-t-transparent"></div>
                  </div>
                  <p className="text-white mt-4">Creating your anime fusion...</p>
                  <p className="text-gray-400 text-sm mt-2">This usually takes 10-30 seconds</p>
                </div>
              ) : generatedImage ? (
                <div className="w-full">
                  <img 
                    src={generatedImage} 
                    alt="Generated" 
                    className="w-full h-auto rounded-lg mb-4"
                  />
                  <div className="flex gap-2">
                    <Button 
                      className="flex-1"
                      onClick={() => {
                        // Download logic here
                        const link = document.createElement('a');
                        link.href = generatedImage;
                        link.download = 'anime-fusion.png';
                        link.click();
                      }}
                    >
                      <Download className="mr-2 h-4 w-4" />
                      Download
                    </Button>
                    <Button 
                      variant="outline"
                      className="flex-1"
                      onClick={() => {
                        setGeneratedImage(null);
                      }}
                    >
                      Generate New
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="text-center">
                  <ImageIcon className="w-24 h-24 text-gray-600 mx-auto mb-4" />
                  <p className="text-gray-400 mb-2">Your generated image will appear here</p>
                  <p className="text-sm text-gray-500">Fill in the options and click Generate</p>
                </div>
              )}
            </Card>

            {/* Tips */}
            <Card className="p-6 bg-slate-800/50 border-slate-700">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                <Sparkles className="mr-2 h-5 w-5 text-yellow-400" />
                Pro Tips
              </h3>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>• Be descriptive in your prompt for better results</li>
                <li>• Upload a clear photo for image-to-image fusion</li>
                <li>• Different characters work better with different modes</li>
                <li>• Premium characters provide higher quality results</li>
              </ul>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
