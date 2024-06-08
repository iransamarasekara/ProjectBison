import React, { useState } from 'react';
import './CSS/Login.css';

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const login = async () => {
    console.log("Login Function Executed", formData);
    let responseData;
    await fetch('http://localhost:4000/login', {
      method: 'POST',
      headers: {
        Accept: 'application/form-data',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    }).then((response) => response.json()).then((data) => responseData = data);

    if (responseData.success) {
      localStorage.setItem('auth-token', responseData.token);
      window.location.replace("/");
    } else {
      alert(responseData.errors);
    }
  };

  return (
    <div className='login'>
      <div className="login-container">
        <div className="login-form">
          <h1>Login</h1>
          <div className='login-fields'>
            <input name='email' value={formData.email} onChange={changeHandler} type='email' placeholder='Email Address' />
            <input name='password' value={formData.password} onChange={changeHandler} type="password" placeholder='Password' />
          </div>
          <button onClick={login}>Login</button>
        </div>
        <div className="welcome-container">
          <h1>Hello!</h1>
          <p>Don't have an account?</p>
          <p>Enter your details and wear your spirit</p>
          <button className='switch login button' onClick={() => window.location.replace("/signup")}>Sign Up</button>
        </div>
      </div>
    </div>
  );
};

export default Login;
