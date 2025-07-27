import React, { useEffect, useState } from 'react';
import api from '../Api/axiosInstace';
import PremiumCard from './PremiumCard';

const ProjectList = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const { data } = await api.get('/projects');
        console.log(data);
        setProjects(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProjects();
  }, []);

  return (
     <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 p-4">
      {projects.map((project) => (
        <PremiumCard key={project.id} {...project} />
      ))}
    </div>
  );
};

export default ProjectList;
