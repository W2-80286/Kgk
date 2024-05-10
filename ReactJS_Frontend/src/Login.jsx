import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaUser, FaLock } from 'react-icons/fa'; // Import icons from react-icons library

function Login() {
  const [formData, setFormData] = useState({
    name: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:4000/login', formData);

      if(response && response.data && response.data.token) {
        const token = response.data.token;

        sessionStorage.setItem("token", token);

        navigate('/dashboard');
        toast.success('Login successful!');
      }
    } catch (error) {
      toast.error('Login failed. Please check your name and password.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className='background' style={{ backgroundSize: 'cover', backgroundPosition: 'center', height: '100vh', justifyContent: 'center', alignItems: 'center' }}>
        <h1 className='title'>Signin</h1>
        <div className='row'>
          <div className='col'></div>
          <div className='col'>
            <div className='form'>
              <div className='mb-3'>
                <div className="input-box">
                  <label htmlFor='name' className="icon-label">
                    <FaUser className="icon" />
                    Name
                  </label>
                  <input
                    onChange={handleChange}
                    type='text'
                    name='name'
                    value={formData.name}
                    placeholder='Your name'
                    className='form-control'
                    disabled={loading}
                  />
                </div>
                <div className="input-box">
                  <label htmlFor='password' className="icon-label">
                    <FaLock className="icon" />
                    Password
                  </label>
                  <input
                    onChange={handleChange}
                    type='password'
                    id='password'
                    name='password'
                    value={formData.password}
                    placeholder='xxxxxxxx'
                    className='form-control'
                    disabled={loading}
                  />
                </div>
              </div>
              <div className="additional-options">
                <div className="remember-me">
                  <label htmlFor="rememberMe">
                    <input type="checkbox" id="rememberMe" name="rememberMe" />
                    Remember Me
                  </label>
                </div>
                <div className="forgot-password">
                  <Link to='/forgotpassword'>Forgot Password?</Link>
                </div>
              </div>
              <div className='mb-3'>
                <div className="signin-box">
                  <button onClick={handleSubmit} className='btn btn-primary' disabled={loading}>
                    {loading ? 'Signing in...' : 'Login'}
                  </button>
                </div>
              </div>
              <div>
                <div>
                  Don't have an account? <Link to='/register'>Signup here</Link>
                </div>
              </div>
            </div>
          </div>
          <div className='col'></div>
        </div>
      </div>
    </>
  );
}

export default Login;