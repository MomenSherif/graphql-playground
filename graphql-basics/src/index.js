import { GraphQLServer } from 'graphql-yoga';

// Dummy data
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

// Type definitions (schema)
const typeDefs = `
  type Query {
    users(query: String): [User!]!
    posts(query: String): [Post!]!
    comments: [Comment!]!
    me: User!
    post: Post!
  }

  type User {
    id: ID!
    name: String!
    email: String!
    age: Int
    posts: [Post!]!
    comments: [Comment!]!
  }

  type Post {
    id: ID!
    title: String!
    body: String!
    published: Boolean!
    author: User!
    comments: [Comment!]!
  }

  type Comment {
    id: ID!
    text: String!
    author: User!
    post: Post!
  }
`;

// Resolvers
const resolvers = {
  Query: {
    users(parent, args, ctx, info) {
      if (!args.query) return users;

      const regExp = new RegExp(args.query, 'i');
      return users.filter((user) => user.name.match(regExp));
    },
    posts(parent, args, ctx, info) {
      if (!args.query) return posts;

      const regExp = new RegExp(args.query, 'i');
      return posts.filter(
        (post) => post.title.match(regExp) || post.body.match(regExp)
      );
    },
    comments(parent, args, ctx, info) {
      return comments;
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
  },
  Post: {
    author(parent, args, ctx, info) {
      return users.find((user) => user.id === parent.author);
    },
    comments(parent, args, ctx, info) {
      return comments.filter((comment) => comment.postId === parent.id);
    },
  },
  User: {
    posts(parent, args, ctx, info) {
      return posts.filter((post) => post.author === parent.id);
    },
    comments(parent, args, ctx, info) {
      return comments.filter((comment) => comment.author === parent.id);
    },
  },
  Comment: {
    author(parent, args, crx, info) {
      return users.find((user) => user.id === parent.author);
    },
    post(parent, args, ctx, info) {
      return posts.find((post) => post.id === parent.postId);
    },
  },
};

const server = new GraphQLServer({ typeDefs, resolvers });

server.start(() => console.log('Server is running on localhost:4000'));
