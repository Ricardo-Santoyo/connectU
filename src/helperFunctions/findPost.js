function findPost(postData, params) {
  let post_id = Number(params.postID);
  let handle = params.userHandle;
  return postData.find((post) => post.user_post_id === post_id && post.user_handle === handle);
};

export default findPost;