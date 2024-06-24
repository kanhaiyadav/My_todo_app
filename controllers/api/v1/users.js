const User = require('../../../model/users_model.js');
const jwt = require('jsonwebtoken');
const env = require('../../../config/environment');

module.exports.createSession = async (req, res) => {
    try {
        let user = await User.findOne({ email: req.body.email });
        if (!user || user.password != req.body.password) {
            return res.status(422).json({
                message: "Invalid username or password"
            });
        }
        return res.json(200, {
            message: "Sign in successful, here is your token keep it safe",
            data: {
                token: jwt.sign(user.toJSON(), env.jwt_secret, { expiresIn: '6000000' })
            }
        })
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            message: "Internal Server Error"
        });
    }
};