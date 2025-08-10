import React, { useEffect, useRef, useState } from 'react';
import api from '../../Api/axiosInstace';
import { useParams } from 'react-router-dom';
import {
  FaPlus,
  FaTrash,
  FaCheck,
  FaUserPlus,
  FaPaperPlane,
} from 'react-icons/fa';

const Issue = () => {
  const { projectId } = useParams();
  const titleRef = useRef();
  const descRef = useRef();
  const prRef = useRef();
  const dueDateRef = useRef();
  const tagRef = useRef();

  const [issues, setIssues] = useState([]);
  const [commentMap, setCommentMap] = useState({});
  const [commentInputs, setCommentInputs] = useState({});
  const [currentUser] = useState({ id: 1, name: 'You' });

  const fetchIssues = async () => {
    if (!projectId) return;
    try {
      const res = await api.get(`/issue/project/${projectId}`);
      console.log( "from fetched ",projectId)
      const fetchedIssues = res.data;
      setIssues(fetchedIssues);

      const commentData = {};
      for (const issue of fetchedIssues) {
        try {
          const commentsRes = await api.get(`/comment/all/issueId/${issue.id}`);
          commentData[issue.id] = commentsRes.data;
        } catch (err) {
          console.error(`Failed to load comments for issue ${issue.id}`, err);
          commentData[issue.id] = [];
        }
      }
      setCommentMap(commentData);
    } catch (err) {
      console.error('Failed to fetch issues:', err);
      alert('Could not load issues. Check project ID or server.');
    }
  };

  const handleCreate = async () => {
    const title = titleRef.current.value.trim();
    if (!title) return alert("Title is required");

    const payload = {
      title,
      status: 'OPEN',
      description: descRef.current.value || '',
      priority: prRef.current.value || 'Medium',
      projectId: parseInt(projectId),
      dueDate: dueDateRef.current.value,
      tags: tagRef.current.value
        ? tagRef.current.value.split(',').map(t => t.trim()).filter(t => t)
        : [],
    };

    try {
      await api.post('/issue', payload);
      titleRef.current.value = '';
      descRef.current.value = '';
      prRef.current.value = '';
      dueDateRef.current.value = '';
      tagRef.current.value = '';
      fetchIssues();
    } catch (err) {
      console.error('Create failed:', err);
      alert('Failed to create issue.');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this issue?")) return;
    try {
      await api.delete(`/issue/${id}`);
      fetchIssues();
    } catch (err) {
      console.error('Delete failed:', err);
      alert('Could not delete issue.');
    }
  };

 const handleAssign = async (id) => {
  try {
    await api.put(`/issue/${id}/assignee/${currentUser.id}`);
    fetchIssues();
  } catch (err) {
    console.error('Assign failed:', err);
    alert(`Failed to assign. Issue ${id} may not exist.`);
  }
};


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

  const postComment = async (issueId) => {
    const content = commentInputs[issueId]?.trim();
    if (!content) return;

    try {
      await api.post('/comment', { issueId, content });
      setCommentInputs(prev => ({ ...prev, [issueId]: '' }));
      fetchIssues();
    } catch (err) {
      console.error('Failed to post comment:', err);
    }
  };

  useEffect(() => {
    fetchIssues();
  }, [projectId]);

  return (
    <div className="space-y-4 text-sm text-white p-2 max-w-4xl mx-auto">
      {/* Create Issue Form */}
      <div className="grid grid-cols-2 gap-2 p-3 rounded-lg bg-[#1a1b2f] shadow-md">
        <input ref={titleRef} placeholder="Title *" required
               className="bg-[#2a2b3c] p-1 rounded text-xs outline-none focus:bg-[#333]" />
        <input ref={prRef} placeholder="Priority" defaultValue="Medium"
               className="bg-[#2a2b3c] p-1 rounded text-xs" />
        <input type="date" ref={dueDateRef}
               className="bg-[#2a2b3c] p-1 rounded text-xs" />
        <input ref={tagRef} placeholder="Tags (comma-separated)"
               className="bg-[#2a2b3c] p-1 rounded text-xs" />
        <textarea ref={descRef} placeholder="Description"
                  className="col-span-2 bg-[#2a2b3c] p-1 rounded text-xs" rows={2} />
        <button
          onClick={handleCreate}
          className="col-span-2 flex justify-center items-center gap-2 bg-[#4E9EFF] p-2 rounded hover:bg-[#3d8bfe] transition duration-200"
        >
          <FaPlus size={12} /> Create Issue
        </button>
      </div>

      {/* Issues List */}
      {issues.length === 0 ? (
        <p className="text-center text-gray-500 py-6">No issues yet. Create one!</p>
      ) : (
        issues.map(issue => (
          <div key={issue.id} className="p-4 bg-[#1a1b2f] rounded-xl space-y-3 text-xs shadow-sm border border-gray-700">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <h3 className="font-semibold text-[#4E9EFF]">{issue.title}</h3>
                <p className="text-[#A9ADC1] text-xs mt-1">{issue.description}</p>
              </div>
              <div className="flex gap-1 ml-2">
                <button
                  onClick={() => handleAssign(issue.id)}
                  title={issue.assignee?.id === currentUser.id ? "Unassign" : "Assign to You"}
                  className={`p-1 rounded transition hover:scale-105 ${
                    issue.assignee?.id === currentUser.id
                      ? 'bg-yellow-600 text-white'
                      : 'bg-gray-700 text-white'
                  }`}
                >
                  <FaUserPlus size={12} />
                </button>
                <button
                  onClick={() => handleStatusToggle(issue.id, issue.status)}
                  title={`Mark as ${issue.status === 'OPEN' ? 'Closed' : 'Open'}`}
                  className={`p-1 rounded transition hover:scale-105 ${
                    issue.status === 'OPEN' ? 'bg-green-600' : 'bg-red-600'
                  }`}
                >
                  <FaCheck size={12} />
                </button>
                <button
                  onClick={() => handleDelete(issue.id)}
                  title="Delete Issue"
                  className="p-1 bg-red-900 text-white rounded hover:scale-105 transition"
                >
                  <FaTrash size={12} />
                </button>
              </div>
            </div>

            {/* Issue Meta */}
            <div className="flex flex-wrap gap-3 text-[10px] text-[#7F8FA4]">
              <span>👤 {issue.createdBy?.name || issue.createdBy?.email || 'Unknown'}</span>
              {issue.assignee && <span>🔧 {issue.assignee.name}</span>}
              <span>📅 Due: {issue.dueDate || 'N/A'}</span>
              <span>🏷️ {issue.tags?.join(', ') || 'No tags'}</span>
              <span>🎯 {issue.priority || 'Medium'}</span>
              <span className={`font-bold ${issue.status === 'OPEN' ? 'text-green-400' : 'text-red-400'}`}>
                {issue.status}
              </span>
            </div>

            {/* Comments */}
            <div className="space-y-2">
              <div className="max-h-32 overflow-y-auto space-y-1 bg-[#2a2b3c] p-2 rounded">
                {(commentMap[issue.id] || []).length === 0 ? (
                  <p className="text-gray-500 text-xs italic">No comments yet.</p>
                ) : (
                  commentMap[issue.id].map(comment => (
                    <div key={comment.id} className="bg-[#1e1f2f] p-2 rounded text-white">
                      <p className="text-xs">{comment.content}</p>
                      <div className="flex justify-between text-gray-400 text-[9px] mt-1">
                        <span>👤 {comment.user?.name || comment.user?.email || 'Someone'}</span>
                        <span>{new Date(comment.localDateTime).toLocaleString()}</span>
                      </div>
                    </div>
                  ))
                )}
              </div>

              <div className="flex gap-1">
                <input
                  value={commentInputs[issue.id] || ''}
                  onChange={(e) => setCommentInputs(prev => ({
                    ...prev,
                    [issue.id]: e.target.value
                  }))}
                  onKeyPress={(e) => e.key === 'Enter' && postComment(issue.id)}
                  placeholder="Add a comment..."
                  className="flex-1 bg-[#2a2b3c] p-1 rounded text-xs outline-none focus:bg-[#333]"
                />
                <button
                  onClick={() => postComment(issue.id)}
                  disabled={!commentInputs[issue.id]?.trim()}
                  className="p-2 bg-[#4E9EFF] rounded hover:bg-[#3d8bfe] disabled:bg-gray-600 transition"
                >
                  <FaPaperPlane size={12} />
                </button>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Issue;