import dataArray from "./dataArray";
import fixRepostData from "./fixRepostData";
import removeRepost from "./removeRepost";

function updatePostReposts(post, data, postsData) {
  return dataArray(post, updateCounter, data, postsData, true);
};

function updateCounter(post, data, postsData) {
  if (post.repost_id) {
    post.repost_count -= 1;
    post.repost_id = null;
    if (postsData) {
      removeRepost(postsData, post.id)
    }
  } else {
    post.repost_count += 1;
    post.repost_id = data.repost.id;
    if (postsData) {
      postsData.unshift(fixRepostData(data));
    }
  }
};

export default updatePostReposts;