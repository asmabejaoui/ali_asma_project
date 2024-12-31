const express = require('express');
const { registerUser, loginUser } = require('../controllers/userController');
const router = express.Router();

router.post('/register', registerUser); // Crée un utilisateur
router.post('/login', loginUser); // Connecte un utilisateur

module.exports = router;
