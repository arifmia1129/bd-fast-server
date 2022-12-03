const bcrypt = require('bcryptjs');
const User = require('../models/user.model');
const salt = bcrypt.genSaltSync(10);
const config = require("../config/config");
const jwt = require("jsonwebtoken");

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

            try {
                const user = new User(req.body);

                await user.save();

                const { pin, confirmPin, ...other } = req.body;

                res.status(201).json({
                    success: true,
                    message: "Successfully created user",
                    user: other
                })
            } catch (error) {
                res.status(400).json({
                    success: false,
                    message: "Something wrong",
                    error: error.message
                })
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Something broken"
        })
    }
}


exports.loginUser = async (req, res) => {
    try {
        const { mobile, pin } = req.body;

        if (!mobile || !pin) {
            return res.status(400).json({
                success: false,
                message: "Mobile and Pin must be provide"
            })
        }

        const user = await User.findOne({ mobile });

        if (!user) {
            return res.status(400).json({
                success: false,
                message: "User not found"
            })
        }

        bcrypt.compare(pin, user.pin, function (err, result) {
            if (err) {
                return res.status(500).json({
                    success: false,
                    message: "Something broken"
                })
            }

            if (!result) {
                return res.status(400).json({
                    success: false,
                    message: "Mobile or Pin is not valid"
                })
            }

            const payload = {
                mobile,
                role: user.role
            }

            const token = jwt.sign(payload, config.key.jwt, {
                expiresIn: "1d"
            })

            const { pin, ...other } = user.toObject();

            res.status(201).json({
                success: true,
                message: "Successfully logged in user",
                user: {
                    user: other,
                    token
                }
            })
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Something broken"
        })
    }
}