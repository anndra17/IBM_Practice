import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import "./../styles/MapBase.css"; // Adjust the path as needed
import marginImage from "./../assets/marginImage.jpeg";
import duckImageUp from "./../assets/duck_up.gif";
import duckImageDown from "./../assets/duck_down.gif";
import duckImageLeft from "./../assets/duck_left.gif";
import duckImageRight from "./../assets/duck_right.gif";

const MapBase = ({ x, y, direction }) => {
  // State for the yellow dot's position
  const [yellowDot, setYellowDot] = useState({ x: 1, y: 1 });

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

      // Ensure the yellow dot stays within the boundaries (1 to 8)
      if (newX >= 1 && newX <= 8 && newY >= 1 && newY <= 8) {
        return { x: newX, y: newY };
      }
      return prev;
    });
  };

  // Update yellow dot's position every second
  useEffect(() => {
    const interval = setInterval(moveYellowDot, 1000);
    return () => clearInterval(interval);
  }, []);

  const getDuckImage = () => {
    switch (direction) {
      case "UP":
        return duckImageUp;
      case "DOWN":
        return duckImageDown;
      case "LEFT":
        return duckImageLeft;
      case "RIGHT":
        return duckImageRight;
      default:
        return duckImageDown;
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
            style={isBorderCell ? { backgroundImage: `url(${marginImage})`, backgroundSize: 'cover',backgroundRepeat: 'no-repeat'  } : {}}
          >
            {className === "duck-cell" && <img src={getDuckImage()} alt="Duck" backgroundSize="contain" />}
          </td>
        );
      }
      table.push(<tr key={row}>{cells}</tr>);
    }
    return table;
  };

  return (
    <div>
      <h1 className="map-title">Map</h1>
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
