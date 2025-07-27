import React from 'react';

const Card = ({ icon, title, description, italic, links }) => (
  <div className="w-full sm:max-w-sm p-6 bg-[#181829] border border-[#292945] rounded-2xl shadow-sm hover:bg-[#20202E] transition-all duration-200 space-y-4">
    {icon && (
      <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-[#20202E] text-[#4E9EFF] text-xl">
        {icon}
      </div>
    )}
    <h5 className="text-2xl font-bold tracking-tight text-white">{title}</h5>
    <p className={`text-[#A9ADC1] font-normal ${italic ? 'italic text-[#C4C6DB]' : ''}`}>
      {description}
    </p>
    {links && (
      <div className="pt-2 space-y-2">
        {links.map(({ label, url }) => (
          <a
            key={label}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="block text-[#5CE1E6] hover:underline text-sm"
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
      <div className="max-w-7xl mx-auto grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
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
        
      </div>
    </section>
  );
};

export default AboutSection;
