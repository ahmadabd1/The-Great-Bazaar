import { useState } from "react";
import "./style/LoginPage.css";

const LoginPage = () => {
  const [showSignup, setShowSignup] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
  });
   const [formDataA, setFormDataA] = useState({
    email: "",
    password: "",
   
  });
   const [message, setMessage] = useState("");
     const [successMessage, setSuccessMessage] = useState(""); 

 const handleChange = (event) => {
    const { name, value } = event.target;
    if (showLogin) {
      setFormDataA((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    } else {
      setFormData((prevData) => ({
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
 if (formData.password !== formData.confirmPassword) {
      setMessage("Passwords do not match");
      return;
    }
    try {
      const response = await fetch("http://localhost:8080/user/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSuccessMessage("signed up successfully");
        setMessage("");
      } else {
     const errorMessage = await response.text();
      console.log(errorMessage)
        setMessage(errorMessage);
      }
    } catch (error) {
      console.error("Error occurred while signing up:", error);
    }
  };
  const handleSubmitLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch("http://localhost:8080/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formDataA),
      });

      if (response.ok) {
        setSuccessMessage("Login successful");
        setMessage("");
      } else {
        const errorMessage = await response.text();
        setMessage(errorMessage);
      }
    } catch (error) {
      console.error("Error occurred while logging in:", error);
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
            value={formData.email}
            onChange={handleChange}
            required=""
          />
          <input
            type="text"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            placeholder="Phone Number"
            required=""
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required=""
          />
           <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required=""
          />
          <button type="submit"> sign up</button>
          {message && <div className="error-message">{message}</div>}
          {successMessage && <div className="success-message">{successMessage}</div>} 

        </form>
      </div>

      <div className="login">
        <form onSubmit={handleSubmitLogin}>
          <label htmlFor="chk" aria-hidden="true" onClick={toggleLogin}>
            Login
          </label>
          <input type="email" name="email" value={formDataA.email} onChange={handleChange} placeholder="Email" required="" />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formDataA.password}
            onChange={handleChange}
            required
          />
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
