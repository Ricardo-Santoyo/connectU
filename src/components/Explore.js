import React from 'react';
import { NavLink } from 'react-router-dom';
import { ReactComponent as SearchIcon } from '../icons/search.svg';

function Explore() {
  return (
    <div className="Container">
      <div id="Explore">
        <div className="SearchBar">
          <SearchIcon />
          <input type="text" placeholder="Search"></input>
        </div>
        
        <div className="ShowUserNav">
          <NavLink activeClassName="activeUserNav" exact to='/explore' replace={true}>Users</NavLink>
          <NavLink activeClassName="activeUserNav" exact to='/explore/news' replace={true}>News</NavLink>
          <NavLink activeClassName="activeUserNav" exact to='/explore/trending' replace={true}>Trending</NavLink>
        </div>
      </div>
    </div>
  );
}

export default Explore;