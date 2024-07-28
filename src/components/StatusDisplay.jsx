import React from "react";
import { connect } from "react-redux";
import playerImg from "./../assets/duck_up.gif";
import enemyImg from "./../assets/enemy_duck_up.gif";
import { showModal } from '../reducers/modalSlice';
import "./../styles/statusDisplay.css";

const StatusDisplay = ({ playerHp, playerStrength, opponentHp, opponentStrength, isAttacking }) => {
  
  const playerStatusStyle = {
    backgroundColor: isAttacking ? 'darkgreen' : 'white',
  }

  return (
    <div className="status-container" >
      <div className="status-box" style={playerStatusStyle}>
      {showModal &&<img src={playerImg} ></img>}
      <p className="hp">HP: {playerHp}</p>
      <p className="strength">Strength: {playerStrength}</p>
      </div>
      =<div className="status-box">
      {showModal && <img src={enemyImg}></img>}  
      <p className="hp">HP: {opponentHp}</p>
      <p className="strength">Strength: {opponentStrength}</p>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  playerHp: state.playerController.player_hp,
  playerStrength: state.playerController.player_strength,
  opponentHp: state.opponent.opponent_hp,
  opponentStrength: state.opponent.opponent_strength,
  isAttacking: state.attack.isAttacking,
});

export default connect(mapStateToProps)(StatusDisplay);

