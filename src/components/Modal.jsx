import React, { useState, useEffect } from 'react';
import './../styles/modal.css';

const Modal = ({ handleAttack, handleDefend, show, children }) => {
  const [isRed, setIsRed] = useState(false);
  const showHideClassName = show ? "modal display-block" : "modal display-none";
  const modalClassName = isRed ? `${showHideClassName} red-background` : showHideClassName;

  const handleAttackClick = () => {
    if (handleAttack) {
      handleAttack(); // Execută funcția de atac
    }
  };

  const handleDefendClick = () => {
    if (handleDefend) {
      handleDefend(); // Execută funcția de apărare
    }
  };

  useEffect(() => {
    if (show) {
      const interval = setInterval(() => {
        setIsRed((prev) => !prev); // Comută starea între roșu și normal
      }, 800); // Alternați la fiecare 3 secunde

      return () => clearInterval(interval); // Curăță intervalul atunci când componenta se dezleagă
    }
  }, [show]);

  return (
    <div className={modalClassName}>
      <section className="modal-main">
        {children}
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
