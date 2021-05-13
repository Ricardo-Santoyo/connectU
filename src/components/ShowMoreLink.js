import React from 'react';
import { Link } from 'react-router-dom';

function ShowMoreLink(props) {
  const newTo = { 
    pathname: `/${props.data.user_handle}/${props.type}/${props.data.id}`, 
    post: props.data
  };

  return (
    <Link to={newTo}>
      <p>{props.data.body}</p>
    </Link>
  );
}

export default ShowMoreLink;