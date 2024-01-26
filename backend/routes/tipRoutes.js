const express = require('express');
const router = express.Router();
const poemController = require('../controllers/tipController');

router.get('/', poemController.tips_index);  

module.exports = router; 