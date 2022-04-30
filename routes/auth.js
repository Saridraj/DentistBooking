const express = require('express');
const {register, login, getMe, logout} = require('../controllers/auth');

const router = express.Router();

const {protect} = require('../middleware/auth');

router.post('/register', register);
router.post('/login', login);
router.get('/me', protect, getMe);//Not required
router.get('/logout',logout);//Not required

module.exports = router;