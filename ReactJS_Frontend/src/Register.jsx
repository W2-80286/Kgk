import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import $ from 'jquery';

function Register() {
  const [formData, setFormData] = useState({
    name: '',
    dateOfBirth: '',
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:4000/register', formData);
      console.log(response.data);
      toast.success('Register successful!');
    } catch (error) {
      toast.error('Signup failed. Please try again.');
    }
  };

  return (
    <div className='background' style={{ backgroundSize: 'cover', backgroundPosition: 'center', height: '100vh', justifyContent: 'center', alignItems: 'center' }}>
      <h1 className='title'>Signup</h1>
      <div className='row'>
        <div className='col'></div>
        <div className='col'>
          <div className='form'>
            <div className='mb-3'>
              <div className="input-box">
                <label htmlFor='name' className="icon-label">
                  Name
                </label>
                <input
                  onChange={handleChange}
                  type='text'
                  name='name'
                  className='form-control'
                />
              </div>
              <div className="input-box">
                <label htmlFor='dateOfBirth' className="icon-label">
                  Date of Birth
                </label>
                <input
                  onChange={handleChange}
                  type='date'
                  name='dateOfBirth'
                  className='form-control'
                />
              </div>
              <div className="input-box">
                <label htmlFor='email' className="icon-label">
                  Email
                </label>
                <input
                  onChange={handleChange}
                  type='email'
                  name='email'
                  placeholder='abc@test.com'
                  className='form-control'
                />
              </div>
              <div className="input-box">
                <label htmlFor='password' className="icon-label">
                  Password
                </label>
                <input
                  onChange={handleChange}
                  type='password'
                  name='password'
                  placeholder='xxxxxxxx'
                  className='form-control'
                />
              </div>
            </div>
            <div className='mb-3'>
              <div className="signin-box">
                <button onClick={handleSubmit} className='btn btn-primary mt-2'>
                  Signup
                </button>
              </div>
            </div>
            <div>
              <div>
                Already got an account? <Link to='/'>Signin here</Link>
              </div>
            </div>
          </div>
        </div>
        <div className='col'></div>
      </div>
    </div>
  );
}

export default Register;
