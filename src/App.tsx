import { Bodies, Engine, World } from 'matter-js';
import { useRef, useState } from 'react';
import { DateDiff } from './DateDiff.tsx';
import { FallingAlbums } from './FallingAlbums.tsx';

function App() {
  const engineRef = useRef<Engine>(Engine.create());
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [clickCount, setClickCount] = useState(0);

  const handleAddAlbum = () => {
    World.add(
      engineRef.current.world,
      Bodies.rectangle(Math.round(Math.random() * window.innerWidth), 0, 120, 120, {
        render: { sprite: { texture: '/16.jpg', xScale: 0.3, yScale: 0.3 } },
        angle: Math.round(Math.random() * 3),
      }),
    );
  };

  const handleButtonClick = () => {
    setClickCount((prev) => prev + 1);
    handleAddAlbum();
  };

  return (
    <>
      <FallingAlbums buttonRef={buttonRef} engineRef={engineRef} />
      <div className="h-full w-full flex flex-col items-center justify-center gap-4">
        <h1 className="text-4xl">
          When{' '}
          <u>
            <b>WEJDENE</b>
          </u>{' '}
          ?
        </h1>
        <DateDiff buttonRef={buttonRef} handleAddAlbum={handleAddAlbum} handleButtonClick={handleButtonClick} />
      </div>
      {clickCount > 10 && (
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-slate-800">
          <img src="/feuneu.jpeg" />
          <p className="text-3xl text-center">Sois patient mon reuf</p>
        </div>
      )}
    </>
  );
}

export default App;
