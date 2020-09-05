const Query = {
  users(parent, args, { db }, info) {
    if (!args.query) return db.users;

    const regExp = new RegExp(args.query, 'i');
    return db.users.filter((user) => user.name.match(regExp));
  },
  posts(parent, args, { db }, info) {
    if (!args.query) return db.posts;

    const regExp = new RegExp(args.query, 'i');
    return db.posts.filter(
      (post) => post.title.match(regExp) || post.body.match(regExp)
    );
  },
  comments(parent, args, { db }, info) {
    return db.comments;
  },
  me() {
    return {
      id: '1',
      name: "Mo'men",
      email: 'momen.sherif@fixedmea.com',
      age: 24,
    };
  },
  post() {
    return {
      id: '1',
      title: 'Post Title',
      body: 'Post body',
      published: true,
    };
  },
};

export { Query as default };
