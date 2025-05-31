import { type RefObject, useEffect, useState } from 'react';
import { FINAL_DATE, FINAL_DATE_TIME, checkIsPast } from './constants.ts';

export function DateDiff({
  handleAddAlbum,
  buttonRef,
  handleButtonClick,
}: {
  handleAddAlbum: () => void;
  buttonRef: RefObject<HTMLButtonElement | null>;
  handleButtonClick: () => void;
}): React.JSX.Element {
  const [dateDiff, setDateDiff] = useState(() => FINAL_DATE_TIME - Date.now());

  useEffect(() => {
    const interval = setInterval(() => {
      if (!checkIsPast()) {
        setDateDiff(FINAL_DATE_TIME - Date.now());
      }

      const value = Math.round(Math.random() * 10);
      if (value > 5) {
        handleAddAlbum();
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [handleAddAlbum]);

  return checkIsPast() ? (
    <>
      <p>Voila c&apos;est passé, c&apos;était bien 😌</p>
      <p>
        C&apos;était le{' '}
        <b>
          {FINAL_DATE.toLocaleDateString('fr-FR', { dateStyle: 'long' })} à{' '}
          {FINAL_DATE.toLocaleTimeString('fr-FR', { timeStyle: 'short' })}.
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
        className="py-3 px-4 mt-4 top-[60%] bg-slate-700 rounded-sm absolute"
      >
        Donne 😢
      </button>
    </>
  );
}
