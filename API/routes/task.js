const express = require('express');
const { newTask, getAllTasks, updateTask, deleteTask } = require('../controllers/task');
const isAuthenticated = require('../middleware/auth');

const router = express.Router();

router.get('/all', isAuthenticated, getAllTasks);
router.post('/new', isAuthenticated, newTask);

router
    .route('/:id')
    .put(isAuthenticated, updateTask)
    .delete(isAuthenticated, deleteTask);

module.exports = router;