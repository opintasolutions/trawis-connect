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
      <div style={{display: 'flex', alignItems: 'center'}}>
        <Link href="/">
          <img src="/static/tconnect.svg" alt="logo" width="100" />
        </Link>
        <li>
          <a onClick={() => redirect({}, '/users')}>Users</a>
        </li>
        <li>
          <a onClick={() => redirect({}, '/contact')}>Contact</a>
        </li>
        <li>
          <a onClick={() => redirect({}, '/about')}>About</a>
        </li>
      </div>
      <div>
        {data ? (
          data.isLoggedIn ? (
            <>
              <a onClick={() => redirect({}, `/profile/${data.me._id}`)}>
                <button>{data ? data.me.name.split(' ')[0] : ''}</button>
              </a>
              <a
                onClick={() => {
                  document.cookie = cookie.serialize('token', '', {
                    path: '/',
                    maxAge: -1,
                  });
                  client.writeData({data: {isLoggedIn: false}});
                  redirect({}, '/login');
                }}>
                <button>Sign Out</button>
              </a>
            </>
          ) : (
            <>
              <Link href="/register">
                <button>
                  <a>Sign Up</a>
                </button>
              </Link>
              <Link href="/login">
                <button>
                  <a>Sign In</a>
                </button>
              </Link>
            </>
          )
        ) : (
          <>
            <li>Waiting ... </li>
          </>
        )}
      </div>
      <style jsx>{`
        .nav {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 8px;
          background: #264172;
          border-bottom: 1px solid rgba(255, 255, 255, 0.3);
          overflow: auto;
        }
        .nav div {
          display: flex;
        }
        li {
          list-style: none;
          font-size: 15px;
          margin: 0 6px;
        }
        button {
          width: 90px;
          background: transparent;
          border: 1px solid rgba(255, 255, 255, 0.3);
          border-radius: 3px;
          color: white;
        }
        img {
          margin: 10px 20px;
          cursor: pointer;
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
