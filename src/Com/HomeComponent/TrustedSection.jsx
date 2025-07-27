import React from 'react';
import { Star, ShieldCheck, Award } from 'lucide-react';

const testimonials = [
  {
    name: 'MicroHard ❌',
    quote: 'Too many dashboards. We just needed to focus.',
    highlight: 'Switched to ZenFlow.',
  },
  {
    name: 'FruitLoop ⚠️',
    quote: 'Pretty, but way too complex for daily workflows.',
    highlight: 'ZenFlow felt intuitive.',
  },
  {
    name: 'Gurgle ❌',
    quote: 'It felt like another layer of meetings.',
    highlight: 'We needed clarity, not chaos.',
  },
  {
    name: 'DevForge ✅',
    quote: 'ZenFlow removed noise. Our sprint reviews are now half the time.',
    highlight: 'Massive team productivity boost.',
  },
  {
    name: 'Notionary ✅',
    quote: 'We ditched sticky notes and synced beautifully with ZenFlow.',
    highlight: 'A game-changer for async teams.',
  },
  {
    name: 'Startloop ✅',
    quote: 'From chaos to clarity. We finally feel in flow.',
    highlight: 'ZenFlow just works.',
  },
  {
    name: 'ZingZon 🚫',
    quote: 'Too many meetings about meetings.',
    highlight: 'ZenFlow canceled the chaos.',
  },
  {
    name: 'TwisterBird 🪹',
    quote: 'We couldn’t find our threads.',
    highlight: 'ZenFlow made it simple.',
  },
  {
    name: 'MetaMorph 😵‍💫',
    quote: 'The metaverse meetings were… weird.',
    highlight: 'Back to reality with ZenFlow.',
  },
  {
    name: 'ClippyAI 📎',
    quote: 'I tried helping… but they replaced me.',
    highlight: 'ZenFlow needs no babysitter.',
  },
  {
    name: 'NetFlux ❌',
    quote: 'Too much streaming, not enough working.',
    highlight: 'ZenFlow fixed our focus.',
  },
  {
    name: 'ByteDanceOff 💃',
    quote: 'We danced around deadlines.',
    highlight: 'ZenFlow helped us land the beat.',
  },
  {
    name: 'Snapslack 🤐',
    quote: 'Too many messages, not enough meaning.',
    highlight: 'ZenFlow brought back signal.',
  },
  {
    name: 'RedBubbleNet 🌐',
    quote: 'Creative clutter everywhere.',
    highlight: 'ZenFlow gave us structure.',
  },
  {
    name: 'Oopsora ☁️',
    quote: 'Lost in our own cloud.',
    highlight: 'ZenFlow grounded us.',
  },
  {
    name: 'BoomBox AI 🔊',
    quote: 'All pitch, no harmony.',
    highlight: 'ZenFlow helped us sync.',
  },
  {
    name: 'StuckHub 🧱',
    quote: 'Code frozen. PRs piling up.',
    highlight: 'ZenFlow got us unstuck.',
  },
];

const TrustedSection = () => {
  return (
    <section className="bg-[#0F0F1C] py-20 px-6 text-white text-center">
      <h2 className="text-3xl md:text-4xl font-bold mb-4">
        Trusted by 10,000+ productive teams and makers
      </h2>
      <p className="text-[#A9ADC1] mb-10 max-w-2xl mx-auto">
        From solo devs to remote-first companies —{' '}
        <span className="italic text-[#4E9EFF]">ZenFlow powers real work</span>, not bureaucracy.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {testimonials.map((item, index) => (
          <div
            key={index}
            className="bg-[#181829] p-6 rounded-xl border border-[#292945] hover:bg-[#20202E] transition text-left"
          >
            <h3 className="text-xl font-semibold">{item.name}</h3>
            <p className="text-[#C4C6DB] mt-3 text-sm italic">
              “{item.quote}”<br />
              <span className="text-[#4E9EFF]">{item.highlight}</span>
            </p>
          </div>
        ))}
      </div>

      {/* Trust Indicators */}
      <div className="flex flex-wrap justify-center items-center gap-6 mt-14 text-[#A9ADC1] text-sm">
        <div className="flex items-center gap-2">
          <Star size={20} fill="#FFD700" />
          <span>Rated 5/5 on FocusTools</span>
        </div>
        <div className="flex items-center gap-2">
          <ShieldCheck size={20} className="text-[#4E9EFF]" />
          <span>ISO-Certified Security</span>
        </div>
        <div className="flex items-center gap-2">
          <Award size={20} className="text-[#FFD700]" />
          <span>Productivity Award 2025</span>
        </div>
      </div>
    </section>
  );
};

export default TrustedSection;
