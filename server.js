import { ApolloServer, gql } from "apollo-server";

const tweets = [
  {
    id: "1",
    text: "first",
  },
  {
    id: "2",
    text: "second",
  },
];

// schema definition language(SDL)
const typeDefs = gql`
  type User {
    id: ID!
    username: String!
    firstname: String!
    lastname: String
  }
  type Tweet {
    id: ID!
    text: String!
    author: User
  }
  type Query {
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
    tweet(root, args) {
      return tweets.find((t) => t.id === args.id);
    },
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => console.log(`running on ${url}`));
