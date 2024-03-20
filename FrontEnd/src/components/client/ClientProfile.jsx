import React, { useState, useEffect } from 'react';
import useUserInfo from '../customHooks/useUserInfo';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import '../style/ClientProfile.css';

const MyComponent = () => {
  const { userInfo, loading, error, updateUserInfo } = useUserInfo();
  const [isEditing, setIsEditing] = useState(false);
  const [displayUserInfo, setDisplayUserInfo] = useState({
    email: '',
    phoneNumber: '',
  });
  const [passwords, setPasswords] = useState({
    currentPassword: '',
    newPassword: '',
    newPasswordRepeat: '',
  });
  const [showPasswords, setShowPasswords] = useState({
    currentPassword: false,
    newPassword: false,
    newPasswordRepeat: false,
  });
  const [responseMessage, setResponseMessage] = useState('');

  useEffect(() => {
    if (userInfo) {
      setDisplayUserInfo({
        email: userInfo.email,
        phoneNumber: userInfo.phoneNumber,
      });
    }
  }, [userInfo]);

  
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name in passwords) {
      setPasswords({ ...passwords, [name]: value });
    } else {
      setDisplayUserInfo({ ...displayUserInfo, [name]: value });
    }
  };

  const togglePasswordVisibility = (field) => {
    setShowPasswords({ ...showPasswords, [field]: !showPasswords[field] });
  };

  const handleUpdateUserInfo = () => {
    const { email, phoneNumber } = displayUserInfo;
    const { currentPassword, newPassword, newPasswordRepeat } = passwords;

    if (!email || !phoneNumber) {
      setResponseMessage('Please fill in all required fields.');
      return;
    }

    if (currentPassword || newPassword || newPasswordRepeat) {
      if (newPassword !== newPasswordRepeat) {
        setResponseMessage('New passwords do not match.');
        return;
      }
    }

    const updateData = {
      firstName: userInfo.firstName,
      lastName: userInfo.lastName,
      email,
      phoneNumber,
      currentPassword,
      newPassword,
      newPasswordRepeat,
    };

    fetch(`http://localhost:8080/user/profile/${userInfo._id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updateData),
    })
    .then(response => response.json())
    .then(data => {
      setResponseMessage(data.message);
      console.log(data.message)
      if (data.message === "Profile updated successfully") {
        updateUserInfo({ ...userInfo, ...updateData });
        
        setTimeout(() => {
          setIsEditing(false);
          setPasswords({ currentPassword: '', newPassword: '', newPasswordRepeat: '' });
          setResponseMessage('');
        }, 2000);
      }
    })
    .catch(error => {
      console.error('Error updating user info:', error);
      setResponseMessage('Failed to communicate with the server.');
    });
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="user-profile">
      {!isEditing && (
        <div className="user-info">
          <p className="user-email">User Email: {userInfo.email}</p>
          <p className="user-name">User Name: {userInfo.firstName} {userInfo.lastName}</p>
          <p className="user-phone">Phone Number: {userInfo.phoneNumber}</p>
          <button className="edit-button" onClick={() => setIsEditing(true)}>Edit Profile</button>
        </div>
      )}
      {isEditing && (
        <div className="edit-form">
          <input type="text" name="firstName" className="input-firstName" placeholder="First Name" value={userInfo.firstName} readOnly />
          <input type="text" name="lastName" className="input-lastName" placeholder="Last Name" value={userInfo.lastName} readOnly />
          <input type="text" name="email" className="input-email" placeholder="Email" value={displayUserInfo.email} onChange={handleInputChange} />
          <input type="text" name="phoneNumber" className="input-phoneNumber" placeholder="Phone Number" value={displayUserInfo.phoneNumber} onChange={handleInputChange} />

          <div className="password-field">
            <input
              type={showPasswords.currentPassword ? 'text' : 'password'}
              name="currentPassword"
              className="input-currentPassword"
              placeholder="Current Password"
              value={passwords.currentPassword}
              onChange={handleInputChange}
            />
            <FontAwesomeIcon
              icon={showPasswords.currentPassword ? faEyeSlash : faEye}
              onClick={() => togglePasswordVisibility('currentPassword')}
              className="password-toggle-icon"
            />
          </div>

          <div className="password-field">
            <input
              type={showPasswords.newPassword ? 'text' : 'password'}
              name="newPassword"
              className="input-newPassword"
              placeholder="New Password"
              value={passwords.newPassword}
              onChange={handleInputChange}
            />
            <FontAwesomeIcon
              icon={showPasswords.newPassword ? faEyeSlash : faEye}
              onClick={() => togglePasswordVisibility('newPassword')}
              className="password-toggle-icon"
            />
          </div>

          <div className="password-field">
            <input
              type={showPasswords.newPasswordRepeat ? 'text' : 'password'}
              name="newPasswordRepeat"
              className="input-newPasswordRepeat"
              placeholder="Repeat New Password"
              value={passwords.newPasswordRepeat}
              onChange={handleInputChange}
            />
            <FontAwesomeIcon
              icon={showPasswords.newPasswordRepeat ? faEyeSlash : faEye}
              onClick={() => togglePasswordVisibility('newPasswordRepeat')}
              className="password-toggle-icon"
            />
          </div>

          <button className="save-changes-button" onClick={handleUpdateUserInfo}>Save Changes</button>
          <button className="cancel-button" onClick={() => setIsEditing(false)}>Cancel</button>
          {responseMessage && <p className="response-message">{responseMessage}</p>}
        </div>
      )}
    </div>
  );
};

export default MyComponent;
