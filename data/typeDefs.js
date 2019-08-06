// import {gql} from 'apollo-server-micro';
const {gql} = require('apollo-server-micro');

const typeDefs = gql`
  type Query {
    users: [User!]!
  }
  type User {
    _id: ID!
    name: String!
    email: String!
    password: String!
    hometown: String
    bio: String
    followers: [User!]
    following: [User!]
    points: Int!
  }
  input UserInput {
    name: String!
    email: String!
    password: String!
  }
  type Mutation {
    createUser(input: UserInput!): User
    follow(follower_id: ID!, followed_id: ID!): User
  }
`;

module.exports = typeDefs;
