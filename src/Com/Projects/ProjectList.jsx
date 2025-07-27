import React, { useEffect, useState } from 'react';
import { Eye, Trash2, Pencil } from 'lucide-react';
import api from '../../Api/axiosInstace';

const ProjectList = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const { data } = await api.get('/projects');
        setProjects(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProjects();
  }, []);

  const handleDelete = async (projectId) => {
    try {
      const response = await api.delete(`/projects/${projectId}`);
      console.log('Deleted:', response.data);
      setProjects((prev) => prev.filter((p) => p.id !== projectId));
    } catch (error) {
      console.error('Error deleting project:', error);
    }
  };

  return (
    <div className="bg-base p-6 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 text-primary">
      {projects.map((project) => (
        <PremiumCard key={project.id} {...project} onDelete={handleDelete} />
      ))}
    </div>
  );
};

const PremiumCard = ({ id, name, description, category, tags = [], onDelete }) => {
  return (
    <div className="bg-elevated border border-default rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:bg-[rgba(255,255,255,0.05)]">
      <div className="text-secondary text-xs mb-1">ID: {id}</div>

      <h2 className="text-primary text-xl font-bold mb-2 tracking-tight">{name}</h2>

      <p className="text-secondary text-sm mb-4 leading-relaxed">{description}</p>

      <div className="flex flex-wrap gap-2 mb-4">
        {tags.map((tag, index) => (
          <span
            key={index}
            className="bg-muted text-secondary text-xs px-3 py-1 rounded-full border border-default"
          >
            #{tag}
          </span>
        ))}
      </div>

      {/* Footer */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <span className="text-accent text-sm font-medium italic">{category}</span>

        <div className="flex flex-wrap gap-2 justify-start sm:justify-end">
          {/* View Button */}
          <button className="flex items-center gap-1 bg-[linear-gradient(90deg,_#4E9EFF,_#5CE1E6)] text-primary text-xs font-semibold px-4 py-1.5 rounded-full shadow hover:opacity-90 transition">
            <Eye size={14} /> View
          </button>

          {/* Delete Button */}
          <button
            className="flex items-center gap-1 bg-[linear-gradient(90deg,_#FF6B6B,_#FF8A8A)] text-primary text-xs font-semibold px-4 py-1.5 rounded-full shadow hover:opacity-90 transition"
            onClick={() => onDelete(id)}
          >
            <Trash2 size={14} /> Delete
          </button>


        </div>
      </div>
    </div>
  );
};

export default ProjectList;
