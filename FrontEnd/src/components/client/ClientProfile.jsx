import React, { useState, useEffect } from "react";
import useUserInfo from "../customHooks/useUserInfo";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import "../style/ClientProfile.css";

export default function ProfilePage() {
  const { userInfo, loading, error, updateUserInfo } = useUserInfo();
  const [isEditing, setIsEditing] = useState(false);
  const [displayUserInfo, setDisplayUserInfo] = useState({
    email: "",
    phoneNumber: "",
    address: "",
  });
  const [passwords, setPasswords] = useState({
    currentPassword: "",
    newPassword: "",
    newPasswordRepeat: "",
  });
  const [showPasswords, setShowPasswords] = useState({
    currentPassword: false,
    newPassword: false,
    newPasswordRepeat: false,
  });
  const [responseMessage, setResponseMessage] = useState("");

  useEffect(() => {
    if (userInfo) {
      setDisplayUserInfo({
        email: userInfo.email,
        phoneNumber: userInfo.phoneNumber,
        address: userInfo.address || "", // Assuming address is nullable
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
    const { email, phoneNumber, address } = displayUserInfo;
    const { currentPassword, newPassword, newPasswordRepeat } = passwords;
    if (!email || !phoneNumber || !address) {
      setResponseMessage("Please fill in all required fields.");
      return;
    }
    if (currentPassword || newPassword || newPasswordRepeat) {
      if (newPassword !== newPasswordRepeat) {
        setResponseMessage("New passwords do not match.");
        return;
      }
    }
    const updateData = {
      firstName: userInfo.firstName,
      lastName: userInfo.lastName,
      email,
      phoneNumber,
      address,
      currentPassword,
      newPassword,
      newPasswordRepeat,
    };
    console.log(updateData)
    fetch(`http://localhost:8080/user/profile/${userInfo._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updateData),
    })
      .then((response) => response.json())
      .then((data) => {
        setResponseMessage(data.message);
        if (data.message === "Profile updated successfully") {
          updateUserInfo({ ...userInfo, ...updateData });
          setTimeout(() => {
            setIsEditing(false);
            setPasswords({
              currentPassword: "",
              newPassword: "",
              newPasswordRepeat: "",
            });
            setResponseMessage("");
          }, 2000);
        }
      })
      .catch((error) => {
        console.error("Error updating user info:", error);
        setResponseMessage("Failed to communicate with the server.");
      });
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <section
      className="mt-12 border-2 border-white bg-slate-950 bg-opacity-80 p-2"
      style={{ width: "100%", height: "20%" }}
    >
      <div className="container py-1">
        <div className="mb-2 flex">
          <ol className="flex items-center space-x-2">
            <li className="mb-2 ml-[285px] font-mono text-xl text-sky-500">
              User Profile
            </li>
          </ol>
        </div>
        <div className="-mx-2 flex flex-wrap border-t-2 border-white">
          <div className="mb-2 w-full px-2 lg:w-1/3 ">
            <div className="mb-2 rounded-lg bg-opacity-90 p-8">
              <img
                src="../../src/assets/ProfileTest.png"
                alt="avatar"
                className="mx-auto mb-8 w-32 rounded-full border border-white"
              />
              <p className="mb-1 w-40 text-justify font-mono text-lg text-slate-300">
                Welcome {userInfo.firstName}
              </p>
              <p className="mb-6 w-60 font-mono text-lg text-slate-300">
                San Francisco, CA
              </p>
              <div className="mb-2 flex justify-center rounded-lg border border-white">
                <button
                  className="w-40 rounded-lg bg-slate-600 p-1 font-mono text-sky-500 hover:bg-sky-500 hover:text-white"
                  onClick={() => setIsEditing(true)}
                >
                  Edit Profile
                </button>
              </div>
            </div>
          </div>
          <div className="w-full p-3 px-2 lg:w-2/3">
            <div className="bg-slate-00 mb-2 rounded-lg p-8 opacity-85">
              <div className="mb-4 flex">
                <div className="w-1/3">
                  <p className="font-mono text-lg text-sky-400">Full Name</p>
                </div>
                <div className="w-2/3">
                  <p className="font-mono text-lg text-slate-300">
                    {userInfo.firstName} {userInfo.lastName}
                  </p>
                </div>
              </div>
              <hr className="my-3" />
              <div className="mb-4 flex">
                <div className="w-1/3">
                  <p className="font-mono text-lg text-sky-400">Email</p>
                </div>
                <div className="w-2/3">
                  {isEditing ? (
                    <input
                      type="text"
                      name="email"
                      value={displayUserInfo.email}
                      onChange={handleInputChange}
                      className="font-mono text-lg text-slate-300 w-full"
                    />
                  ) : (
                    <p className="font-mono text-lg text-slate-300">
                      {userInfo.email}
                    </p>
                  )}
                </div>
              </div>
              <hr className="my-3" />
              <div className="mb-4 flex">
                <div className="w-1/3">
                  <p className="font-mono text-lg text-sky-400">Phone</p>
                </div>
                <div className="w-2/3">
                  {isEditing ? (
                    <input
                      type="text"
                      name="phoneNumber"
                      value={displayUserInfo.phoneNumber}
                      onChange={handleInputChange}
                      className="font-mono text-lg text-slate-300 w-full"
                    />
                  ) : (
                    <p className="font-mono text-lg text-slate-300">
                      {userInfo.phoneNumber}
                    </p>
                  )}
                </div>
              </div>
              <hr className="my-3" />
              <div className="mb-4 flex">
                <div className="w-1/3">
                  <p className="font-mono text-lg text-sky-400">Address</p>
                </div>
                <div className="w-2/3">
                  {isEditing ? (
                    <input
                      type="text"
                      name="address"
                      value={displayUserInfo.address}
                      onChange={handleInputChange}
                      className="font-mono text-lg text-slate-300 w-full"
                    />
                  ) : (
                    <p className="font-mono text-lg text-slate-300">
                      {userInfo.address || "Address Placeholder"}
                    </p>
                  )}
                </div>
              </div>
              {isEditing && (
                <>
                  <hr className="my-3" />
                  <div className="mb-4 flex">
                    <div className="w-1/3">
                      <p className="font-mono text-lg text-sky-400">
                        Current Password
                      </p>
                    </div>
                    <div className="w-2/3 relative">
                      <input
                        type={showPasswords.currentPassword ? "text" : "password"}
                        name="currentPassword"
                        value={passwords.currentPassword}
                        onChange={handleInputChange}
                        className="font-mono text-lg text-slate-300 w-full"
                      />
                      <FontAwesomeIcon
                        icon={showPasswords.currentPassword ? faEyeSlash : faEye}
                        className="absolute top-3 right-3 cursor-pointer text-slate-300"
                        onClick={() =>
                          togglePasswordVisibility("currentPassword")
                        }
                      />
                    </div>
                  </div>
                  <div className="mb-4 flex">
                    <div className="w-1/3">
                      <p className="font-mono text-lg text-sky-400">
                        New Password
                      </p>
                    </div>
                    <div className="w-2/3 relative">
                      <input
                        type={showPasswords.newPassword ? "text" : "password"}
                        name="newPassword"
                        value={passwords.newPassword}
                        onChange={handleInputChange}
                        className="font-mono text-lg text-slate-300 w-full"
                      />
                      <FontAwesomeIcon
                        icon={showPasswords.newPassword ? faEyeSlash : faEye}
                        className="absolute top-3 right-3 cursor-pointer text-slate-300"
                        onClick={() => togglePasswordVisibility("newPassword")}
                      />
                    </div>
                  </div>
                  <div className="mb-4 flex">
                    <div className="w-1/3">
                      <p className="font-mono text-lg text-sky-400">
                        Repeat New Password
                      </p>
                    </div>
                    <div className="w-2/3 relative">
                      <input
                        type={showPasswords.newPasswordRepeat ? "text" : "password"}
                        name="newPasswordRepeat"
                        value={passwords.newPasswordRepeat}
                        onChange={handleInputChange}
                        className="font-mono text-lg text-slate-300 w-full"
                      />
                      <FontAwesomeIcon
                        icon={showPasswords.newPasswordRepeat ? faEyeSlash : faEye}
                        className="absolute top-3 right-3 cursor-pointer text-slate-300"
                        onClick={() =>
                          togglePasswordVisibility("newPasswordRepeat")
                        }
                      />
                    </div>
                  </div>
                </>
              )}
              <div className="flex justify-end">
                {responseMessage && <p className="text-red-500">{responseMessage}</p>}
                {isEditing ? (
                  <>
                    <button
                      className="mr-4 rounded-lg bg-red-500 p-1 font-mono text-white hover:bg-red-600"
                      onClick={() => setIsEditing(false)}
                    >
                      Cancel
                    </button>
                    <button
                      className="rounded-lg bg-green-500 p-1 font-mono text-white hover:bg-green-600"
                      onClick={handleUpdateUserInfo}
                    >
                      Save
                    </button>
                  </>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

