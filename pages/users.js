import React from 'react';
import {gql} from 'apollo-boost';
import {Query} from 'react-apollo';

const GET_USERS = gql`
  query {
    users {
      _id
      name
      email
    }
  }
`;

const Users = () => (
  <Query query={GET_USERS}>
    {({loading, error, data}) => {
      if (loading) return <div>Loading...</div>;
      if (error) return <div>Error :(</div>;

      return (
        <div>
          {data.users.map(user => (
            <div key={user._id}>{user.name}</div>
          ))}
        </div>
      );
    }}
  </Query>
);

export default Users;
