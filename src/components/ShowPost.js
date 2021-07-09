import React, { useEffect, useState } from 'react';
import Header from './Header';
import apiCall from '../apiCalls/apiCall';
import CommentsContainer from './CommentsContainer';
import DetailedPostInfo from './DetailedPostInfo';
import Loading from "./Loading";

function ShowPost(props) {
  const [post, setPost] = useState();
  const [comments, setComments] = useState();
  const [callingApi, setCallingApi] = useState(false);

  useEffect(() => {
    if (props.location.post) {
      const p = props.location.post;
      setPost(p);
    } else if (props.postsData) {
      const p = props.postsData.find((post) => post.id === Number(props.match.params.postID));
      setPost(p);
    } else {
      apiCall(`http://localhost:3001/api/users/${props.match.params.userHandle}/posts/${props.match.params.postID}`, 'GET')
      .then(data => setPost(data.data))
      .catch(error => error);
    }

    apiCall(`http://localhost:3001/api/comments?post_id=${props.match.params.postID}&user_id=${props.match.params.userHandle}`, 'GET')
    .then(data => setComments(data.data))
    .catch(error => error);
  }, [props.location.post, props.postsData, props.match.params.postID, props.match.params.userHandle]);

  function likeCall() {
    if (!callingApi) {
      if (post.like_id) {
        setCallingApi(true);
        apiCall(`http://localhost:3001/api/likes/${post.like_id}`, 'DELETE')
        .then(response => response.error ? null : updateLikeCount())
        .then(() => setCallingApi(false))
      } else {
        setCallingApi(true);
        apiCall(`http://localhost:3001/api/likes?type=post&likeable_id=${post.id}`, 'POST')
        .then(response => response.error ? null : updateLikeCount(response.data.id))
        .then(() => setCallingApi(false))
      }
    }
  };

  function updateLikeCount(id) {
    let newPostData = {...post};
    if (newPostData.like_id) {
      newPostData.like_count -= 1;
      newPostData.like_id = null;
    } else {
      newPostData.like_count += 1;
      newPostData.like_id = id;
    }
    setPost(newPostData);

    let p = props.postsData ? props.postsData.findIndex((p) => p.id === Number(post.id)) : -1;
    if (p !== -1) {
      let newPostsData = [...props.postsData];
      if (newPostsData[p].like_id) {
        newPostsData[p].like_count -= 1;
        newPostsData[p].like_id = null;
      } else {
        newPostsData[p].like_count += 1;
        newPostsData[p].like_id = id;
      }
      props.setPostsData(newPostsData);  
    }
  };

  function updateCommentInfo(newComment) {
    let newPostData = {...post};
    newPostData.comment_count += 1;
    newPostData.commented = true;
    setPost(newPostData);
    setComments([newComment, ...comments]);

    let p = props.postsData ? props.postsData.findIndex((p) => p.id === Number(post.id)) : -1;
    if (p !== -1) {
      let newPostsData = [...props.postsData];
      newPostsData[p].comment_count += 1;
      newPostsData[p].commented = true;
      props.setPostsData(newPostsData);  
    }
  };

  return (
    <div className="Container">
      <Header title="Post" />
      {post ? <DetailedPostInfo data={post} likeCall={likeCall} updateCommentInfo={updateCommentInfo} /> : null}
      {comments ? <CommentsContainer commentsData={comments} setCommentsData={setComments} /> : <Loading />}
    </div>
  );
}

export default ShowPost;