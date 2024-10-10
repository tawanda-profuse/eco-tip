const express = require('express');
const router = express.Router();
const tipsController = require('../controllers/tipController');

router.get('/', tipsController.tips_index);  

module.exports = router; 