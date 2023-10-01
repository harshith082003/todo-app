const { ErrorHandler } = require('../middleware/error');
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

const updateTask = async(req, res, next) => {

    const task = await Task.findById(req.params.id);

    if(!task) return next(new ErrorHandler("Task does not exist", 404));
        
    task.isCompleted = !task.isCompleted;
    await task.save();

    res.status(200).json({
        success: true,
        message: "Task updated"
    });
}

const deleteTask = async(req, res, next) => {

    const task = await Task.findById(req.params.id);

    if(!task) return next(new ErrorHandler("Task not found", 404));

    await task.deleteOne();

    res.status(200).json({
        success: true,
        message: "Task deleted"
    });
}

module.exports = { newTask, getAllTasks, updateTask, deleteTask }