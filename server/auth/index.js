const ramda = require('ramda');
const passport = require('passport');
const ExtractJwt = require('passport-jwt').ExtractJwt;
const JwtStrategy = require('passport-jwt').Strategy;
const LocalStrategy = require('passport-local').Strategy;

const { SECRET } = require('./token');
const { usersService } = require('./../users');

passport.use('login', new LocalStrategy(
  async (username, password, done) => {
    
    const USER = await usersService.findByEmail(username);

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
    async (payload, done) => {
      console.log(`Authorize ${payload.username} by jwt.`);
      const USER_NAME = ramda.path(['username'], payload);
      const USER_ENTITY = await usersService.findByEmail(USER_NAME);
      const USER_ID = ramda.path(['id'], USER_ENTITY);
      const USER_CONTEXT = {
        id: USER_ID,
        ...payload,
      };
      return done(null, USER_CONTEXT);
    }
  )
);

module.exports = passport;