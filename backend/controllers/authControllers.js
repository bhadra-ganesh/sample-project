const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user_model');
const { userValidator,loginValidator } = require('../validators/body_validators');
const { default: mongoose } = require('mongoose');

exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const secretKey = process.env.JWT_SECRET_KEY;
        const { error, value } = loginValidator({  email, password });
        if (error) {
            return res.status(400).json({
                status: "error",
                message: error.details[0].message
            });
        }
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        console.log('User', user);
        const isMatched = await bcrypt.compare(password, user.password);
        console.log(isMatched);

        if (isMatched) {
            const token = jwt.sign(
                { id: user._id, username: user.username },
                secretKey,
                { expiresIn: '1h' }
            );
            //console.log('Generated token:', token);
            res.cookie('jwt_token', token, {
                httpOnly: true,   
                secure: true,     
                sameSite: 'Strict'
              });
            return res.status(200).json({
                message: 'Successfully logged in',
                // jwt_token: token
            });
        } else {
            return res.status(401).json({ message: 'Invalid email or password' });
        }
    } catch (error) {
        console.error('Login error:', error); 
        return res.status(500).json({
            message: 'Error logging in',
            error
        });
    }
};

exports.create_user = async (req, res) => {
    try {
        const { username, email, password, status } = req.body;
        const userData={
            username, email, password, status
        }
        const { error, value } = userValidator({ username, email, password, status });
        if (error) {
            return res.status(400).json({
                status: "error",
                message: error.details[0].message
            });
        }
        // const user = new User({ username, email, password, status });
        // await user.save();
        const user=User.create(value);
        // await User.insertOne(value);
        // await User.save();
        res.status(201).json({
            status: "success",
            data: userData,
            message: "User registered successfully",
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: "error",
            message: "Error registering user",
            error
        });
    }
}