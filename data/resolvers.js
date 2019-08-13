const jwt = require('jsonwebtoken');
const cookie = require('cookie');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const fetch = require('isomorphic-unfetch');
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
    me(_, __, {req}) {
      if (req.headers.cookie) {
        let token = cookie.parse(req.headers.cookie).token;
        let user_id = jwt.verify(token, 'secret').id;
        console.log(user_id);
        return User.findById(user_id);
      } else {
        return null;
      }
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
