const passport = require('passport');
const ExtractJwt = require('passport-jwt').ExtractJwt;
const JwtStrategy = require('passport-jwt').Strategy;
const LocalStrategy = require('passport-local').Strategy;

const { SECRET } = require('./token');
const { USERS } = require('./../users');

passport.use('login', new LocalStrategy(
  (username, password, done) => {
    
    const USER = USERS.find(u => u.email == username);

    if (!USER) {
      return done(null, false);
    }

    if (USER.password != password) {
      return done(null, false);
    }

    return done(null, {
      username
    });
  }
));

passport.use('auth', new JwtStrategy({
    secretOrKey: SECRET,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  },
    (payload, done) => {
      console.log(`Authorize ${payload.username} by jwt.`);
      return done(null, payload)
    }
  )
);

module.exports = passport;