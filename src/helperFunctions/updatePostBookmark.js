import dataArray from "./dataArray";

function updatePostBookmark(post, data, postsData) {
  return dataArray(post, updateCounter, data, postsData);
};

function updateCounter(post, data) {
  if (post.bookmark_id) {
    post.bookmark_id = null;
  } else {
    post.bookmark_id = data.bookmark.id;
  }
};

export default updatePostBookmark;