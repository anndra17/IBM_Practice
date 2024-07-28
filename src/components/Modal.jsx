import React, { useEffect } from 'react';
import { connect } from "react-redux";
import './../styles/modal.css';
import StatusDisplay from './StatusDisplay';
import { attack, resetAttack, setBackgroundColor, setAttackPhase } from '../reducers/attack';

const Modal = ({ handleAttack, handleDefend, show, children, isAttacking, statusBackgroundColor, isAttackPhase, setBackgroundColor, setAttackPhase }) => {
  const showHideClassName = show ? "modal display-block" : "modal display-none";

  useEffect(() => {
    let attackTimer;
    let preAttackTimer;

    if (show) {
      preAttackTimer = setTimeout(() => {
        setBackgroundColor('lightgreen');
        attackTimer = setTimeout(() => {
          setBackgroundColor('green');
          setAttackPhase(true);
        }, 2000); // Time between light green and full green
      }, 2000); // Time before light green phase
    }

    return () => {
      clearTimeout(attackTimer);
      clearTimeout(preAttackTimer);
      setBackgroundColor('white');
      setAttackPhase(false);
    };
  }, [show, setBackgroundColor, setAttackPhase]);

  const handleAttackClick = () => {
    if (isAttackPhase) {
      handleAttack();
    } else {
      console.log(" You cannot attack yet");
    }
  };

  const handleDefendClick = () => {
    handleDefend();
  };

  return (
    <div className={showHideClassName}>
      <section className="modal-main">
        {children}
        <h1>The player and the opponent have met!</h1>
        <StatusDisplay isAttacking={isAttacking} />

        <button type="button" style={{ backgroundColor: 'red', color: 'white' }} onClick={handleAttackClick}>
          Attack
        </button>
        <button type="button" style={{ backgroundColor: 'blue', color: 'white' }} onClick={handleDefendClick}>
          Defend
        </button>
      </section>
    </div>
  );
};

const mapStateToProps = (state) => ({
  isAttacking: state.attack.isAttacking,
  isAttackPhase: state.attack.isAttackPhase,
  statusBackgroundColor: state.attack.statusBackgroundColor,
});

const mapDispatchToProps = (dispatch) => ({
  handleAttack: () => dispatch(attack()),
  handleDefend: () => dispatch(resetAttack()),
  setBackgroundColor: (color) => dispatch(setBackgroundColor(color)),
  setAttackPhase: (isPhase) => dispatch(setAttackPhase(isPhase)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Modal);
