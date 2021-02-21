import React from 'react';
import { NavLink } from 'react-router-dom';
import { ReactComponent as HomeIcon } from '../icons/home.svg';
import { ReactComponent as SearchIcon } from '../icons/search.svg';
import { ReactComponent as BellIcon } from '../icons/bell.svg';
import { ReactComponent as EnvelopeIcon } from '../icons/envelope.svg';
import { ReactComponent as BookmarkIcon } from '../icons/bookmark.svg';
import { ReactComponent as UserIcon } from '../icons/user.svg';

function Navbar(props) {

  function hideMenu() {
    props.setShowMenu(false);
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

        <button id="LogOut" className="colorButton" onClick={hideMenu}>Log out</button>
      </div>
    </div>
  );
}

export default Navbar;