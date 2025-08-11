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
    searchProjects(); // Remove if you want search only on button click
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 p-6 font-sans text-gray-100">
      <div className="max-w-md mx-auto mb-8">
        <input
          type="text"
          placeholder="Search projects..."
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          className="w-full px-5 py-3 rounded-3xl bg-gray-800 border border-indigo-700 text-gray-100 placeholder-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
        />
        <button
          onClick={searchProjects}
          className="mt-5 w-full bg-gradient-to-r from-indigo-700 via-purple-700 to-pink-700 text-white py-3 rounded-3xl shadow-lg hover:opacity-90 transition"
          aria-label="Search Projects"
        >
          🔍 Search
        </button>
      </div>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {projects.length === 0 ? (
          <p className="text-indigo-400 text-center col-span-full">No projects found.</p>
        ) : (
          projects.map((project) => (
            <div
              key={project.id}
              className="bg-gray-800 rounded-3xl border border-indigo-700 p-6 shadow-lg hover:shadow-2xl hover:bg-gradient-to-r hover:from-indigo-900 hover:via-purple-900 hover:to-pink-900 transition cursor-pointer"
            >
              <h2 className="text-2xl font-extrabold mb-3 text-white tracking-tight">{project.name}</h2>
              <p className="text-indigo-300 mb-4 min-h-[60px] leading-relaxed">
                {project.description || 'No description provided.'}
              </p>
              <p className="italic text-indigo-400 font-medium mb-4">Category: {project.category || 'Uncategorized'}</p>

              <div className="flex flex-wrap gap-3">
                {project.tags.length > 0 ? (
                  project.tags.map((tag, idx) => (
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
          ))
        )}
      </div>
    </div>
  );
};

export default SearchComponent;
