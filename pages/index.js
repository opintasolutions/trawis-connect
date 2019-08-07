import fetch from 'isomorphic-unfetch';
import {useState, useEffect} from 'react';

const graphqlQuery = `
{
    users {
        name
    } 
}
`;

const Index = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch(`api/graphql`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({query: graphqlQuery}),
    })
      .then(res => res.json())
      .then(json => {
        const {
          data: {users},
        } = json;
        setUsers(users);
      })
      .catch(err => console.log(err));
  }, []);

  return (
    <div>
      {users.length ? (
        users.map((user, i) => <div key={i}>{user.name}</div>)
      ) : (
        <p>Loading....</p>
      )}
    </div>
  );
};

// Index.getInitialProps = async () => {
//   const response = await fetch('http://localhost:3000/api/graphql', {
//     method: 'POST',
//     headers: {
//       'Content-type': 'application/json',
//     },
//     body: JSON.stringify({query: '{ users { name } }'}),
//   });

//   const {
//     data: {users},
//   } = await response.json();

//   return {users};
// };

export default Index;
