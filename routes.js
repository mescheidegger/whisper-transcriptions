const express = require('express');
const transcriptionController = require('./controllers');
const limiter = require('./rateLimit');
const upload = require('./multer');
const router = express.Router();

router.post('/upload-audio', limiter, upload.single('audioFile'), transcriptionController.processAudio); 

module.exports = router;
