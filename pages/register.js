import Layout from '../components/layout';
import {useState, useEffect} from 'react';

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const query = `
    mutation {
      createUser(input: {name: "${name}", email: "${email}", password: "${password}"}){
        _id
        name
        points
    }
  }
`;
  const handleSubmit = () => {
    // useEffect(() => {
    fetch(`api/graphql`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({query}),
    })
      .then(res => {
        console.log(res);
        return res.json();
      })
      .then(json => {
        const {data} = json;
        console.log(data);
        alert('User Registered');
        setName('');
        setEmail('');
        setPassword('');
      })
      .catch(err => console.log(err));
    // }, [])
  };

  return (
    <Layout title="Sign Up">
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
      <style jsx>{`
        .container {
          width: 100%;
          height: 100vh;
          display: flex;
          justify-content: space-evenly;
        }
        .welcome {
          font-size: 20px;
          text-align: left;
          margin: 30px;
        }
        .form-panel {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          width: 100%;
          height: 100%;
        }
        .form {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }
        .form-panel input {
          width: 280px;
          margin: 12px;
          padding: 10px;
          border: 1px solid #e9e9e9;
          border-radius: 3px;
          font-size: 14px;
        }
        .form-panel button {
          width: 300px;
          margin: 15px;
          font-size: 14px;
          background: #264172;
          border: none;
          color: white;
          padding: 10px;
          border-radius: 4px;
          cursor: pointer;
          box-shadow: 0px 23px 24px rgba(0, 0, 0, 0.08);
        }
        .form-panel p {
          width: 300px;
          color: #494949;
          line-height: 1.5;
          margin: 0;
        }
        .footer-stuff p {
          font-size: 13px;
          text-align: center;
          margin: 13px;
          color: #696969;
        }
        .styled-or {
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .line {
          border-bottom: 1px solid #696969;
          width: 100%;
        }
        .show-panel {
          display: flex;
          flex-direction: column;
          text-align: center;
          justify-content: center;
          background-image: linear-gradient(
              to bottom,
              rgba(38, 65, 114, 0.78),
              rgba(38, 65, 114, 1)
            ),
            url(/static/austin-ban-986-unsplash.png);
          background-position: center;
          background-repeat: no-repeat;
          background-size: cover;
          width: 100%;
          height: 100%;
        }
        .show-panel p {
          color: rgba(255, 255, 255, 0.7);
          font-size: 14px;
        }
        .show-logo {
          width: 300px;
        }
        @media (max-width: 700px) {
          .show-logo {
            width: 180px;
            padding: 20px 20px 0 20px;
          }
          .container {
            flex-direction: column-reverse;
            flex-wrap: wrap;
            height: 100%;
          }
        }
      `}</style>
    </Layout>
  );
};

export default RegisterPage;
