import withApollo from 'next-with-apollo';
import ApolloClient, {InMemoryCache, gql} from 'apollo-boost';
import cookie from 'cookie';
// import uri from './graphqlEndpoint';
let cache = new InMemoryCache();
const createClient = ({ctx, headers, initialState}) => {
  // let cache = new InMemoryCache().restore(initialState || {});
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
    typeDefs: gql`
      extend type Query {
        isLoggedIn: Boolean!
      }
    `,
    resolvers: {},
  });
};

function parseCookies() {
  if (typeof document !== 'undefined') {
    let cookie = document.cookie;
    let cookieObj = {};
    let splitCookies = cookie.split('=');
    let tokenIndex;
    splitCookies.forEach((str, i) => {
      if (str === 'token') {
        tokenIndex = i;
      }
    });
    cookieObj.token = splitCookies[tokenIndex + 1];
    console.log('inside parser', tokenIndex);
    return cookieObj;
  }
  return '';
}

console.log(
  typeof document !== 'undefined' ? parseCookies().token : 'on server now',
);
cache.writeData({
  data: {
    isLoggedIn: parseCookies().token ? true : false,
  },
});

export default withApollo(createClient);
