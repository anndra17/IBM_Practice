import React, { useEffect, useState } from 'react';
import { connect } from "react-redux";
import './../styles/modal.css';
import StatusDisplay from './StatusDisplay';
import { attack, resetAttack, setBackgroundColor, setAttackPhase, setAttackTimerStarted, setOpponentStatusColor, setTurn } from '../reducers/attack';
import { decreaseOpponentHealth } from './../reducers/opponent';
import { decreasePlayerHealth } from '../reducers/player'; 

const Modal = ({
  handleAttack,
  handleDefend,
  show,
  children,
  isAttacking,
  isAttackPhase,
  setBackgroundColor,
  setAttackPhase,
  setAttackTimerStarted,
  decreasePlayerHealth,
  decreaseOpponentHealth,
  setOpponentStatusColor,
  setTurn,
  currentTurn,
  opponentStrength,
  
}) => {
  const [defendTimeout, setDefendTimeout] = useState(null);

  const showHideClassName = show ? "modal display-block" : "modal display-none";

  useEffect(() => {
    let attackTimer;
    let preAttackTimer;

    if (show) {
      setAttackTimerStarted(true); // Start the attack timer

      preAttackTimer = setTimeout(() => {
        // Randomly select whose turn it is
        const isPlayerTurn = Math.random() > 0.5;
        setTurn(isPlayerTurn ? 'player' : 'opponent');

        // Set appropriate background colors
        if (isPlayerTurn) {
          setBackgroundColor('lightgreen');
        } else {
          setOpponentStatusColor('lightgreen');
        }

        attackTimer = setTimeout(() => {
          if (isPlayerTurn) {
            console.log('player turn');
            setBackgroundColor('green');
          } else {
            console.log('opponent turn');
            setOpponentStatusColor('green');
            // Set defend timeout when opponent is green
            const timeoutId = setTimeout(() => {
              if (currentTurn === 'opponent') {
                setOpponentStatusColor('green');
                decreasePlayerHealth(Math.floor(Math.random() * opponentStrength) + 1);
                console.log("Player missed the defend window and took damage.");
              }
            }, 2000); // 2 seconds to defend

            setDefendTimeout(timeoutId);
          }
          setAttackPhase(true);
        }, 2000); // Time between light green and full green
      }, 2000); // Time before light green phase
    }

    return () => {
      clearTimeout(attackTimer);
      clearTimeout(preAttackTimer);
      clearTimeout(defendTimeout); // Clear defend timeout
      setBackgroundColor('white');
      setOpponentStatusColor('white');
      setAttackPhase(false);
      setAttackTimerStarted(false); // Reset the attack timer
    };
  }, [show, setBackgroundColor, setAttackPhase, setAttackTimerStarted, setTurn, currentTurn, opponentStrength, defendTimeout]);

  const handleAttackClick = () => {
    if (isAttackPhase && currentTurn === 'player') {
      const damage = Math.floor(Math.random() * 10) + 1;
      decreaseOpponentHealth(damage);
      setOpponentStatusColor('red');
      setTimeout(() => {
        setOpponentStatusColor('white');
        setTurn('opponent'); // Switch to opponent's turn
      }, 500); 
      handleAttack();
    } else {
      console.log("It's not your turn to attack or not in attack phase.");
    }
  };

  const handleDefendClick = () => {
    if (currentTurn === 'opponent') {
      clearTimeout(defendTimeout); // Clear the defend timeout if defend is pressed
      console.log("Defend successful!");
      const damage = Math.floor(Math.random() * 10) + 1;
      decreasePlayerHealth(damage);
      setBackgroundColor('red');
      setTurn('player'); // Switch to player's turn
    } else {
      console.log("Defend action not allowed.");
    }
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
  attackTimerStarted: state.attack.attackTimerStarted,
  opponentStrength: state.opponent.opponent_strength,
  currentTurn: state.attack.currentTurn,
});

const mapDispatchToProps = (dispatch) => ({
  handleAttack: () => dispatch(attack()),
  handleDefend: () => dispatch(resetAttack()),
  setBackgroundColor: (color) => dispatch(setBackgroundColor(color)),
  setAttackPhase: (isPhase) => dispatch(setAttackPhase(isPhase)),
  setAttackTimerStarted: (started) => dispatch(setAttackTimerStarted(started)),
  decreasePlayerHealth: (amount) => dispatch(decreasePlayerHealth(amount)),
  decreaseOpponentHealth: (amount) => dispatch(decreaseOpponentHealth(amount)),
  setOpponentStatusColor: (color) => dispatch(setOpponentStatusColor(color)),
  setTurn: (turn) => dispatch(setTurn(turn)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Modal);
