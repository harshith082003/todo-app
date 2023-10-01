const express = require('express');
const { getUserById, createNewUser, loginUser, logoutUser } = require('../controllers/users');
const isAuthenticated = require('../middleware/auth');

const router = express.Router();


router.get('/logout', logoutUser);

router.get('/me', isAuthenticated, getUserById);

router.post('/new', createNewUser);
router.post('/login', loginUser);

module.exports = router;