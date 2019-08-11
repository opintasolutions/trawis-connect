import jwt from 'jsonwebtoken';
import {useQuery} from 'react-apollo';
import {gql} from 'apollo-boost';
import mongoose from 'mongoose';

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
const ProfilePage = ({user}) => {
  console.log(user.id);

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
    <div>
      {data.user.name} {data.user.email} {data.user.followers.length}{' '}
      {data.user.following.length}
    </div>
  );
};

ProfilePage.getInitialProps = ({req, query}) => {
  return {user: query};
};

export default ProfilePage;
