// import {gql} from 'apollo-server-micro';
const {gql} = require('apollo-server-micro');
/*
 *  1 TODO: resolver for query trip
 *  2 TODO: resolver for query allTrips
 *  3 TODO: resolver for query hostedTrips
 *  4 TODO: resolver for query guestAtTrips
 *  5 TODO: enum UserCategory
 *  6 TODO: input TripInput
 *  7 TODO: resolver for mutation createTrip
 *  8 TODO: resolver for mutation addTravellersToTrip
 *  9 TODO: resolver for mutation updateTrip
 *  0 TODO: resolver for mutation deleteTrip
 * */

const typeDefs = gql`
  type Query {
    users: [User!]!
    user(id: ID!): User!
    me: User
    trip(id: ID!): Trip!
    allTrips: [Trip!]!
    hostedTrips(uId: ID!): [Trip!]
    guestAtTrips(uId: ID!): [Trip!]
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
    token: String
  }
  type Trip {
    _id: ID!
    title: String!
    description: String
    host: User!
    createdAt: String!
    startDate: String!
    endDate: String!
    openFor: [UserCategory!]!
    ageWindow: String!
    interests: [String!]!
    languages: [String!]!
    maxTravellers: Int!
    travellers: [User]!
  }
  input UserInput {
    name: String!
    email: String!
    password: String!
  }
  type Mutation {
    createUser(input: UserInput!): User
    follow(follower_id: ID!, followed_id: ID!): [User]
    deleteUser(_id: ID!): User
    signIn(email: String!, password: String!): User
    createTrip(input: TripInput!): Trip!
    addTravellersToTrip(travellers: [User!]!): Trip!
    updateTrip(id: ID!): Trip
    deleteTrip(id: ID!): String!
  }
`;

module.exports = typeDefs;
