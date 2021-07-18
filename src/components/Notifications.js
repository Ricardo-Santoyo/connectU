import React from 'react';
import Header from './Header';
import { NavLink } from 'react-router-dom';

function Notifications() {

  return (
    <div className="Container">
      <div id="Notifications">
        <Header title="Notifications" />

        <div className="ShowUserNav">
            <NavLink activeClassName="activeUserNav" exact to='/notifications' replace={true}>All</NavLink>
            <NavLink activeClassName="activeUserNav" exact to='/notifications/mentions' replace={true}>Mentions</NavLink>
        </div>

        <h2 id="NoNotifications">No New Notifications</h2>
      </div>
    </div>
  );
}

export default Notifications;