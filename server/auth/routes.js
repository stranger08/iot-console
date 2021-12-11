const token = require('./token');
const { USERS } = require('./../users/');

const login = (req, res) => {
    res.status(200).json({
        'token': token.sign(req.user)
    });
};

const register = (req, res) => {

    const EMAIL = req.body.email;

    if (!EMAIL) {
        res.status(400).json({
            'error': "Username must be provided!"
        });
        return;
    }

    const EXISTING_USER = USERS.find(u => u.email == EMAIL);

    if (EXISTING_USER) {
        res.status(200).json({
            'status': 'USER_EXISTS'
        });
        return;
    }

    const USER = {
        ...req.body,
        role: 'User',
        registered: new Date(),
        status: "Active",
    }

    USERS.push(USER);

    res.status(200).json(USER);
}

module.exports = {
    login,
    register,
}