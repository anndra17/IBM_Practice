import React from "react";
import { connect } from "react-redux";
import playerImg from "./../assets/duck_up.gif";
import enemyImg from "./../assets/enemy_duck_up.gif";
import "./../styles/statusDisplay.css";

const StatusDisplay = ({ playerHp, playerStrength, opponentHp, opponentStrength, isAttacking, statusBackgroundColor }) => {
  
  return (
    <div className="status-container">
      <div className="status-box" style={{ backgroundColor: statusBackgroundColor }}>
        <img src={playerImg} alt="Player" />
        <p className="hp">HP: {playerHp}</p>
        <p className="strength">Strength: {playerStrength}</p>
      </div>
      <div className="status-box">
        <img src={enemyImg} alt="Opponent" />
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
  statusBackgroundColor: state.attack.statusBackgroundColor,
});

export default connect(mapStateToProps)(StatusDisplay);
