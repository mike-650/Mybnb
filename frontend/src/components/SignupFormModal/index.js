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

  const disabled = () => {
    if (!email || !username || !firstName || !lastName || !password || !confirmPassword) {
      return true;
    } else if (username.length < 4 || password.length < 6 || password !== confirmPassword) {
      return true;
    }
    return false;
  }

  useEffect(() => {
    // if (!email.length || !username.length || !firstName.length || !lastName.length || !password.length || !confirmPassword.length) {
    //   setSignUp('submit-review-button-disabled');
    // } else if (username.length < 4 || password.length < 6 || password !== confirmPassword) {
    //   setSignUp('submit-review-button-disabled');
    // } else {
    setSignUp('submit-review-button-enabled');
    // }
  }, [email, username, firstName, lastName, password, confirmPassword])

  return (
    <div className="sign-up-container">
      <h1 style={{ margin: '0px' }}>Sign Up</h1>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <ul className="errors">
          {errors.map((error, idx) => <li key={idx}>{error}</li>)}
        </ul>
      </div>
      <form onSubmit={handleSubmit}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div className="signup-label-div">
          <label className="signup-labels">First Name</label>
          </div>
          <input
            className="signup-input"
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
            placeholder="First Name"
          />
          <div className="signup-label-div">
          <label className="signup-labels">Last Name</label>
          </div>
          <input
            className="signup-input"
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
            placeholder="Last Name"
          />
          <label className="signup-labels">Email</label>
          <input
            className="signup-input"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Email"
          />
          <label className="signup-labels">Username</label>
          <input
            className="signup-input"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            placeholder="Username"
          />
          <label className="signup-labels">Password</label>
          <input
            className="signup-input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Password"
          />
          <label className="signup-labels">Confirm Password</label>
          <input
            className="signup-input"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            placeholder="Confirm Password"
          />
          <button type="submit" id={signup} >Sign Up</button>
        </div>
      </form>
    </div>
  );
}

export default SignupFormModal;
