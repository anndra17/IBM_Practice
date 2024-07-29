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
import { setNpcMovable, setCurrentMap } from "../reducers/playerController";
import { moveOpponent } from "../reducers/opponent";
import { showModal, hideModal } from '../reducers/modalSlice.js';
import maps from "../assets/maps.js";
import GameStatusDisplay from "./GameStatusDisplay.jsx";

const MapBase = ({
  x, y, direction, isNpcMovable, setNpcMovable, 
  opponent, moveOpponent, showModal, hideModal, showModalState, currentMap, setCurrentMap
}) => {

  const mapMatrix = maps[currentMap]; // Use the currentMap to get the right map

  
  // Close modal and allow NPC movement
  const closeModal = () => {
    hideModal();
    setNpcMovable(true); // Allows NPC to move again
  };

  const handleAttack = () => {
    console.log('Attack clicked');
  };

  const handleDefend = () => {
    closeModal(); // Close modal on defend
  };

  // Movement logic for NPC
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

      // Ensure new position is within bounds and not a solid block
      if (newX >= 1 && newX <= 8 && newY >= 1 && newY <= 8 && mapMatrix[newY][newX] === 0) {
        moveOpponent(newX, newY, currentMove.direction);
      }
    }, 1000);

    return () => {
      clearInterval(moveOpponentInterval);
    };
  }, [isNpcMovable, opponent, moveOpponent]);

  // Check for NPC and player collision
  useEffect(() => {
    if (x === opponent.x && y === opponent.y) {
      showModal(); // Show modal when player meets opponent
      setNpcMovable(false);
    }
  }, [x, y, opponent, setNpcMovable, showModal]);

  // Function to get the appropriate duck image
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

  // Function to render the game map
  const renderTable = () => {
    return (
      <table className="map-table">
        <tbody>
          {mapMatrix.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, colIndex) => {
                const isBorderCell = cell === 1;
                let className = "map-cell";

                if (colIndex === x && rowIndex === y) {
                  className = "duck-cell";
                } else if (colIndex === opponent.x && rowIndex === opponent.y) {
                  className = "opponent-cell";
                }

                return (
                  <td
                    key={`${rowIndex}-${colIndex}`}
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
              })}
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  const handleDifficultyChange = (difficulty) => {
      console.log(`Difficulty changed to ${difficulty}`);

    switch (difficulty) {

      case 'EASY':
        setCurrentMap('map1');
        break;
      case 'MEDIUM':
        setCurrentMap('map2');
        break;
      case 'HARD':
        setCurrentMap('map3');
        break;
      default:
        setCurrentMap('map1');
    }
  };

  useEffect(() => {
    console.log('Current map updated:', currentMap);
  }, [currentMap]);

  return (
    <div className="map-container">
      <div className="status">
        <GameStatusDisplay />
        <div className="difficulty-div">
          <h1>Choose difficulty</h1>
          <button onClick={() => handleDifficultyChange('EASY')}>EASY</button>
          <button onClick={() => handleDifficultyChange('MEDIUM')}>MEDIUM</button>
          <button onClick={() => handleDifficultyChange('HARD')}>HARD</button>
        </div>
        

        <Modal show={showModalState} handleAttack={handleAttack} handleDefend={handleDefend}/>
      </div>
      <div className="map">
        <h1 className="map-title">DUCK'S ON FIRE</h1>
        {renderTable()}
      </div>
    </div>
  );
};

// Map state and dispatch to props
const mapStateToProps = (state) => ({
  x: state.playerController.x,
  y: state.playerController.y,
  direction: state.playerController.direction,
  isNpcMovable: state.playerController.isNpcMovable,
  player_hp: state.player.hp,
  player_strength: state.player.strength,
  opponent: state.opponent,
  showModalState: state.modal.showModal,
  currentMap: state.playerController.currentMap
});

const mapDispatchToProps = (dispatch) => ({
  setNpcMovable: (movable) => dispatch(setNpcMovable(movable)),
  moveOpponent: (x, y, direction) => dispatch(moveOpponent(x, y, direction)),
  showModal: () => dispatch(showModal()),
  hideModal: () => dispatch(hideModal()),
  setCurrentMap: (currentMap) => dispatch(setCurrentMap(currentMap))
});

export default connect(mapStateToProps, mapDispatchToProps)(MapBase);
