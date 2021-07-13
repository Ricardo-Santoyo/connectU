import apiCall from './apiCall';

async function getHomeFeed(userID) {
  return Promise.all([getPosts(userID), getReposts()])
  .then(([Posts, Reposts]) => fixPostsData(Posts, Reposts))
};

async function getPosts(userID) {
  return apiCall(`http://localhost:3001/api/users/${userID}/posts?include_followees=true`, 'GET')
  .then(data => data.data)
  .catch()
};

async function getReposts() {
  return apiCall(`http://localhost:3001/api/reposts?include_followees=true`, 'GET')
  .then(data => fixRepostData(data))
  .catch()
};

function fixRepostData(data) {
  let fixedData = data.data;
  data.repost.forEach((repost, id) => {
    fixedData[id].repost_user_name = repost.user_name;
    fixedData[id].repost_user_handle = repost.user_handle;
    fixedData[id].repost_created_at = repost.created_at;
  });
  return fixedData
};

function fixPostsData(posts, reposts) {
  let newData = [...posts, ...reposts];
  newData.sort((a, b) => {
      if (a.repost_created_at > b.created_at) {
        return -1;
      }
      return 0;
  });
  return newData
};

export default getHomeFeed;