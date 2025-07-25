import React, { useEffect, useState } from 'react';
import api from '../Api/axiosInstace';

const ProjectList = () => {
  const [projects, setProjects] = useState([]);

  const getList = async () => {
    try {
      const response = await api.get('/projects');
      setProjects(response.data);
    } catch (error) {
      console.error('Error fetching project list:', error);
    }
  };

  useEffect(() => {
    getList();
  }, []);

  const PremiumCard = ({
    title,
    description,
    icon,
    tags = [],
    owner,
    projectId,
    team = [],
    issues = [],
  }) => {
    return (
        
      <div className="w-full sm:max-w-sm p-6 bg-elevated border border-default rounded-2xl shadow-md hover:shadow-lg hover:bg-muted transition-all duration-300 space-y-5 group">
        
        {/* Icon */}
        {icon && <div className="text-accent text-4xl">{icon}</div>}

        {/* Title */}
        <h3 className="text-primary text-2xl font-bold tracking-tight group-hover:underline underline-offset-4">
          {title}
        </h3>

        {/* Description */}
        <p className="text-secondary text-sm leading-relaxed line-clamp-3">
          {description || "No description provided."}
        </p>

        {/* Tags */}
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {tags.map((tag, index) => (
              <span key={index} className="bg-muted text-secondary text-xs px-2 py-1 rounded-full">
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* Meta Info */}
        <div className="flex flex-col text-xs text-secondary space-y-1 pt-2 border-t border-default mt-4">
          <span className="text-success">Owner: {owner?.name || 'Unknown'}</span>
          <span>Team Size: {team.length}</span>
          <span>Open Issues: {issues.length}</span>
          <span className="text-[10px] text-muted-foreground">Project ID: {projectId}</span>
          <span className="text-[10px] text-muted-foreground">Email: {owner?.email}</span>
        </div>

        {/* CTA */}
        <div className="pt-3">
          <button className="w-full bg-[linear-gradient(90deg,#4E9EFF,#5CE1E6)] text-white py-2 rounded-xl text-sm font-semibold shadow hover:opacity-90 transition">
            View Project
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="container mx-auto px-4">
        
      <div className="text-center text-6xl font-bold py-10 tracking-tight bg-base text-transparent bg-clip-text bg-gradient-to-r from-[#4E9EFF] to-[#5CE1E6] drop-shadow-md">
        List of  Projects
      </div>
       <button className="w-12 bg-[linear-gradient(90deg,#4E9EFF,#5CE1E6)] text-white py-2 rounded-xl text-sm font-semibold shadow hover:opacity-90 transition">
            Edit
          </button>

      {projects.length === 0 ? (
        <p className="text-secondary text-center">Loading projects...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pb-10">
          {projects
            .filter(p => p.category === 'premium')
            .map(project => (
              <PremiumCard
                key={project.id}
                title={project.name}
                description={project.description}
                icon="💎"
                tags={project.tags}
                owner={project.owner}
                team={project.team}
                issues={project.issues}
                projectId={project.id}
              />
            ))}
        </div>
      )}
    </div>
  );
};

export default ProjectList;
