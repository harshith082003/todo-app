const Task = require('../models/task');


const newTask = async(req, res, next) => {

    const { title, description } = req.body;

    const task = await Task.create({
        title,
        description,
        user: req.user,
    })

    res.status(201).json({
        success: true,
        message: "Task created successfully",
    });
}

const getAllTasks = async(req, res) => {

    const userId = req.user;

    const tasks = await Task.find({ user: userId });

    res.status(201).json({
        success: true,
        tasks,
    });
}

const updateTask = async(req, res) => {

    const task = await Task.findById(req.params.id);

    task.isCompleted = !task.isCompleted;
    await task.save();

    res.status(200).json({
        success: true,
        message: "Task updated"
    });
}

const deleteTask = async(req, res) => {

    const task = await Task.findById(req.params.id);

    await task.deleteOne();

    res.status(200).json({
        success: true,
        message: "Task deleted"
    });
}

module.exports = { newTask, getAllTasks, updateTask, deleteTask }