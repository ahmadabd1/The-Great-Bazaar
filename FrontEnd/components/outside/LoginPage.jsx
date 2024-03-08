import '../style/LoginPage.css';
import usePost from '../customHooks/usePost';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const LoginPage = ({ handleUserType }) => {
  const navigate = useNavigate();
  const [showSignup, setShowSignup] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [message, setMessage] = useState('');
  const [signUpData, setSignUpData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    phoneNumber: '',
  });
  const [signInData, setSignInData] = useState({
    email: '',
    password: '',
  });

  const { postData: postSignup, loading: signupLoading, error: signupError } = usePost();
  const { postData: postLogin, loading: loginLoading, error: loginError } = usePost();

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
      setMessage('Passwords do not match');
      return;
    }

    try {
      await postSignup('http://localhost:8080/user/signup', signUpData);
      setMessage('Signup successful');
      // You can redirect the user or handle the success case accordingly
    } catch (error) {
      setMessage(error.message || 'An error occurred while signing up');
    }
  };

  const handleSubmitLogin = async (event) => {
    event.preventDefault();

    try {
      const responseData = await postLogin('http://localhost:8080/user/login', signInData);
      if (responseData.message === 'Login successful as client') {
        setMessage('client');
        handleUserType('client'); 
        navigate('/client');
      } else if (responseData.message === 'Login successful as admin') {
        setMessage('admin');
        handleUserType('admin'); 
        navigate('/admin');
      } else {
        setMessage(responseData.message);
      }
    } catch (error) {
      setMessage(error.message || 'An error occurred while logging in');
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
