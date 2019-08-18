import {useState} from 'react';
import {useApolloClient, useMutation} from 'react-apollo';
import {gql} from 'apollo-boost';
// import jwt from 'jsonwebtoken';
import cookie from 'cookie';
import Link from 'next/link';
import redirect from '../lib/redirect';
import AuthInStyles from '../components/authInStyles';
import Layout from '../components/layout';

const SIGN_IN_MUTATION = gql`
  mutation signIn($email: String!, $password: String!) {
    signIn(email: $email, password: $password) {
      _id
      name
      points
      token
    }
  }
`;

const LoginPage = ({id, title}) => {
  const client = useApolloClient();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [signIn] = useMutation(SIGN_IN_MUTATION, {
    onCompleted({signIn}) {
      document.cookie = cookie.serialize('token', signIn.token, {
        path: '/',
        maxAge: 30 * 24 * 60 * 60,
      });
      client.writeData({data: {isLoggedIn: true}});
    },
  });

  const handleSubmit = () => {
    signIn({variables: {email, password}}).then(({data}) => {
      // console.log(data.signIn);
      redirect({}, `/profile/${data.signIn._id}`);
    });
  };

  return (
    <>
      <Layout title={title}>
        <div className="container">
          <div className="form-panel">
            <div className="welcome">
              <p>
                Welcome to Trawis Connect!
                <br />
                Please Log In
              </p>
            </div>
            <div className="form">
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
              <button onClick={handleSubmit}>Sign In</button>
            </div>
            <div className="footer-stuff">
              <p>
                <span>Don't Have an Account?</span>&nbsp;&nbsp;&nbsp;
                <Link href="/register">Register Here</Link>
              </p>
              <p className="styled-or">
                <span className="line" />
                <span>&nbsp;&nbsp;OR&nbsp;&nbsp;</span>
                <span className="line" />
              </p>
              <p>Sign In with Social Media</p>
            </div>
          </div>
          <div className="show-panel">
            <div className="show-content">
              <img
                className="show-logo"
                src="/static/tconnect.svg"
                alt="trawis connect logo"
              />
              <p>When Destiny calls you for an Adventure</p>
              {/* <img src="/static/baseline-play_circle.svg" alt="play button"/>*/}
            </div>
          </div>
        </div>
        <AuthInStyles />
      </Layout>
    </>
  );
};

LoginPage.getInitialProps = ({req}) => {
  // console.log('Prepare ..............', req.headers.cookie);
  // let id = jwt.verify(req.headers.cookie, 'secret');
  // console.log(id);
  return {title: 'Sign In'};
};

export default LoginPage;
