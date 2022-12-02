const bcrypt = require('bcryptjs');
const User = require('../models/user.model');
const salt = bcrypt.genSaltSync(10);

exports.registerUser = async (req, res) => {
    try {
        bcrypt.hash(req.body.pin, salt, async (err, hash) => {
            if (err) {
                return res.status(500).json({
                    success: false,
                    message: "Something broken"
                })
            }
            req.body.pin = hash;
            req.body.confirmPin = undefined;

            // const user = new User(req.body);

            // await user.save();

            const { pin, confirmPin, ...other } = req.body;

            res.status(201).json({
                success: true,
                message: "Successfully created user",
                user: other
            })
        });
    } catch (error) {

    }
}