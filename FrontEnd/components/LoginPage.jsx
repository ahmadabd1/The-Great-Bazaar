import { useState } from "react";
import "./style/LoginPage.css";

import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [showSignup, setShowSignup] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [message, setMessage] = useState("");
        const navigate = useNavigate();

  const [signUpData, setSignUpData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
  })
  const [signInData, setSignInData] = useState({
    email: "",
    password: "",
  })
  const handleChange = (event) => {
    const { name, value } = event.target;
    if (showLogin) {
      setSignInData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    } else {
      setSignUpData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };
  const toggleSignup = () => {
    setShowSignup(!showSignup);
    setShowLogin(false);
  };
  const toggleLogin = () => {
    setShowLogin(!showLogin);
    setShowSignup(false);
  };
  const handleSubmitSignup = async (event) => {
    event.preventDefault();
    if (signUpData.password !== signUpData.confirmPassword) {
      setMessage("Passwords do not match");
      return;
    }
    try {
      const response = await fetch("http://localhost:8080/user/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(signUpData),
      });
      if (response.ok) {
        setMessage("success");
      } else {
        const errorMessage = await response.text();
        console.log(errorMessage)
        setMessage(errorMessage);
      }
    } catch (error) {
      console.error("Error occurred while signing up:", error);
    }
  }
  const handleSubmitLogin = async () => {

    try {
      const response = await fetch("http://localhost:8080/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(signInData),
      });
      const responseData = await response.json();
      console.log('Response data:', responseData.message);
      if (response.ok) {
        if (responseData.message === "Login successful as client") {
          setMessage("client");
           navigate('/ClientMainPage'); 
        } else if (responseData.message === "Login successful as admin") {
          setMessage("admin");
           navigate('/AdminMainPage'); 
        } else {
          setMessage(responseData.message);
        }
      } else {
        setMessage(responseData.message); // Assuming the response contains error message
      }
    } catch (error) {
      console.error("Error occurred while logging in:", error);
      setMessage("Error occurred while logging in. Please try again."); // Set appropriate error message
    }
  };
  return (
    <div className="main">
      <input type="checkbox" id="chk" aria-hidden="true" />
      <div className="signup">
        <form onSubmit={handleSubmitSignup}>
          <label htmlFor="chk" aria-hidden="true" onClick={toggleSignup}>
            Sign up
          </label>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={signUpData.email}
            onChange={handleChange}
            required=""
          />
          <input
            type="text"
            name="phoneNumber"
            value={signUpData.phoneNumber}
            onChange={handleChange}
            placeholder="Phone Number"
            required=""
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={signUpData.password}
            onChange={handleChange}
            required=""
          />
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={signUpData.confirmPassword}
            onChange={handleChange}
            required=""
          />
          <button type="submit"> sign up</button>
          {message && <div className="error-message">{message}</div>}
        </form>
      </div>
      <div className="login">
          <label htmlFor="chk" aria-hidden="true" onClick={toggleLogin}>
            Login
          </label>
          <input type="text" name="email" value={signInData.email} onChange={handleChange} placeholder="Email" required="" />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={signInData.password}
            onChange={handleChange}
            required
          />
          <button type="submit" onClick={handleSubmitLogin}>Login</button>
          {message && <div className="error-message">{message}</div>}
      </div>
    </div>
  );
};
export default LoginPage;