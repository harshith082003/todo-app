const User = require('../models/user')
const bcrypt = require('bcrypt');
const sendCookie = require('../utils/features');
const jwt = require('jsonwebtoken');

const getAllUsers  = async (req, res) => {
    const users = await User.find({});

    res.json({
        success: true,
        users,
    });
}

const getUserById = (req, res) => {
    res
        .status(200)
        .json({
            success: true,
            user: req.user,
        })
}

const createNewUser = async (req, res) => {

    const { name, email, password } = req.body;

    const user = await User.findOne({ email });

    if(user) 
        return res.status(404).json({
            success: false,
            message: "User already exists"
        });
    
    const hashedPwd = await bcrypt.hash(password, 10);

    const newUser = await User.create({
        name,
        email,
        password: hashedPwd,
    });

    sendCookie(newUser, res, "Registered successfully", 201);
    
}

const loginUser = async (req, res, next) => {

    const { email, password } = req.body;
    const user = await User.findOne({ email }).select('+password');

    if(!user) 
        return res.status(404).json({
            success: false,
            message: "Invalid email or password"
        });

    const isMatch = await bcrypt.compare(password, user.password);

    if(!isMatch)
        return res.status(404).json({
            success: false,
            message: "Invalid email or password"
        });

        sendCookie(user, res, `Welcome back, ${user.name}`, 200);

}

const logoutUser = async(req, res) => {

    res
        .status(200)
        .cookie("token", "", { expires: new Date(Date.now()) })
        .json({
            success: true,
            message: "User logged out"
        })
}

module.exports = { getAllUsers, getUserById, createNewUser, loginUser, logoutUser };