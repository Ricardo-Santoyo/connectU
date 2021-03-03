import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import Header from './Header';
import PostsContainer from './PostsContainer';
import defaultIcon from '../images/default-user-icon.jpg';
import getApiCall from '../apiCalls/getApiCall';
import timeDifference from '../helperFunctions/timeDifference';
import Loading from './Loading';


function ShowUser(props) {
  const [user, setUser] = useState();
  const [userPosts, setUserPosts] = useState();

  useEffect(() => {
    const ID = props.userID ? props.userID : props.match.params.userHandle
    getApiCall(`http://localhost:3001/api/users/${ID}`)
    .then(data => setUser(data.data))
    .catch(error => error);

    getApiCall(`http://localhost:3001/api/users/${ID}/posts`)
    .then(data => setUserPosts(data.data))
    .catch(error => error);
  }, [props.userID, props.match.params.userHandle]);

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
          <NavLink activeClassName="activeUserNav" exact to={`/${user.attributes.handle}`} replace={true}>Posts</NavLink>
          <NavLink activeClassName="activeUserNav" exact to={`/${user.attributes.handle}/replies`} replace={true}>Replies</NavLink>
          <NavLink activeClassName="activeUserNav" exact to={`/${user.attributes.handle}/media`} replace={true}>Media</NavLink>
          <NavLink activeClassName="activeUserNav" exact to={`/${user.attributes.handle}/likes`} replace={true}>Likes</NavLink>
        </div>
      </div>
      : <Loading />}

      {userPosts ? <PostsContainer postsData={userPosts} /> : null}
    </div>
  );
}

export default ShowUser;