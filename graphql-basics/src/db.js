const users = [
  { id: '1', name: 'Momen', email: 'momensherif.2019@gmail.com', age: 24 },
  { id: '2', name: 'Amr', email: 'amr.ouf@yahoo.com' },
  { id: '3', name: 'Salah', email: 'ahmed.salah@gmail.com' },
];

const posts = [
  {
    id: '1',
    title: 'Post Title One',
    body: 'Post Body One',
    published: true,
    author: '1',
  },
  {
    id: '2',
    title: 'Post Title Two',
    body: 'Post Body Two',
    published: false,
    author: '1',
  },
  {
    id: '3',
    title: 'Post Title Three',
    body: 'Post Body Three',
    published: false,
    author: '2',
  },
  {
    id: '4',
    title: 'Post Title Four',
    body: 'Post Body Four',
    published: true,
    author: '3',
  },
];

const comments = [
  { id: '1', text: 'Comment One', author: '1', postId: '1' },
  { id: '2', text: 'Comment Two', author: '2', postId: '2' },
  { id: '3', text: 'Comment Three', author: '3', postId: '1' },
];

const db = {
  users,
  posts,
  comments,
};

export { db as default };
