import React from 'react';
import { ReactComponent as EnvolopeIcon } from '../icons/envelope.svg';
import { ReactComponent as BookmarkIcon } from '../icons/bookmark.svg';
import { ReactComponent as SolidBookmarkIcon } from '../icons/bookmark-solid.svg';
import { ReactComponent as LinkIcon } from '../icons/link.svg';

function ShareMenu(props) {

  return (
    <div id="ShareMenuWrapper">
      <div id="ShareMenuContainer" onClick={() => props.setDisplayShareMenu(false)} />
      <div id="ShareMenu">
        <div className="ShareOption" onClick={() => console.log("envelope")}>
          <EnvolopeIcon />
          <span>Direct Message</span>
        </div>

        <div className="ShareOption" onClick={() => props.bookmark()}>
          {props.bookmark_id ? <SolidBookmarkIcon className="Blue"/> : <BookmarkIcon />}
          {props.bookmark_id ? <span>Remove Bookmark</span> : <span>Add to Bookmarks</span>}
        </div>

        <div className="ShareOption" onClick={() => props.copyLink()}>
          <LinkIcon />
          <span>Copy Link</span>
        </div>
      </div>
    </div>
  );
}

export default ShareMenu;