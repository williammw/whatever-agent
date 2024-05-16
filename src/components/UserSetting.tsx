// src/components/UserSettings.tsx
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const UserSettings: React.FC = () => {
  const { user, logout } = useAuth();
  const [newEmail, setNewEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const handleUpdateEmail = async () => {
    // Logic to update user email
  };

  const handleUpdatePassword = async () => {
    // Logic to update user password
  };

  return (
    <div className="settings-container">
      <h2>User Settings</h2>
      <div>
        <label>Email:</label>
        <input type="email" value={newEmail} onChange={(e) => setNewEmail(e.target.value)} />
        <button onClick={handleUpdateEmail}>Update Email</button>
      </div>
      <div>
        <label>Password:</label>
        <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
        <button onClick={handleUpdatePassword}>Update Password</button>
      </div>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default UserSettings;
