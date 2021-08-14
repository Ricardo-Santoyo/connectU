import React, { useEffect, useState } from 'react';
import Header from './Header';
import apiCall from '../apiCalls/apiCall';
import interactionOptionCall from '../apiCalls/interactionOptionCall';
import CommentsContainer from './CommentsContainer';
import DetailedPostInfo from './DetailedPostInfo';
import Loading from "./Loading";
import findPost from '../helperFunctions/findPost';
import updatePostLikes from '../helperFunctions/updatePostLikes';
import updatePostComments from '../helperFunctions/updatePostComments';

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
  }, [props.location.post]);

  function likeCall() {
    if (!callingApi) {
      setCallingApi(true);
      interactionOptionCall('like', post.like_id, updateLikeCount, 'post', post.id)
      .then(() => setCallingApi(false))
    }
  };

  function updateLikeCount(empty, data) {
    let updatedData = updatePostLikes(post, data, props.postsData);
    setPost(updatedData[0]);
    if (updatedData[1]) {
      props.setPostsData(updatedData[1]);
    }
  };

  function updateCommentInfo(newComment) {
    let updatedData = updatePostComments(post, props.postsData);
    setPost(updatedData[0]);
    if (updatedData[1]) {
      props.setPostsData(updatedData[1]);
    }
    setComments([newComment, ...comments]);
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