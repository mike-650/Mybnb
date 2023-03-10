// export const ProfileButton = () => {
//   return (
//     <div style={{ color: "#b7a7f2", fontSize: "50px" }}>
//       <i className="fa-solid fa-user"></i>
//     </div>
//   );
// };

// export default ProfileButton;

import React, { useState } from "react";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';

function ProfileButton({ user }) {
  const dispatch = useDispatch();

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
  };

  const ulClassName = "profile-dropdown";

  return (
    <>
      <button>
        <i className="fas fa-user-circle" style={{color: 'orange'}} />
      </button>
      <ul className={ulClassName}>
        <li>{user.username}</li>
        <li>{user.firstName} {user.lastName}</li>
        <li>{user.email}</li>
        <li>
          <button onClick={logout}>Log Out</button>
        </li>
      </ul>
    </>
  );
}

export default ProfileButton;
