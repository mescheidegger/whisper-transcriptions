const transcriptionService = require('./services');

exports.processAudio = (req, res) => {
    if (req.file) {
      console.log('Received file: ' + req.file.filename);
      res.send('File uploaded and saved.');
    } else {
      res.status(400).send('No file uploaded.');
    }
  };
  