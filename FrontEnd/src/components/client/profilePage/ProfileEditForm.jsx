import "../../style/ClientProfile.css";
import React from 'react';
import UserInfoInput from './UserInfoInput';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const ProfileEditForm = ({ formData, handleInputChange, handleUpdateUserInfo, togglePasswordVisibility, showPasswords }) => (
  <div className="user-info-section">
    {/* Iterate over displayUserInfo to create inputs dynamically */}
    {Object.entries(formData.displayUserInfo).map(([key, value]) => (
      <UserInfoInput
        key={key}
        name={key}
        label={key.charAt(0).toUpperCase() + key.slice(1)}
        value={value}
        onChange={handleInputChange}
      />
    ))}

    {/* Password fields */}
    <div className="mb-4 flex">
      <div className="w-1/3">
        <p className="font-mono text-lg text-sky-400">Current Password</p>
      </div>
      <div className="relative w-2/3">
        <input
          type={showPasswords.currentPassword ? "text" : "password"}
          name="currentPassword"
          value={formData.passwords.currentPassword}
          onChange={handleInputChange}
          className="w-full font-mono text-lg text-slate-300"
        />
        <FontAwesomeIcon
          icon={showPasswords.currentPassword ? faEyeSlash : faEye}
          onClick={() => togglePasswordVisibility('currentPassword')}
          className="absolute right-3 top-3 cursor-pointer text-slate-300"
        />
      </div>
    </div>
    <div className="mb-4 flex">
      <div className="w-1/3">
        <p className="font-mono text-lg text-sky-400">New Password</p>
      </div>
      <div className="relative w-2/3">
        <input
          type={showPasswords.newPassword ? "text" : "password"}
          name="newPassword"
          value={formData.passwords.newPassword}
          onChange={handleInputChange}
          className="w-full font-mono text-lg text-slate-300"
        />
        <FontAwesomeIcon
          icon={showPasswords.newPassword ? faEyeSlash : faEye}
          onClick={() => togglePasswordVisibility('newPassword')}
          className="absolute right-3 top-3 cursor-pointer text-slate-300"
        />
      </div>
    </div>
    <div className="mb-4 flex">
      <div className="w-1/3">
        <p className="font-mono text-lg text-sky-400">Repeat New Password</p>
      </div>
      <div className="relative w-2/3">
        <input
          type={showPasswords.newPasswordRepeat ? "text" : "password"}
          name="newPasswordRepeat"
          value={formData.passwords.newPasswordRepeat}
          onChange={handleInputChange}
          className="w-full font-mono text-lg text-slate-300"
        />
        <FontAwesomeIcon
          icon={showPasswords.newPasswordRepeat ? faEyeSlash : faEye}
          onClick={() => togglePasswordVisibility('newPasswordRepeat')}
          className="absolute right-3 top-3 cursor-pointer text-slate-300"
        />
      </div>
    </div>

    {/* Save and Cancel buttons */}
    <div className="flex justify-end">
      <button className="mr-4 rounded-lg bg-red-500 p-1 font-mono text-white hover:bg-red-600" onClick={() => setIsEditing(false)}>Cancel</button>
      <button className="rounded-lg bg-green-500 p-1 font-mono text-white hover:bg-green-600" onClick={handleUpdateUserInfo}>Save</button>
    </div>
  </div>
);

export default ProfileEditForm;

