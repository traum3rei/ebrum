import { useState } from 'react';
import { ReactP5Wrapper } from '@p5-wrapper/react';
import './App.css';
import sketch from './sketch';
import sketchTwo from './part';
import intro from './intro'
import useGlobalSound from "./useGlobalSound";
import Button from '@mui/material/Button';
import ImageGallery from './ImageGallery';

function App() {
  const [useSketchTwo, setUseSketchTwo] = useState(false);
  const [isSoundPlaying, setIsSoundPlaying] = useState(false);
  const [isIn, setIsIn] = useState(false)
  const [isNumber, setIsNumber] = useState(0)

  const soundFile = "./feel.mp3"; // Path to the sound file in the public folder

  // Call the hook to play the sound globally (but only after user interaction)
  useGlobalSound(soundFile);

  const handlePlaySound = () => {
    if (!isSoundPlaying) {
      setIsSoundPlaying(true); // Set the state to trigger sound playback
    }
  };
  // Decide which sketch to use based on `useSketchTwo`
  //let usedSketch = useSketchTwo ? sketch : sketchTwo;
  let usedSketch;
  if (isNumber == 0) {
    usedSketch = sketch;
  } else if(isNumber ==1) {
    usedSketch = sketchTwo
  } else {
  }
  /*{!isSoundPlaying && (
        <button onClick={handlePlaySound}>
          Play Background Sound
        </button>
      )}*/ 
  return (
    <div className="App"
      style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: isIn ? 'auto' : '100vh', // Full viewport height only for the intro screen
      flexDirection: 'column', // Stack <p> and <Button> vertically
    }} >
      {!isIn &&
      <p>Hey Ebru &lt;3</p>} 
      {
      <Button onClick={() => {setIsIn(true); setIsNumber((isNumber+1)%3)}} sx={{
        color: 'rgb(204, 204, 204)',
        fontFamily: 'Courier New, monospace',
        fontSize: '30px',
        //backgroundColor: '#ffb3c1', // Soft pink background
        //borderRadius: '8px',
        padding: '10px 20px',
        marginTop: '10px',
        '&:hover': { backgroundColor: '#ff80a1' }, // Slightly darker pink on hover
      }}>Enter</Button>} 

      {/* Toggle the sketch onClick */ isIn &&
      <a>
        
        {isNumber === 2 ? <ImageGallery /> : <ReactP5Wrapper sketch={usedSketch} />}
      </a>}
    </div>
  );
}

export default App;
