import usePost from '../customHooks/usePost';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import '../style/LoginPage.css';

const LoginPage = () => {
  const navigate = useNavigate();
  const [formType, setFormType] = useState('login'); // 'login' or 'signup'
  const [message, setMessage] = useState('');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phoneNumber: '',
  });

  const { postData } = usePost();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
const [user, setUser] = useState({ firstName: '', lastName: '' });


  const toggleForm = () => {
    setFormType(formType === 'login' ? 'signup' : 'login');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const endpoint = formType === 'login' ? 'http://localhost:8080/user/login' : 'http://localhost:8080/user/signup';

    if (formType === 'signup' && formData.password !== formData.confirmPassword) {
      setMessage('Passwords do not match');
      return;
    }

    try {
      const responseData = await postData(endpoint, formData);
      if (formType === 'login') {
        const { message } = responseData;
        if (message.includes('Login successful')) {
          const userType = message.includes('client') ? 'client' : 'admin';
          setMessage(userType);
        //  handleUserType(userType);
          localStorage.setItem('userType', userType);
          localStorage.setItem('userEmail', formData.email);

          navigate(`/${userType}`);
        } else {
          setMessage(message);
        }
      } else {
        setMessage('Signup successful');
        setFormType('login');
      }
    } catch (error) {
      setMessage(error.message || `An error occurred while ${formType === 'login' ? 'logging in' : 'signing up'}`);
    }
  };

  return (
    <div className="main">
      <input type="checkbox" id="chk" aria-hidden="true" />
      <form onSubmit={handleSubmit}>
        <label htmlFor="chk" aria-hidden="true" onClick={toggleForm}>
          {formType === 'login' ? 'Login' : 'Sign up'}
        </label>
         
        {formType === 'signup' && (
          <>
            <input
              name="firstName"
              placeholder="First Name"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
            <input
              name="lastName"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </>
        )}

        <input
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        {formType === 'signup' && (
          <>
            <input
              type="text"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              placeholder="Phone Number"
              required
            />
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
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
        />

        <button type="submit">{formType === 'login' ? 'Login' : 'Sign up'}</button>
        {message && <div className="error-message">{message}</div>}
      </form>
    </div>
  );
};

export default LoginPage;
