import React, { useEffect, useState } from 'react';
import Header from './Header';
import timeDifference from '../helperFunctions/timeDifference';
import apiCall from '../apiCalls/apiCall';
import CreatorInfo from './CreatorInfo';
import PostOptions from './PostOptions';
import CommentsContainer from './CommentsContainer';

function ShowPost(props) {
  const [post, setPost] = useState();
  const [comments, setComments] = useState();

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

    apiCall(`http://localhost:3001/api/comments?post_id=${props.match.params.postID}`, 'GET')
    .then(data => setComments(data.data))
    .catch(error => error);
  }, [props.location.post, props.postsData, props.match.params.postID, props.match.params.userHandle]);

  return (
    <div className="Container">

      <Header title="Post" />
      {post ?
      <div id="ShowPost">
        <CreatorInfo data={post} />
        <p>{post.body}</p>
        <span className="PostCreatedAt">{timeDifference(post.created_at, true)}</span>
        <PostOptions data={post} />
      </div>
      : null}

      {comments ? <CommentsContainer commentsData={comments} setCommentsData={setComments} /> : null}
    </div>
  );
}

export default ShowPost;