import React, { useRef } from 'react';
import api from '../Api/axiosInstace';

const CreateProjectSection = () => {
  const nameref = useRef(null);
  const descref = useRef(null);
  const catref = useRef(null);
  const tagref = useRef(null);

  const request = async () => {
    const payload = {
      name: nameref.current.value,
      description: descref.current.value,
      category: catref.current.value,
      tags: tagref.current.value.split(',').map(tag => tag.trim()), // convert comma-separated tags to array
    };

    try {
      const response = await api.post('/projects', payload);
      console.log('✅ Project Created:', response.data);
      alert('✅ Project Created Successfully!');
      
      // Optionally clear the form
      nameref.current.value = '';
      descref.current.value = '';
      catref.current.value = '';
      tagref.current.value = '';
    } catch (error) {
      console.error('❌ Error creating project:', error.response?.data || error.message);
      alert('❌ Failed to create project.');
    }
  };

  return (
    <>
      <div className="container max-w-xl mx-auto">
        <div className="text-center text-6xl font-bold py-10 tracking-tight bg-base text-transparent bg-clip-text bg-gradient-to-r from-[#4E9EFF] to-[#5CE1E6] drop-shadow-md">
          Craft Your Blueprint
        </div>
        <div className="input flex flex-col gap-6 text-black">
          <input type="text" placeholder="Project Name" required className="h-12 px-4 rounded" ref={nameref} />
          <input type="text" placeholder="Description" required className="h-12 px-4 rounded" ref={descref} />
          <input type="text" placeholder="Category" required className="h-12 px-4 rounded" ref={catref} />
          <input type="text" placeholder="Tags (comma separated)" required className="h-12 px-4 rounded" ref={tagref} />

          <button
            onClick={request}
            className="bg-gradient-to-r from-[#4E9EFF] to-[#5CE1E6] text-[#0F0F1C] font-semibold text-lg px-6 py-3 rounded-2xl shadow-md hover:opacity-90 transition-all duration-200"
          >
            Start Flow
          </button>
        </div>
      </div>
    </>
  );
};

export default CreateProjectSection;
