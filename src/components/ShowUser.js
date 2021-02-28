import React, { useEffect, useState } from 'react';
import Header from './Header';
import PostsContainer from './PostsContainer';
import defaultIcon from '../images/default-user-icon.jpg';
import getApiCall from '../apiCalls/getApiCall';
import timeDifference from '../helperFunctions/timeDifference';
import { Link } from 'react-router-dom';


function ShowUser(props) {
  const [user, setUser] = useState();
  const [userPosts, setUserPosts] = useState();

  useEffect(() => {
    getApiCall(`http://localhost:3001/api/users/${props.location.userID}`)
    .then(data => setUser(data.data))
    .catch(error => error);

    getApiCall(`http://localhost:3001/api/users/${props.location.userID}/posts`)
    .then(data => setUserPosts(data.data))
    .catch(error => error);
  }, [props.location.userID]);

  function JoinedDate() {
    let date = timeDifference(user.attributes.created_at, true);
    return date.split(' · ')[1];
  }

  return (
    <div className="Container">

      <Header title={user ? user.attributes.name : 'User'}/>
      {user ?
      <div id="ShowUser">
        
        <div className="Bio">
          <div className="banner"></div>

          <img src={defaultIcon} alt="User Icon" className="UserPhoto"></img>

          <div className="UserInfo">
            <h2>{user.attributes.name}</h2>
            <span className="UserHandle">@{user.attributes.handle}</span>
            <span className="UserHandle">Joined {JoinedDate()}</span>
            <span>
              <span className="FollowingFollowersCount">
                {user.attributes.following_count} <span className="UserHandle">Following</span>
              </span>
              <span className="FollowingFollowersCount">
                {user.attributes.followers_count} <span className="UserHandle">Followers</span>
              </span>
            </span>
          </div>

        </div>

        <div className="ShowUserNav">
          <Link to={{pathname: `${user.attributes.handle}`, userID: user.id}} replace={true} >Posts</Link>
          <Link to={{pathname: `${user.attributes.handle}/replies`, userID: user.id}} replace={true} >Replies</Link>
          <Link to={{pathname: `${user.attributes.handle}/media`, userID: user.id}} replace={true} >Media</Link>
          <Link to={{pathname: `${user.attributes.handle}/likes`, userID: user.id}} replace={true} >Likes</Link>
        </div>
      </div>
      : null}

      {userPosts ? <PostsContainer postsData={userPosts} /> : null}
    </div>
  );
}

export default ShowUser;