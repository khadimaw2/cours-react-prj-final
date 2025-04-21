
const express = require('express');
const router = express.Router();
const authController = require('../Controllers/authController');

router.post('/signUp', authController.signUp);
router.post('/login', authController.login);
router.put('/updatePassword', authController.updatePassword);
router.delete('/deleteAccount', authController.deleteAccount);


module.exports = router;
