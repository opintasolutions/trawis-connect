import {useQuery, useApolloClient} from 'react-apollo';
import {gql} from 'apollo-boost';
import redirect from '../../lib/redirect';
import cookie from 'cookie';
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
  // const client = useApolloClient();

  const {data, loading, error} = useQuery(USER_PROFILE_QUERY, {
    variables: {id: user.id},
  });

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>ERROR! {error.message}</div>;
  }

  return (
    <Layout title={title}>
      <div className="container">
        <img src="/static/placeholder.jpg" alt="profile picture" />
        <div className="profile-texts">
          <h1>{data.user.name}</h1> <br />
          <div className="info-wrapper">
            {data.user.email} <br />
            <div className="info">
              <span>
                <b>{data.user.followers.length}</b>&nbsp; Followers
              </span>
              <span>
                <b>{data.user.following.length}</b>&nbsp; Following
              </span>
              <span>
                <b>{data.user.points}</b>&nbsp; Points
              </span>
            </div>
          </div>
        </div>
      </div>
      <style jsx>{`
        .container {
          display: flex;
          justify-content: flex-start;
          align-items: flex-start;
        }
        .container img {
          width: 140px;
          height: 100%;
          padding: 20px;
        }
        .profile-texts {
          padding: 20px;
        }
        .profile-texts h1 {
          font-weight: normal;
          margin: 0;
        }
        .info {
          padding: 20px 0;
          display: flex;
          justify-content: flex-start;
        }
        .info span {
          margin: 0 30px 0 0;
          color: #555;
        }
        .info b {
          font-size: 18px;
          font-weight: normal;
          color: black;
        }
        @media (max-width: 700px) {
          .container {
            flex-wrap: wrap;
          }
        }
      `}</style>
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

// TODO: implement client localState using local Resolvers.
//  write a resolver function for mutatio
