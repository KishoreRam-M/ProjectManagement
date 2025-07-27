import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../Api/axiosInstace';

const ViewProject = () => {
  const { projectId } = useParams();
  const [project, setProject] = useState(null);
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);

  const fetchProject = async () => {
    try {
      const res = await api.get(`/projects/${projectId}`);
      setProject(res.data);
    } catch (err) {
      console.error('Error fetching project:', err);
    }
  };

  useEffect(() => {
    fetchProject();
  }, [projectId]);

  if (!project) {
    return <div className="text-primary p-8">Loading project...</div>;
  }

  return (
    <div className="bg-base min-h-screen p-6 text-primary">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-elevated p-4 rounded-2xl shadow-md mb-6 border border-default">
        <div>
          <h1 className="text-3xl font-bold">{project.name}</h1>
          <p className="text-secondary mt-2">{project.description}</p>
        </div>
        <div className="flex gap-3 mt-4 sm:mt-0">
          <button
            className="bg-elevated border border-default text-accent px-4 py-2 rounded-xl hover:bg-muted transition-all"
            onClick={() => {
              if (project?.id) {
                navigate(`/projects/${project.id}/edit`);
              } else {
                console.error("❌ Project ID is undefined.");
              }
            }}
          >
            Edit
          </button>
          <button className="bg-gradient-to-r from-blue-500 to-blue-700 text-white px-4 py-2 rounded-xl hover:opacity-90 transition-all" onClick={()=>{setModalOpen(true)}}>
            Share
          </button>
        </div>
      </div>

      {/* Two-column layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Primary Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Preview Placeholder */}
          <div className="bg-elevated border border-default rounded-xl h-48 flex items-center justify-center text-secondary hover:bg-muted transition-all">
            Project Preview Placeholder
          </div>

          {/* Components Grid */}
          <div>
            <h2 className="text-xl font-semibold mb-3">Components</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Placeholder cards */}
              <div className="bg-elevated border border-default p-4 rounded-xl text-primary">
                <p className="font-medium">Issue Tracker</p>
                <div className="bg-muted mt-2 h-20 rounded" />
              </div>
              <div className="bg-elevated border border-default p-4 rounded-xl text-primary">
                <p className="font-medium">Code View</p>
                <div className="bg-muted mt-2 h-20 rounded" />
              </div>
            </div>
          </div>
        </div>

        {/* Secondary Column */}
        <div className="space-y-6">
          {/* Project Details */}
          <div className="bg-elevated border border-default p-4 rounded-xl">
            <h2 className="text-xl font-semibold mb-4">Details</h2>
            <div className="text-secondary">
              <p><span className="font-semibold text-primary">Category:</span> {project.category}</p>
              <p><span className="font-semibold text-primary">Owner:</span> {project.owner.name} ({project.owner.email})</p>
            </div>

            {/* Tags */}
            <div className="mt-4">
              <h3 className="text-primary font-medium mb-2">Tags:</h3>
              <div className="flex gap-2 flex-wrap">
                {project.tags.map((tag, idx) => (
                  <span key={idx} className="bg-muted text-accent px-3 py-1 rounded-full text-sm">{tag}</span>
                ))}
              </div>
            </div>

            {/* Team */}
            <div className="mt-4">
              <h3 className="text-primary font-medium mb-2">Team Members:</h3>
              <div className="flex -space-x-3">
                {project.team.map((member, idx) => (
                  <div
                    key={idx}
                    className="bg-input text-white rounded-full w-10 h-10 flex items-center justify-center border-2 border-base"
                    title={member.name}
                  >
                    {member.name[0].toUpperCase()}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Activity Feed */}
          <div className="bg-elevated border border-default p-4 rounded-xl">
            <h2 className="text-xl font-semibold mb-4">Activity</h2>
            <div className="space-y-3">
              <div className="bg-base p-3 rounded text-secondary">✅ Project created successfully</div>
              <div className="bg-elevated p-3 rounded text-error">⚠️ No issues added yet</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewProject;
