function dataArray(post, counter, data, postsData) {
  let newPostData = {...post};
  let returnData = [];
  counter(newPostData, data);
  returnData.push(newPostData);

  let i = postsData ? postsData.findIndex((p) => p.id === Number(post.id)) : -1;
  if (i !== -1) {
    let newPostsData = [...postsData];
    counter(newPostsData[i], data);
    returnData.push(newPostsData);
  }
  return returnData;
};

export default dataArray;