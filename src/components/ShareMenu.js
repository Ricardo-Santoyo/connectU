import React from 'react';
import { ReactComponent as EnvolopeIcon } from '../icons/envelope.svg';
import { ReactComponent as BookmarkIcon } from '../icons/bookmark.svg';
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

        <div className="ShareOption" onClick={() => console.log("bookmark")}>
          <BookmarkIcon />
          <span>Add to Bookmarks</span>
        </div>

        <div className="ShareOption" onClick={() => console.log("link")}>
          <LinkIcon />
          <span>Copy Link</span>
        </div>
      </div>
    </div>
  );
}

export default ShareMenu;