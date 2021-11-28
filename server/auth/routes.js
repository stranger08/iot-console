const token = require('./token');

const login = (req, res) => {
    res.status(200).json({
        'token': token.sign(req.user)
    });
};

module.exports = {
    login
}