const ramda = require('ramda');
const token = require('./token');
const { usersService } = require('./../users/');

const login = (req, res) => {
    res.status(200).json({
        'token': token.sign(req.user)
    });
};

const register = async (req, res) => {

    const EMAIL = ramda.path(['body', 'email'], req);

    if (!EMAIL) {
        res.status(400).json({
            'error': "Username must be provided!"
        });
        return;
    }

    const EXISTING_USER = await usersService.findByEmail(EMAIL);

    if (EXISTING_USER) {
        res.status(200).json({
            'status': 'USER_EXISTS'
        });
        return;
    }

    const USER = await usersService.create(req.body);

    res.status(200).json(USER);
}

module.exports = {
    login,
    register,
}