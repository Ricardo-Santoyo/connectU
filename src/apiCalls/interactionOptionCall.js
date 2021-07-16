import apiCall from "./apiCall";

async function interactionOptionCall(name, io_id, updateCounter, type, ioable_id, id) {
  if (io_id) {
    return apiCall(`http://localhost:3001/api/${name}s/${io_id}`, 'DELETE')
    .then(response => response.error ? null : updateCounter(id))
  } else {
    return apiCall(`http://localhost:3001/api/${name}s?type=${type}&${name}able_id=${ioable_id}`, 'POST')
    .then(response => response.error ? null : updateCounter(id, getId(response)))
  }
};

function getId(response) {
  let id = response.repost ? response.repost.id : response.data.id;
  return id;
};

export default interactionOptionCall;