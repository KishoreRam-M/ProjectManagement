import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../Api/axiosInstace';

const EditProject = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: '',
    description: '',
    category: '',
    tags: [],
    owner: { id: 1 },
    team: [],
    issues: [],
  });

  const fetchProject = async () => {
    try {
      if (!projectId) return;
      const res = await api.get(`/projects/${projectId}`);
      setForm(res.data);
    } catch (err) {
      console.error('❌ Error loading project:', err?.response?.data || err.message);
    }
  };

  useEffect(() => {
    fetchProject();
  }, [projectId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleTagChange = (e) => {
    const value = e.target.value.split(',').map((tag) => tag.trim());
    setForm((prev) => ({ ...prev, tags: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/projects/${projectId}`, form);
      alert('✅ Project updated!');
      navigate('/');
    } catch (err) {
      console.error('❌ Error updating project:', err?.response?.data || err.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 p-8 font-sans text-gray-100 flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-3xl bg-gradient-to-tr from-indigo-900 via-purple-900 to-pink-900 rounded-3xl shadow-lg border border-indigo-700 p-10 space-y-8"
      >
        <h1 className="text-4xl font-extrabold tracking-wide mb-6 text-white">✏️ Edit Project</h1>

        {/* Project Name */}
        <div>
          <label className="block text-indigo-300 font-semibold mb-2">Project Name</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Smart Chatbot"
            className="w-full p-4 rounded-xl bg-gray-800 border border-indigo-700 text-white placeholder-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-indigo-300 font-semibold mb-2">Description</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Enter project description"
            rows={4}
            className="w-full p-4 rounded-xl bg-gray-800 border border-indigo-700 text-white placeholder-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
          />
        </div>

        {/* Category */}
        <div>
          <label className="block text-indigo-300 font-semibold mb-2">Category</label>
          <input
            type="text"
            name="category"
            value={form.category}
            onChange={handleChange}
            placeholder="AI/ML"
            className="w-full p-4 rounded-xl bg-gray-800 border border-indigo-700 text-white placeholder-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Tags */}
        <div>
          <label className="block text-indigo-300 font-semibold mb-2">Tags (comma separated)</label>
          <input
            type="text"
            name="tags"
            value={form.tags.join(', ')}
            onChange={handleTagChange}
            placeholder="AI, NLP, Chatbot"
            className="w-full p-4 rounded-xl bg-gray-800 border border-indigo-700 text-white placeholder-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Buttons */}
        <div className="flex justify-between mt-8">
          <button
            type="submit"
            className="bg-gradient-to-r from-blue-600 to-indigo-700 px-8 py-4 rounded-2xl shadow-lg font-bold text-white hover:opacity-90 transition"
          >
            💾 Save Changes
          </button>
          <button
            type="button"
            onClick={() => navigate('/')}
            className="text-pink-500 font-semibold hover:underline focus:outline-none"
          >
            ❌ Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProject;
