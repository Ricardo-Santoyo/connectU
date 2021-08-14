function updatePostLikes(post, data, postsData) {
  let newPostData = {...post};
  let returnData = [];
  updateCounter(newPostData, data);
  returnData.push(newPostData);

  let i = postsData ? postsData.findIndex((p) => p.id === Number(post.id)) : -1;
  if (i !== -1) {
    let newPostsData = [...postsData];
    updateCounter(newPostsData[i], data);
    returnData.push(newPostsData);
  }
  return returnData;
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