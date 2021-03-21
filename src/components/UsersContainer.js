import React from 'react';
import User from './User';

function UsersContainer(props) {
  return (
    <div id="UsersContainer">
      {props.usersData ? props.usersData.map((user, id) => (
        <User key={id} user={user} id={id} />
      )) : null}
    </div>
  );
}

export default UsersContainer;