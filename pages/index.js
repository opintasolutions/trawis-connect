import fetch from 'isomorphic-unfetch';
import Layout from '../components/layout';
import apiEndpoint from '../lib/graphqlEndpoint';

const Index = ({users}) => {
  console.log(users);
  const deleteUser = async _id => {
    const res = await fetch('/api/graphql', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        query: `mutation { deleteUser(_id: "${_id}"){ name }}`,
      }),
    });
    let {data} = await res.json();
    console.log(data);
    await alert(`User removed`);
    if (location) location.reload();
  };
  return (
    <Layout>
      <div>
        {users.length ? (
          users.map((user, i) => (
            <div key={user._id}>
              <h3>{user.name}</h3>&nbsp;-&nbsp;<span>{user.email}</span>&nbsp;
              <button onClick={() => deleteUser(user._id)}>Remove</button>
            </div>
          ))
        ) : (
          <p>Loading....</p>
        )}
      </div>
    </Layout>
  );
};

const query = `
{
    users {
        _id
        name
        email
    }
}
`;

Index.getInitialProps = async ({req}) => {
  const apiUrl = apiEndpoint(req);

  const response = await fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify({query}),
  });

  const {
    data: {users},
  } = await response.json();
  return {users, apiEndpoint};
};

export default Index;
