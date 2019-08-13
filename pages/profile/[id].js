import {useQuery, useApolloClient} from 'react-apollo';
import {gql} from 'apollo-boost';
import cookie from 'cookie';
import redirect from '../../lib/redirect';
import Layout from '../../components/layout';

const USER_PROFILE_QUERY = gql`
  query user($id: ID!) {
    user(id: $id) {
      name
      email
      bio
      followers {
        name
      }
      following {
        name
      }
      points
    }
  }
`;
const ProfilePage = ({user, title}) => {
  // console.log(user.id);
  const client = useApolloClient();

  const {data, loading, error} = useQuery(USER_PROFILE_QUERY, {
    variables: {id: user.id},
  });

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>ERROR! {error.message}</div>;
  }

  const signOut = () => {
    document.cookie = cookie.serialize('token', '', {
      path: '/',
      maxAge: -1,
    });
    // client.writeData({data: {loggedIn: false, id: null}});
    console.log('you wanna sign out ?');
    redirect({}, '/login');
  };

  return (
    <Layout title={title}>
      <div>
        {data.user.name} <br /> {data.user.email} {data.user.followers.length}{' '}
        {data.user.following.length}
        <button onClick={signOut}>Sign Out</button>
      </div>
    </Layout>
  );
};

ProfilePage.getInitialProps = ({req, query, apolloClient}) => {
  // console.log(apolloClient);
  if (req) {
    return {
      user: query,
      title: 'Profile',
      id: cookie.parse(req.headers.cookie || '').token,
    };
  }
  return {user: query, title: 'Profile'};
};

export default ProfilePage;
