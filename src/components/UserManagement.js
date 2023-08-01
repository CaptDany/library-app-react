import React, { useState } from 'react';
import { addUser, updateUser } from '../controller/api';

const UserManagement = () => {
  const [userId, setUserId] = useState('');
  const [userName, setUserName] = useState('');
  const [userRole, setUserRole] = useState('');
  const [userUpdateStatus, setUserUpdateStatus] = useState('');

  const handleAddUser = async () => {
    try {
      // Assuming addUser function takes userId, userName, and userRole as parameters
      await addUser(userId, userName, userRole);
      setUserUpdateStatus('User added successfully!');
    } catch (error) {
      console.error('Error adding user:', error);
      setUserUpdateStatus('User addition failed!');
    }
  };

  const handleUpdateUser = async () => {
    try {
      // Assuming updateUser function takes userId, userName, and userRole as parameters
      await updateUser(userId, userName, userRole);
      setUserUpdateStatus('User updated successfully!');
    } catch (error) {
      console.error('Error updating user:', error);
      setUserUpdateStatus('User update failed!');
    }
  };

  return (
    <div>
      <h2>User Management</h2>
      <input
        type="text"
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
        placeholder="Enter user ID"
      />
      <input
        type="text"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
        placeholder="Enter user name"
      />
      <input
        type="text"
        value={userRole}
        onChange={(e) => setUserRole(e.target.value)}
        placeholder="Enter user role"
      />
      <button onClick={handleAddUser}>Add User</button>
      <button onClick={handleUpdateUser}>Update User</button>

      {userUpdateStatus && <p>{userUpdateStatus}</p>}
    </div>
  );
};

export default UserManagement;
