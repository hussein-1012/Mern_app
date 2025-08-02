const express = require('express');
const router = express.Router();
const { Register } = require('../Controllers/userController');
const { login } = require('../Controllers/userController'); // Assuming login is in the same controller
// Route to register a new user
router.route('/').post(Register);
router.route('/login').post(login); // Assuming login uses the same controller for now

module.exports = router;