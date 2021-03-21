import React, { useEffect, useState } from 'react';
import Loading from './Loading';
import UsersContainer from './UsersContainer';
import { NavLink } from 'react-router-dom';
import { ReactComponent as SearchIcon } from '../icons/search.svg';
import apiCall from '../apiCalls/apiCall';

function Explore() {
  const [usersData, setUsersData] = useState();

  useEffect(() => {
    if (!usersData) {
      apiCall('http://localhost:3001/api/users', 'GET')
      .then(data => setUsersData(data.data))
      .catch()
    }
  })

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
      {!usersData ? <Loading /> : <UsersContainer usersData={usersData}/>}
    </div>
  );
}

export default Explore;