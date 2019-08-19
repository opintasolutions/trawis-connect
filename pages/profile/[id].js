import {useQuery, useMutation} from 'react-apollo';
import {gql} from 'apollo-boost';
import redirect from '../../lib/redirect';
import Router from 'next/router';
import cookie from 'cookie';
import Layout from '../../components/layout';
import {useState, useEffect} from 'react';

const USER_PROFILE_QUERY = gql`
  query user($id: ID!) {
    user(id: $id) {
      name
      email
      bio
      followers {
        name
      }
      following {
        name
      }
      points
    }
    users {
      _id
      name
      email
    }
    me {
      _id
      name
      following {
        _id
      }
    }
  }
`;

const FOLLOW_MUTATION = gql`
  mutation follow($follower_id: ID!, $followed_id: ID!) {
    follow(follower_id: $follower_id, followed_id: $followed_id) {
      name
    }
  }
`;

const ProfilePage = ({user, title}) => {
  const [input, setInput] = useState('');
  const [select, setSelect] = useState(null);
  const [follower, setFollower] = useState(null);
  const [followed, setFollowed] = useState(null);

  const {data, loading, error} = useQuery(USER_PROFILE_QUERY, {
    variables: {id: user.id},
  });

  const [follow] = useMutation(FOLLOW_MUTATION);

  if (loading) {
    return <div> </div>;
  }
  if (error) {
    return <div>ERROR! {error.message}</div>;
  }

  const usersName = data.users.map(user => user.name);
  // console.log(usersName);

  const handleSelectChange = e => {
    setInput(e.target.value);
    console.log(e.target.value);
    if (usersName.indexOf(e.target.value) >= 0) {
      let index = usersName.indexOf(e.target.value);
      setSelect(data.users[index]._id);
    }
  };

  const handleFollow = () => {
    console.log(Router.router.query.id);
    console.log(data.me._id, Router.router.query.id);
    follow({
      variables: {
        follower_id: data.me._id,
        followed_id: Router.router.query.id,
      },
    })
      .then(({data}) => {
        alert(`${data.follow[0].name} is following ${data.follow[1].name}`);
        if (typeof location !== 'undefined') location.reload();
      })
      .catch(err => console.log(err));
  };

  return (
    <Layout title={title}>
      <div className="container">
        <img src="/static/placeholder.jpg" alt="profile picture" />
        <div className="profile-texts">
          <h1>{data.user.name}</h1> <br />
          <div className="info-wrapper">
            {data.user.email} <br />
            <div className="info">
              <span title={data.user.followers.map(f => f.name).join('\n')}>
                <b>{data.user.followers.length}</b>&nbsp; Followers
              </span>
              <span title={data.user.following.map(f => f.name).join('\n')}>
                <b>{data.user.following.length}</b>&nbsp; Following
              </span>
              <span>
                <b>{data.user.points}</b>&nbsp; Points
              </span>
            </div>
          </div>
        </div>
        {Router.router &&
        data.me._id !== Router.router.query.id &&
        !data.me.following.filter(u => u._id === Router.router.query.id)
          .length ? (
          <button className="follow-button" onClick={() => handleFollow()}>
            Follow
          </button>
        ) : null}
      </div>
      <input
        list="manyUsers"
        value={input}
        onChange={handleSelectChange}
        placeholder="username..."
      />
      <datalist id="manyUsers">
        {data.users.map(each => (
          <option key={each._id} value={each.name} />
        ))}
      </datalist>
      {typeof select !== 'null' ? (
        <a onClick={() => Router.push(`/profile/${select}`)}>{input}</a>
      ) : null}
      <style jsx>{`
        .container {
          display: flex;
          justify-content: flex-start;
          align-items: center;
        }
        .container img {
          width: 140px;
          height: 100%;
          padding: 20px;
        }
        .profile-texts {
          padding: 20px;
        }
        .profile-texts h1 {
          font-weight: normal;
          margin: 0;
        }
        .info {
          padding: 20px 0;
          display: flex;
          justify-content: flex-start;
        }
        .info span {
          margin: 0 30px 0 0;
          color: #555;
        }
        .info b {
          font-size: 18px;
          font-weight: normal;
          color: black;
        }
        input {
          padding: 10px;
          border-radius: 2px;
          border: 1px solid #ddd;
          margin: 40px;
        }
        a {
          cursor: pointer;
        }
        .follow-button {
          color: white;
          background: #264172;
          font-size: 15px;
        }
        @media (max-width: 700px) {
          .container {
            flex-wrap: wrap;
          }
        }
      `}</style>
    </Layout>
  );
};

ProfilePage.getInitialProps = ({req, query, apolloClient}) => {
  // console.log(apolloClient);
  if (req) {
    return {
      user: query,
      title: 'Profile',
      id: cookie.parse(req.headers.cookie || '').token,
    };
  }
  return {user: query, title: 'Profile'};
};

export default ProfilePage;
