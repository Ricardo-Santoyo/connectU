import React from 'react';
import { NavLink } from 'react-router-dom';
import { ReactComponent as HomeIcon } from '../icons/home.svg';
import { ReactComponent as SearchIcon } from '../icons/search.svg';
import { ReactComponent as BellIcon } from '../icons/bell.svg';
import { ReactComponent as EnvelopeIcon } from '../icons/envelope.svg';
import { ReactComponent as BookmarkIcon } from '../icons/bookmark.svg';
import { ReactComponent as UserIcon } from '../icons/user.svg';

function Navbar() {
  return (
    <div id="NavbarContainer">
      <div id="Navbar">
        <NavLink to="/home" activeClassName="active" >
          <HomeIcon />
          Home
        </NavLink>

        <NavLink to="/explore" activeClassName="active" >
          <SearchIcon />
          Explore
        </NavLink>

        <NavLink to="/notifications" activeClassName="active" >
          <BellIcon />
          Notifications
        </NavLink>

        <NavLink to="/messages" activeClassName="active" >
          <EnvelopeIcon />
          Messages
        </NavLink>

        <NavLink to="/bookmarks" activeClassName="active" >
          <BookmarkIcon />
          Bookmarks
        </NavLink>

        <NavLink to="/profile" activeClassName="active" >
          <UserIcon />
          Profile
        </NavLink>

        <button id="LogOut" className="colorButton">Log out</button>
      </div>
    </div>
  );
}

export default Navbar;