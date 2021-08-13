import React from 'react';
import Post from './Post';
import fixRepostData from '../helperFunctions/fixRepostData';
import removeRepost from '../helperFunctions/removeRepost';

function PostsContainer(props) {

  function updateLikeCount(post_id, data, stop) {
    let newPostsData = stop ? [...props.pData] : [...props.postsData];
    if (newPostsData[post_id].like_id) {
      newPostsData[post_id].like_count -= 1;
      newPostsData[post_id].like_id = null;
    } else {
      newPostsData[post_id].like_count += 1;
      newPostsData[post_id].like_id = data.data.id;
    }

    if (stop) {
      props.setPData(newPostsData);
    } else {
      props.setPostsData(newPostsData);

      let p = props.pData ? props.pData.findIndex((post) => post.id === newPostsData[post_id].id) : -1;
      if (p !== -1) {
        updateLikeCount(p, data, true);
      }
    }
  };

  function updateCommentCount(post_id, stop) {
    let newPostsData = stop ? [...props.pData] : [...props.postsData];
    newPostsData[post_id].comment_count += 1;
    newPostsData[post_id].commented = true;

    if (stop) {
      props.setPData(newPostsData);
    } else {
      props.setPostsData(newPostsData);

      let p = props.pData ? props.pData.findIndex((post) => post.id === newPostsData[post_id].id) : -1;
      if (p !== -1) {
        updateCommentCount(p, true);
      }
    }
  };

  function updateRepostCount(post_id, data, stop) {
    let newPostsData = stop ? [...props.pData] : [...props.postsData];
    let newID;
    if (newPostsData[post_id].repost_id) {
      if (!stop && props.noRepost) {
        newPostsData[post_id].repost_count -= 1;
        newPostsData[post_id].repost_id = null;
        newID = newPostsData[post_id].id;
      } else {
        newID = removeRepost(newPostsData, newPostsData[post_id].id);
      }
    } else {
      newPostsData[post_id].repost_count += 1;
      newPostsData[post_id].repost_id = data.repost.id;
      if (!stop && props.noRepost) {
        newID = newPostsData[post_id].commentable_type ? 'comment' : newPostsData[post_id].id;
      } else {
        newPostsData = [fixRepostData(data), ...newPostsData];
        newID = newPostsData[post_id + 1].id;
      }
    }

    if (stop) {
      props.setPData(newPostsData);
    } else {
      props.setPostsData(newPostsData);
      let p = props.pData ? props.pData.findIndex((post) => post.id === newID) : -1;
      if (p !== -1) {
        updateRepostCount(p, data, true);
      } else if (newID === 'comment') {
        props.setPData([fixRepostData(data), ...props.pData]);
      }
    }
  }

  function updateBookmark(post_id, data, stop) {
    let newPostsData = stop ? [...props.pData] : [...props.postsData];
    if (newPostsData[post_id].bookmark_id) {
      newPostsData[post_id].bookmark_id = null;
    } else {
      newPostsData[post_id].bookmark_id = data.bookmark.id;
    }

    if (stop) {
      props.setPData(newPostsData);
    } else {
      props.setPostsData(newPostsData);

      let p = props.pData ? props.pData.findIndex((post) => post.id === newPostsData[post_id].id) : -1;
      if (p !== -1) {
        updateBookmark(p, data, true);
      }
    }
  };

  return (
    <div id="PostsContainer">
      {props.postsData ? props.postsData.map((data, id) => (
        data.commentable_type ? <Post key={id} data={data} type='comment' id={id} updateLikeCount={updateLikeCount} updateRepostCount={updateRepostCount} updateCommentCount={updateCommentCount} updateBookmark={updateBookmark}/>
        : <Post key={id} data={data} id={id} type='post' updateLikeCount={updateLikeCount} updateRepostCount={updateRepostCount} updateCommentCount={updateCommentCount} updateBookmark={updateBookmark}/>
      )) : null}
    </div>
  );
}

export default PostsContainer;