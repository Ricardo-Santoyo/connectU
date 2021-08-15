import dataArray from "./dataArray";

function updatePostComments(post, postsData, data) {
  return dataArray(post, updateCounter, data, postsData);
};

function updateCounter(post, data) {
  post.comment_count += 1;
  post.commented = true;
};

export default updatePostComments;