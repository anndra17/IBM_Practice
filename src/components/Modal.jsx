import React, { useEffect } from 'react';
import './../styles/modal.css';
import StatusDisplay from './StatusDisplay';

const Modal = ({ handleAttack, handleDefend, show, children }) => {
  const showHideClassName = show ? "modal display-block" : "modal display-none";

  useEffect(() => {
    // Cleanup any ongoing timers or intervals when the component is unmounted
    return () => {
      // Clear any intervals if needed
    };
  }, []);

  return (
    <div className={showHideClassName}>
      <section className="modal-main">
        {children}
        <h1>The player and the opponent have met!</h1>
        <StatusDisplay />
        <button type="button" onClick={handleAttack}>
          Attack
        </button>
        <button type="button" onClick={handleDefend}>
          Defend
        </button>
      </section>
    </div>
  );
};

export default Modal;
