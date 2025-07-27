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
      console.log('📌 Project ID from URL:', projectId);
      if (!projectId) {
        console.error('❌ Project ID is missing in the URL.');
        return;
      }

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
      await api.put(`/projects/${projectId}/edit`, form);
      alert('✅ Project updated!');
      navigate('/');
    } catch (err) {
      console.error('❌ Error updating project:', err?.response?.data || err.message);
    }
  };

  return (
    <div className="min-h-screen bg-base text-primary flex items-center justify-center p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-elevated border border-default rounded-2xl shadow-lg p-6 w-full max-w-xl space-y-4"
      >
        <h1 className="text-xl font-bold">✏️ Edit Project</h1>

        <div>
          <label className="block text-secondary">Project Name</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            className="w-full p-2 rounded bg-input border border-default text-primary"
            placeholder="Smart Chatbot"
          />
        </div>

        <div>
          <label className="block text-secondary">Description</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            className="w-full p-2 rounded bg-input border border-default text-primary"
            placeholder="Enter project description"
          />
        </div>

        <div>
          <label className="block text-secondary">Category</label>
          <input
            type="text"
            name="category"
            value={form.category}
            onChange={handleChange}
            className="w-full p-2 rounded bg-input border border-default text-primary"
            placeholder="AI/ML"
          />
        </div>

        <div>
          <label className="block text-secondary">Tags (comma separated)</label>
          <input
            type="text"
            name="tags"
            value={form.tags.join(', ')}
            onChange={handleTagChange}
            className="w-full p-2 rounded bg-input border border-default text-primary"
            placeholder="AI, NLP, Chatbot"
          />
        </div>

        <div className="flex justify-between">
          <button
            type="submit"
            className="bg-[linear-gradient(90deg,#4E9EFF,#5CE1E6)] text-primary font-semibold py-2 px-4 rounded hover:opacity-90"
          >
            💾 Save Changes
          </button>
          <button
            type="button"
            onClick={() => navigate('/')}
            className="text-error font-medium hover:underline"
          >
            ❌ Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProject;
