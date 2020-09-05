import { v4 as uuid } from 'uuid';

const Mutation = {
  createUser(parent, args, { db }, info) {
    const emailTaken = db.users.some((user) => user.email === args.user.email);
    if (emailTaken) throw new Error('Email taken.');

    const user = {
      id: uuid(),
      ...args.user,
    };
    db.users.push(user);
    return user;
  },
  deleteUser(parent, args, { db }, info) {
    const userIndex = db.users.findIndex((user) => user.id === args.id);
    if (userIndex === -1) throw new Error('User not found!');

    const [deletedUser] = db.users.splice(userIndex, 1);
    db.posts = db.posts.filter((post) => {
      const match = post.author === args.id;

      if (match) {
        db.comments = db.comments.filter(
          (comment) => comment.postId !== post.id
        );
      }

      return !match;
    });

    db.comments = db.comments.filter((comment) => comment.author !== args.id);
    return deletedUser;
  },
  updateUser(parent, args, { db }, info) {
    const { id, user: data } = args;
    const user = db.users.find((user) => user.id === id);
    if (!user) throw new Error('User not found!');

    if (typeof data.email === 'string') {
      const emailTaken = db.users.some((user) => user.email === data.email);
      if (emailTaken) throw new Error('Email already exists!');

      user.email = data.email;
    }

    if (typeof data.name === 'string') {
      user.name = data.name;
    }

    if (typeof data.age !== 'undefined') {
      user.age = data.age;
    }

    return user;
  },
  createPost(parent, args, { db }, info) {
    const userExists = db.users.some((user) => user.id === args.post.author);
    if (!userExists) throw new Error('User not found!');

    const post = {
      id: uuid(),
      ...args.post,
    };
    db.posts.push(post);
    return post;
  },
  deletePost(parent, args, { db }, info) {
    const postIndex = db.posts.findIndex((post) => post.id === args.id);
    if (postIndex === -1) throw new Error('Post not found!');

    const [deletedPost] = pdb.osts.splice(postIndex, 1);
    db.comments = db.comments.filter((comment) => comment.postId !== args.id);
    return deletedPost;
  },
  updatePost(parent, args, { db }, info) {
    const { id, post: data } = args;
    const post = db.posts.find((post) => post.id === id);

    if (!post) throw new Error('Post not found!');

    if (typeof data.title === 'string') post.title = data.title;
    if (typeof data.body === 'string') post.body = data.body;
    if (typeof data.published === 'boolean') post.published = data.published;

    return post;
  },
  createComment(parent, args, { db }, info) {
    const userExists = db.users.some((user) => user.id === args.comment.author);
    if (!userExists) throw new Error('User not found!');

    const postExists = db.posts.some((post) => post.id === args.comment.postId);
    if (!postExists) throw new Error('Post not found!');

    const comment = {
      id: uuid(),
      ...args.comment,
    };
    db.comments.push(comment);
    return comment;
  },
  deleteComment(parent, args, { db }, info) {
    const commentIndex = db.comments.findIndex(
      (comment) => comment.id === args.id
    );
    if (commentIndex === -1) throw new Error('Comment not found!');

    const [deletedComment] = db.comments.splice(commentIndex, 1);
    return deletedComment;
  },
  updateComment(parent, args, { db }, info) {
    const { id, comment: data } = args;
    const comment = db.comments.find((comment) => comment.id === id);

    if (!comment) throw new Error('Comment not found!');

    if (typeof data.text === 'string') comment.text = data.text;

    return comment;
  },
};

export { Mutation as default };
