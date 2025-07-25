import React, { useState } from 'react';
import api from '../Api/axiosInstace';
const SearchProjects = () => {
  const [keyword, setKeyword] = useState('');
  const [projects, setProjects] = useState([]);
  const [jwtToken, setJwtToken] = useState(''); // Example: get this from localStorage or props

  const handleSearch = async () => {
    try {
      const response = await api.get('/projects/search', {
        headers: {
          Authorization: jwtToken,
        },
        params: {
          keyword: keyword || '',
        },
      });

      setProjects(response.data);
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  };

  return (
    <div className="p-6 space-y-4 text-black">
      <input
        type="text"
        placeholder="Search Projects..."
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        className="px-4 py-2 border border-gray-300 rounded"
      />
      <button
        onClick={handleSearch}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Search
      </button>

      {/* Display Results */}
      <div className="mt-4 space-y-2">
        {projects.map((project) => (
          <div key={project.id} className="p-4 border border-gray-200 rounded shadow-sm bg-white">
            <h3 className="text-lg font-semibold">{project.name}</h3>
            <p>{project.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchProjects;
