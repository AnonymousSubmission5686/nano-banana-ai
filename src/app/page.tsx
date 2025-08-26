import HeroSection from '@/components/HeroSection';

export default function Page() {
  return (
    <div className="relative min-h-screen bg-gradient-to-b from-slate-900 via-purple-900/20 to-slate-900">
      {/* Simple gradient background instead of particles */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
      
      {/* Hero Section */}
      <HeroSection />
      
      {/* Additional sections can be added here */}
    </div>
  );
}
