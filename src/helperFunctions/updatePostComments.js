function updatePostComments(post, postsData) {
  let newPostData = {...post};
  let returnData = [];
  updateCounter(newPostData);
  returnData.push(newPostData);

  let i = postsData ? postsData.findIndex((p) => p.id === Number(post.id)) : -1;
  if (i !== -1) {
    let newPostsData = [...postsData];
    updateCounter(newPostsData[i]);
    returnData.push(newPostsData); 
  }
  return returnData;
};

function updateCounter(post) {
  post.comment_count += 1;
  post.commented = true;
};

export default updatePostComments;