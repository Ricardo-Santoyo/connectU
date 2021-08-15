import dataArray from "./dataArray";

function updatePostLikes(post, data, postsData) {
  return dataArray(post, updateCounter, data, postsData);
};

function updateCounter(post, data) {
  if (post.like_id) {
    post.like_count -= 1;
    post.like_id = null;
  } else {
    post.like_count += 1;
    post.like_id = data.data.id;
  }
};

export default updatePostLikes;