// src/components/MapBase.js 
import React from "react";
import { connect } from "react-redux";
import "./../styles/MapBase.css"; // Adjust the path as needed

const MapBase = ({ x, y }) => {

  const renderTable = () => {
    const table = [];
    for (let row = 0; row < 10; row++) {
      const cells = [];
      for (let col = 0; col < 10; col++) {
        const isBorderCell = row === 0 || row === 9 || col === 0 || col === 9;
        const className = (col === x && row === y) ? "red-cell" : "map-cell";
        cells.push(
          <td key={col} className={className}></td>
        );
      }
      table.push(<tr key={row}>{cells}</tr>);
    }
    return table;
  };

  return (
    <div>
      <p className="map-title">Map</p>
      <table className="map-table">
        <tbody>{renderTable()}</tbody>
      </table>
    </div>
  );
};

const mapStateToProps = (state) => ({
  x: state.x,
  y: state.y,
});

export default connect(mapStateToProps)(MapBase);
