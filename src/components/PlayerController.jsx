import React, { useEffect } from "react";
import { connect } from "react-redux";
import "./../styles/PlayerController.css";

const PlayerController = ({ x, y, incrementX, decrementX, incrementY, decrementY, hp, strength }) => {

  // Adăugăm event listener pentru keydown
  useEffect(() => {
    const handleKeyDown = (event) => {
      switch (event.key) {
        case 'ArrowUp':
          incrementY();
          break;
        case 'ArrowDown':
          decrementY();
          break;
        case 'ArrowLeft':
          decrementX();
          break;
        case 'ArrowRight':
          incrementX();
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    // Cleanup event listener la demontarea componentei
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [incrementX, decrementX, incrementY, decrementY]);

  const renderHearts = () => {
    let hearts = [];
    for (let i = 0; i < hp; i++) {
      hearts.push(<span key={i} className="heart">♥</span>);
    }
    return hearts;
  };

  return (
    <div className="player-slice">
      <div className="player-controls">

        <div className="controls">
          <button className="button up" onClick={incrementY}></button>
          <button className="button left" onClick={decrementX}></button>
          <button className="button down" onClick={decrementY}></button>
          <button className="button right" onClick={incrementX}></button>
        </div>
      </div>
      <div className="player-status">
        <p>HP: {renderHearts()} </p>
        <p>Strength: {strength} </p>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  x: state.x,
  y: state.y,
  hp: state.hp,
  strength: state.strength
});

const mapDispatchToProps = (dispatch) => ({
  incrementX: () => dispatch({ type: "RIGHT" }),
  decrementX: () => dispatch({ type: "LEFT" }),
  decrementY: () => dispatch({ type: "UP" }),
  incrementY: () => dispatch({ type: "DOWN" })
});

export default connect(mapStateToProps, mapDispatchToProps)(PlayerController);
