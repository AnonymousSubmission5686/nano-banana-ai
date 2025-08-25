'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles, Zap, Star } from 'lucide-react';
import Link from 'next/link';
import { useState, useEffect } from 'react';

const typewriterTexts = [
  "Transform Your Photos with Anime Magic ✨",
  "Become Your Favorite Character 🎭",
  "Create Stunning Anime Art 🎨",
  "Powered by Advanced AI Technology 🤖"
];

export default function HeroSection() {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    if (isTyping) {
      const text = typewriterTexts[currentTextIndex];
      if (displayText.length < text.length) {
        const timeout = setTimeout(() => {
          setDisplayText(text.slice(0, displayText.length + 1));
        }, 50);
        return () => clearTimeout(timeout);
      } else {
        setTimeout(() => {
          setIsTyping(false);
        }, 2000);
      }
    } else {
      if (displayText.length > 0) {
        const timeout = setTimeout(() => {
          setDisplayText(displayText.slice(0, -1));
        }, 30);
        return () => clearTimeout(timeout);
      } else {
        setCurrentTextIndex((prev) => (prev + 1) % typewriterTexts.length);
        setIsTyping(true);
      }
    }
  }, [displayText, isTyping, currentTextIndex]);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 animated-gradient opacity-10" />
      
      {/* Floating anime elements */}
      <div className="absolute inset-0">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            initial={{ 
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight 
            }}
            animate={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
            }}
            transition={{
              duration: 20 + i * 5,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "linear"
            }}
          >
            <div className="w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-60 blur-sm" />
          </motion.div>
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-8"
        >
          {/* Badge */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30"
          >
            <Sparkles className="w-4 h-4 text-purple-400" />
            <span className="text-sm font-medium text-purple-300">
              Powered by Advanced AI
            </span>
          </motion.div>

          {/* Main heading */}
          <div className="space-y-4">
            <h1 className="text-5xl md:text-7xl font-bold">
              <span className="gradient-text">Nano Banana</span>
              <br />
              <span className="text-white">AI Fusion</span>
            </h1>
            
            {/* Typewriter effect */}
            <div className="h-8 md:h-10">
              <p className="text-xl md:text-2xl text-gray-300">
                {displayText}
                <span className="inline-block w-0.5 h-6 bg-purple-400 ml-1 animate-pulse" />
              </p>
            </div>
          </div>

          {/* Feature badges */}
          <div className="flex flex-wrap justify-center gap-4">
            {[
              { icon: Star, text: "16+ Characters" },
              { icon: Zap, text: "Instant Generation" },
              { icon: Sparkles, text: "4K Quality" }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                className="flex items-center gap-2 px-4 py-2 rounded-lg glass-card"
              >
                <item.icon className="w-4 h-4 text-purple-400" />
                <span className="text-sm text-gray-300">{item.text}</span>
              </motion.div>
            ))}
          </div>

          {/* CTA buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link href="/generate">
              <Button className="neon-button group px-8 py-6 text-lg">
                Start Creating
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link href="/gallery">
              <Button 
                variant="outline" 
                className="px-8 py-6 text-lg border-purple-500/30 hover:bg-purple-500/10"
              >
                View Gallery
              </Button>
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="grid grid-cols-3 gap-8 mt-16 max-w-2xl mx-auto"
          >
            {[
              { value: "100K+", label: "Creations" },
              { value: "50K+", label: "Users" },
              { value: "4.9", label: "Rating" }
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold gradient-text">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-400 mt-1">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
