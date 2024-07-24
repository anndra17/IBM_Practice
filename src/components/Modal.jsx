import React, { useState, useEffect } from 'react';
import './../styles/modal.css';

const Modal = ({ handleAttack, handleDefend, show, children }) => {
  const [isRed, setIsRed] = useState(false);
  const [attackIntervalId, setAttackIntervalId] = useState(null);
  const [defendIntervalId, setDefendIntervalId] = useState(null);
  const [isAttackActive, setIsAttackActive] = useState(false);
  const [isDefendActive, setIsDefendActive] = useState(false);
  const [attackTimer, setAttackTimer] = useState(0);
  const [defendTimer, setDefendTimer] = useState(0);

  const showHideClassName = show ? "modal display-block" : "modal display-none";

  useEffect(() => {
    // Cleanup on component unmount or when show changes
    return () => {
      clearInterval(attackIntervalId);
      clearInterval(defendIntervalId);
    };
  }, [attackIntervalId, defendIntervalId]);

  const startAttackTimer = () => {
    if (attackIntervalId) {
      clearInterval(attackIntervalId);
    }

    setIsAttackActive(true);
    setAttackTimer(0);

    const id = setInterval(() => {
      setIsRed(prev => !prev);
      setAttackTimer(prev => prev + 1);
    }, Math.random() * 2000 + 1000); // Interval aleator între 1 și 3 secunde

    setAttackIntervalId(id);
  };

  const handleAttackClick = () => {
    if (handleAttack) {
      handleAttack(); // Execută funcția de atac
    }

    startAttackTimer(); // Începe alternarea culorii roșii
  };

  const handleDefendClick = () => {
    if (handleDefend) {
      handleDefend(); // Execută funcția de apărare
    }

    // Oprește temporizatorul de atac
    if (attackIntervalId) {
      clearInterval(attackIntervalId);
      setIsAttackActive(false);
      setIsRed(false); // Revine la culoarea inițială
    }

    if (defendIntervalId) {
      clearInterval(defendIntervalId);
    }

    setIsDefendActive(true);
    setDefendTimer(0);

    const id = setInterval(() => {
      console.log('Defend action running');
      setDefendTimer(prev => prev + 1);
    }, 1000);

    setDefendIntervalId(id);
  };

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
