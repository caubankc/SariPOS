const User = require('../models/userModel')

const login = async (req, res) => {
    try {

        const { userId, password } = req.body;
        const user = await User.findOne({ userId, password });
        if (user) {
            res.status(200).send(user);
        } else {
            res.json({
                message: "Login failed.",
                user,
            });
        }

    } catch (error) {
        console.log(error);
    }
}

const register = async (req, res) => {

    try {

        const newUser = new User({ ...req.body, verified: true });
        await newUser.save();
        res.status(200).send("Registration successful.");

    } catch (error) {
        console.log(error);
    }

}

module.exports = {
    login,
    register
}