import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);
  return (
    <ul className='nav-bar'>
        <NavLink exact to="/" id='home-icon'>mybnb</NavLink>
      <div className='profile-create-spot'>
        { sessionUser ? <NavLink to='/spots/new' id='create-spot'>Create a New Spot</NavLink> : null }
      {isLoaded && (
        <ProfileButton user={sessionUser} />
        )}
      </div>
    </ul>
  );
}

export default Navigation;
