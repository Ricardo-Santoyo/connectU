import React, { useEffect, useState } from 'react';
import Header from './Header';
import apiCall from '../apiCalls/apiCall';
import CommentsContainer from './CommentsContainer';
import DetailedPostInfo from './DetailedPostInfo';

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
  }, [props.location.post, props.match.params.commentID]);

  function likeCall() {
    if (!callingApi) {
      if (comment.like_id) {
        setCallingApi(true);
        apiCall(`http://localhost:3001/api/likes/${comment.like_id}`, 'DELETE')
        .then(response => response.error ? null : updateLikeCount())
        .then(() => setCallingApi(false))
      } else {
        setCallingApi(true);
        apiCall(`http://localhost:3001/api/likes?type=comment&likeable_id=${comment.id}`, 'POST')
        .then(response => response.error ? null : updateLikeCount(response.data.id))
        .then(() => setCallingApi(false))
      }
    }
  };

  function updateLikeCount(id) {
    let newCommentData = {...comment};
    if (newCommentData.like_id) {
      newCommentData.like_count -= 1;
      newCommentData.like_id = null;
    } else {
      newCommentData.like_count += 1;
      newCommentData.like_id = id;
    }
    setComment(newCommentData);
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
      {comments ? <CommentsContainer commentsData={comments} setCommentsData={setComments} /> : null}
    </div>
  );
}

export default ShowComment;