const express = require('express');
const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.json());

const cors = require('cors');
app.use(cors({
    origin:true
}));

const passport = require('./auth');
app.use(passport.initialize());

// application specific routes
const { login, register } = require('./auth/routes');
app.post('/login', passport.authenticate('login', {session: false}), login);
app.post('/register', register);

// domain specific router
app.use('/devices', passport.authenticate('auth', {session: false}), require('./devices'));


// TODO:
// authenticate can accept custom callback if we want to get exact reason as to why jwt verify failed, for example if we are up to 
// distinguish between jwt token expired, jwt token not provided, jwt token invalid, jwt token something else
// const x = (req, res, next) => {
//     passport.authenticate('auth', {session: false}, (err, user, info) => { console.log(err, user, info); if (user) next() })(req, res, next);
//  }
app.use(require('serve-static')(__dirname + './../dist'));

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Example app listening at http://localhost:${PORT}`)
});