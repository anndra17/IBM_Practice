import React, { useState, useEffect } from 'react';
import './../styles/modal.css';

const Modal = ({ handleAttack, handleDefend, show, children }) => {
  const [isRed, setIsRed] = useState(false);
  const [intervalId, setIntervalId] = useState(null);
  const showHideClassName = show ? "modal display-block" : "modal display-none";

  const toggleRedBackground = () => {
    setIsRed(prev => !prev);
  };

  const handleAttackClick = () => {
    if (handleAttack) {
      handleAttack(); // Execută funcția de atac
    }

    if (intervalId) {
      clearInterval(intervalId); // Oprește intervalul curent dacă există unul
    }

    // Începe să alterneze culorile la fiecare 1-3 secunde
    const id = setInterval(toggleRedBackground, Math.random() * 2000 + 1000);
    setIntervalId(id); // Stochează ID-ul intervalului pentru a-l putea opri mai târziu
  };

  const handleDefendClick = () => {
    if (handleDefend) {
      handleDefend(); // Execută funcția de apărare
    }
    // Oprește alternanța culorii dacă butonul de apărare este apăsat
    if (intervalId) {
      clearInterval(intervalId);
      setIsRed(false); // Revine la culoarea inițială
    }
  };

  // Curățarea intervalului la demontarea componentei
  useEffect(() => {
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [intervalId]);

  return (
    <div className={showHideClassName}>
      <section className="modal-main" style={isRed ? { backgroundColor: 'red' } : null}>
        {children}
        <p>The player and the opponent have met!</p>
        <button type="button" onClick={handleAttackClick}>
          Attack
        </button>
        <button type="button" onClick={handleDefendClick}>
          Defend
        </button>
      </section>
    </div>
  );
};

export default Modal;
