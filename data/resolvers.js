// import User from './models';
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
let User;
try {
  User = mongoose.model('User');
} catch {
  User = require('./models');
}

// Actual shit
const resolvers = {
  Query: {
    users(parent, args, context) {
      return User.find();
    },
  },
  User: {
    followers(user) {
      let grabUser = User.find({following: user._id});
      return grabUser;
    },
    following(user) {
      let grabUser = User.find({followers: user._id});
      return grabUser;
    },
  },
  Mutation: {
    createUser(_, {input}) {
      let points = 100;
      let password = bcrypt.hashSync(input.password, 10);
      let newUser = {...input, password, points};
      const user = new User(newUser);
      return user
        .save()
        .then(res => {
          return res;
        })
        .catch(err => {
          console.log(err);
        });
    },
    follow(_, {follower_id, followed_id}) {
      let follower = User.findByIdAndUpdate(follower_id, {
        $push: {following: followed_id},
      });
      let following = User.findByIdAndUpdate(followed_id, {
        $push: {followers: follower_id},
      });
      return [follower, following];
    },
    deleteUser(_, {_id}) {
      return User.findByIdAndRemove(_id);
    },
  },
};

module.exports = resolvers;

// // mock users
// let localUsers = [
//   {
//     _id: '0.4676257260981891',
//     name: 'Jack',
//     email: 'Jack@jonasmail.com',
//     password: 'lakjdslkfncleiotoienkoj#32ki__lkjlaw',
//     followers: ['0.8496188087748118', '0.7472067585053888'],
//     following: [],
//     points: 100,
//   },
//   {
//     _id: '0.8496188087748118',
//     name: 'Jill',
//     email: 'Jill@jonasmail.com',
//     password: 'dkeie3ks12lkdng39qlkenkoj#32ki__l58dkxw',
//     followers: [],
//     following: ['0.4676257260981891'],
//     points: 100,
//   },
//   {
//     _id: '0.7472067585053888',
//     name: 'Janet',
//     email: 'Janet@jonasmail.com',
//     password: 'falncorjnw_wlne2nlfkrnews',
//     followers: [],
//     following: ['0.4676257260981891'],
//     points: 100,
//   },
// ];

// const resolvers = {
//   Query: {
//     users(parent, args, context) {
//       return localUsers;
//     },
//   },
//   User: {
//     followers(user) {
//       let grabUser = localUsers.filter(u => u._id === user._id)[0];
//       let followersOfGrab = grabUser.followers.map(id => {
//         return localUsers.filter(u => u._id === id)[0];
//       });
//       return followersOfGrab;
//     },
//     following(user) {
//       let grabUser = localUsers.filter(u => u._id === user._id)[0];
//       let followedByGrab = grabUser.following.map(id => {
//         return localUsers.filter(u => u._id === id)[0];
//       });
//       return followedByGrab;
//     },
//   },
//   Mutation: {
//     createUser(_, {input}) {
//       // let _id = Math.random().toString();
//       let points = 100;
//       let newUser = {...input, points};
//       // localUsers = [...localUsers, newUser];
//       const user = new User(newUser);
//       return user
//         .save()
//         .then(res => {
//           return {...res._doc, _id: res._doc._id.toString()};
//         })
//         .catch(err => {
//           console.log(err);
//           // throw err;
//         });
//     },
//     follow(_, {follower_id, followed_id}) {
//       let follower = localUsers.filter(user => user._id === follower_id)[0];
//       let followed = localUsers.filter(user => user._id === followed_id)[0];
//       follower = {
//         ...follower,
//         following: [...follower.following, followed._id],
//       };
//       followed = {
//         ...followed,
//         followers: [...followed.followers, follower._id],
//       };
//       let restOfUsers = localUsers.filter(
//         user => user._id !== follower._id && user._id !== followed._id,
//       );
//       localUsers = [...restOfUsers, follower, followed];
//       return follower;
//     },
//   },
// };

// module.exports = resolvers;
