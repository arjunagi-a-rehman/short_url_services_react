import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';



function Login() {
  const navigate = useNavigate();
  const handleSubmit = async () => {
    try {
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;
  
      const response = await axios.post('https://sus9.in/api/v1/auth/login', {
        email,
        password
      }, {
        withCredentials: true // Allow cookies to be sent with the request
      });
  
      console.log('Login successful:', response.data);
      
      // Extract and handle the cookie
      const cookieHeader = response.headers['set-cookie'];
      if (cookieHeader) {
        const cookie = cookieHeader.split(';')[0];
        // Store the cookie in the browser's cookie store
        document.cookie = cookie;
      }
      navigate('/');
      // Redirect to another page upon successful login
      // You can use React Router for navigation
    } catch (error) {
      console.error('Login failed:', error.response.data);
      // Display error message to the user
      // You can update the UI to show the error message
    }
  };
  

  return (
    <div className="container">
      <div className="row justify-content-center align-items-center min-vh-100">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h2 className="text-center mb-4">Login</h2>
              <form id="loginForm">
                <div className="form-group">
                  <label htmlFor="email">Email:</label>
                  <input type="text" className="form-control" id="email" placeholder="Enter your Email" />
                </div>
                <div className="form-group">
                  <label htmlFor="password">Password:</label>
                  <input type="password" className="form-control" id="password" placeholder="Enter your password" />
                </div>
                <div className="text-center">
                  <button type="button" className="btn btn-primary btn-block m-1" onClick={handleSubmit}>Login</button>
                </div>
              </form>
            </div>
            <div className="card-footer text-center">
              <p className="mb-0">Don't have an account? <a href="/register">Register here</a></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
