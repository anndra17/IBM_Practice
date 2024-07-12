import React from "react";
import { connect } from "react-redux";
import "./../styles/PlayerController.css";

const PlayerController = ({ x, y, incrementX, decrementX, incrementY, decrementY }) => {
  return (
    <div>
      <p className="counter_title">Player position: X={x} Y={y}</p>

      <div className="controls">
        <button className="button up" onClick={incrementY} >
          UP
        </button>
        <button className="button left" onClick={decrementX} >
          LEFT
        </button>
        <button className="button down" onClick={decrementY}>
          DOWN
        </button>
        <button className="button right" onClick={incrementX}>
          RIGHT
        </button>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  x: state.x,
  y: state.y
});

const mapDispatchToProps = (dispatch) => ({
  incrementX: () => dispatch({ type: "RIGHT" }),
  decrementX: () => dispatch({ type: "LEFT" }),
  decrementY: () => dispatch({ type: "UP" }),
  incrementY: () => dispatch({ type: "DOWN" })
});

export default connect(mapStateToProps, mapDispatchToProps)(PlayerController);
