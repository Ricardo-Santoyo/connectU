import apiCall from "./apiCall";

async function likeCall(like_id, updateLikeCount, type, likeable_id, id) {
  if (like_id) {
    return apiCall(`http://localhost:3001/api/likes/${like_id}`, 'DELETE')
    .then(response => response.error ? null : updateLikeCount(id))
  } else {
    return apiCall(`http://localhost:3001/api/likes?type=${type}&likeable_id=${likeable_id}`, 'POST')
    .then(response => response.error ? null : updateLikeCount(id, response.data.id))
  }
};

export default likeCall;