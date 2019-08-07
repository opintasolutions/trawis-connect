// npm packages
import {ApolloServer} from 'apollo-server-micro';
import mongoose from 'mongoose';
// our packages
import {mongoDB_uri} from '../../secrets.js';
import typeDefs from '../../data/typeDefs.js';
import resolvers from '../../data/resolvers.js';

// connect to database
if (mongoose.connection.readyState !== 1) {
  connectToDb();
}

function connectToDb() {
  mongoose
    .connect(mongoDB_uri, {useNewUrlParser: true})
    .then(() => console.log('DB Connected'))
    .catch(err => console.log('There was an error ', err));
}

const apolloServer = new ApolloServer({typeDefs, resolvers});

export const config = {
  api: {
    bodyParser: false,
  },
};

export default apolloServer.createHandler({path: '/api/graphql'});
