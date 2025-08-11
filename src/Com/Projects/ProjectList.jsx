import React, { useEffect, useState } from 'react';
import { Eye, Trash2, Pencil } from 'lucide-react';
import api from '../../Api/axiosInstace';
import { useNavigate } from 'react-router-dom';

const ProjectList = () => {
  const [projects, setProjects] = useState([]);
  const navigate = useNavigate();

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
    if (!window.confirm('Are you sure you want to delete this project?')) return;
    try {
      await api.delete(`/projects/${projectId}`);
      setProjects((prev) => prev.filter((p) => p.id !== projectId));
    } catch (error) {
      console.error('Error deleting project:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 p-6 font-sans text-gray-100">
      <h1 className="text-4xl font-extrabold mb-8 text-center bg-gradient-to-r from-indigo-800 via-purple-900 to-pink-900 bg-clip-text text-transparent drop-shadow-lg">
        Your Projects
      </h1>

      <div className="grid gap-8 sm:grid-cols-2 xl:grid-cols-3">
        {projects.length === 0 ? (
          <p className="text-indigo-400 text-center col-span-full">No projects found.</p>
        ) : (
          projects.map((project) => (
            <PremiumCard
              key={project.id}
              {...project}
              onDelete={handleDelete}
              onView={() => navigate(`/projects/${project.id}`)}
              onEdit={() => navigate(`/projects/${project.id}/edit`)}
            />
          ))
        )}
      </div>
    </div>
  );
};

const PremiumCard = ({
  id,
  name,
  description,
  category,
  tags = [],
  onDelete,
  onView,
  onEdit,
}) => {
  return (
    <div className="bg-gray-800 rounded-3xl border border-indigo-700 p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:bg-gradient-to-r hover:from-indigo-900 hover:via-purple-900 hover:to-pink-900 cursor-pointer flex flex-col justify-between">
      <div>
        <div className="text-indigo-400 text-xs mb-1 font-mono">ID: {id}</div>
        <h2 className="text-white text-2xl font-extrabold mb-3 tracking-tight">{name}</h2>
        <p className="text-indigo-300 text-sm mb-5 leading-relaxed min-h-[60px]">{description || 'No description provided.'}</p>

        <div className="flex flex-wrap gap-2 mb-6">
          {tags.length > 0 ? (
            tags.map((tag, idx) => (
              <span
                key={idx}
                className="bg-gradient-to-r from-pink-600 to-purple-700 px-4 py-1 rounded-full text-white font-semibold text-xs"
              >
                #{tag}
              </span>
            ))
          ) : (
            <span className="text-indigo-500 italic text-xs">No tags</span>
          )}
        </div>
      </div>

      <div className="flex justify-between items-center">
        <span className="italic text-indigo-400 font-medium">{category || 'Uncategorized'}</span>

        <div className="flex gap-3">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onView();
            }}
            className="flex items-center gap-1 bg-gradient-to-r from-blue-600 to-cyan-500 text-white text-sm font-semibold px-4 py-2 rounded-full shadow hover:opacity-90 transition"
            aria-label={`View project ${name}`}
          >
            <Eye size={16} /> View
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onEdit();
            }}
            className="flex items-center gap-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-sm font-semibold px-4 py-2 rounded-full shadow hover:opacity-90 transition"
            aria-label={`Edit project ${name}`}
          >
            <Pencil size={16} /> Edit
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete(id);
            }}
            className="flex items-center gap-1 bg-gradient-to-r from-red-600 to-pink-600 text-white text-sm font-semibold px-4 py-2 rounded-full shadow hover:opacity-90 transition"
            aria-label={`Delete project ${name}`}
          >
            <Trash2 size={16} /> Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProjectList;
