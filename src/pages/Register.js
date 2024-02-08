import React, { useState } from 'react';
import axios from 'axios';

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const submitRegistrationForm = async () => {
    try {
      const response = await axios.post('https://sus9.in/api/v1/auth/register', {
        name,
        email,
        password
      });
      
      console.log('Registration successful', response.data);
      // Redirect or show success message
    } catch (error) {
      console.error('Registration failed:', error.response.data.message);
      // Handle error, show error message, etc.
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center align-items-center min-vh-100">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h2 className="text-center mb-4">Register</h2>
              <div id="error-message" className="alert alert-danger" style={{ display: 'none' }}></div>
              <form id="registrationForm" onSubmit={(e) => e.preventDefault()}>
                <div className="form-group">
                  <label htmlFor="name">Name:</label>
                  <input type="text" className="form-control" id="name" placeholder="Enter your Name" value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email:</label>
                  <input type="text" className="form-control" id="email" placeholder="Enter your Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="form-group">
                  <label htmlFor="password">Password:</label>
                  <input type="password" className="form-control" id="password" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <div className="text-center">
                  <button type="button" className="btn btn-primary btn-block m-1" onClick={submitRegistrationForm}>Register</button>
                </div>
              </form>
            </div>
            <div className="card-footer text-center">
              <p className="mb-0">Already have an account? <a href="/login">Login</a></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
