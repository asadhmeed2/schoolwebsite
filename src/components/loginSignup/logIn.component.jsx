import React, { useState ,useRef} from "react";
import {Link} from 'react-router-dom'
import './logIn.style.css'
import {login} from '../../firebase'
const Login =({onChange,onClick})=>{
  const [loading, setLoading]= useState(false);

  const emailRef=useRef();
  const passwordRef=useRef();
  const messageRef = useRef();
  const loginHandler =async()=>{
    setLoading(true);
    try {
      await login(emailRef.current.value, passwordRef.current.value);
      setLoading(false);
    } catch (error) {
       messageRef.current.innerHTML = `<span style="color:red"></span>`;
      setLoading(false);
    }
  }
  const onInputFocused = () => {
    messageRef.current.innerHTML ="";
  }
return (
  <div className="login">
    <div className="login-content">
      <input
        ref={emailRef}
        type="text"
        placeholder={"email"}
        onFocus={onInputFocused}
      />
      <input
        ref={passwordRef}
        type="password"
        placeholder={"password"}
        onFocus={onInputFocused}
      />
      <input
        type="button"
        value="Login"
        disabled={loading}
        onClick={loginHandler}
      />
      <span ref={messageRef} className="message"></span>
    </div>
    <Link to="/signup" className="signupBtn">
      Sign up
    </Link>
  </div>
);
}
export default Login;