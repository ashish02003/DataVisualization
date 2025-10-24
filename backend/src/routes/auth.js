// backend/routes/auth.js
const express = require('express');
const router = express.Router();
const { signup, signin, getMe } = require('../controllers/authControllers');
const { protect } = require('../middleware/auth');

router.post('/signup', signup);
router.post('/signin', signin);
router.get('/me', protect, getMe);

module.exports = router;
