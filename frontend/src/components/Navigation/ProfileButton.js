import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import OpenModalMenuItem from './OpenModalMenuItem';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';
import './Navigation.css';
import { Link, useHistory } from "react-router-dom";


function ProfileButton({ user }) {
  const history = useHistory();
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();
  const openMenu = (e) => {
    e.stopPropagation();
    // able to toggle profile btn between open and close
    showMenu ? setShowMenu(false) : setShowMenu(true);
  };

  useEffect(() => {
    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const closeMenu = () => setShowMenu(false);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
    closeMenu();
    history.push('/');
  };

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");

  return (
    <>
      <div className="profile-btn-div">
        <button onClick={openMenu} className='profile-button'>
          <i className="fa-solid fa-bars" style={{ color: '#454545' }} />
          <i className="fas fa-user-circle fa-2xl" style={{ color: '#999999' }} />
        </button>
        <div className="profile-ul-div">
          <ul className={ulClassName} ref={ulRef}>
            {user ? (
              <>
                <li>Hello, {user.firstName}</li>
                <li>{user.email}</li>
                {/* TODO: */}
                <Link to='/' className="manage-spot">Manage Spot</Link>
                <li>
                  <button onClick={logout} className='logout-button'>Log Out</button>
                </li>
              </>
            ) : (
              <>
                <OpenModalMenuItem
                  itemText="Log in"
                  onItemClick={closeMenu}
                  modalComponent={<LoginFormModal />}
                />
                <OpenModalMenuItem
                  itemText="Sign Up"
                  onItemClick={closeMenu}
                  modalComponent={<SignupFormModal />}
                />
              </>
            )}
          </ul>
        </div>
      </div>
    </>
  );
}

export default ProfileButton;
