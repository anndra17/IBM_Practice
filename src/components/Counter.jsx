import React from "react";
import { connect } from "react-redux";

const Counter = ({ x, y, incrementX, decrementX, incrementY, decrementY }) => {
  console.log(x, y);
  return (
    <div>
      <p className="counter_title">Player position: X={x} Y={y}</p>
      <div className="controls">
        <button className="button up" onClick={decrementY}>
          UP
        </button>
        <button className="button left" onClick={decrementX}>
          LEFT
        </button>
        <button className="button down" onClick={incrementY}>
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
  incrementY: () => dispatch({ type: "UP" }),
  decrementY: () => dispatch({ type: "DOWN" })
});

export default connect(mapStateToProps, mapDispatchToProps)(Counter);
