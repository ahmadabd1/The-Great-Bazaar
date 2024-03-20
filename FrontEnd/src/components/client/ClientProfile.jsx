import React, { useState, useEffect } from 'react';
import useUserInfo from '../customHooks/useUserInfo';
import useUpdate from '../customHooks/useUpdate';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import '../style/ClientProfile.css';

const PasswordField = ({ type, name, value, onChange, toggleVisibility }) => (
  <div className="password-field">
    <input
      type={type ? 'text' : 'password'}
      name={name}
      className={`input-${name}`}
      placeholder={name.replace(/([A-Z])/g, ' $1').trim()}
      value={value}
      onChange={onChange}
    />
    <FontAwesomeIcon
      icon={type ? faEyeSlash : faEye}
      onClick={toggleVisibility}
      className="password-toggle-icon"
    />
  </div>
);

const MyComponent = () => {
  const { userInfo, setUserInfo, loading, error } = useUserInfo();  // Now using setUserInfo from the hook
  const { update, isLoading, isSuccess, error: updateError } = useUpdate();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    phoneNumber: '',
    currentPassword: '',
    newPassword: '',
    newPasswordRepeat: '',
    showPasswords: {
      currentPassword: false,
      newPassword: false,
      newPasswordRepeat: false,
    },
  });
  const [responseMessage, setResponseMessage] = useState('');

  useEffect(() => {
    if (userInfo) {
      setFormData({ ...formData, email: userInfo.email, phoneNumber: userInfo.phoneNumber });
    }
  }, [userInfo]);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const togglePasswordVisibility = field => {
    setFormData(formData => ({
      ...formData,
      showPasswords: {
        ...formData.showPasswords,
        [field]: !formData.showPasswords[field],
      },
    }));
  };

  const handleUpdateUserInfo = async () => {
    const { email, phoneNumber, currentPassword, newPassword, newPasswordRepeat } = formData;
  
    if (!email || !phoneNumber) {
      setResponseMessage('Please fill in all required fields.');
      return;
    }
  
    if (newPassword && newPassword !== newPasswordRepeat) {
      setResponseMessage('New passwords do not match.');
      return;
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
  
    try {
      const response = await fetch(`http://localhost:8080/user/profile/${userInfo._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updateData),
      });
  
      const responseData = await response.json();
      if (!response.ok) {
        throw new Error(responseData.message || 'Failed to update profile');
      }
  
      setUserInfo({ ...userInfo, email, phoneNumber }); // Update only email and phoneNumber in local state
  
      setResponseMessage('Profile updated successfully');
  
      setTimeout(() => {
        setResponseMessage('');
        setIsEditing(false);
      }, 2000);
    } catch (error) {
      setResponseMessage(error.message || 'An error occurred');
    }
  };
  

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="user-profile">
      {!isEditing ? (
        <div className="user-info">
          <p className="user-email">User Email: {userInfo.email}</p>
          <p className="user-name">Full Name: {userInfo.firstName} {userInfo.lastName}</p>
          <p className="user-phone">Phone Number: {userInfo.phoneNumber}</p>
          <button className="edit-button" onClick={() => setIsEditing(true)}>Edit Profile</button>
        </div>
      ) : (
        <div className="edit-form">
          <input
            type="text"
            name="email"
            className="input-email"
            placeholder="Email"
            value={formData.email}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="phoneNumber"
            className="input-phoneNumber"
            placeholder="Phone Number"
            value={formData.phoneNumber}
            onChange={handleInputChange}
          />
          {['currentPassword', 'newPassword', 'newPasswordRepeat'].map((field) => (
            <PasswordField
              key={field}
              type={formData.showPasswords[field]}
              name={field}
              value={formData[field]}
              onChange={handleInputChange}
              toggleVisibility={() => togglePasswordVisibility(field)}
            />
          ))}
          <button className="save-changes-button" onClick={handleUpdateUserInfo}>Save Changes</button>
          <button className="cancel-button" onClick={() => setIsEditing(false)}>Cancel</button>
          {responseMessage && <p className="response-message">{responseMessage}</p>}
        </div>
      )}
    </div>
  );
};

export default MyComponent;
