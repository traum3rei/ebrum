import { useEffect } from "react";
import { Howl } from "howler";

let sound;

const useGlobalSound = (soundFile) => {
  useEffect(() => {
    // Check if sound is already created, if not, create a new one
    if (!sound) {
        console.log(soundFile)
      sound = new Howl({
        src: [soundFile],   // Path to the sound file
        loop: true,         // Loop the sound
        volume: 0.5,        // Set the volume to a reasonable level
        onloaderror: (id, error) => {
          console.error('Audio failed to load:', error);
        },
        onplayerror: (id, error) => {
          console.error('Error during playback:', error);
        }
      });
    }

    // Play the sound when the component mounts
    if (sound.playing() === false) {
      sound.play();
    }

    // Cleanup sound on unmount
    return () => {
      if (sound) {
        sound.stop();
      }
    };
  }, [soundFile]);
};

export default useGlobalSound;
