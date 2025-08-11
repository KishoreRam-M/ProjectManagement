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
    <div className="min-h-screen bg-gray-900 p-8 font-sans text-gray-100">
      {/* Search Section */}
      <div className="max-w-md mx-auto mb-10">
        <input
          type="text"
          placeholder="Search projects..."
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          className="w-full px-5 py-3 rounded-3xl bg-gray-800 border border-indigo-700 text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm transition"
          onKeyDown={(e) => e.key === 'Enter' && searchProjects()}
          aria-label="Search projects"
        />
        <button
          onClick={searchProjects}
          className="mt-4 w-full bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-3xl py-3 font-semibold text-white shadow-lg hover:opacity-90 transition"
          aria-label="Search projects button"
        >
          🔍 Search
        </button>
      </div>

      {/* Project Grid */}
      <div className="grid gap-8 sm:grid-cols-2 xl:grid-cols-3">
        {projects.length === 0 ? (
          <p className="text-gray-400 text-center text-lg">No projects found.</p>
        ) : (
          projects.map((project) => (
            <ProjectCard key={project.id} {...project} onDelete={handleDelete} />
          ))
        )}
      </div>
    </div>
  );
};

// ProjectCard Component
const ProjectCard = ({ id, name, description, category, tags = [], onDelete }) => {
  const navigate = useNavigate();

  return (
    <div
      className="bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 rounded-3xl p-6 shadow-lg border border-indigo-700 hover:shadow-2xl transform hover:scale-[1.02] transition-all duration-300 cursor-default flex flex-col justify-between"
      role="article"
      aria-labelledby={`project-title-${id}`}
    >
      <div>
        <div className="text-indigo-400 text-xs mb-1 font-mono">ID: {id}</div>
        <h2
          id={`project-title-${id}`}
          className="text-white text-2xl font-extrabold mb-3 truncate"
          title={name}
        >
          {name}
        </h2>
        <p className="text-indigo-200 text-sm mb-4 line-clamp-3" title={description}>
          {description || 'No description available.'}
        </p>

        <div className="flex flex-wrap gap-2 mb-5">
          {tags.length === 0 ? (
            <span className="text-indigo-400 italic text-xs">No tags</span>
          ) : (
            tags.map((tag, idx) => (
              <span
                key={idx}
                className="bg-gradient-to-r from-pink-600 to-purple-700 text-white text-xs px-4 py-1 rounded-full font-semibold select-none"
                aria-label={`Tag: ${tag}`}
              >
                #{tag}
              </span>
            ))
          )}
        </div>
      </div>

      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
        <span className="text-pink-400 italic font-medium">{category || 'Uncategorized'}</span>

        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => navigate(`/projects/${id}`)}
            className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-cyan-500 text-white text-sm font-semibold px-5 py-2 rounded-2xl shadow-md hover:opacity-90 transition"
            aria-label={`View project ${name}`}
            type="button"
          >
            <Eye size={16} /> View
          </button>

          <button
            onClick={() => {
              if (window.confirm(`Are you sure you want to delete "${name}"?`)) onDelete(id);
            }}
            className="flex items-center gap-2 bg-gradient-to-r from-red-600 to-pink-500 text-white text-sm font-semibold px-5 py-2 rounded-2xl shadow-md hover:opacity-90 transition"
            aria-label={`Delete project ${name}`}
            type="button"
          >
            <Trash2 size={16} /> Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProjectExplorer;
