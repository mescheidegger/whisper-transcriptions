export const sendAudioToServer = async (audioBlob) => {
  const formData = new FormData();
  formData.append('audioFile', audioBlob);

  try {
    const response = await fetch('/api/upload-audio', {
      method: 'POST',
      body: formData,
    });
    const data = await response.json();  // assuming the server sends back JSON
    if (response.ok) {
      console.log('Audio uploaded successfully.', data.message);
    } else {
      console.error('Failed to upload audio:', data.message);
    }
  } catch (error) {
    console.error('Error uploading audio:', error);
  }
};
