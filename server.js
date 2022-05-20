import { ApolloServer, gql } from "apollo-server";

let tweets = [
  {
    id: "1",
    text: "first",
  },
  {
    id: "2",
    text: "second",
  },
];

let users = [
  {
    id: "1",
    firstname: "nico",
    lastname: "ras",
  },
  {
    id: "2",
    firstname: "lee",
    lastname: "sky",
  },
];

// schema definition language(SDL)
const typeDefs = gql`
  type User {
    id: ID!
    firstname: String!
    lastname: String!
    fullname: String!
  }

  type Tweet {
    id: ID!
    text: String!
    author: User
  }

  type Query {
    allUsers: [User!]!
    allTweets: [Tweet!]!
    tweet(id: ID!): Tweet
  }

  type Mutation {
    postTweet(text: String!, userId: ID!): Tweet!
    deleteTweet(id: ID!): Boolean!
  }
`;

const resolvers = {
  Query: {
    allTweets() {
      return tweets;
    },
    allUsers() {
      return users;
    },
    tweet(root, args) {
      return tweets.find((t) => t.id === args.id);
    },
  },
  Mutation: {
    postTweet(_, { text, userId }) {
      const newTweet = {
        id: tweets.length + 1,
        text,
      };
      tweets.push(newTweet);
      return newTweet;
    },
    deleteTweet(_, { id }) {
      const tweet = tweets.find((t) => t.id === id);
      if (!tweet) return false;
      tweets = tweets.filter((t) => t.id !== id);
      return true;
    },
  },
  User: {
    fullname({ firstname, lastname }) {
      return `${firstname} ${lastname}`;
    },
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => console.log(`running on ${url}`));
