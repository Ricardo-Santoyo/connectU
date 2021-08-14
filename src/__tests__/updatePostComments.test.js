import updatePostComments from '../helperFunctions/updatePostComments';

const post = {body: "Hello",bookmark_id: 54,comment_count: 0,commented: false,created_at: "2021-07-06T22:32:48.819Z",id: 501,like_count: 0,like_id: null,repost_count: 0,repost_id: null,updated_at: "2021-07-06T22:32:48.819Z",user_handle: "wVdAWbPgZZzh2L5",user_id: 21,user_name: "Ricardo Santoyo",user_post_id: 1};
const postsData = [
  {body: "当然",bookmark_id: 53,comment_count: 1,commentable_id: 3,commentable_type: "Comment",commented: false,created_at: "2021-07-06T23:00:54.560Z",id: 4,like_count: 0,like_id: null,repost_count: 1,repost_created_at: "2021-08-13T22:22:38.968Z",repost_id: 396,repost_user_handle: "wVdAWbPgZZzh2L5",repost_user_name: "Ricardo Santoyo",updated_at: "2021-07-06T23:00:54.560Z",user_handle: "wVdAWbPgZZzh2L5",user_id: 21,user_name: "Ricardo Santoyo",user_post_id: 3},
  {body: "Hello",bookmark_id: 54,comment_count: 0,commented: false,created_at: "2021-07-06T22:32:48.819Z",id: 501,like_count: 0,like_id: null,repost_count: 0,repost_id: null,updated_at: "2021-07-06T22:32:48.819Z",user_handle: "wVdAWbPgZZzh2L5",user_id: 21,user_name: "Ricardo Santoyo",user_post_id: 1},
  {body: "Quae sit quod accusamus.",bookmark_id: null,comment_count: 1,commented: true,created_at: "2021-07-06T22:09:24.861Z",id: 500,like_count: 0,like_id: null,repost_count: 0,repost_id: null,updated_at: "2021-07-06T22:09:24.861Z",user_handle: "PtibA4kTpB7lV9d",user_id: 20,user_name: "Sal A. Mander",user_post_id: 25}
];

test('returns updated post data when adding a comment', () => {
  expect(updatePostComments(post)).toStrictEqual([{body: "Hello",bookmark_id: 54,comment_count: 1,commented: true,created_at: "2021-07-06T22:32:48.819Z",id: 501,like_count: 0,like_id: null,repost_count: 0,repost_id: null,updated_at: "2021-07-06T22:32:48.819Z",user_handle: "wVdAWbPgZZzh2L5",user_id: 21,user_name: "Ricardo Santoyo",user_post_id: 1}]);
});

test('returns updated post data and posts Data when adding a comment', () => {
  const updatedData = updatePostComments(post, postsData);
  expect(updatedData[0]).toStrictEqual({body: "Hello",bookmark_id: 54,comment_count: 1,commented: true,created_at: "2021-07-06T22:32:48.819Z",id: 501,like_count: 0,like_id: null,repost_count: 0,repost_id: null,updated_at: "2021-07-06T22:32:48.819Z",user_handle: "wVdAWbPgZZzh2L5",user_id: 21,user_name: "Ricardo Santoyo",user_post_id: 1});
  expect(updatedData[1][1]).toStrictEqual({body: "Hello",bookmark_id: 54,comment_count: 1,commented: true,created_at: "2021-07-06T22:32:48.819Z",id: 501,like_count: 0,like_id: null,repost_count: 0,repost_id: null,updated_at: "2021-07-06T22:32:48.819Z",user_handle: "wVdAWbPgZZzh2L5",user_id: 21,user_name: "Ricardo Santoyo",user_post_id: 1});
});

test('returns updated comment data and posts Data when adding a comment', () => {
  const comment = postsData[0];
  const updatedData = updatePostComments(comment, postsData);
  expect(updatedData[0]).toStrictEqual({body: "当然",bookmark_id: 53,comment_count: 2,commentable_id: 3,commentable_type: "Comment",commented: true,created_at: "2021-07-06T23:00:54.560Z",id: 4,like_count: 0,like_id: null,repost_count: 1,repost_created_at: "2021-08-13T22:22:38.968Z",repost_id: 396,repost_user_handle: "wVdAWbPgZZzh2L5",repost_user_name: "Ricardo Santoyo",updated_at: "2021-07-06T23:00:54.560Z",user_handle: "wVdAWbPgZZzh2L5",user_id: 21,user_name: "Ricardo Santoyo",user_post_id: 3});
  expect(updatedData[1][0]).toStrictEqual({body: "当然",bookmark_id: 53,comment_count: 2,commentable_id: 3,commentable_type: "Comment",commented: true,created_at: "2021-07-06T23:00:54.560Z",id: 4,like_count: 0,like_id: null,repost_count: 1,repost_created_at: "2021-08-13T22:22:38.968Z",repost_id: 396,repost_user_handle: "wVdAWbPgZZzh2L5",repost_user_name: "Ricardo Santoyo",updated_at: "2021-07-06T23:00:54.560Z",user_handle: "wVdAWbPgZZzh2L5",user_id: 21,user_name: "Ricardo Santoyo",user_post_id: 3});
});