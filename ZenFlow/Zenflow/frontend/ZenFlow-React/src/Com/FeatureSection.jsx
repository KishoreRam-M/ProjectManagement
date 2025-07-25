import React from 'react';
import { Sparkles, CheckCircle, Zap, Clock, Eye, Bot } from 'lucide-react';

const features = [
  {
    icon: <Zap className="w-6 h-6 text-[#5CE1E6]" />,
    emoji: '⚡',
    title: 'Instant Sync',
    description: 'ZenFlow syncs changes across your entire team in real-time — no refresh, no delay.',
  },
  {
    icon: <Clock className="w-6 h-6 text-[#5CE1E6]" />,
    emoji: '⏱️',
    title: 'Offline Mode',
    description: 'Keep flowing even when offline. Changes sync the moment you reconnect.',
  },
  {
    icon: <Bot className="w-6 h-6 text-[#5CE1E6]" />,
    emoji: '🤖',
    title: 'AI Summaries',
    description: 'Let Zen AI summarize, highlight, and convert meeting chaos into clear insights.',
  },
  {
    icon: <Eye className="w-6 h-6 text-[#5CE1E6]" />,
    emoji: '🧘',
    title: 'Zen Mode',
    description: 'Block distractions and enter flow-state with our ambient Zen Mode.',
  },
  {
    icon: <CheckCircle className="w-6 h-6 text-[#5CE1E6]" />,
    emoji: '✅',
    title: 'Action-First UI',
    description: 'Designed for doing, not browsing. One-click actions, zero bloat.',
  },
  {
    icon: <Sparkles className="w-6 h-6 text-[#5CE1E6]" />,
    emoji: '✨',
    title: 'Premium Aesthetics',
    description: 'Built to feel powerful — dark mode, glowing UI, and premium interactions.',
  },
];

const FeatureCard = ({ icon, emoji, title, description }) => (
  <div className="p-6 bg-[#181829] border border-[#292945] rounded-2xl shadow-md hover:shadow-lg hover:border-[#5CE1E6] transition-all duration-300 space-y-4">
    <div className="flex items-center space-x-3">
      <div className="text-2xl">{emoji}</div>
      <h4 className="text-xl font-semibold text-white">{title}</h4>
    </div>
    <p className="text-[#A9ADC1] text-sm">{description}</p>
  </div>
);

const FeatureSection = () => {
  return (
    <section className="bg-[#0F0F1C] py-20 px-4">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Why ZenFlow is Different
        </h2>
        <p className="text-[#C4C6DB] text-lg mb-10">
          Not just another productivity tool. ZenFlow is designed for doers, creators, and focused teams.
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;
