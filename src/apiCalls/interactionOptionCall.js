import apiCall from "./apiCall";

async function interactionOptionCall(name, io_id, updateCounter, type, ioable_id, id) {
  if (io_id) {
    return apiCall(`http://localhost:3001/api/${name}s/${io_id}`, 'DELETE')
    .then(response => response.error ? null : updateCounter(id))
  } else {
    return apiCall(`http://localhost:3001/api/${name}s?type=${type}&${name}able_id=${ioable_id}`, 'POST')
    .then(response => response.error ? null : updateCounter(id, response))
  }
};

export default interactionOptionCall;