import React, { useState, useEffect } from 'react';
import './../styles/modal.css';

const Modal = ({ handleAttack, handleDefend, show, children }) => {
  const [isLightGreen, setIsLightGreen] = useState(false);
  const [isGreen, setIsGreen] = useState(false);
  const [attackIntervalId, setAttackIntervalId] = useState(null);
  const [defendIntervalId, setDefendIntervalId] = useState(null);
  const [isAttackActive, setIsAttackActive] = useState(false);
  const [isDefendActive, setIsDefendActive] = useState(false);
  const [attackTimer, setAttackTimer] = useState(0);
  const [defendTimer, setDefendTimer] = useState(0);
  const [isClicked, setIsClicked] = useState(false);

  const showHideClassName = show ? "modal display-block" : "modal display-none";

  useEffect(() => {
    return () => {
      clearInterval(attackIntervalId);
      clearInterval(defendIntervalId);
    };
  }, [attackIntervalId, defendIntervalId]);

  // Logica pentru timer ul de atac
  const startAttackTimer = () => {

    if (attackIntervalId) {
      clearInterval(attackIntervalId);
    }

    // activare atac curent
    setIsAttackActive(true);
    setAttackTimer(0);

    // setarea culorilor atacului
    setIsLightGreen(true);
    setIsGreen(false);

    // setarea duratei culorilor
    const lightGreenDuration = 1000; // 1 secunda
    const totalDuration = Math.random() * 2000 + 1000; 

    //  interval monitorizare buton de atac pentru setarea culorii inchise
    const id = setInterval(() => {
      if (isClicked) {
        clearInterval(attackIntervalId);
        setIsLightGreen(false);
        setIsGreen(true);
      }
      setAttackTimer(prev => prev + 1);
    }, totalDuration);

    setAttackIntervalId(id);

    setTimeout(() => {
      if (isClicked) {
        setIsLightGreen(false);
        setIsGreen(true);
      }
    }, lightGreenDuration);
  };

  const handleAttackClick = () => {

    // Executa functia de atac doar când este verde închis
    setIsClicked(true);
    if (isGreen) {
      if (handleAttack) {
        handleAttack(); 
      }
    }

    // Incepe temporizatorul pentru fazele de culoare
    startAttackTimer(); 
  };

  // Logica pentru timer ul de aparare
  const handleDefendClick = () => {
    if (handleDefend) {
      // Executa functia de aparare
      handleDefend(); 
    }

    // Oprire cronometru atac & resetare culori la initial
    if (attackIntervalId) {
      clearInterval(attackIntervalId);
      setIsAttackActive(false);
      setIsLightGreen(false);
      setIsGreen(false); 
    }

    if (defendIntervalId) {
      clearInterval(defendIntervalId);
    }

    // Activare atac curent
    setIsDefendActive(true);
    setDefendTimer(0);

    const id = setInterval(() => {
      console.log('Defend action running');
      setDefendTimer(prev => prev + 1);
    }, 1000);

    setDefendIntervalId(id);
  };


  // Redarea continutului modulului
  return (
    <div className={showHideClassName}>
      <section className="modal-main" style={isLightGreen ? { backgroundColor: 'lightgreen' } : isGreen ? { backgroundColor: 'green' } : null}>
        {children}
        <p>The player and the opponent have met!</p>
        <button type="button" onClick={handleAttackClick}>
          Attack
        </button>
        <button type="button" onClick={handleDefendClick}>
          Defend
        </button>

        <div className="timers-info">
          {isAttackActive && (
            <div>
              <p>Attack Timer Active</p>
              <p>Time Elapsed: {attackTimer} seconds</p>
            </div>
          )}
          {!isAttackActive && <p>Attack Timer Inactive</p>}
          
          {isDefendActive && (
            <div>
              <p>Defend Timer Active</p>
              <p>Time Elapsed: {defendTimer} seconds</p>
            </div>
          )}
          {!isDefendActive && <p>Defend Timer Inactive</p>}
        </div>
      </section>
    </div>
  );
};

export default Modal;
