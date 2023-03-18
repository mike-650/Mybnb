import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import * as sessionActions from "../../store/session";
import './SignupForm.css';

function SignupFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const [signup, setSignUp] = useState('sign-up-button-disabled');
  const { closeModal } = useModal();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setErrors([]);
      return dispatch(sessionActions.signup({ email, username, firstName, lastName, password }))
        .then(closeModal)
        .catch(async (res) => {
          const data = await res.json();
          const errors = Object.values(data.errors)
          return setErrors(errors)
        });
    }
    return setErrors(['Confirm Password field must be the same as the Password field']);
  };

  const disabled = () => () => {
    if (!email.length || !username.length || !firstName.length || !lastName.length || !password.length || !confirmPassword.length) {
      return true;
    } else if (username.length < 4 || password.length < 6) {
      return true;
    }
    return false;
  }

  useEffect(() => {
    if (!disabled()) {
      setSignUp('sign-up-button-enabled')
    } else {
      setSignUp('sign-up-button-disabled')
    }
  },[email, username, firstName, lastName, password, confirmPassword, disabled])

  return (
    <div className="sign-up-container">
      <h1 style={{margin:'0px'}}>Sign Up</h1>
      <div style={{display:'flex', justifyContent:'center'}}>
      <ul className="errors">
        {errors.map((error, idx) => <li key={idx}>{error}</li>)}
      </ul>
      </div>
      <form onSubmit={handleSubmit}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <input
            className="signup-input"
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
            placeholder="First Name"
          />
          <input
            className="signup-input"
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
            placeholder="Last Name"
          />
            <input
              className="signup-input"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Email"
            />
          <input
            className="signup-input"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            placeholder="Username"
            />
          <input
            className="signup-input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Password"
          />
          <input
            className="signup-input"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            placeholder="Confirm Password"
          />
          <button type="submit" disabled={disabled()} id={signup} >Sign Up</button>
        </div>
      </form>
    </div>
  );
}

export default SignupFormModal;
