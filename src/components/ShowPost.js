import React, { useEffect, useState } from 'react';
import Header from './Header';
import apiCall from '../apiCalls/apiCall';
import interactionOptionCall from '../apiCalls/interactionOptionCall';
import CommentsContainer from './CommentsContainer';
import DetailedPostInfo from './DetailedPostInfo';
import Loading from "./Loading";
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
    } else {
      const postLink = props.match.params.postID ? `http://localhost:3001/api/users/${props.match.params.userHandle}/posts/${props.match.params.postID}` : `http://localhost:3001/api/comments/${props.match.params.commentID}?user_id=${props.match.params.userHandle}`
      apiCall(postLink, 'GET')
      .then(data => setPost(data.data))
      .catch(error => error);
    }

    const post_id = props.match.params.postID ? `post_id=${props.match.params.postID}` : `comment_id=${props.match.params.commentID}`;
    apiCall(`http://localhost:3001/api/comments?${post_id}&user_id=${props.match.params.userHandle}`, 'GET')
    .then(data => setComments(data.data))
    .catch(error => error);

    return () => {
      setPost(null);
    };
  }, [props.location.post]);

  function likeCall() {
    if (!callingApi) {
      setCallingApi(true);
      const type = props.match.params.postID ? 'post' : 'comment';
      interactionOptionCall('like', post.like_id, updateLikeCount, type, post.id)
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
      <Header title={props.match.params.postID ? "Post" : "Comment"} />
      {post ? <DetailedPostInfo data={post} likeCall={likeCall} updateCommentInfo={updateCommentInfo} /> : null}
      {comments ? <CommentsContainer commentsData={comments} setCommentsData={setComments} postsData={props.postsData} setPostsData={props.setPostsData}/> : <Loading />}
    </div>
  );
}

export default ShowPost;