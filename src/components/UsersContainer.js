import React from 'react';
import User from './User';

function UsersContainer(props) {

  function updateFollowingStatus(user_id, id) {
    let newUsersData = [...props.usersData];
    if (newUsersData[user_id].follower_followee_id) {
      newUsersData[user_id].follower_followee_id = null;
    } else {
      newUsersData[user_id].follower_followee_id = id;
    }
    props.setUsersData(newUsersData);
  }

  return (
    <div id="UsersContainer">
      {props.usersData ? props.usersData.map((user, id) => (
        <User key={id} user={user} id={id} updateFollowingStatus={updateFollowingStatus}/>
      )) : null}
    </div>
  );
}

export default UsersContainer;