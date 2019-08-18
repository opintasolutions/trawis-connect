import Link from 'next/link';
import cookie from 'cookie';
import Router from 'next/router';
import redirect from '../lib/redirect';
import {useQuery, useApolloClient} from 'react-apollo';
import {gql} from 'apollo-boost';

const GET_USER = gql`
  query {
    me {
      _id
      name
    }
    isLoggedIn @client
  }
`;

const Nav = () => {
  const {data} = useQuery(GET_USER);
  const client = useApolloClient();
  console.log(data && data.isLoggedIn);
  return (
    <div className="nav">
      <div>
        <li>
          <a onClick={() => Router.push('/')}>Home</a>
        </li>
        <li>
          <a onClick={() => redirect({}, '/users')}>Users</a>
        </li>
      </div>
      <div>
        {data ? (
          data.isLoggedIn ? (
            <>
              <li>
                <a onClick={() => redirect({}, `/profile/${data.me._id}`)}>
                  {data ? data.me.name.split(' ')[0] : ''}
                </a>
              </li>
              <li>
                <a
                  onClick={() => {
                    document.cookie = cookie.serialize('token', '', {
                      path: '/',
                      maxAge: -1,
                    });
                    client.writeData({data: {isLoggedIn: false}});
                    redirect({}, '/login');
                  }}>
                  Sign Out
                </a>
              </li>
            </>
          ) : (
            <>
              <li>
                <a onClick={() => redirect({}, '/register')}>Sign Up</a>
              </li>
              <li>
                <a onClick={() => redirect({}, '/login')}>Sign In</a>
              </li>
            </>
          )
        ) : (
          <>
            <li>
              <a onClick={() => redirect({}, '/register')}>Sign Up</a>
            </li>
            <li>
              <a onClick={() => redirect({}, '/login')}>Sign In</a>
            </li>
          </>
        )}
      </div>
      <style jsx>{`
        .nav {
          display: flex;
          justify-content: space-between;
          padding: 8px;
          background: #19305a;
        }
        .nav div {
          display: flex;
        }
        li {
          list-style: none;
          font-size: 15px;
          margin: 0 10px;
        }
        .nav a {
          text-decoration: none;
          color: white;
          cursor: pointer;
        }
      `}</style>
    </div>
  );
};
export default Nav;
