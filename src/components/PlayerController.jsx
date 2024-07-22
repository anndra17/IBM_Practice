import React, { useEffect } from "react";
import { connect } from "react-redux";
import "./../styles/PlayerController.css";

const PlayerController = ({ x, y, incrementX, decrementX, incrementY, decrementY, hp, strength, isNpcMovable }) => {

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (!isNpcMovable) return; // Nu permite mișcarea dacă NPC-ul nu este mișcabil

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

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [incrementX, decrementX, incrementY, decrementY, isNpcMovable]);

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
        <p className="counter-title"> X={x} Y={y}</p>
        <div className="controls">
          <button className="button up" onClick={isNpcMovable ? incrementY : null} disabled={!isNpcMovable}></button>
          <button className="button left" onClick={isNpcMovable ? decrementX : null} disabled={!isNpcMovable}></button>
          <button className="button down" onClick={isNpcMovable ? decrementY : null} disabled={!isNpcMovable}></button>
          <button className="button right" onClick={isNpcMovable ? incrementX : null} disabled={!isNpcMovable}></button>
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
  strength: state.strength,
  isNpcMovable: state.isNpcMovable
});

const mapDispatchToProps = (dispatch) => ({
  incrementX: () => dispatch({ type: "RIGHT" }),
  decrementX: () => dispatch({ type: "LEFT" }),
  decrementY: () => dispatch({ type: "UP" }),
  incrementY: () => dispatch({ type: "DOWN" })
});

export default connect(mapStateToProps, mapDispatchToProps)(PlayerController);
