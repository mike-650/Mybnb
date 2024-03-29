import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./LoginForm.css";

function LoginFormModal() {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  // const [login, setLogin] = useState('submit-review-button-disabled');
  const { closeModal } = useModal();

  const handleSubmit = (e) => {
    e.preventDefault();
    return dispatch(sessionActions.login({ credential, password }))
      .then(closeModal)
      .catch(
        async (res) => {
          const data = await res.json()
          if (data.statusCode === 401) {
            setErrors({ error: 'The provided credentials were invalid' })
          }
        }
      );
  };

  // const disableBtn = () => {
  //   if (credential.length < 4 || password.length < 6) {
  //     return true;
  //   };
  //   return false;
  // }

  const demoUser = (e) => {
    e.preventDefault();
    return dispatch(sessionActions.login({ credential: 'Demo-user', password: 'password' }))
      .then(closeModal)
  }

  // useEffect(() => {
  //   if (credential.length >= 4 && password.length >= 6) {
  //     setLogin('submit-review-button-enabled');
  //   } else {
  //     setLogin('submit-review-button-disabled');
  //   }
  // }, [credential, password]);

  return (
    <div className='login-container'>
      <h1 id='login-text'>Log In</h1>
      <div className="login-content">
        <form className="login-content" onSubmit={handleSubmit}>
          {/* <label htmlFor="username">Username or email</label> */}
          {errors.error && <p className="error">{`* ${errors.error}`}</p>}
          <input
            className="login-input"
            name="username"
            type="text"
            value={credential}
            onChange={(e) => setCredential(e.target.value)}
            required
            placeholder="Username or Email"
          />
          {/* <label htmlFor="password">Password</label> */}
          <input
            className="login-input"
            name='password'
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Password"
          />
          <button
          // id={login}
          id='submit-review-button-enabled'
          type="submit"
          // disabled={disableBtn()}
          >Log In</button>
          <div style={{display:'flex', justifyContent:'center'}}>
          {/* <Link to='/' onClick={demoUser} style={{ textAlign: 'center', padding: '12px' }}>Demo User</Link> */}
          <button to='/' onClick={demoUser} style={{ textAlign: 'center', padding: '12px', cursor: 'pointer' }}>Demo User</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginFormModal;
