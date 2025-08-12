import React, { useEffect, useRef } from 'react';
import * as Tone from 'tone';
import { useStore, stepCount } from './stores/useStore.js';

function App() {
  const { bpm, steps, toggleStep, setBpm, isPlaying, setPlaying } = useStore();
  const synthRef = useRef(null);

  useEffect(() => {
    synthRef.current = new Tone.MembraneSynth().toDestination();
    let index = 0;
    const repeat = (time) => {
      const currentSteps = useStore.getState().steps;
      if (currentSteps[index]) {
        synthRef.current.triggerAttackRelease('C2', '8n', time);
      }
      index = (index + 1) % stepCount;
    };
    Tone.Transport.scheduleRepeat(repeat, '16n');
    return () => {
      Tone.Transport.cancel();
    };
  }, []);

  useEffect(() => {
    Tone.Transport.bpm.value = bpm;
  }, [bpm]);

  const handlePlay = async () => {
    await Tone.start();
    const playing = useStore.getState().isPlaying;
    if (!playing) {
      Tone.Transport.start();
    } else {
      Tone.Transport.stop();
    }
    setPlaying(!playing);
  };

  return (
    <div className="p-4 space-y-4">
      <div className="flex items-center space-x-4">
        <button
          onClick={handlePlay}
          className="px-4 py-2 bg-blue-600 rounded"
        >
          {isPlaying ? 'Stop' : 'Play'}
        </button>
        <div className="flex items-center space-x-2">
          <input
            type="range"
            min="80"
            max="160"
            value={bpm}
            onChange={(e) => setBpm(Number(e.target.value))}
          />
          <span>{bpm} BPM</span>
        </div>
      </div>
      <div className="flex space-x-2">
        {steps.map((active, i) => (
          <button
            key={i}
            onClick={() => toggleStep(i)}
            className={`w-8 h-8 border border-gray-700 rounded-sm ${
              active ? 'bg-green-500' : 'bg-gray-800'
            }`}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
