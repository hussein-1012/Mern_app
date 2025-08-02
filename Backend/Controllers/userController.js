const asyncHandler = require('express-async-handler');
const User = require('../models/UserModel');
const generateToken = require('../config/generateToken');
const { dataListAnatomy } = require('@chakra-ui/react/anatomy');

const Register = asyncHandler(async (req,res)=> {
    const { name, email, password, avatar} = req.body;
    if (!name || !email || !password) {
        res.status(400);
        throw new Error('Please enter all the fields');
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        res.status(400);
        throw new Error('User already exists');
    }
    const newUser = await User.create({
        name, 
        email,
        password, 
        avatar
    });
    newUser.save();
    if(newUser) {
        res.status(201).json({
            _id: newUser._id,
            name: newUser.name,
            email: newUser.email,
            avatar: newUser.avatar,
            token: generateToken(newUser._id),
        });
    }else { res.status(400);
        throw new Error('Failed to create user');
    }
    

});

const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        res.status(400);
        throw new Error('Please enter all the fields');
    }

    const user = await User.findOne({ email });

    if (!user) {
        res.status(400);
        throw new Error('User does not exist');
    }

    const isPasswordMatched = await user.matchPassword(password);

    if (!isPasswordMatched) {
        res.status(400);
        throw new Error('Invalid credentials');
    }

    const token = generateToken({
        _id: user._id,
        name: user.name,
        email: user.email,
    });

    res.status(200).json({
        message: 'User Logged In Successfully',
        data: {
            token,
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                avatar: user.avatar,
            }
        }
    });
});


module.exports = {
    Register,
    login
};