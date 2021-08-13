import React, { useEffect, useState } from 'react';
import Header from './Header';
import apiCall from '../apiCalls/apiCall';
import interactionOptionCall from '../apiCalls/interactionOptionCall';
import CommentsContainer from './CommentsContainer';
import DetailedPostInfo from './DetailedPostInfo';
import Loading from "./Loading";
import findPost from '../helperFunctions/findPost';

function ShowPost(props) {
  const [post, setPost] = useState();
  const [comments, setComments] = useState();
  const [callingApi, setCallingApi] = useState(false);

  useEffect(() => {
    if (props.location.post) {
      const p = props.location.post;
      setPost(p);
    } else if (props.postsData) {
      const p = findPost(props.postsData, props.match.params);
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
      setCallingApi(true);
      interactionOptionCall('like', post.like_id, updateLikeCount, 'post', post.id)
      .then(() => setCallingApi(false))
    }
  };

  function updateLikeCount(empty, data) {
    let newPostData = {...post};
    if (newPostData.like_id) {
      newPostData.like_count -= 1;
      newPostData.like_id = null;
    } else {
      newPostData.like_count += 1;
      newPostData.like_id = data.data.id;
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
        newPostsData[p].like_id = data.data.id;
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
      {comments ? <CommentsContainer commentsData={comments} setCommentsData={setComments} postsData={props.postsData} setPostsData={props.setPostsData}/> : <Loading />}
    </div>
  );
}

export default ShowPost;