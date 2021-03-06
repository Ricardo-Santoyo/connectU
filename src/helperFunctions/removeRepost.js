function removeRepost(data, id) {
  let i = data.findIndex((repost) => repost.id === id);
  data.splice(i, 1);
  let post_id = data.findIndex((post) => post.id === id);
  if (post_id !== -1) {
    data[post_id].repost_count -= 1;
    data[post_id].repost_id = null;
  }
  return id;
};

export default removeRepost