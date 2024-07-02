import { Bodies, Common, Engine, World } from 'matter-js';
import { useEffect, useRef, useState } from 'react';
import { FallingAlbums } from './FallingAlbums';

const FINAL_DATE = new Date(2024, 6, 6, 13);

function App() {
  const engineRef = useRef<Engine>();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [dateDiff, setDateDiff] = useState(FINAL_DATE.getTime() - Date.now());
  const [clickCount, setClickCount] = useState(0);
  const isPast = FINAL_DATE.getTime() < Date.now();

  useEffect(() => {
    const interval = setInterval(() => {
      setDateDiff(FINAL_DATE.getTime() - Date.now());

      const value = Common.random(0, 10);
      if (value < 5) return;

      handleAddAlbum();
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const handleAddAlbum = () => {
    if (!engineRef.current) return;

    World.add(
      engineRef.current.world,
      Bodies.rectangle(Common.random(0, window.innerWidth), 0, 120, 120, {
        render: { sprite: { texture: '/16.jpg', xScale: 0.3, yScale: 0.3 } },
        angle: Common.random(0, 3),
      }),
    );
  };

  const handleButtonClick = () => {
    setClickCount((prev) => prev + 1);
    handleAddAlbum();
  };

  return (
    <>
      <FallingAlbums buttonRef={buttonRef} engineRef={engineRef} isPast={isPast} />
      <div className="h-full w-full flex flex-col items-center justify-center gap-4">
        <h1 className="text-4xl">
          When{' '}
          <u>
            <b>WEJDENE</b>
          </u>{' '}
          ?
        </h1>
        {isPast ? (
          <>
            <p>Voila c&apos;est passé, c&apos;était bien 😌</p>
            <p>
              C&apos;était le{' '}
              <b>
                {FINAL_DATE.toLocaleDateString(undefined, { dateStyle: 'long' })} à{' '}
                {FINAL_DATE.toLocaleTimeString(undefined, { timeStyle: 'short' })}.
              </b>
            </p>
          </>
        ) : (
          <>
            <p>Dans {Math.floor(dateDiff / (1024 * 60 * 60 * 24))} jours</p>
            <p>{Math.floor(dateDiff / (1024 * 60 * 60))} heures</p>
            <p>{Math.floor(dateDiff / (1024 * 60))} minutes</p>
            <p>{Math.floor(dateDiff / 1024)} secondes</p>
            <button
              ref={buttonRef}
              onClick={handleButtonClick}
              className="py-3 px-4 mt-4 top-[60%] bg-slate-700 rounded absolute"
            >
              Donne 😢
            </button>
          </>
        )}
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
