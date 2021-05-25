import React, { useEffect, useState } from 'react';
import Header from './Header';
import apiCall from '../apiCalls/apiCall';
import CommentsContainer from './CommentsContainer';
import DetailedPostInfo from './DetailedPostInfo';

function ShowComment(props) {
  const [comment, setComment] = useState();
  const [comments, setComments] = useState();

  useEffect(() => {
    if (props.location.post) {
      const c = props.location.post;
      setComment(c);
    } else {
      apiCall(`http://localhost:3001/api/comments/${props.match.params.commentID}`, 'GET')
      .then(data => setComment(data.data))
      .catch(error => error);
    }

    apiCall(`http://localhost:3001/api/comments?post_id=${props.match.params.commentID}`, 'GET')
    .then(data => setComments(data.data))
    .catch(error => error);
  }, [props.location.post, props.match.params.commentID]);

  return (
    <div className="Container">
      <Header title="Post" />
      {comment ? <DetailedPostInfo data={comment} /> : null}
      {comments ? <CommentsContainer commentsData={comments} setCommentsData={setComments} /> : null}
    </div>
  );
}

export default ShowComment;