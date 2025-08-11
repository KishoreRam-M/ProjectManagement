import React from 'react';

const Card = ({ icon, title, description, italic, links }) => (
  <div
    className="
      w-full sm:max-w-sm p-6 bg-[#181829] border border-indigo-700 rounded-2xl shadow-lg
      hover:shadow-2xl hover:bg-gradient-to-r hover:from-indigo-900 hover:via-purple-900 hover:to-pink-900
      transition-all duration-300 space-y-4 cursor-default
      flex flex-col
    "
  >
    {icon && (
      <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-[#20202E] text-[#4E9EFF] text-2xl shadow-inner select-none">
        {icon}
      </div>
    )}
    <h5 className="text-white text-2xl font-extrabold tracking-tight">{title}</h5>
    <p className={`text-indigo-300 ${italic ? 'italic text-indigo-400' : ''}`}>
      {description}
    </p>
    {links && (
      <div className="pt-2 space-y-1">
        {links.map(({ label, url }) => (
          <a
            key={label}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="block text-cyan-400 hover:underline text-sm select-text"
          >
            {label}
          </a>
        ))}
      </div>
    )}
  </div>
);

const AboutSection = () => {
  return (
    <section className="bg-[#0F0F1C] py-20 px-6">
      <div className="max-w-7xl mx-auto text-center mb-12">
        <h2 className="text-4xl font-extrabold text-white mb-4 bg-gradient-to-r from-indigo-800 via-purple-900 to-pink-900 bg-clip-text text-transparent drop-shadow-lg">
          About ZenFlow
        </h2>
        <p className="text-indigo-400 max-w-2xl mx-auto">
          We're not just another productivity tool. We're a mindset shift. Discover our mission, values, and the people we serve.
        </p>
      </div>
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 justify-center">
        <Card
          icon="🎯"
          title="Our Mission"
          description="At ZenFlow, we help creators, developers, and remote teams unlock their best work. We believe productivity isn't about hustle — it's about harmony. ZenFlow is built to eliminate friction, enabling calm, clear, focused work every day."
        />
        <Card
          icon="🚨"
          title="The Problem We Solve"
          description="Endless notifications. Bloated dashboards. Pointless meetings. Today's tools overwhelm instead of assist. ZenFlow replaces the chaos with clarity — letting you get into flow and stay there longer. One tool. Zero distractions."
        />
        <Card
          icon="⏰"
          title="Why It Matters Now"
          description="In the age of hybrid work and global teams, attention is the new currency. We help high-performing individuals and mindful teams protect their time, prioritize what truly matters, and execute with intention."
          italic
        />
        <Card
          icon="💡"
          title="Our Philosophy"
          description="We value simplicity over complexity, focus over noise, and deep work over shallow distractions. ZenFlow is more than a tool — it's a philosophy."
        />
        <Card
          icon="🌍"
          title="Who We Serve"
          description="From solo creators to distributed teams, ZenFlow is trusted by thousands across industries to bring clarity, calm, and control to their workdays."
        />
        <Card
          icon="🛠️"
          title="Built for Developers"
          description="ZenFlow is crafted by developers, for developers. Every feature is optimized for speed, minimalism, and seamless integration into your existing workflow."
        />
      </div>
    </section>
  );
};

export default AboutSection;
