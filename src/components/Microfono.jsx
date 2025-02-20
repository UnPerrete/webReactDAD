import React from 'react';
import 'regenerator-runtime';
import { useState } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

export const Microfono = () => {
  const [textInput, setText] = useState("")
  const [displayText, setDisplayText]=useState("")
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  const handleChange = (event) => {
    setText(event.target.value);

  }

  const handleSubmit = () =>{
    setDisplayText(textInput)
  }

  const handleDelete = () =>{
    setDisplayText("")
  }




  return (

    <div class="container text-start">
      <div>
        <div className="d-flex flex-row mb-3">
          <input
            type="text"
            name="user"
            value={textInput}
            onChange={handleChange}
            className="p-2"

          />
        <button type="button" onClick={handleSubmit}  className="btn btn-outline-danger p-2">Enviar</button>
        <button type="button" onClick={handleDelete}  className="btn btn-outline-success p-2">Borrar</button>
        </div>

        <p>Microphone: {listening ? 'on' : 'off'}</p>
        <button onClick={SpeechRecognition.startListening}>Start</button>
        <button onClick={SpeechRecognition.stopListening}>Stop</button>
        <button onClick={resetTranscript}>Reset</button>
        <p>Micrófono:{transcript} 
          <br></br>
          Caja de texto: {displayText}</p>
      </div>
    </div>

  );
};
