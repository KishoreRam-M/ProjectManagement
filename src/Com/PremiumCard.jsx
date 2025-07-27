import React from 'react';
import { motion } from 'framer-motion';

const PremiumCard = ({ id, name, description, category, tags = [] }) => {
  return (
    <motion.div
      className="bg-elevated border border-default rounded-2xl p-6 shadow-md hover:shadow-lg hover:bg-muted transition-all duration-300"
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
    >
      <div className="text-primary text-xl font-semibold mb-2">{name}</div>
      <div className="text-secondary text-sm mb-4">{description}</div>

      <div className="flex flex-wrap gap-2 mb-4">
        {tags.map((tag, index) => (
          <span
            key={index}
            className="bg-muted text-secondary text-xs px-2 py-1 rounded-full"
          >
            #{tag}
          </span>
        ))}
      </div>

      <div className="flex justify-between items-center">
        <span className="text-accent text-sm font-medium">{category}</span>
        <button className="bg-[linear-gradient(90deg,_#4E9EFF,_#5CE1E6)] text-primary text-xs font-semibold px-4 py-1 rounded-full hover:opacity-90 transition">
          View
        </button>
         <button className="bg-[linear-gradient(90deg,_#4E9EFF,_#5CE1E6)] text-primary text-xs font-semibold px-4 py-1 rounded-full hover:opacity-90 transition">
          Delete
        </button>
      </div>
    </motion.div>
  );
};

export default PremiumCard;
