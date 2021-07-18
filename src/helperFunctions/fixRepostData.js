function fixRepostData(data) {
  let fixedData = data.data;
  fixedData.repost_user_name = data.repost.user_name;
  fixedData.repost_user_handle = data.repost.user_handle;
  fixedData.repost_created_at = data.repost.created_at;
  return fixedData;
};

export default fixRepostData;