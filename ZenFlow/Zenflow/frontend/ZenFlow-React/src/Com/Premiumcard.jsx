import React from 'react';

const PremiumCard = ({ title, description, icon, tags = [], owner }) => {
  return (
    <div className="w-full sm:max-w-sm p-6 bg-elevated border border-default rounded-2xl shadow-sm hover:bg-muted hover:shadow-md transition-all duration-300 space-y-4">
      
      {icon && <div className="text-accent text-3xl">{icon}</div>}
      
      <h3 className="text-primary text-xl font-semibold">
        {title}
      </h3>
      
      <p className="text-secondary text-sm leading-relaxed">
        {description}
      </p>

      {tags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {tags.map((tag, index) => (
            <span key={index} className="bg-muted text-secondary text-xs px-2 py-1 rounded-full">
              #{tag}
            </span>
          ))}
        </div>
      )}

      {owner && (
        <div className="text-success text-xs mt-2">
          Owner: {owner.name}
        </div>
      )}
    </div>
  );
};

export default PremiumCard;
