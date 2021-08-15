import dataArray from "./dataArray";
import fixRepostData from "./fixRepostData";
import removeRepost from "./removeRepost";

function updatePostReposts(post, data, postsData) {
  return dataArray(post, updateCounter, data, postsData, true);
};

function updateCounter(post, data, i) {
  let postsData = i ? post : null;
  post = i ? postsData[i] : post;

  if (post.repost_id) {
    post.repost_count -= 1;
    post.repost_id = null;
    if (postsData) {
      removeRepost(postsData, i);
      return postsData;
    }
  } else {
    post.repost_count += 1;
    post.repost_id = data.repost.id;
    if (postsData) {
      return [fixRepostData(data), ...postsData];
    }
  }
};

export default updatePostReposts;