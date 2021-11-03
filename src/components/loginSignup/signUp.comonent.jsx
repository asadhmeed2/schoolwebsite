import React, { useRef, useState}from 'react'
import {signup} from '../../firebase'


const SignUp=()=>{
    const emailRef =useRef();
    const passwordRef =useRef();
    const codeRef =useRef();
    const messageRef =useRef();
    const [loading,setLoading]=useState(false);
    const cleanInput =()=>{
        emailRef.current.value=""
        passwordRef.current.value=""
        codeRef.current.value=""
    }
    const onSignUp= async()=>{
      try{
        setLoading(true);
        if(codeRef.current.value==="absd"){
            await signup(emailRef.current.value, passwordRef.current.value);
            cleanInput();
        }else{
          messageRef.current.innerHTML=`<span style="color:red">the code id invalid</span>`;
        }
        setLoading(false);
      }catch(error)
      {console.error(error)
      messageRef.current.innerHTML=`<span style="color:red">the user olredy regesterd</span>`;
      setLoading(false);
      }
    }
return (
  <div className="signup">
    <div className="inputWrapper">
      <input ref={emailRef} type="email" placeholder="email address" />
      <input ref={passwordRef} type="password" placeholder="password" />
      <input ref={codeRef} type="text" placeholder="code" />
      <div ref={messageRef}></div>
    </div>
    <input type="button" disabled={loading} value="Sign Up" onClick={onSignUp} />
  </div>
);
}
export default SignUp;