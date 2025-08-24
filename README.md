# Nano Banana AI 🍌

Revolutionary AI image editor with character consistency and natural language control.

## 🚀 Features

- **One-Shot Perfect Edits**: Achieve perfect image edits with natural language commands
- **Character Consistency**: Maintain perfect character consistency across multiple images
- **Lightning Fast**: Processing time of 15-30 seconds
- **Natural Language Control**: Edit images using simple text descriptions
- **Multi-Image Support**: Edit multiple images while maintaining consistency
- **API Access**: Integrate Nano Banana into your own applications

## 🛠️ Tech Stack

- **Frontend**: Next.js 15, React 18, TypeScript
- **Styling**: Tailwind CSS, Framer Motion
- **State Management**: Zustand
- **Payment**: Stripe
- **Icons**: Lucide React
- **Components**: Radix UI + shadcn/ui

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd nano-banana-ai
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   Edit `.env.local` with your API keys and configuration.

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🎯 Getting Started

1. **Sign up** for a free account to get 10 credits
2. **Upload an image** or start with text-to-image generation
3. **Describe your edit** using natural language (e.g., "Make the character smile and change the background to a beach sunset")
4. **Generate** your edited image in 15-30 seconds
5. **Download** or continue editing with more prompts

## 💰 Pricing

- **Free Trial**: 10 credits to get started
- **Starter**: $9.99/month for 100 credits
- **Pro**: $29.99/month for 500 credits + API access

## 🎨 Use Cases

- **Character Design**: Create consistent characters for games and stories
- **E-commerce**: Edit product photos while maintaining brand consistency
- **Social Media**: Generate consistent content for your social media presence
- **Marketing**: Create cohesive marketing materials with consistent visuals

## 🔧 Environment Variables

```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:3000/api
NEXT_PUBLIC_API_KEY=your-api-key-here
STRIPE_PUBLISHABLE_KEY=pk_test_your_publishable_key
STRIPE_SECRET_KEY=sk_test_your_secret_key
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-nextauth-secret
```

## 📁 Project Structure

```
nano-banana-ai/
├── src/
│   ├── app/                 # Next.js app directory
│   ├── components/          # React components
│   │   ├── ui/             # UI components (shadcn/ui)
│   │   ├── editor/         # Image editor components
│   │   └── payment/        # Payment components
│   ├── lib/                # Utility functions
│   │   ├── ai/             # AI processing logic
│   │   ├── payment/        # Payment logic
│   │   └── utils/          # Helper functions
│   └── types/              # TypeScript type definitions
├── public/                 # Static assets
├── package.json
├── tailwind.config.js
├── next.config.js
└── tsconfig.json
```

## 🚀 Deployment

### Vercel (Recommended)

1. **Push your code to GitHub**
2. **Connect your repository to Vercel**
3. **Set up environment variables** in Vercel dashboard
4. **Deploy**

### Other Platforms

The project can be deployed to any platform that supports Next.js:
- Netlify
- AWS Amplify
- DigitalOcean
- Railway

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

If you need help or have any questions, please:

1. Check our [Documentation](https://docs.nanobanana-ai.com)
2. Join our [Discord Community](https://discord.gg/nanobanana)
3. Contact us at support@nanobanana-ai.com

## 🌟 Star History

[![Star History Chart](https://api.star-history.com/svg?repos=your-username/nano-banana-ai&type=Date)](https://star-history.com/#your-username/nano-banana-ai&Date)

---

Made with ❤️ by the Nano Banana AI team