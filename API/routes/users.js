const express = require('express');
const { getAllUsers, getUserById, createNewUser } = require('../controllers/users');

const router = express.Router();


router.get('/all', getAllUsers);

router.get('/:id', getUserById);

router.post('/new', createNewUser);

module.exports = router;