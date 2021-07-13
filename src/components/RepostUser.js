import React from 'react';
import { Link } from 'react-router-dom';
import { ReactComponent as RetweetIcon } from '../icons/retweet.svg';

function RepostUser(props) {
  return (
    <Link to={`/${props.data.repost_user_handle}`} className="RepostUser">
      <RetweetIcon />
      <span>{props.data.repost_user_name} reposted</span>
    </Link>
  );
}

export default RepostUser;