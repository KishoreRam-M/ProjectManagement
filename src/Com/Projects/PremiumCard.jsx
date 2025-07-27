import React from 'react';
import { motion } from 'framer-motion';
import { Eye, Trash2, Pencil } from 'lucide-react'; // Icons (install lucide-react if not already)

const PremiumCard = ({ id, name, description, category, tags = [] }) => {
  return (
    <motion.div
      className="bg-elevated border border-default rounded-2xl p-6 shadow-md hover:shadow-lg hover:bg-muted transition-all duration-300"
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
    >
      <div className="text-primary text-xl font-bold mb-2 tracking-wide">{name}</div>
      <div className="text-secondary text-sm mb-4 leading-relaxed">{description}</div>

      <div className="flex flex-wrap gap-2 mb-4">
        {tags.map((tag, index) => (
          <span
            key={index}
            className="bg-muted text-muted-foreground text-xs px-3 py-1 rounded-full shadow-sm"
          >
            #{tag}
          </span>
        ))}
      </div>

      <div className="flex justify-between items-center mt-4">
        <span className="text-accent text-sm font-medium italic">{category}</span>
        <div className="flex gap-2">
          {/* View Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-1 bg-gradient-to-r from-blue-500 to-teal-400 text-white text-xs font-semibold px-3 py-1.5 rounded-full shadow hover:opacity-90 transition"
          >
            <Eye size={14} /> View
          </motion.button>

          {/* Delete Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-1 bg-gradient-to-r from-red-500 to-rose-400 text-white text-xs font-semibold px-3 py-1.5 rounded-full shadow hover:opacity-90 transition"
          >
            <Trash2 size={14} /> Delete
          </motion.button>

          {/* Update Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-1 bg-gradient-to-r from-yellow-500 to-amber-400 text-white text-xs font-semibold px-3 py-1.5 rounded-full shadow hover:opacity-90 transition"
          >
            <Pencil size={14} /> Update
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default PremiumCard;
