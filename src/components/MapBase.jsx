import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import "./../styles/MapBase.css";
import marginImage from "./../assets/marginImage.jpeg";
import duckUpImage from "./../assets/duck_up.gif";
import duckDownImage from "./../assets/duck_down.gif";
import duckLeftImage from "./../assets/duck_left.gif";
import duckRightImage from "./../assets/duck_right.gif";

const MapBase = ({ x, y, direction }) => {
  const [yellowDot, setYellowDot] = useState({ x: 1, y: 1 });
  const [prevPosition, setPrevPosition] = useState({ x: 1, y: 1 });

  const moveYellowDot = () => {
    const possibleMoves = [
      { x: 0, y: -1 }, // Up
      { x: 0, y: 1 },  // Down
      { x: -1, y: 0 }, // Left
      { x: 1, y: 0 },  // Right
    ];

    const currentMove = possibleMoves[Math.floor(Math.random() * possibleMoves.length)];

    setYellowDot((prev) => {
      const newX = prev.x + currentMove.x;
      const newY = prev.y + currentMove.y;

      if (newX >= 1 && newX <= 8 && newY >= 1 && newY <= 8) {
        return { x: newX, y: newY };
      }
      return prev;
    });
  };

  useEffect(() => {
    const interval = setInterval(moveYellowDot, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setPrevPosition({ x, y });
  }, [x, y]);

  const getDuckImage = () => {
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
        } else if (col === yellowDot.x && row === yellowDot.y) {
          className = "fire-cell";
        }

        cells.push(
          <td
            key={`${row}-${col}`}
            className={className}
            style={isBorderCell ? { backgroundImage: `url(${marginImage})`, backgroundSize: 'cover' } : {}}>
            {className === "duck-cell" && (
              <img
                src={getDuckImage()}
                alt="Duck"
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
    </div>
  );
};

const mapStateToProps = (state) => ({
  x: state.x,
  y: state.y,
  direction: state.direction,
});

export default connect(mapStateToProps)(MapBase);
