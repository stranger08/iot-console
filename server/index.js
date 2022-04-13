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

// domain specific routers
const { usersRoutes} = require('./users');
const { groupsRoutes } = require('./groups');
const { devicesRoutes } = require('./devices');
const { controlRoutes } = require('./control');
const { controlsRoutes } = require('./controls');
const { projectsRoutes } = require('./projects');

app.use('/users', passport.authenticate('auth', {session: false}), usersRoutes);
app.use('/groups', passport.authenticate('auth', {session: false}), groupsRoutes);
app.use('/devices', passport.authenticate('auth', {session: false}), devicesRoutes);
app.use('/projects', passport.authenticate('auth', {session: false}), projectsRoutes);
app.use('/control', controlRoutes);// TODO api key authentication strategy
app.use('/controls', passport.authenticate('auth', {session: false}), controlsRoutes);

// TODO:
// authenticate can accept custom callback if we want to get exact reason as to why jwt verify failed, for example if we are up to 
// distinguish between jwt token expired, jwt token not provided, jwt token invalid, jwt token something else
// const x = (req, res, next) => {
//     passport.authenticate('auth', {session: false}, (err, user, info) => { console.log(err, user, info); if (user) next() })(req, res, next);
//  }
app.use(require('serve-static')(__dirname + './../dist'));

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./docs/device-bridge-swagger.json');
app.use('/api-docs/device-bridge', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Example app listening at http://localhost:${PORT}`)
});
