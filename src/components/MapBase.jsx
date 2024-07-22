import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import "./../styles/MapBase.css";
import Modal from "./Modal";
import marginImage from "./../assets/marginImage.png";
import duckUpImage from "./../assets/duck_up.gif";
import duckDownImage from "./../assets/duck_down.gif";
import duckLeftImage from "./../assets/duck_left.gif";
import duckRightImage from "./../assets/duck_right.gif";

const MapBase = ({ x, y, direction, isNpcMovable, setIsNpcMovable }) => {
  const [opponent, setOpponent] = useState({ x: 8, y: 8, direction: "UP" });
  const [showModal, setShowModal] = useState(false);

  const closeModal = () => {
    setShowModal(false);
    setIsNpcMovable(true); // Restabilește mișcarea NPC-ului
  };

  const handleAttack = () => {
    // Poți adăuga orice logică dorești pentru butonul Attack
    console.log('Attack clicked');
  };

  const handleDefend = () => {
    closeModal(); // Închide modalul când apăsăm pe Defend
  };

  const moveOpponent = () => {
    if (!isNpcMovable) return; // Nu muta NPC-ul dacă mișcarea este dezactivată

    const possibleMoves = [
      { x: 0, y: -1, direction: "UP" },
      { x: 0, y: 1, direction: "DOWN" },
      { x: -1, y: 0, direction: "LEFT" },
      { x: 1, y: 0, direction: "RIGHT" },
    ];

    const currentMove = possibleMoves[Math.floor(Math.random() * possibleMoves.length)];

    setOpponent((prev) => {
      const newX = prev.x + currentMove.x;
      const newY = prev.y + currentMove.y;

      if (newX >= 1 && newX <= 8 && newY >= 1 && newY <= 8) {
        return { x: newX, y: newY, direction: currentMove.direction };
      }
      return prev;
    });
  };

  useEffect(() => {
    const opponentInterval = setInterval(moveOpponent, 1000);
    return () => {
      clearInterval(opponentInterval);
    };
  }, [isNpcMovable]);

  useEffect(() => {
    if (x === opponent.x && y === opponent.y) {
      setShowModal(true);
      setIsNpcMovable(false); // Suspendă mișcarea NPC-ului când se întâlnește cu jucătorul
    }
  }, [x, y, opponent]);

  const getDuckImage = (direction) => {
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
                src={getDuckImage(direction)}
                alt="Duck"
                className="duck-image"
              />
            )}
            {className === "opponent-cell" && (
              <img
                src={getDuckImage(opponent.direction)}
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
    <div>
      <h1 className="map-title">DUCK'S ON FIRE</h1>
      <table className="map-table">
        <tbody>{renderTable()}</tbody>
      </table>
      <Modal show={showModal} handleAttack={handleAttack} handleDefend={handleDefend}>
        <p>The player and the opponent have met!</p>
      </Modal>
    </div>
  );
};

const mapStateToProps = (state) => ({
  x: state.x,
  y: state.y,
  direction: state.direction,
  isNpcMovable: state.isNpcMovable
});

const mapDispatchToProps = (dispatch) => ({
  setIsNpcMovable: (movable) => dispatch({ type: "SET_NPC_MOVABLE", payload: movable })
});

export default connect(mapStateToProps, mapDispatchToProps)(MapBase);
