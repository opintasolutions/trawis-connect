// import User from './models';
const jwt = require('jsonwebtoken');
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
    users() {
      return User.find();
    },
    user(_, {id}) {
      return User.findById(id);
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
    createUser: async function(_, {input}) {
      try {
        let existingUser = await User.findOne({email: input.email});
        if (existingUser) throw new Error('User already exists!');
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
      } catch (err) {
        throw err;
      }
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
    signIn: async function(_, {email, password}, ctx) {
      try {
        let user = await User.findOne({email: email});
        if (!user) throw new Error('email does not exist');
        let isValid = await bcrypt.compareSync(password, user.password);
        if (!isValid) throw new Error('incorrect password');
        const token = jwt.sign({id: user._id}, 'secret');
        console.log('im called', token);
        return {token, ...user._doc};
      } catch (err) {
        throw err;
      }
    },
  },
};

module.exports = resolvers;

// // mock users
// let localusers = [
//   {
//     _id: '0.4676257260981891',
//     name: 'jack',
//     email: 'jack@jonasmail.com',
//     password: 'lakjdslkfncleiotoienkoj#32ki__lkjlaw',
//     followers: ['0.8496188087748118', '0.7472067585053888'],
//     following: [],
//     points: 100,
//   },
//   {
//     _id: '0.8496188087748118',
//     name: 'jill',
//     email: 'jill@jonasmail.com',
//     password: 'dkeie3ks12lkdng39qlkenkoj#32ki__l58dkxw',
//     followers: [],
//     following: ['0.4676257260981891'],
//     points: 100,
//   },
//   {
//     _id: '0.7472067585053888',
//     name: 'janet',
//     email: 'janet@jonasmail.com',
//     password: 'falncorjnw_wlne2nlfkrnews',
//     followers: [],
//     following: ['0.4676257260981891'],
//     points: 100,
//   },
// ];

// const resolvers = {
//   query: {
//     users(parent, args, context) {
//       return localusers;
//     },
//   },
//   user: {
//     followers(user) {
//       let grabuser = localusers.filter(u => u._id === user._id)[0];
//       let followersofgrab = grabuser.followers.map(id => {
//         return localusers.filter(u => u._id === id)[0];
//       });
//       return followersofgrab;
//     },
//     following(user) {
//       let grabuser = localusers.filter(u => u._id === user._id)[0];
//       let followedbygrab = grabuser.following.map(id => {
//         return localusers.filter(u => u._id === id)[0];
//       });
//       return followedbygrab;
//     },
//   },
//   mutation: {
//     createuser(_, {input}) {
//       // let _id = math.random().tostring();
//       let points = 100;
//       let newuser = {...input, points};
//       // localusers = [...localusers, newuser];
//       const user = new user(newuser);
//       return user
//         .save()
//         .then(res => {
//           return {...res._doc, _id: res._doc._id.tostring()};
//         })
//         .catch(err => {
//           console.log(err);
//           // throw err;
//         });
//     },
//     follow(_, {follower_id, followed_id}) {
//       let follower = localusers.filter(user => user._id === follower_id)[0];
//       let followed = localusers.filter(user => user._id === followed_id)[0];
//       follower = {
//         ...follower,
//         following: [...follower.following, followed._id],
//       };
//       followed = {
//         ...followed,
//         followers: [...followed.followers, follower._id],
//       };
//       let restofusers = localusers.filter(
//         user => user._id !== follower._id && user._id !== followed._id,
//       );
//       localusers = [...restofusers, follower, followed];
//       return follower;
//     },
//   },
// };

// module.exports = resolvers;
