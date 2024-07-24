import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import "./../styles/MapBase.css";
import Modal from "./Modal";
import marginImage from "./../assets/marginImage.png";
import duckUpImage from "./../assets/duck_up.gif";
import duckDownImage from "./../assets/duck_down.gif";
import duckLeftImage from "./../assets/duck_left.gif";
import duckRightImage from "./../assets/duck_right.gif";
import backgroundImage from "./../assets/background.png";

const MapBase = ({ x, y, direction, isNpcMovable, setIsNpcMovable, player_hp, player_strength, opponent_hp, opponent_strength }) => {
  const [opponent, setOpponent] = useState({ x: 8, y: 8, direction: "UP" });
  const [showModal, setShowModal] = useState(false);

  const closeModal = () => {
    setShowModal(false);
    setIsNpcMovable(true); // Restabilește mișcarea NPC-ului
  };

  const handleAttack = () => {
    console.log('Attack clicked');
  };

  const handleDefend = () => {
    closeModal(); // Închide modalul când apăsăm pe Defend
  };

  const moveOpponent = () => {
    if (!isNpcMovable) return;

    const possibleMoves = [
      { x: 0, y: -1, direction: "UP" },
      { x: 0, y: 1, direction: "DOWN" },
      { x: -1, y: 0, direction: "LEFT" },
      { x: 1, y: 0, direction: "RIGHT" }
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
      setIsNpcMovable(false);
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
    <div className="map-container">
      <div className="status-container">
        <div className="status-box">
          <h2>Opponent Status</h2>
          <p>HP: {opponent_hp}</p>
          <p>Strength: {opponent_strength}</p>
        </div>
        <div className="status-box">
          <h2>Player Status</h2>
          <p>HP: {player_hp}</p>
          <p>Strength: {player_strength}</p>
        </div>
      </div>
      <h1 className="map-title">DUCK'S ON FIRE</h1>
      <table className="map-table">
        <tbody>{renderTable()}</tbody>
      </table>
      <Modal show={showModal} handleAttack={handleAttack} handleDefend={handleDefend}/>
    </div>
  );
};

const mapStateToProps = (state) => ({
  x: state.x,
  y: state.y,
  direction: state.direction,
  isNpcMovable: state.isNpcMovable,
  player_hp: state.player_hp,
  player_strength: state.player_strength,
  opponent_hp: state.opponent_hp,
  opponent_strength: state.opponent_strength
});

const mapDispatchToProps = (dispatch) => ({
  setIsNpcMovable: (movable) => dispatch({ type: "SET_NPC_MOVABLE", payload: movable })
});

export default connect(mapStateToProps, mapDispatchToProps)(MapBase);
