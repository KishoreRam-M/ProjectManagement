import React, { useEffect, useState } from 'react';
import api from '../../Api/axiosInstace';
const SearchComponent = () => {
  const [projects, setProjects] = useState([]);
  const [keyword, setKeyword] = useState('');

  const searchProjects = async () => {
    try {
      const response = await api.get('/projects/search', {
        params: { keyword },
      });
      setProjects(response.data);
    } catch (error) {
      console.error('Error fetching projects:', error);
    }
  };

  useEffect(() => {
    searchProjects(); // Optionally comment this if you only want search on button click
  }, []);

  return (
    <div className="min-h-screen bg-base text-primary px-4 py-6">
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

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {projects.length === 0 ? (
          <p className="text-secondary">No projects found.</p>
        ) : (
          projects.map((project) => (
            <div
              key={project.id}
              className="bg-elevated p-4 rounded-2xl border border-default shadow-md hover:shadow-lg transition hover:bg-muted"
            >
              <h2 className="text-lg font-semibold mb-2">{project.name}</h2>
              <p className="text-secondary mb-1">{project.description}</p>
              <p className="text-sm text-secondary">
                <strong>Category:</strong> {project.category}
              </p>
              <div className="flex flex-wrap gap-2 mt-2">
                {project.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="bg-muted text-secondary text-xs px-2 py-1 rounded-md"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default SearchComponent;
