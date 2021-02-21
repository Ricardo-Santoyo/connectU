import React, { useState } from 'react';
import handleErrors from '../apiCalls/handleErrors';
import { NavLink, Redirect } from 'react-router-dom';
import { ReactComponent as HomeIcon } from '../icons/home.svg';
import { ReactComponent as SearchIcon } from '../icons/search.svg';
import { ReactComponent as BellIcon } from '../icons/bell.svg';
import { ReactComponent as EnvelopeIcon } from '../icons/envelope.svg';
import { ReactComponent as BookmarkIcon } from '../icons/bookmark.svg';
import { ReactComponent as UserIcon } from '../icons/user.svg';

function Navbar(props) {
  const [redirectToWelcome, setRedirectToWelcome] = useState();

  function hideMenu() {
    props.setShowMenu(false);
  };

  function logOut() {
    fetch(`http://localhost:3001/api/logout`, {method: 'DELETE'})
    .then(handleErrors)    
    .then(() => {
      localStorage.removeItem("token")
      setRedirectToWelcome(true);
      props.setToken(null);
      props.setUserID(null);
      props.setIsAuthenticated(false);
    })
    .catch(error => console.log(error));
  };

  return (
    <div id="NavbarContainer" className={props.showMenu ? 'show' : null} onClick={hideMenu}>
      <div id="Navbar" onClick={(e) => e.stopPropagation()}>
        <NavLink to="/home" activeClassName="active" onClick={hideMenu}>
          <HomeIcon />
          Home
        </NavLink>

        <NavLink to="/explore" activeClassName="active" onClick={hideMenu}>
          <SearchIcon />
          Explore
        </NavLink>

        <NavLink to="/notifications" activeClassName="active" onClick={hideMenu}>
          <BellIcon />
          Notifications
        </NavLink>

        <NavLink to="/messages" activeClassName="active" onClick={hideMenu}>
          <EnvelopeIcon />
          Messages
        </NavLink>

        <NavLink to="/bookmarks" activeClassName="active" onClick={hideMenu}>
          <BookmarkIcon />
          Bookmarks
        </NavLink>

        <NavLink to="/profile" activeClassName="active" onClick={hideMenu}>
          <UserIcon />
          Profile
        </NavLink>

        <button id="LogOut" className="colorButton" onClick={() => {hideMenu(); logOut();}}>Log out</button>
      </div>
      {redirectToWelcome ? <Redirect to="/" /> : null}
    </div>
  );
}

export default Navbar;