import React, { useState, useRef } from 'react';
import { Container, Button } from 'react-bootstrap';
import { sendAudioToServer } from './api';

function Home() {
  const [isRecording, setIsRecording] = useState(false);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);

  const startRecording = async () => {
    // Check if the browser supports media devices and user media capture.
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      // Request access to the microphone and capture the media stream.
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
  
      // Create a MediaRecorder object to record the incoming audio stream.
      mediaRecorderRef.current = new MediaRecorder(stream);
  
      // Start recording the audio. The 'start' method accepts a timeslice argument,
      // here set to 1000 milliseconds, which means it will pass data every second.
      mediaRecorderRef.current.start(1000);
  
      // Event handler that's called whenever audio data is available.
      // It pushes the incoming audio data into the audioChunks array.
      mediaRecorderRef.current.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };
  
      // Update the recording state to true, indicating that recording is active.
      setIsRecording(true);
    }
  };
  

  const stopRecording = () => {
    // Set up an event handler that will run once the MediaRecorder stops.
    mediaRecorderRef.current.onstop = async () => {
      // Create a new Blob object using the collected audio chunks, specifying the blob type.
      const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
  
      // Create a URL for the Blob to be used if needed (for playback or download).
      const audioUrl = URL.createObjectURL(audioBlob);
      
      // Reset the array storing the chunks to clear memory and prevent leaks.
      audioChunksRef.current = [];
      // Update the recording state to false, indicating that recording has stopped.
      setIsRecording(false);
    
      try {
        // Send the audio Blob to the server using a predefined API function.
        await sendAudioToServer(audioBlob);
        console.log('Audio uploaded successfully.');
      } catch (error) {
        // Log any errors that occur during the upload process.
        console.error('Error uploading audio:', error);
      }
    
      // Revoke the created URL to free up resources once the Blob is no longer needed.
      URL.revokeObjectURL(audioUrl);
    };
    
    // Stop the MediaRecorder and all associated media tracks to free up the microphone.
    mediaRecorderRef.current.stop();
    mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
  };
  
  

  return (
    <Container className="p-3">
      <Button
        onClick={isRecording ? stopRecording : startRecording}
        style={{ backgroundColor: isRecording ? 'red' : undefined }}
      >
        {isRecording ? 'Stop Recording' : 'Start Recording'}
      </Button>
      <p>Status: {isRecording ? 'Recording...' : 'Idle'}</p>
    </Container>
  );
}

export default Home;
