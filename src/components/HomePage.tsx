'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  Wand2, 
  Zap, 
  Users, 
  Crown, 
  Star, 
  CheckCircle,
  ArrowRight,
  Play,
  Sparkles,
  Upload
} from 'lucide-react';
import { useAppStore } from '@/lib/store';
import { animeFusionService } from '@/lib/animeFusionService';
import CharacterSelector from '@/components/CharacterSelector';
import FusionModeSelector from '@/components/FusionModeSelector';
import Navigation from '@/components/Navigation';

export default function HomePage() {
  const [prompt, setPrompt] = useState('');
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedCharacter, setSelectedCharacter] = useState<string>('');
  const [fusionMode, setFusionMode] = useState<string>('group-photo');
  
  const { user, setProcessing, addToHistory, updateUserCredits } = useAppStore();

  // Calculate real-time credit cost
  const creditCost = selectedCharacter && fusionMode 
    ? animeFusionService.calculateCreditCost(selectedCharacter, fusionMode)
    : 0;

  const features = [
    {
      icon: Wand2,
      title: "Anime Character Fusion",
      description: "Fuse your photos with beloved anime characters including Zhong Kui. Create magical transformations instantly.",
      highlight: true
    },
    {
      icon: Users,
      title: "Perfect Character Integration",
      description: "Seamlessly blend yourself with anime characters while maintaining natural proportions and lighting.",
      highlight: true
    },
    {
      icon: Zap,
      title: "Lightning Fast (15-30s)",
      description: "Generate stunning anime fusions in just 15-30 seconds with advanced AI technology.",
      highlight: false
    },
    {
      icon: Crown,
      title: "Exclusive Zhong Kui Collection",
      description: "Access our premium Zhong Kui character designs and traditional anime fusion effects.",
      highlight: false
    }
  ];

  const useCases = [
    {
      title: "Anime Selfies",
      description: "Create magical selfies with your favorite anime characters",
      icon: "📸"
    },
    {
      title: "Zhong Kui Fusion",
      description: "Transform yourself with the legendary Zhong Kui character",
      icon: "🗡️"
    },
    {
      title: "Group Photos",
      description: "Add anime friends to your photos for epic group shots",
      icon: "👥"
    },
    {
      title: "Scene Integration",
      description: "Place yourself in iconic anime scenes and backgrounds",
      icon: "🏯"
    }
  ];

  const pricingPlans = [
    {
      name: "Free Trial",
      price: "$0",
      credits: "10 Credits",
      features: ["10 Anime Fusions", "Basic quality", "Popular characters", "Community support"],
      popular: false,
      cta: "Start Free"
    },
    {
      name: "Anime Fan",
      price: "$9.99",
      period: "/month",
      credits: "100 Credits",
      features: ["100 Anime Fusions", "High quality", "Zhong Kui access", "Priority processing", "Email support"],
      popular: true,
      cta: "Become a Fan"
    },
    {
      name: "Otaku Master",
      price: "$29.99",
      period: "/month",
      credits: "500 Credits",
      features: ["500 Anime Fusions", "Ultra quality", "All characters", "API access", "24/7 support", "Commercial license"],
      popular: false,
      cta: "Go Master"
    }
  ];

  const testimonials = [
    {
      name: "Yuki Tanaka",
      role: "Anime Artist",
      content: "Anime Fusion AI transformed my selfies with my favorite characters! The Zhong Kui fusion is absolutely stunning.",
      rating: 5
    },
    {
      name: "Alex Rodriguez",
      role: "Cosplay Enthusiast",
      content: "I created amazing group photos with anime characters. The quality is incredible and the process is so fast!",
      rating: 5
    },
    {
      name: "Mei Li",
      role: "Content Creator",
      content: "As an anime fan, this tool is a dream come true. I can finally create magical photos with my beloved characters!",
      rating: 5
    }
  ];

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadedImage(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const handleGenerate = async () => {
    if (!prompt.trim() || !uploadedImage || !selectedCharacter || !fusionMode) {
      alert('Please complete all steps: upload photo, select fusion mode, choose character, and describe your fusion.');
      return;
    }
    
    if (!user) {
      alert('Please sign in to use Anime Fusion AI');
      return;
    }

    // Calculate credit cost
    const creditCost = animeFusionService.calculateCreditCost(selectedCharacter, fusionMode);
    
    if (user.credits < creditCost) {
      alert(`Insufficient credits. This fusion requires ${creditCost} credits. Please upgrade your plan.`);
      return;
    }

    setIsGenerating(true);
    setProcessing(true);

    try {
      const fusionRequest = {
        prompt,
        uploadedImage,
        selectedCharacter,
        fusionMode,
        userId: user.id
      };

      const result = await animeFusionService.processFusion(fusionRequest);
      
      if (result.success) {
        // Update user credits
        updateUserCredits(user.credits - result.creditsUsed);
        
        // Add to history
        addToHistory({
          id: Date.now().toString(),
          userId: user?.id || 'anonymous',
          prompt,
          originalImage: previewUrl,
          editedImage: result.processedImageUrl || '',
          status: 'completed',
          creditsUsed: result.creditsUsed,
          processingTime: result.processingTime,
          createdAt: new Date(),
          completedAt: new Date(),
        });
        
        // Show success message
        alert(`Anime fusion completed successfully! Used ${result.creditsUsed} credits. Processing time: ${result.processingTime}ms`);
        
        // Reset form
        setPrompt('');
        setUploadedImage(null);
        setPreviewUrl('');
        setSelectedCharacter('');
        setFusionMode('group-photo');
        
      } else {
        throw new Error(result.error || 'Fusion processing failed');
      }
      
    } catch (error) {
      console.error('Fusion generation error:', error);
      alert(`Failed to create anime fusion: ${error instanceof Error ? error.message : 'Unknown error'}. Please try again.`);
    } finally {
      setIsGenerating(false);
      setProcessing(false);
    }
  };

  return (
    <div className="min-h-screen hero-gradient">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <div className="mb-6">
            <Badge className="bg-anime-500 text-white mb-4 animate-pulse">
              <Sparkles className="w-4 h-4 mr-2" />
              Revolutionary Anime Fusion Technology
            </Badge>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6">
            Anime Fusion
            <span className="gradient-text block mt-2">AI Photo Magic</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Transform your photos with beloved anime characters including Zhong Kui. 
            Create magical group photos, character replacements, and interactive effects.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button size="lg" className="anime-button px-8 py-4 text-lg">
              Try Anime Fusion Free
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button size="lg" variant="outline" className="px-8 py-4 text-lg">
              <Play className="mr-2 w-5 h-5" />
              Watch Demo
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto mb-16">
            <div className="text-center">
              <div className="text-3xl font-bold gradient-text">15-30s</div>
              <div className="text-gray-600">Fusion Time</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold gradient-text">500K+</div>
              <div className="text-gray-600">Anime Fusions</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold gradient-text">99%</div>
              <div className="text-gray-600">User Satisfaction</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold gradient-text">24/7</div>
              <div className="text-gray-600">Support</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Choose Anime Fusion AI?
            </h2>
            <p className="text-xl text-gray-600">
              Experience the magic of anime character fusion technology
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {features.map((feature, index) => (
              <Card key={index} className={`p-6 ${feature.highlight ? 'border-anime-400 bg-anime-50' : ''}`}>
                <div className="flex items-start space-x-4">
                  <div className={`p-3 rounded-lg ${feature.highlight ? 'bg-anime-500' : 'bg-gray-100'}`}>
                    <feature.icon className={`w-6 h-6 ${feature.highlight ? 'text-white' : 'text-gray-600'}`} />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Demo Editor */}
          <Card className="p-8 mb-16">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl mb-4">Try Anime Fusion Now</CardTitle>
              <p className="text-gray-600">Upload your photo and create magical anime transformations</p>
            </CardHeader>
            <CardContent>
              <div className="max-w-4xl mx-auto space-y-6">
                {/* Step 1: Image Upload */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                    <span className="bg-anime-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm">1</span>
                    Upload Your Photo
                  </h3>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <Upload className="mx-auto w-12 h-12 text-gray-400 mb-4" />
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                      id="image-upload"
                    />
                    <label htmlFor="image-upload" className="cursor-pointer">
                      <span className="text-blue-600 hover:text-blue-800">
                        Click to upload an image
                      </span>
                      <span className="text-gray-500"> or drag and drop</span>
                    </label>
                    {previewUrl && (
                      <div className="mt-4">
                        <img src={previewUrl} alt="Preview" className="max-h-40 mx-auto rounded" />
                      </div>
                    )}
                  </div>
                </div>

                {/* Step 2: Fusion Mode Selection */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                    <span className="bg-anime-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm">2</span>
                    Choose Fusion Mode
                  </h3>
                  <FusionModeSelector 
                    selectedMode={fusionMode}
                    onSelectMode={setFusionMode}
                  />
                </div>

                {/* Step 3: Character Selection */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                    <span className="bg-anime-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm">3</span>
                    Select Anime Character
                  </h3>
                  <CharacterSelector 
                    selectedCharacter={selectedCharacter}
                    onSelectCharacter={setSelectedCharacter}
                    fusionMode={fusionMode}
                  />
                </div>

                {/* Step 4: Prompt Input */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                    <span className="bg-anime-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm">4</span>
                    Describe Your Fusion
                  </h3>
                  <Textarea
                    placeholder="e.g., 'Fuse me with Zhong Kui character in a traditional Japanese setting with mystical energy effects'"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    className="mb-4 min-h-[100px]"
                  />
                </div>
                
                {/* Credit and Generate */}
                <div className="flex items-center justify-between">
                  <div className="space-y-2">
                    {user && (
                      <div className="text-sm text-gray-600">
                        Credits remaining: <span className="font-semibold text-anime-600">{user.credits}</span>
                      </div>
                    )}
                    {creditCost > 0 && (
                      <div className="text-sm">
                        This fusion costs: <span className={`font-semibold ${user && user.credits >= creditCost ? 'text-green-600' : 'text-red-600'}`}>
                          {creditCost} credit{creditCost > 1 ? 's' : ''}
                        </span>
                      </div>
                    )}
                    {user && creditCost > 0 && user.credits < creditCost && (
                      <div className="text-xs text-red-600 bg-red-50 px-2 py-1 rounded">
                        Insufficient credits for this fusion
                      </div>
                    )}
                  </div>
                  
                  <Button 
                    onClick={handleGenerate}
                    disabled={!prompt.trim() || !uploadedImage || !selectedCharacter || !fusionMode || isGenerating || !user || (user && user.credits < creditCost)}
                    className="anime-button px-8 py-3"
                  >
                    {isGenerating ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Fusing...
                      </>
                    ) : (
                      <>
                        <Wand2 className="mr-2 w-5 h-5" />
                        Create Anime Fusion
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Perfect for Anime Fans
            </h2>
            <p className="text-xl text-gray-600">
              From casual selfies to epic anime transformations, Anime Fusion AI delivers magical results
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {useCases.map((useCase, index) => (
              <Card key={index} className="text-center p-6 hover:shadow-lg transition-shadow">
                <div className="text-4xl mb-4">{useCase.icon}</div>
                <h3 className="text-lg font-semibold mb-2">{useCase.title}</h3>
                <p className="text-gray-600 text-sm">{useCase.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Simple, Transparent Pricing
            </h2>
            <p className="text-xl text-gray-600">
              Pay only for what you use, no hidden fees
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {pricingPlans.map((plan, index) => (
              <Card key={index} className={`relative ${plan.popular ? 'border-yellow-400 ring-2 ring-yellow-400' : ''}`}>
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-yellow-500 text-white px-4 py-2">
                      <Star className="w-4 h-4 mr-2" />
                      Most Popular
                    </Badge>
                  </div>
                )}
                <CardHeader className="text-center pb-8">
                  <CardTitle className="text-2xl">{plan.name}</CardTitle>
                  <div className="mt-4">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    <span className="text-gray-600">{plan.period}</span>
                  </div>
                  <p className="text-gray-600 mt-2">{plan.credits}</p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button 
                    className={`w-full ${plan.popular ? 'bg-yellow-500 hover:bg-yellow-600 text-black' : ''}`}
                    variant={plan.popular ? "default" : "outline"}
                  >
                    {plan.cta}
                  </Button>
                  <ul className="space-y-2">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Loved by Creators Worldwide
            </h2>
            <p className="text-xl text-gray-600">
              See what our users are saying about Nano Banana
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="p-6">
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-500 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 mb-4 italic">&ldquo;{testimonial.content}&rdquo;</p>
                <div>
                  <div className="font-semibold">{testimonial.name}</div>
                  <div className="text-sm text-gray-500">{testimonial.role}</div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 fusion-gradient">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Experience Anime Magic?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join 500K+ anime fans who are already creating magical fusions with their favorite characters.
          </p>
          <Button size="lg" className="bg-white text-anime-600 hover:bg-gray-100 font-semibold px-8 py-4 text-lg">
            Start Your Anime Journey
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </div>
      </section>
    </div>
  );
}