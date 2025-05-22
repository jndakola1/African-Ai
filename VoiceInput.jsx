import { useState } from 'react';

function VoiceInput({ onTranscript }) {
  const [listening, setListening] = useState(false);

  const handleListen = () => {
    const recognition = new window.webkitSpeechRecognition();
    recognition.lang = 'en-US'; // You can make this dynamic per language
    recognition.interimResults = false;

    recognition.onstart = () => setListening(true);
    recognition.onend = () => setListening(false);

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      onTranscript(transcript);
    };

    recognition.start();
  };

  return (
    <button
      onClick={handleListen}
      className={`ml-2 px-3 py-2 rounded ${
        listening ? 'bg-red-500' : 'bg-gray-300'
      } text-sm`}
    >
      {listening ? 'Listening...' : 'Mic'}
    </button>
  );
}

export default VoiceInput;