//src/components/Counter.js
import React from "react";
import { connect } from "react-redux";

const Counter = ({ x ,y , incrementX, decrementX,incrementY, decrementY}) => {
  console.log(x,y);
  return (
    <div>
      <p className="counter_title">Player position: X={x} Y={y}</p>
      <button className="button" onClick={decrementY}>
        UP
      </button>
      <button className="button" onClick={decrementX}>
        LEFT
      </button>
      <button className="button" onClick={incrementY}>
        DOWN
      </button>
      <button className="button" onClick={incrementX}>
        RIGHT
      </button>
    </div>
  );
};

const mapStateToProps = (state) => ({
  //  Use 'counter: state.counter.counter' and replace the above line if you are using combineReducers to ensure that 'counter' matches the correct key in your store.
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