import React from 'react';

const NavBar = ({ handleApp }) => {
  return (
    <div id="navbar">
      <div id="nav-title">
        <h1>CSDoor</h1>
      </div>
      <div id='nav-buttons'>
        <button
          className='nav-button'
          value='post'
          onClick={handleApp}
          type='button'
        >
          Post
        </button>
        <button className='nav-button' value='home' onClick={handleApp}>Home</button>
        {/* <button value='profile'>Profile</button> */}
      </div>
    </div>
  )
}

export default NavBar; 