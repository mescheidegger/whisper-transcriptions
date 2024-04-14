require('dotenv').config();
const axios = require('axios').default;
const fs = require('fs');
const FormData = require('form-data'); 

const API_URL = process.env.API_URL;
const API_KEY = process.env.API_KEY;

const transcribeAudio = async (filePath) => {
    try {
        const fileStream = fs.createReadStream(filePath);
        const formData = new FormData();
        formData.append('file', fileStream);

        const response = await axios.post(`${API_URL}/transcribe`, formData, {
            headers: {
                ...formData.getHeaders(),
                'x-api-key': API_KEY
            }
        });

        if (response.status === 200) {
            console.log('Transcription successful:', response.data.transcription);
            // Optionally save transcription to a file
            fs.writeFileSync('./transcriptions/transcription.txt', response.data.transcription);
            return response.data.transcription;
        } else {
            console.error('Failed to transcribe audio. Status:', response.status);
            return null;
        }
    } catch (error) {
        console.error('Error during transcription:', error.message);
        return null;
    }
};

module.exports = transcribeAudio;
