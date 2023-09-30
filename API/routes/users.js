const express = require('express');
const { getAllUsers, getUserById, createNewUser, loginUser, logoutUser } = require('../controllers/users');
const isAuthenticated = require('../middleware/auth');

const router = express.Router();


router.get('/all', getAllUsers);
router.get('/logout', logoutUser);

router.get('/me', isAuthenticated, getUserById);

router.post('/new', createNewUser);
router.post('/login', loginUser);

module.exports = router;