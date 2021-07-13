import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import Header from './Header';
import PostsContainer from './PostsContainer';
import defaultIcon from '../images/default-user-icon.jpg';
import apiCall from '../apiCalls/apiCall';
import getHomeFeed from '../apiCalls/getHomeFeed';
import timeDifference from '../helperFunctions/timeDifference';
import Loading from './Loading';


function ShowUser(props) {
  const [user, setUser] = useState();
  const [userPosts, setUserPosts] = useState();
  const [callingApi, setCallingApi] = useState(false);

  useEffect(() => {
    const ID = props.userID ? props.userID : props.match.params.userHandle
    apiCall(`http://localhost:3001/api/users/${ID}`, 'GET')
    .then(data => setUser(data.data))
    .catch(error => error);

    getHomeFeed(ID, false)
    .then(data => setUserPosts(data))
  }, [props.userID, props.match.params.userHandle]);

  function JoinedDate() {
    let date = timeDifference(user.attributes.created_at, true);
    return date.split(' · ')[1];
  }

  function follow() {
    if (!callingApi) {
      if (user.attributes.follower_followee_id) {
        setCallingApi(true);
        apiCall(`http://localhost:3001/api/following/${user.attributes.follower_followee_id}`, 'DELETE')
        .then(response => response.error ? null : updateFollowingStatus())
        .then(() => setCallingApi(false))
      } else {
        setCallingApi(true);
        apiCall(`http://localhost:3001/api/following?person_id=${user.id}`, 'POST')
        .then(response => response.error ? null : updateFollowingStatus(response.data.id))
        .then(() => setCallingApi(false))
      }
    }
  }

  function updateFollowingStatus(id) {
    let updatedUser = {...user};
    if (updatedUser.attributes.follower_followee_id) {
      updatedUser.attributes.follower_followee_id = null;
    } else {
      updatedUser.attributes.follower_followee_id = id;
    }
    setUser(updatedUser);
  }

  return (
    <div className="Container">

      <Header title={user ? user.attributes.name : 'User'}/>
      {user ?
      <div id="ShowUser">
        
        <div className="Bio">
          <div className="banner"></div>

          <div className="userIconWithButtons">
            <img src={defaultIcon} alt="User Icon" className="UserPhoto"></img>
            {props.currentUserID !== user.id ? 
            <button 
              className={user.attributes.follower_followee_id ? "colorButton" : "transparentButton"}
              onClick={() => follow()}
            >
              {user.attributes.follower_followee_id ? "Following" : "Follow"}
            </button> 
            : null}
          </div>

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

      {userPosts ? <PostsContainer postsData={userPosts} setPostsData={setUserPosts} pData={props.postsData} setPData={props.setPostsData}/> : null}
    </div>
  );
}

export default ShowUser;