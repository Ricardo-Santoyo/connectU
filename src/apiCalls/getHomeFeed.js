import apiCall from './apiCall';

async function getHomeFeed(userID, include_followees) {
  return Promise.all([getPosts(userID, include_followees), getReposts(userID, include_followees)])
  .then(([Posts, Reposts]) => fixPostsData(Posts, Reposts))
};

async function getPosts(userID, include_followees) {
  return apiCall(`http://localhost:3001/api/users/${userID}/posts${include_followees ? '?include_followees=true' : ''}`, 'GET')
  .then(data => data.data)
};

async function getReposts(userID, include_followees) {
  return apiCall(`http://localhost:3001/api/reposts?${include_followees ? 'include_followees=true' : `user_id=${userID}`}`, 'GET')
  .then(data => fixRepostData(data))
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