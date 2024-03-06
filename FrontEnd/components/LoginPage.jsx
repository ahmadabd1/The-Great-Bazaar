import { useState } from "react";
import "./style/LoginPage.css";

const LoginPage = () => {
  const [showSignup, setShowSignup] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    phoneNumber: "",
  });
   const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const toggleSignup = () => {
    setShowSignup(!showSignup);
    setShowLogin(false);
  };

  const toggleLogin = () => {
    setShowLogin(!showLogin);
    setShowSignup(false);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch("http://localhost:8080/user/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log("User signed up successfully");
      } else {
     const errorMessage1 = await response.text();
      console.log(errorMessage1)
        setErrorMessage(errorMessage1);
      }
    } catch (error) {
      console.error("Error occurred while signing up:", error);
    }
  };
  return (
    <div className="main">
      <input type="checkbox" id="chk" aria-hidden="true" />

      <div className="signup">
        <form onSubmit={handleSubmit}>
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
            name="password"
            placeholder="Confirm Password"
            required=""
          />
          <button type="submit"> sign up</button>
          {errorMessage && <div className="error-message">{errorMessage}</div>}

        </form>
      </div>

      <div className="login">
        <form>
          <label htmlFor="chk" aria-hidden="true" onClick={toggleLogin}>
            Login
          </label>
          <input type="email" name="email" placeholder="Email" required="" />
          <input
            type="password"
            name="pswd"
            placeholder="Password"
            required=""
          />
          <button>Login</button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
