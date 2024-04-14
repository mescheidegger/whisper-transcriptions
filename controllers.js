const transcribeAudio = require('./services');

exports.processAudio = async (req, res) => {
    if (req.file) {
        console.log('Received file: ' + req.file.filename);
        // Call the transcription service with the path to the saved file
        try {
            const transcriptionResult = await transcribeAudio(req.file.path);
            if (transcriptionResult) {
                res.json({message: 'File uploaded and transcribed successfully.', transcription: transcriptionResult});
            } else {
                res.status(500).send('Transcription failed');
            }
        } catch (error) {
            console.error('Error during transcription:', error);
            res.status(500).send('Error processing transcription');
        }
    } else {
        res.status(400).send('No file uploaded.');
    }
};
