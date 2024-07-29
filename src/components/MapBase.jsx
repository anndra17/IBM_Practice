import React, { useEffect } from "react";
import { connect } from "react-redux";
import "./../styles/MapBase.css";
import Modal from "./Modal";
import marginImage from "./../assets/marginImage.png";
import duckUpImage from "./../assets/duck_up.gif";
import duckDownImage from "./../assets/duck_down.gif";
import duckLeftImage from "./../assets/duck_left.gif";
import duckRightImage from "./../assets/duck_right.gif";
import enemyDuckUpImage from "./../assets/enemy_duck_up.gif";
import enemyDuckDownImage from "./../assets/enemy_duck_down.gif";
import enemyDuckLeftImage from "./../assets/enemy_duck_left.gif";
import enemyDuckRightImage from "./../assets/enemy_duck_right.gif";
import { setNpcMovable } from "../reducers/playerController";
import { moveOpponent } from "../reducers/opponent";
import { showModal, hideModal } from '../reducers/modalSlice.js';
import mapMatrix from "./../assets/mapMatrix.jsx";
import GameStatusDisplay from "./GameStatusDisplay.jsx";

const MapBase = ({
  x, y, direction, isNpcMovable, setNpcMovable, player_hp, player_strength,
  opponent, moveOpponent, showModal, hideModal, showModalState
}) => {
  
  const closeModal = () => {
    hideModal();
    setNpcMovable(true); // Restores NPC movement
  };

  const handleAttack = () => {
    console.log('Attack clicked');
  };

  const handleDefend = () => {
    closeModal(); // Close modal on defend
  };

  useEffect(() => {
    const possibleMoves = [
      { x: 0, y: -1, direction: "UP" },
      { x: 0, y: 1, direction: "DOWN" },
      { x: -1, y: 0, direction: "LEFT" },
      { x: 1, y: 0, direction: "RIGHT" }
    ];

    const moveOpponentInterval = setInterval(() => {
      if (!isNpcMovable) return;

      const currentMove = possibleMoves[Math.floor(Math.random() * possibleMoves.length)];
      const newX = opponent.x + currentMove.x;
      const newY = opponent.y + currentMove.y;

      if (newX >= 1 && newX <= 8 && newY >= 1 && newY <= 8) {
        moveOpponent(newX, newY, currentMove.direction);
      }
    }, 1000);

    return () => {
      clearInterval(moveOpponentInterval);
    };
  }, [isNpcMovable, opponent, moveOpponent]);

  useEffect(() => {
    if (x === opponent.x && y === opponent.y) {
      showModal(); // Show modal when player meets opponent
      setNpcMovable(false);
    }
  }, [x, y, opponent, setNpcMovable, showModal]);

  const getDuckImage = (direction, isPlayer) => {
    if (isPlayer) {
      switch (direction) {
        case "UP":
          return duckUpImage;
        case "DOWN":
          return duckDownImage;
        case "LEFT":
          return duckLeftImage;
        case "RIGHT":
          return duckRightImage;
        default:
          return duckUpImage;
      }
    } else {
      switch (direction) {
        case "UP":
          return enemyDuckUpImage;
        case "DOWN":
          return enemyDuckDownImage;
        case "LEFT":
          return enemyDuckLeftImage;
        case "RIGHT":
          return enemyDuckRightImage;
        default:
          return enemyDuckUpImage;
      }
    }
  };
  


  


  const renderTable = () => {
    const table = [];
    for (let row = 0; row < 10; row++) {
      const cells = [];
      for (let col = 0; col < 10; col++) {
        const isBorderCell = row === 0 || row === 9 || col === 0 || col === 9;
        let className = "map-cell";

        if (col === x && row === y) {
          className = "duck-cell";
        } else if (col === opponent.x && row === opponent.y) {
          className = "opponent-cell";
        }

        cells.push(
          <td
            key={`${row}-${col}`}
            className={className}
            style={isBorderCell ? { backgroundImage: `url(${marginImage})`, backgroundSize: 'cover' } : {}}
          >
            {className === "duck-cell" && (
              <img
                src={getDuckImage(direction, true)}
                alt="Duck"
                className="duck-image"
              />
            )}
            {className === "opponent-cell" && (
              <img
                src={getDuckImage(opponent.direction, false)}
                alt="Opponent Duck"
                className="duck-image"
              />
            )}
          </td>
        );
      }
      table.push(<tr key={row}>{cells}</tr>);
    }
    return table;
  };

  return (
    <div className="map-container">
      <div className="status">
        <GameStatusDisplay />
        <Modal show={showModalState} handleAttack={handleAttack} handleDefend={handleDefend}/>
      </div>
      <div className="map">
        <h1 className="map-title">DUCK'S ON FIRE</h1>
        <table className="map-table">
          <tbody>{renderTable()}</tbody>
        </table>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  x: state.playerController.x,
  y: state.playerController.y,
  direction: state.playerController.direction,
  isNpcMovable: state.playerController.isNpcMovable,
  player_hp: state.playerController.player_hp,
  player_strength: state.playerController.player_strength,
  opponent: state.opponent,
  showModalState: state.modal.showModal
});

const mapDispatchToProps = (dispatch) => ({
  setNpcMovable: (movable) => dispatch(setNpcMovable(movable)),
  moveOpponent: (x, y, direction) => dispatch(moveOpponent(x, y, direction)),
  showModal: () => dispatch(showModal()),
  hideModal: () => dispatch(hideModal())
});

export default connect(mapStateToProps, mapDispatchToProps)(MapBase);
