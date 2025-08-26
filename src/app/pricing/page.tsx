'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  CheckCircle, 
  Star, 
  Crown, 
  Sparkles, 
  Zap, 
  Shield,
  CreditCard,
  Users,
  ArrowRight
} from 'lucide-react';
import Navigation from '@/components/Navigation';
import { useAppStore } from '@/lib/store';

export default function PricingPage() {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');
  const [isLoading, setIsLoading] = useState<string | null>(null);
  const { user } = useAppStore();

  const plans = [
    {
      id: 'free',
      name: 'Free Trial',
      price: billingCycle === 'monthly' ? 0 : 0,
      yearlyPrice: 0,
      credits: 10,
      description: 'Perfect for trying out Anime Fusion AI',
      features: [
        '10 Anime Fusions',
        'Basic quality output',
        'Popular characters only',
        'Standard processing speed',
        'Community support',
        'Watermark included'
      ],
      limitations: [
        'Limited character selection',
        'Basic fusion modes only',
        'No premium features'
      ],
      cta: 'Start Free',
      popular: false,
      color: 'gray'
    },
    {
      id: 'fan',
      name: 'Anime Fan',
      price: billingCycle === 'monthly' ? 9.99 : 7.99,
      yearlyPrice: 95.88,
      credits: 100,
      description: 'Great for regular anime fusion creators',
      features: [
        '100 Anime Fusions per month',
        'High quality output',
        'All basic characters',
        'Zhong Kui character access',
        'Priority processing',
        'No watermarks',
        'Email support',
        'Download original resolution'
      ],
      limitations: [
        'No premium characters',
        'Standard fusion effects'
      ],
      cta: 'Become a Fan',
      popular: true,
      color: 'anime'
    },
    {
      id: 'otaku',
      name: 'Otaku Master',
      price: billingCycle === 'monthly' ? 29.99 : 24.99,
      yearlyPrice: 299.88,
      credits: 500,
      description: 'For serious creators and professionals',
      features: [
        '500 Anime Fusions per month',
        'Ultra high quality output',
        'All characters including premium',
        'Advanced fusion effects',
        'Custom character requests',
        'API access',
        '24/7 priority support',
        'Commercial usage rights',
        'Batch processing',
        'Early access to new features'
      ],
      limitations: [],
      cta: 'Go Master',
      popular: false,
      color: 'orange'
    }
  ];

  const features = [
    {
      icon: Sparkles,
      title: 'AI-Powered Fusion',
      description: 'Advanced AI technology creates seamless character integrations'
    },
    {
      icon: Crown,
      title: 'Premium Characters',
      description: 'Access exclusive Zhong Kui and legendary character collection'
    },
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: 'Generate stunning fusions in just 15-30 seconds'
    },
    {
      icon: Shield,
      title: 'Commercial License',
      description: 'Use your creations for commercial purposes with higher tiers'
    }
  ];

  const handleUpgrade = async (planId: string) => {
    if (!user) {
      alert('Please sign in to upgrade your plan');
      return;
    }

    setIsLoading(planId);
    
    try {
      // Simulate Stripe checkout process
      // In real implementation, this would create a Stripe checkout session
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock successful payment
      alert(`Successfully upgraded to ${plans.find(p => p.id === planId)?.name} plan!`);
      
    } catch (error) {
      console.error('Payment error:', error);
      alert('Payment failed. Please try again.');
    } finally {
      setIsLoading(null);
    }
  };

  const yearlyDiscount = (monthlyPrice: number, yearlyPrice: number) => {
    if (monthlyPrice === 0) return 0;
    return Math.round((1 - (yearlyPrice / (monthlyPrice * 12))) * 100);
  };

  return (
    <div className="min-h-screen hero-gradient">
      <Navigation />
      
      {/* Header */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <Badge className="bg-anime-500 text-white mb-6">
            <CreditCard className="w-4 h-4 mr-2" />
            Simple & Transparent Pricing
          </Badge>
          
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Choose Your
            <span className="gradient-text block mt-2">Anime Fusion Plan</span>
          </h1>
          
          <p className="text-xl text-gray-600 mb-8">
            Start free and upgrade as you create more amazing anime fusions
          </p>

          {/* Billing Toggle */}
          <div className="flex items-center justify-center gap-4 mb-12">
            <span className={`text-sm font-medium ${billingCycle === 'monthly' ? 'text-gray-900' : 'text-gray-500'}`}>
              Monthly
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'yearly' : 'monthly')}
              className="relative w-12 h-6 p-0"
            >
              <div className={`absolute w-4 h-4 bg-anime-500 rounded-full transition-transform duration-200 ${
                billingCycle === 'yearly' ? 'transform translate-x-3' : 'transform -translate-x-3'
              }`}></div>
            </Button>
            <span className={`text-sm font-medium ${billingCycle === 'yearly' ? 'text-gray-900' : 'text-gray-500'}`}>
              Yearly
              <Badge className="bg-green-500 text-white text-xs ml-2">Save 20%</Badge>
            </span>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="pb-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            {plans.map((plan) => (
              <Card 
                key={plan.id} 
                className={`relative ${
                  plan.popular 
                    ? 'ring-2 ring-anime-500 shadow-lg scale-105' 
                    : 'shadow-md'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-anime-500 text-white px-6 py-2 text-sm font-semibold">
                      <Star className="w-4 h-4 mr-2" />
                      Most Popular
                    </Badge>
                  </div>
                )}

                <CardHeader className="text-center pb-8 pt-8">
                  <CardTitle className="text-2xl font-bold text-gray-900">
                    {plan.name}
                  </CardTitle>
                  <div className="mt-4 mb-2">
                    <span className="text-5xl font-bold text-gray-900">
                      ${billingCycle === 'monthly' ? plan.price : plan.price}
                    </span>
                    <span className="text-gray-600 ml-2">
                      /{billingCycle}
                    </span>
                  </div>
                  {billingCycle === 'yearly' && plan.yearlyPrice > 0 && (
                    <div className="text-sm text-gray-500">
                      <span className="line-through">${(plan.price * 12).toFixed(2)}/year</span>
                      <span className="text-green-600 font-semibold ml-2">
                        Save {yearlyDiscount(plan.price, plan.yearlyPrice)}%
                      </span>
                    </div>
                  )}
                  <p className="text-gray-600 mt-2">{plan.description}</p>
                  
                  <div className="bg-gray-50 rounded-lg p-3 mt-4">
                    <div className="text-2xl font-bold text-anime-600">{plan.credits}</div>
                    <div className="text-sm text-gray-600">Credits per {billingCycle.slice(0, -2)}</div>
                  </div>
                </CardHeader>

                <CardContent className="space-y-6">
                  <Button 
                    className={`w-full ${
                      plan.popular 
                        ? 'anime-button text-lg py-6' 
                        : plan.id === 'free'
                        ? 'bg-gray-600 hover:bg-gray-700 text-white text-lg py-6'
                        : 'bg-orange-500 hover:bg-orange-600 text-white text-lg py-6'
                    }`}
                    onClick={() => handleUpgrade(plan.id)}
                    disabled={isLoading === plan.id}
                  >
                    {isLoading === plan.id ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Processing...
                      </>
                    ) : (
                      <>
                        {plan.cta}
                        <ArrowRight className="ml-2 w-5 h-5" />
                      </>
                    )}
                  </Button>

                  {/* Features */}
                  <div className="space-y-3">
                    <h4 className="font-semibold text-gray-900">What&apos;s included:</h4>
                    <ul className="space-y-2">
                      {plan.features.map((feature, index) => (
                        <li key={index} className="flex items-start space-x-2">
                          <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                          <span className="text-sm text-gray-600">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Limitations */}
                  {plan.limitations.length > 0 && (
                    <div className="space-y-3 border-t pt-4">
                      <h4 className="font-semibold text-gray-900">Limitations:</h4>
                      <ul className="space-y-2">
                        {plan.limitations.map((limitation, index) => (
                          <li key={index} className="flex items-start space-x-2">
                            <div className="w-4 h-4 rounded-full bg-gray-200 mt-0.5 flex-shrink-0"></div>
                            <span className="text-sm text-gray-500">{limitation}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Choose Anime Fusion AI?
            </h2>
            <p className="text-xl text-gray-600">
              Powerful features that make anime fusion creation effortless
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-anime-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="w-8 h-8 text-anime-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-8">
            {[
              {
                question: 'Can I upgrade or downgrade my plan anytime?',
                answer: 'Yes! You can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing cycle.'
              },
              {
                question: 'What happens to unused credits?',
                answer: 'Unused credits roll over to the next month for paid plans. Free trial credits expire at the end of the trial period.'
              },
              {
                question: 'Is there a refund policy?',
                answer: 'We offer a 7-day money-back guarantee for all paid plans. No questions asked!'
              },
              {
                question: 'Can I use my creations commercially?',
                answer: 'Commercial usage rights are included with the Otaku Master plan. Free and Anime Fan plans are for personal use only.'
              }
            ].map((faq, index) => (
              <Card key={index} className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {faq.question}
                </h3>
                <p className="text-gray-600">
                  {faq.answer}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 fusion-gradient">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Start Creating?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of anime fans creating magical fusions every day.
          </p>
          <Button 
            size="lg" 
            className="bg-white text-anime-600 hover:bg-gray-100 font-semibold px-8 py-4 text-lg"
            onClick={() => handleUpgrade('fan')}
          >
            <Users className="mr-2 w-5 h-5" />
            Start Your Journey
          </Button>
        </div>
      </section>
    </div>
  );
}
