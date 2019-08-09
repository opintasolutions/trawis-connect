import React from 'react';
import {gql} from 'apollo-boost';
import {useMutation, useQuery} from 'react-apollo';

const GET_USERS_QUERY = gql`
  query {
    users {
      _id
      name
      email
    }
  }
`;

const DELETE_USER_MUTATION = gql`
  mutation deleteUser($id: ID!) {
    deleteUser(_id: $id) {
      name
    }
  }
`;

const Users = () => {
  const {loading, data, error} = useQuery(GET_USERS_QUERY);
  const [deleteUser] = useMutation(DELETE_USER_MUTATION);

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error! {error.message}</div>;
  }

  const onRemove = id => {
    deleteUser({variables: {id}});
    alert('User Removed');
    if (location) location.reload();
  };

  return (
    <ul>
      {data.users.map(user => (
        <div key={user._id}>
          <li>{user.name}</li>
          <button onClick={() => onRemove(user._id)}>Remove</button>
        </div>
      ))}
    </ul>
  );
};

Users.getInitialProps = () => {
  return {title: 'Users'};
};

export default Users;
