import React, { useRef, useState } from 'react';
import api from '../../Api/axiosInstace';

const CreateProjectSection = () => {
  const nameref = useRef(null);
  const descref = useRef(null);
  const catref = useRef(null);
  const tagref = useRef(null);

  const [loading, setLoading] = useState(false);

  const request = async () => {
    if (
      !nameref.current.value.trim() ||
      !descref.current.value.trim() ||
      !catref.current.value.trim()
    ) {
      alert('Please fill in all required fields!');
      return;
    }

    setLoading(true);

    const payload = {
      name: nameref.current.value.trim(),
      description: descref.current.value.trim(),
      category: catref.current.value.trim(),
      tags: tagref.current.value
        .split(',')
        .map((tag) => tag.trim())
        .filter(Boolean),
    };

    try {
      await api.post('/projects', payload);
      alert('✅ Project Created Successfully!');
      nameref.current.value = '';
      descref.current.value = '';
      catref.current.value = '';
      tagref.current.value = '';
    } catch (error) {
      console.error('❌ Error creating project:', error.response?.data || error.message);
      alert('❌ Failed to create project.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 p-6 font-sans text-gray-100 flex flex-col items-center">
      {/* Header */}
      <header className="bg-gradient-to-r from-indigo-800 via-purple-900 to-pink-900 rounded-3xl p-8 mb-10 shadow-lg border border-indigo-700 w-full max-w-3xl">
        <h1 className="text-5xl font-extrabold tracking-wide">Craft Your Blueprint</h1>
        <p className="mt-3 text-indigo-300 max-w-xl">
          Fill out the details below to start your project flow.
        </p>
      </header>

      {/* Form Card */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          request();
        }}
        className="bg-gray-800 rounded-3xl border border-gray-700 shadow-inner p-8 w-full max-w-3xl space-y-6"
      >
        <div>
          <label className="block mb-2 font-semibold text-indigo-400" htmlFor="name">
            Project Name <span className="text-red-500">*</span>
          </label>
          <input
            id="name"
            ref={nameref}
            type="text"
            placeholder="Smart Chatbot"
            required
            className="w-full rounded-xl px-5 py-3 bg-gray-900 border border-indigo-600 text-white font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label className="block mb-2 font-semibold text-indigo-400" htmlFor="description">
            Description <span className="text-red-500">*</span>
          </label>
          <textarea
            id="description"
            ref={descref}
            placeholder="Enter project description"
            required
            rows={4}
            className="w-full rounded-xl px-5 py-3 bg-gray-900 border border-indigo-600 text-white font-medium resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label className="block mb-2 font-semibold text-indigo-400" htmlFor="category">
            Category <span className="text-red-500">*</span>
          </label>
          <input
            id="category"
            ref={catref}
            type="text"
            placeholder="AI/ML"
            required
            className="w-full rounded-xl px-5 py-3 bg-gray-900 border border-indigo-600 text-white font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label className="block mb-2 font-semibold text-indigo-400" htmlFor="tags">
            Tags (comma separated)
          </label>
          <input
            id="tags"
            ref={tagref}
            type="text"
            placeholder="AI, NLP, Chatbot"
            className="w-full rounded-xl px-5 py-3 bg-gray-900 border border-indigo-600 text-white font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-3xl py-4 text-white font-bold shadow-lg hover:opacity-90 transition disabled:opacity-50"
          aria-busy={loading}
        >
          {loading ? 'Creating...' : 'Start Flow'}
        </button>
      </form>
    </div>
  );
};

export default CreateProjectSection;
