import {useState} from 'react';
import {useMutation} from 'react-apollo';
import {gql} from 'apollo-boost';
import AuthInStyles from '../components/authInStyles';
import Layout from '../components/layout';

const CREATE_USER_MUTATION = gql`
  mutation createUser($name: String!, $email: String!, $password: String!) {
    createUser(input: {name: $name, email: $email, password: $password}) {
      _id
      name
      points
    }
  }
`;

const RegisterPage = ({title}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [createUser, {data}] = useMutation(CREATE_USER_MUTATION);

  const handleSubmit = async () => {
    createUser({variables: {name, email, password}});
    // console.log(data);
    alert('User Registered');
    setName('');
    setEmail('');
    setPassword('');
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
                Create an Account
              </p>
            </div>
            <div className="form">
              <input
                placeholder="Name"
                value={name}
                onChange={e => setName(e.target.value)}
              />
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
              <button onClick={handleSubmit}>Sign Up</button>
            </div>
            <div className="footer-stuff">
              <p>
                <span>Already Have an Account?</span>&nbsp;&nbsp;&nbsp;
                <a href="#">Sign in Here</a>
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

RegisterPage.getInitialProps = () => {
  return {title: 'Sign Up'};
};

export default RegisterPage;
