import withApollo from 'next-with-apollo';
import ApolloClient, {InMemoryCache, gql} from 'apollo-boost';
// import uri from './graphqlEndpoint';

const createClient = ({ctx, headers, initialState}) => {
  let cache = new InMemoryCache().restore(initialState || {});
  return new ApolloClient({
    // change URI for deployment
    uri:
      process.env.NODE_ENV === 'development'
        ? 'http://localhost:3000/api/graphql'
        : 'https://trawis-web.coderprans.now.sh/api/graphql',
    credentials: 'same-origin',
    request: operation => {
      operation.setContext({
        // fetchOptions: {
        //   credentials: 'include',
        // },
        headers,
      });
    },
    cache,
  });
};

export default withApollo(createClient);
