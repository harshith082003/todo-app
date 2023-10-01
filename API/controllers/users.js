const User = require('../models/user');
const { ErrorHandler } = require('../middleware/error');
const bcrypt = require('bcrypt');
const sendCookie = require('../utils/features');
const jwt = require('jsonwebtoken');


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
    return next(new ErrorHandler("User already exists", 400));
    
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
        return next(new ErrorHandler("Invalid email or password", 400));

    const isMatch = await bcrypt.compare(password, user.password);

    if(!isMatch)
        return next(new ErrorHandler("Invalid email or password", 400));

    sendCookie(user, res, `Welcome back, ${user.name}`, 200);

}

const logoutUser = async(req, res) => {

    res
        .status(200)
        .cookie("token", "", { 
            expires: new Date(Date.now()) ,
            sameSite: process.env.NODE_ENV === "Development" ? "lax" : "none",
            secure: process.env.NODE_ENV === "Development" ? false : true,
        })
        .json({
            success: true,
            message: "User logged out"
        })
}

module.exports = { getUserById, createNewUser, loginUser, logoutUser };