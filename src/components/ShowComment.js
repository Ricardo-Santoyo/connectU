import React, { useEffect, useState } from 'react';
import Header from './Header';
import apiCall from '../apiCalls/apiCall';
import interactionOptionCall from '../apiCalls/interactionOptionCall';
import CommentsContainer from './CommentsContainer';
import DetailedPostInfo from './DetailedPostInfo';
import updatePostLikes from '../helperFunctions/updatePostLikes';

function ShowComment(props) {
  const [comment, setComment] = useState();
  const [comments, setComments] = useState();
  const [callingApi, setCallingApi] = useState(false);

  useEffect(() => {
    if (props.location.post) {
      const c = props.location.post;
      setComment(c);
    } else {
      apiCall(`http://localhost:3001/api/comments/${props.match.params.commentID}?user_id=${props.match.params.userHandle}`, 'GET')
      .then(data => setComment(data.data))
      .catch(error => error);
    }

    apiCall(`http://localhost:3001/api/comments?comment_id=${props.match.params.commentID}&user_id=${props.match.params.userHandle}`, 'GET')
    .then(data => setComments(data.data))
    .catch(error => error);
  }, []);

  function likeCall() {
    if (!callingApi) {
      setCallingApi(true);
      interactionOptionCall('like', comment.like_id, updateLikeCount, 'comment', comment.id)
      .then(() => setCallingApi(false))
    }
  };

  function updateLikeCount(empty, data) {
    let updatedData = updatePostLikes(comment, data, props.postsData);
    setComment(updatedData[0]);
    if (updatedData[1]) {
      props.setPostsData(updatedData[1]);
    }
  };

  function updateCommentInfo(newComment) {
    let newCommentData = {...comment};
    newCommentData.comment_count += 1;
    newCommentData.commented = true;
    setComment(newCommentData);
    setComments([newComment, ...comments]);
  };

  return (
    <div className="Container">
      <Header title="Comment" />
      {comment ? <DetailedPostInfo data={comment} likeCall={likeCall} updateCommentInfo={updateCommentInfo} /> : null}
      {comments ? <CommentsContainer commentsData={comments} setCommentsData={setComments} postsData={props.postsData} setPostsData={props.setPostsData}/> : null}
    </div>
  );
}

export default ShowComment;