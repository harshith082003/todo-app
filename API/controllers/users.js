const User = require('../models/user')


const getAllUsers  = async (req, res) => {
    const users = await User.find({});

    res.json({
        success: true,
        users,
    });
}

const getUserById = async (req, res) => {
    const { id } = req.params;
    const user = await User.findById(id);

    res.json({
        success: true,
        user,
    });
}

const createNewUser = async (req, res) => {

    const { name, email, password } = req.body;

    await User.create({
        name,
        email,
        password,
    });

    res.status(201).json({
        success: true,
        message: "Registered successfully",
    });
}

module.exports = { getAllUsers, getUserById, createNewUser };