import React from 'react';
import './logIn.style.css'
const Login =({onChange,onClick})=>{
return (
  <div className="login">
    <div className="login-content">
      <input type="text" placeholder={"user name"} onChange={onChange} />
      <input type="password" placeholder={"password"} onChange={onChange} />
      <input type="button" value="Login" onClick={onClick} />
    </div>
  </div>
);
}
export default Login;