import Link from 'next/link';
import Router from 'next/router';
import redirect from '../lib/redirect';
import {useQuery} from 'react-apollo';
import {gql} from 'apollo-boost';

const GET_USER = gql`
  query {
    me {
      _id
      name
    }
  }
`;

const Nav = () => {
  const {data} = useQuery(GET_USER);
  console.log(data);
  return (
    <nav>
      <li>
        <a onClick={() => Router.push('/')}>Home</a>
      </li>
      {data && !data.me ? (
        <>
          <li>
            <a onClick={() => redirect({}, '/register')}>Sign Up</a>
          </li>
          <li>
            <a onClick={() => redirect({}, '/login')}>Sign In</a>
          </li>
        </>
      ) : (
        <li>
          <a onClick={() => redirect({}, `/profile/${data.me._id}`)}>{`${
            data ? data.me.name : ''
          }'s Profile`}</a>
        </li>
      )}
      <li>
        <a onClick={() => redirect({}, '/users')}>Users</a>
      </li>
      <style jsx>{`
        nav {
          display: flex;
          justify-content: flex-start;
          padding: 8px;
          background: #19305a;
        }
        li {
          list-style: none;
          font-size: 15px;
          margin: 0 10px;
        }
        nav a {
          text-decoration: none;
          color: white;
          cursor: pointer;
        }
      `}</style>
    </nav>
  );
};
export default Nav;
