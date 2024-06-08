/*import React from 'react'
import './CSS/LoginSignup.css'
import { useState } from 'react'
const LoginSignup = () => {

  
  const [state,setState] = useState("Login");
  const [formData, setFormData] = useState({
    username:"",
    password:"",
    email:"",
    index:"",
    faculty:"",
    department:"",
    batch:"",
  })

  const changeHandler = (e)=>{
    setFormData({...formData,[e.target.name]:e.target.value})
  }

  const login = async ()=> {
    console.log("Login Function Executed",formData);
    let responceData;
    await fetch('http://localhost:4000/login',{
      method:'POST',
      headers:{
        Accept:'application/form-data',
        'Content-Type':'application/json',
      },
      body: JSON.stringify(formData),
    }).then((responce)=> responce.json()).then((data)=>responceData=data)

    if(responceData.success){
      localStorage.setItem('auth-token', responceData.token);
      window.location.replace("/");
    }
    else{
      alert(responceData.errors)
    }
  }

  const signup = async ()=> {
    console.log("Signup Function Executed",formData);
    let responceData;
    await fetch('http://localhost:4000/signup',{
      method:'POST',
      headers:{
        Accept:'application/form-data',
        'Content-Type':'application/json',
      },
      body: JSON.stringify(formData),
    }).then((responce)=> responce.json()).then((data)=>responceData=data)

    if(responceData.success){
      localStorage.setItem('auth-token', responceData.token);
      window.location.replace("/");
    }
    else{
      alert(responceData.errors)
    }
  }

  return (
    <div className='loginsignup'>
      <div className="loginsignup-container">
        <h1>{state}</h1>
        <div className='loginsignup-fields'>
          {state==="Sign Up"&&(<input name='username' value={formData.username} onChange={changeHandler} type= 'text' placeholder='Your Name'/>)}
          {state==="Sign Up"&&(<input name='index' value={formData.index} onChange={changeHandler} type= 'text' placeholder='University Index'/>)}
          {state==="Sign Up"&&(<input name='faculty' value={formData.faculty} onChange={changeHandler} type= 'text' placeholder='Faculty'/>)}
          {state==="Sign Up"&&(<input name='department' value={formData.department} onChange={changeHandler} type= 'text' placeholder='Department'/>)}
          {state==="Sign Up"&&(<input name='batch' value={formData.batch} onChange={changeHandler} type= 'text' placeholder='Batch'/>)}
          
          <input name='email' value={formData.email} onChange={changeHandler} type= 'email' placeholder='Email Address'/>
          <input name='password' value={formData.password} onChange={changeHandler} type="password" placeholder='Password'/>
        </div>
        <button onClick={()=>{state==="Login"?login():signup()}}>Continue</button>
        {state==="Sign Up"?
        <p className='loginsignup-login'>Already have an account? <span onClick={()=>{setState("Login")}}>Login here</span></p>
        :<p className='loginsignup-login'>Create an account? <span onClick={()=>{setState("Sign Up")}}>Click here</span></p>}
        
        
        <div className="loginsignup-agree">
          <input type='checkbox' name='' id=''/>
          <p>By continuing, I agree to the terms of use & privacy policy.</p>
        </div>
      </div>
      
    </div>
  )
}

export default LoginSignup */
