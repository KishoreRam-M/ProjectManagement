import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import CodeEditor from '../../CodeEditor';
import api from '../../Api/axiosInstace';
import Aibot from '../Aibot';

function ViewProject() {
  const { projectId } = useParams();
  const navigate = useNavigate();

  // Project & files
  const [project, setProject] = useState(null);
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null);
  const [code, setCode] = useState(null);

  // Issue management
  const [issues, setIssues] = useState([]);
  const [commentMap, setCommentMap] = useState({});
  const [commentInputs, setCommentInputs] = useState({});

  // Controlled inputs for new issue form
  const [newIssue, setNewIssue] = useState({
    title: '',
    description: '',
    priority: 'Medium',
    dueDate: '',
    tags: '',
  });

  const currentUser = { id: 1, name: 'You' };

  // Fetch project data
  const getProject = async () => {
    try {
      const response = await api.get(`/projects/${projectId}`);
      setProject(response.data);
    } catch (error) {
      console.error('Error fetching project:', error);
    }
  };

  // Fetch files list
  const getFiles = async () => {
    try {
      const response = await api.get('/files/list');
      setFiles(response.data);
    } catch (error) {
      console.error('Error fetching files:', error);
    }
  };

  // Fetch issues and their comments
  const fetchIssues = async () => {
    if (!projectId) return;
    try {
      const res = await api.get(`/issue/project/${projectId}`);
      const fetchedIssues = res.data;
      setIssues(fetchedIssues);

      // Fetch comments for each issue in parallel
      const commentData = {};
      await Promise.all(
        fetchedIssues.map(async (issue) => {
          try {
            const commentsRes = await api.get(`/comment/all/issueId/${issue.id}`);
            commentData[issue.id] = commentsRes.data;
          } catch {
            commentData[issue.id] = [];
          }
        })
      );
      setCommentMap(commentData);
    } catch (err) {
      console.error('Failed to fetch issues:', err);
      alert('Could not load issues. Check project ID or server.');
    }
  };

  // Handle uploading a file
  const uploadFile = async (selectedFile) => {
    try {
      setUploading(true);
      const formData = new FormData();
      formData.append('file', selectedFile);
      await api.post('/files/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      await getFiles();
    } catch (error) {
      console.error('Error uploading file:', error);
    } finally {
      setUploading(false);
    }
  };

  // Delete a file
  const deleteFile = async (file) => {
    try {
      await api.delete('/files/delete', { params: { filename: file } });
      setFiles((prev) => prev.filter((f) => f !== file));
      if (code && code.filename === file) setCode(null);
    } catch (error) {
      console.error('Error deleting file:', error);
    }
  };

  // Read a file content
  const readFile = async (filename) => {
    try {
      const response = await api.get('files/read', { params: { filename } });
      setCode({ content: response.data, filename });
      console.log(code);
    } catch (error) {
      console.error('Error reading file:', error);
    }
  };

  // Create new issue
  const handleCreate = async () => {
    if (!newIssue.title.trim()) return alert('Title is required');

    const payload = {
      title: newIssue.title.trim(),
      status: 'OPEN',
      description: newIssue.description.trim(),
      priority: newIssue.priority,
      projectId: parseInt(projectId),
      dueDate: newIssue.dueDate || null,
      tags: newIssue.tags
        ? newIssue.tags.split(',').map((t) => t.trim()).filter(Boolean)
        : [],
    };

    try {
      await api.post('/issue', payload);
      setNewIssue({ title: '', description: '', priority: 'Medium', dueDate: '', tags: '' });
      fetchIssues();
    } catch (err) {
      console.error('Create failed:', err);
      alert('Failed to create issue.');
    }
  };

  // Delete issue
  const handleDelete = async (id) => {
    if (!window.confirm('Delete this issue?')) return;
    try {
      await api.delete(`/issue/${id}`);
      fetchIssues();
    } catch (err) {
      console.error('Delete failed:', err);
      alert('Could not delete issue.');
    }
  };

  // Assign current user to issue
  const handleAssign = async (id) => {
    try {
      await api.put(`/issue/${id}/assignee/${currentUser.id}`);
      fetchIssues();
    } catch (err) {
      console.error('Assign failed:', err);
      alert(`Failed to assign. Issue ${id} may not exist.`);
    }
  };

  // Toggle issue status between OPEN and CLOSED
  const handleStatusToggle = async (id, currentStatus) => {
    const newStatus = currentStatus === 'OPEN' ? 'CLOSED' : 'OPEN';
    try {
      await api.put(`/issue/${id}/status/${newStatus}`);
      fetchIssues();
    } catch (err) {
      console.error('Status update failed:', err);
      alert(`Could not update status of issue ${id}.`);
    }
  };

  // Post a comment on an issue
  const postComment = async (issueId) => {
    const content = commentInputs[issueId]?.trim();
    if (!content) return;

    try {
      await api.post('/comment', { issueId, content });
      setCommentInputs((prev) => ({ ...prev, [issueId]: '' }));
      fetchIssues();
    } catch (err) {
      console.error('Failed to post comment:', err);
    }
  };

  useEffect(() => {
    getProject();
    getFiles();
    fetchIssues();
  }, [projectId]);

  return (
    <div className="min-h-screen bg-gray-900 p-6 font-sans text-gray-100">
      {/* Header */}
      <header className="bg-gradient-to-r from-indigo-800 via-purple-900 to-pink-900 rounded-3xl p-8 mb-8 shadow-lg border border-indigo-700 flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-extrabold tracking-wide">{project?.name || 'Loading...'}</h1>
          <p className="mt-3 text-indigo-300 max-w-lg">{project?.description || 'No description available.'}</p>
        </div>
        <div className="flex gap-5">
          <button
            className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-md transition focus:outline-none focus:ring-2 focus:ring-indigo-400"
            aria-label="Edit project"
            onClick={() => navigate(`/projects/${projectId}/edit`)}
          >
            Edit
          </button>
          <button
            className="px-6 py-2 bg-purple-600 hover:bg-purple-700 rounded-xl shadow-md transition focus:outline-none focus:ring-2 focus:ring-purple-400"
            aria-label="Share project"
          >
            Share
          </button>
        </div>
      </header>

      {/* Main Content Grid */}
      <main className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left - Files Panel */}
        <section className="lg:col-span-4 flex flex-col bg-gray-800 rounded-xl border border-gray-700 shadow-inner">
          <header className="p-5 border-b border-gray-700 rounded-t-xl bg-gradient-to-r from-indigo-900 to-purple-900">
            <h2 className="text-2xl font-bold text-white tracking-wide">Files</h2>
          </header>

          <div className="p-5 flex-grow overflow-y-auto max-h-[450px]">
            {files.length === 0 ? (
              <p className="text-indigo-400 italic">No files uploaded yet.</p>
            ) : (
              files.map((file) => (
                <div
                  key={file}
                  className="flex items-center justify-between py-3 px-4 mb-2 rounded-lg bg-gray-700 hover:bg-indigo-700 cursor-pointer transition"
                >
                  <button

onClick={() => {
  console.log(file);
  return readFile(file);
}}


className="text-indigo-100 font-medium truncate max-w-[80%] text-left"
                    title={file}
                  >
                    {file}
                  </button>
                  <button
                    onClick={() => deleteFile(file)}
                    aria-label={`Delete ${file}`}
                    title={`Delete ${file}`}
                    className="w-8 h-8 flex items-center justify-center rounded-full bg-red-600 hover:bg-red-700 transition text-white font-bold"
                  >
                    &times;
                  </button>
                </div>
              ))
            )}
          </div>

          {/* Upload Button */}
          <div className="p-5 border-t border-gray-700 flex justify-end">
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              onChange={(e) => e.target.files.length && uploadFile(e.target.files[0])}
              aria-label="Upload file input"
            />
            <button
              onClick={() => fileInputRef.current && fileInputRef.current.click()}
              disabled={uploading}
              className="bg-gradient-to-r from-blue-600 to-indigo-700 px-6 py-3 rounded-xl shadow-lg font-semibold tracking-wide text-white hover:from-blue-700 hover:to-indigo-800 disabled:opacity-60 transition"
            >
              {uploading ? 'Uploading...' : 'Upload'}
            </button>
          </div>
        </section>

        {/* Right - Code Editor */}
        <section className="lg:col-span-8 bg-gray-800 rounded-xl border border-gray-700 shadow-lg overflow-hidden flex flex-col">
          <CodeEditor c={code?.content || '// no code yet'} />
        </section>
      </main>
<Aibot/>

      {/* Bottom Panels */}
      <section className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Issue Tracker Panel */}
        <div className="bg-gradient-to-tr from-purple-900 via-indigo-900 to-blue-900 rounded-xl border border-indigo-800 p-8 shadow-lg text-white">
          <h3 className="text-3xl font-bold mb-6">Issue Tracker</h3>

          {/* New Issue Form */}
          <div className="bg-gray-900 rounded-xl p-6 shadow-inner mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <input
                type="text"
                placeholder="Title *"
                value={newIssue.title}
                onChange={(e) => setNewIssue((prev) => ({ ...prev, title: e.target.value }))}
                className="p-3 rounded-lg bg-gray-800 text-white placeholder-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <select
                value={newIssue.priority}
                onChange={(e) => setNewIssue((prev) => ({ ...prev, priority: e.target.value }))}
                className="p-3 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
                <option>Critical</option>
              </select>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <input
                type="date"
                value={newIssue.dueDate}
                onChange={(e) => setNewIssue((prev) => ({ ...prev, dueDate: e.target.value }))}
                className="p-3 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <input
                type="text"
                placeholder="Tags (comma separated)"
                value={newIssue.tags}
                onChange={(e) => setNewIssue((prev) => ({ ...prev, tags: e.target.value }))}
                className="p-3 rounded-lg bg-gray-800 text-white placeholder-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <textarea
              rows={3}
              placeholder="Description"
              value={newIssue.description}
              onChange={(e) => setNewIssue((prev) => ({ ...prev, description: e.target.value }))}
              className="w-full p-3 rounded-lg bg-gray-800 text-white placeholder-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 mb-4"
            />
            <button
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 py-3 rounded-full shadow-lg font-bold hover:opacity-90 transition"
              onClick={handleCreate}
            >
              + Create Issue
            </button>
          </div>

          {/* Existing Issues */}
          {issues.length === 0 ? (
            <p className="italic text-indigo-400">No issues found for this project.</p>
          ) : (
            issues.map((issue) => (
              <div
                key={issue.id}
                className="mb-6 bg-gray-800 rounded-xl p-5 shadow-inner border border-indigo-600"
              >
                <div className="flex justify-between items-center mb-2">
                  <h4 className="text-xl font-semibold text-indigo-200">{issue.title}</h4>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handleStatusToggle(issue.id, issue.status)}
                      className={`px-3 py-1 rounded-full font-semibold text-sm transition ${
                        issue.status === 'OPEN'
                          ? 'bg-green-600 hover:bg-green-700'
                          : 'bg-red-600 hover:bg-red-700'
                      }`}
                      title={`Mark as ${issue.status === 'OPEN' ? 'Closed' : 'Open'}`}
                    >
                      {issue.status}
                    </button>
                    <button
                      onClick={() => handleAssign(issue.id)}
                      className="px-3 py-1 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm"
                      title="Assign to me"
                    >
                      Assign Me
                    </button>
                    <button
                      onClick={() => handleDelete(issue.id)}
                      className="px-3 py-1 rounded-full bg-red-600 hover:bg-red-700 text-white font-semibold text-sm"
                      title="Delete issue"
                    >
                      Delete
                    </button>
                  </div>
                </div>
                <p className="text-indigo-300 mb-2">{issue.description}</p>
                <p className="text-indigo-400 text-sm mb-2">
                  Priority: <strong>{issue.priority}</strong> | Due: {issue.dueDate || 'N/A'}
                </p>
                <p className="mb-2">
                  Tags:{' '}
                  {issue.tags?.length ? (
                    issue.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="inline-block bg-purple-700 px-3 py-1 rounded-full text-xs mr-2"
                      >
                        {tag}
                      </span>
                    ))
                  ) : (
                    <span className="text-indigo-400 italic">No tags</span>
                  )}
                </p>

                {/* Comments */}
                <div className="mt-3 bg-gray-700 rounded-lg p-3 max-h-48 overflow-y-auto">
                  {(commentMap[issue.id] || []).map((comment) => (
                    <div key={comment.id} className="mb-2 border-b border-gray-600 pb-1">
                      <p className="text-sm text-indigo-300">
                        <strong>{comment.authorName || 'User'}:</strong> {comment.content}
                      </p>
                    </div>
                  ))}
                  <div className="flex space-x-2 mt-2">
                    <input
                      type="text"
                      placeholder="Add a comment"
                      value={commentInputs[issue.id] || ''}
                      onChange={(e) =>
                        setCommentInputs((prev) => ({ ...prev, [issue.id]: e.target.value }))
                      }
                      className="flex-grow p-2 rounded-lg bg-gray-600 text-white placeholder-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                    <button
                      onClick={() => postComment(issue.id)}
                      className="bg-indigo-600 hover:bg-indigo-700 px-4 rounded-lg text-white font-semibold"
                    >
                      Post
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Details Panel */}
        <div className="bg-gradient-to-tr from-indigo-900 via-purple-900 to-pink-900 rounded-xl border border-pink-700 p-8 shadow-lg text-white">
          <h3 className="text-3xl font-bold mb-6">Project Details</h3>
          <div className="space-y-6">
            <p>
              <strong>Category:</strong> {project?.category || 'unknown'}
            </p>
            <p>
              <strong>Owner:</strong> {project?.owner?.name || 'unknown'}
            </p>

            <div>
              <strong>Tags:</strong>
              <div className="flex gap-3 flex-wrap mt-2">
                {project?.tags?.length > 0 ? (
                  project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="bg-gradient-to-r from-pink-600 to-purple-700 px-5 py-2 rounded-full text-white font-semibold"
                    >
                      {tag}
                    </span>
                  ))
                ) : (
                  <p>No tags</p>
                )}
              </div>
            </div>

            <div>
              <strong>Team Members:</strong>
              <div className="flex gap-4 mt-3">
                {project?.team?.length > 0 ? (
                  project.team.map((member) => (
                    <div
                      key={member.id}
                      className="w-14 h-14 bg-gray-800 rounded-full flex items-center justify-center border-2 border-pink-500 shadow-md"
                      title={member.name}
                    >
                      <span className="text-white text-xl font-bold">{member.name[0]}</span>
                    </div>
                  ))
                ) : (
                  <p>No team members.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ViewProject;
