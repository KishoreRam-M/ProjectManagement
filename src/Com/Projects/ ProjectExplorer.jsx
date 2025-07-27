import React, { useEffect, useState } from 'react';
import { Eye, Trash2 } from 'lucide-react';
import api from '../../Api/axiosInstace';
import { useNavigate } from 'react-router-dom';

const ProjectExplorer = () => {
  const [projects, setProjects] = useState([]);
  const [keyword, setKeyword] = useState('');

  useEffect(() => {
    fetchAllProjects();
  }, []);

  const fetchAllProjects = async () => {
    try {
      const { data } = await api.get('/projects');
      setProjects(data);
    } catch (error) {
      console.error('Error fetching all projects:', error);
    }
  };

  const searchProjects = async () => {
    try {
      const response = await api.get('/projects/search', {
        params: { keyword },
      });
      setProjects(response.data);
    } catch (error) {
      console.error('Error searching projects:', error);
    }
  };

  const handleDelete = async (projectId) => {
    try {
      await api.delete(`/projects/${projectId}`);
      setProjects((prev) => prev.filter((p) => p.id !== projectId));
    } catch (error) {
      console.error('Error deleting project:', error);
    }
  };

  return (
    <div className="min-h-screen bg-base text-primary px-4 py-6">
      {/* 🔍 Search Section */}
      <div className="max-w-md mx-auto mb-6">
        <input
          type="text"
          placeholder="Search projects..."
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          className="w-full px-4 py-2 bg-input text-primary border border-default rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
        />
        <button
          onClick={searchProjects}
          className="mt-4 w-full bg-accent text-white py-2 rounded-lg hover:opacity-90 transition-all"
        >
          🔍 Search
        </button>
      </div>

      {/* 📂 Project Grid */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {projects.length === 0 ? (
          <p className="text-secondary">No projects found.</p>
        ) : (
          projects.map((project) => (
            <ProjectCard key={project.id} {...project} onDelete={handleDelete} />
          ))
        )}
      </div>
    </div>
  );
};

// 📦 ProjectCard Component
const ProjectCard = ({ id, name, description, category, tags = [], onDelete }) => {
  const navigate = useNavigate(); // ✅ Add this line

  return (
    <div className="bg-elevated border border-default rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:bg-muted">
      <div className="text-secondary text-xs mb-1">ID: {id}</div>

      <h2 className="text-primary text-xl font-bold mb-2">{name}</h2>
      <p className="text-secondary text-sm mb-3">{description}</p>

      <div className="flex flex-wrap gap-2 mb-4">
        {tags.map((tag, idx) => (
          <span
            key={idx}
            className="bg-muted text-secondary text-xs px-3 py-1 rounded-full border border-default"
          >
            #{tag}
          </span>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <span className="text-accent text-sm italic">{category}</span>

        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => navigate(`/projects/${id}`)} // ✅ Navigate to view with ID
            className="flex items-center gap-1 bg-gradient-to-r from-blue-500 to-cyan-400 text-white text-xs font-semibold px-4 py-1.5 rounded-full shadow hover:opacity-90 transition"
          >
            <Eye size={14} /> View
          </button>

          <button
            onClick={() => onDelete(id)}
            className="flex items-center gap-1 bg-gradient-to-r from-red-500 to-pink-400 text-white text-xs font-semibold px-4 py-1.5 rounded-full shadow hover:opacity-90 transition"
          >
            <Trash2 size={14} /> Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProjectExplorer;
