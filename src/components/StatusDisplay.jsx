import React from "react";
import { connect } from "react-redux";
import playerImg from "./../assets/duck_up.gif";
import enemyImg from "./../assets/enemy_duck_up.gif";
import { showModal } from '../reducers/modalSlice';


const StatusDisplay = ({ playerHp, playerStrength, opponentHp, opponentStrength }) => {
  return (
    <div className="status-container">
      <div className="status-box"><h2>Player Status</h2>
      <p>HP: {playerHp}</p>
      <p>Strength: {playerStrength}</p>
      {showModal &&<img src={playerImg} ></img>}
      </div>
      =<div className="status-box"> <h2>Opponent Status</h2>
      <p>HP: {opponentHp}</p>
      <p>Strength: {opponentStrength}</p>
      {showModal && <img src={enemyImg}></img>}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  playerHp: state.playerController.player_hp,
  playerStrength: state.playerController.player_strength,
  opponentHp: state.opponent.opponent_hp,
  opponentStrength: state.opponent.opponent_strength
});

export default connect(mapStateToProps)(StatusDisplay);

