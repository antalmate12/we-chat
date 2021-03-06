const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../models/user');
const config = require('./database');

module.exports = (passport) => {
  let options = {
    jwtFromRequest: ExtractJwt.fromAuthHeader(),
    secretOrKey: config.secret
  };

  passport.use(new JwtStrategy(options, (jwt_payload, done) => {
    User.getUserById(jwt_payload.id, (err, user) => {
      if (err) {
        return done(err, false);
      }

      if (user) {
        let signData = {
          id: user._id,
          username: user.username
        }
		//console.log(signData);
        return done(null, signData);
      } else {
        return done(null, false);
      }
    });
  }));
}
