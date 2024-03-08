import { useState } from 'react';
import '../style/LoginPage.css';
import usePost from '../customHooks/usePost';
import { useNavigate } from 'react-router-dom';

function LoginPage({ handleUserType }) {
  const navigate = useNavigate();
  const [showSignup, setShowSignup] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false); // Added loading state
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

  function handleChange(event) {
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
  }

  function toggleSignup() {
    setShowSignup(!showSignup);
    setShowLogin(false);
  }

  function toggleLogin() {
    setShowLogin(!showLogin);
    setShowSignup(false);
  }

  async function handleSubmitSignup(event) {
    event.preventDefault();
    if (signUpData.password !== signUpData.confirmPassword) {
      setMessage('Passwords do not match');
      return;
    }

    try {
      setLoading(true); // Set loading to true while waiting for the response
      await postSignup('http://localhost:8080/user/signup', signUpData);
      setMessage('Signup successful');
      setLoading(false); // Reset loading after successful signup
      // You can redirect the user or handle the success case accordingly
    } catch (error) {
      setLoading(false); // Reset loading after error
      setMessage(error.message || 'An error occurred while signing up');
    }
  }

  async function handleSubmitLogin(event) {
    event.preventDefault();

    try {
      setLoading(true); // Set loading to true while waiting for the response
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
      setLoading(false); // Reset loading after login attempt
    } catch (error) {
      setLoading(false); // Reset loading after error
      setMessage(error.message || 'An error occurred while logging in');
    }
  }

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
          <button type="submit" disabled={loading || signupLoading}> {loading || signupLoading ? 'Loading...' : 'sign up'}</button>
          {signupError && <div className="error-message">Error: {signupError}</div>}
          {message && <div className="success-message">{message}</div>}
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
        <button type="submit" onClick={handleSubmitLogin} disabled={loading || loginLoading}> {loading || loginLoading ? 'Loading...' : 'Login'}</button>
        {loginError && <div className="error-message">Error: {loginError}</div>}
        {message && <div className="success-message">{message}</div>}
      </div>
    </div>
  );
}

export default LoginPage;
