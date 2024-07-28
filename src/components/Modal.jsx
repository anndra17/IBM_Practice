import React, { useEffect } from 'react';
import { connect } from "react-redux";
import './../styles/modal.css';
import StatusDisplay from './StatusDisplay';
import { attack, resetAttack } from '../reducers/attack';

const Modal = ({ handleAttack, handleDefend, show, children, isAttacking }) => {
  const showHideClassName = show ? "modal display-block" : "modal display-none";

  useEffect(() => {
    // Cleanup any ongoing timers or intervals when the component is unmounted
    return () => {
      // Clear any intervals if needed
    };
  }, []);



  const handleAttackClick = () => {
    setIsAttacking(true);
    handleAttack();
    
  };

  const handleDefendClick = () => {
    setIsAttacking(false);
    handleDefend();
  };


  return (
    <div className={showHideClassName}>
      <section className="modal-main">
        {children}
        <h1>The player and the opponent have met!</h1>
        <StatusDisplay  isAttacking={isAttacking}/>

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

const mapStateToProps = (state) => ({
  isAttacking: state.isAttacking
});

const mapDispatchToProps = (dispatch) => ({
  handleAttack: () => dispatch(attack()),
  handleDefend: () => dispatch(resetAttack()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Modal);


