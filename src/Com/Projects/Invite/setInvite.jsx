// src/components/InviteFriendModal.jsx
import React, { useState } from 'react';
import { Dialog } from '@headlessui/react';
import { X } from 'lucide-react';
import api from '../Api/axiosInstace';

const InviteFriendModal = ({ isOpen, setIsOpen, projectId }) => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleInvite = async () => {
    if (!email || !projectId) {
      setMessage('Please enter a valid email.');
      return;
    }

    setLoading(true);
    try {
      const jwt = localStorage.getItem('jwt');

      const invitation = {
        email: email,
        projectID: projectId,
      };

      const response = await api.post('/accept_invitation', invitation, {
        headers: {
          Authorization: jwt,
        },
      });

      setMessage('Invitation sent successfully!');
      setEmail('');
    } catch (error) {
      console.error('Error inviting friend:', error);
      setMessage('Error sending invitation.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">
      <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" aria-hidden="true" />

      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="mx-auto w-full max-w-md rounded-2xl bg-white p-6 shadow-lg space-y-4">
          <div className="flex items-center justify-between">
            <Dialog.Title className="text-lg font-semibold">Invite Friend to Project</Dialog.Title>
            <button onClick={() => setIsOpen(false)}>
              <X className="w-5 h-5 text-gray-500 hover:text-red-500" />
            </button>
          </div>

          <input
            type="email"
            placeholder="Enter friend's email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            onClick={handleInvite}
            disabled={loading}
            className="w-full bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? 'Sending...' : 'Send Invite'}
          </button>

          {message && <p className="text-sm text-center text-gray-700">{message}</p>}
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default InviteFriendModal;
