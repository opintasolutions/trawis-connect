import withApollo from 'next-with-apollo';
import ApolloClient, {InMemoryCache} from 'apollo-boost';
// import uri from './graphqlEndpoint';

const createClient = ({ctx, headers, initialState}) => {
  return new ApolloClient({
    // change URI for deployment
    uri:
      process.env.NODE_ENV === 'development'
        ? 'http://localhost:3000/api/graphql'
        : 'https://trawis-web.coderprans.now.sh/api/graphql',
    request: operation => {
      operation.setContext({
        fetchOptions: {
          credentials: 'include',
        },
        headers,
      });
    },
    cache: new InMemoryCache().restore(initialState || {}),
  });
};
export default withApollo(createClient);
