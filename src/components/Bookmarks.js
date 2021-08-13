import React, { useEffect, useState } from 'react';
import Header from './Header';
import PostsContainer from './PostsContainer';
import apiCall from '../apiCalls/apiCall';

function Bookmarks(props) {
  const [bookmarks, setBookmarks] = useState();

  useEffect(() => {
    apiCall(`http://localhost:3001/api/bookmarks`, 'GET')
    .then(data => setBookmarks(data.data))
    .catch(error => error);
  }, []);

  function fixBookmarkData(bookmarks) {
    let newBookmarks = [...bookmarks];
    let i = newBookmarks.length;
    while (i--) {
      if (!newBookmarks[i].bookmark_id) { 
        newBookmarks.splice(i, 1);
      };
    };
    setBookmarks(newBookmarks);
  };

  return (
    <div id="Bookmark">
      <Header title="Bookmarks" />
      {bookmarks ? <PostsContainer noRepost={true} postsData={bookmarks} setPostsData={fixBookmarkData} pData={props.postsData} setPData={props.setPostsData}/> : null}
    </div>
  );
}

export default Bookmarks;