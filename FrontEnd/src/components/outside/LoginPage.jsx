import React, { useState, useEffect } from "react";
import usePost from "../customHooks/usePost";
import { useNavigate } from "react-router-dom";
import "../style/LoginPage.css";

function LoginPage() {
  const [formType, setFormType] = useState("login"); // 'login' or 'signup'
  const [message, setMessage] = useState("");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
  });

  const { postData } = usePost();
  const navigate = useNavigate();

  useEffect(() => {
    // Disable scrolling on mount
    document.body.style.overflow = "hidden";

    // Re-enable scrolling when component unmounts
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const toggleForm = () => {
    setFormType((prevType) => (prevType === "login" ? "signup" : "login"));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const endpoint =
      formType === "login"
        ? "http://localhost:8080/user/login"
        : "http://localhost:8080/user/signup";

    if (
      formType === "signup" &&
      formData.password !== formData.confirmPassword
    ) {
      setMessage("Passwords do not match");
      return;
    }

    try {
      const responseData = await postData(endpoint, formData);
      if (formType === "login") {
        const { message } = responseData;
        if (message.includes("Login successful")) {
          const userType = message.includes("client") ? "client" : "admin";
          setMessage(userType);
          localStorage.setItem("userType", userType);
          localStorage.setItem("userEmail", formData.email);
          navigate(`/${userType}`);
        } else {
          setMessage(message);
        }
      } else {
        setMessage("Signup successful");
        setFormType("login");
      }
    } catch (error) {
      setMessage(
        error.message ||
          `An error occurred while ${
            formType === "login" ? "logging in" : "signing up"
          }`,
      );
    }
  };

  return (
    <div className="no-scroll-container mt-[8vh] h-[75vh] w-[125vh] rounded-lg  opacity-85">
      <div className="overflow-hidden rounded-md  bg-gray-950 text-slate-400 shadow-md md:flex">
        {/* Card Image */}
        <div className="md:w-1/2">
          <img
            src=".\src\assets\BazaarLive.gif"
            alt="login form"
            className="h-[80vh] w-[full] rounded-lg border-2 border-slate-700 object-cover object-center"
          />
        </div>

        {/* Card Content */}
        <div className="md:w-1/2">
          {/* Logo */}
          <div className="mb-2 flex items-center">
            <img
              src="./src/assets/BazaarIcon.gif"
              className="w-25  h-28"
              alt="Bazaar Icon"
            />

            <span className="whitespace-no-wrap mb-0 mr-28 text-center font-mono text-4xl text-slate-500">
              The Great Bazaar
            </span>
          </div>

          {/* Form Inputs */}
          {formType === "signup" && (
            <>
              <input
                name="firstName"
                placeholder="First Name"
                value={formData.firstName}
                onChange={handleChange}
                required
                className="text-1xl m-5 mx-auto mt-1 block h-6 w-80 rounded-lg border-gray-300 px-4 py-3 text-black focus:border-orange-500"
              />
              <input
                name="lastName"
                placeholder="Last Name"
                value={formData.lastName}
                onChange={handleChange}
                required
                className="text-1xl m-5 mx-auto mb-2 block h-6 w-80 rounded-lg border-gray-300 px-4 py-3 text-black focus:border-orange-500"
              />
            </>
          )}

          <input
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="text-1xl m-5 mx-auto mt-4 block h-6 w-80 rounded-lg border-gray-300 px-4 py-3 text-black focus:border-orange-500"
          />

          {formType === "signup" && (
            <>
              <input
                type="text"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                placeholder="Phone Number"
                required
                className="text-1xl m-5 mx-auto mt-4 block h-6 w-80 rounded-lg border-gray-300 px-4 py-3 text-black focus:border-orange-500"
              />
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                className="text-1xl m-5 mx-auto  block h-6 w-80 rounded-lg border-gray-300   text-black focus:border-orange-500"
              />
            </>
          )}
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            className="text-1xl m-5 mx-auto mt-4 block h-6 w-80 rounded-lg border-gray-300 px-4 py-3 text-black focus:border-orange-500"
          />

          {/* Login Button */}
          <button
            className="text-1xl mb-3 ml-[17vh] mt-8 w-[30vh] text-pretty rounded-lg bg-gray-800  text-center text-xl text-slate-500 hover:bg-cyan-600 hover:text-black hover:text-slate-50"
            type="submit"
            onClick={handleSubmit}
          >
            {formType === "login" ? "Login" : "Sign up"}
          </button>
          {message && <div className="mb-4 text-red-500">{message}</div>}

          <p className="mb-6 mt-5 pt-2 text-center text-xl text-gray-700">
            {formType === "login" ? "Don't have an account? " : ""}
            <a
              href="#!"
              onClick={toggleForm}
              className=" text-xl font-semibold text-gray-400 hover:text-sky-400"
            >
              {formType === "login" ? "Register here" : "Login here"}
            </a>
          </p>

          {/* Links */}
          <div className="ml-[18vh] flex items-center">
            <a href="#!" className="text-m me-2 text-gray-500">
              Terms of use.
            </a>
            <a href="#!" className="text-m text-gray-500">
              Privacy policy
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
