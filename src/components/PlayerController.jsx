import React, { useEffect } from "react";
import { connect } from "react-redux";
import "./../styles/PlayerController.css";
import { moveDown, moveUp, moveLeft, moveRight } from "../reducers/playerController";

const PlayerController = ({
  x,
  y,
  incrementX,
  decrementX,
  incrementY,
  decrementY,
  isNpcMovable
}) => {
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (!isNpcMovable) return;

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

  return (
      <div className="player-slice">
        <div className="player-controls">
          <div className="controls">
            <button className="button up" onClick={isNpcMovable ? incrementY : null} disabled={!isNpcMovable}></button>
            <button className="button left" onClick={isNpcMovable ? decrementX : null} disabled={!isNpcMovable}></button>
            <button className="button down" onClick={isNpcMovable ? decrementY : null} disabled={!isNpcMovable}></button>
            <button className="button right" onClick={isNpcMovable ? incrementX : null} disabled={!isNpcMovable}></button>
          </div>
        </div>
      </div>
  );
};

const mapStateToProps = (state) => ({
  x: state.playerController.x,
  y: state.playerController.y,
  isNpcMovable: state.playerController.isNpcMovable
});

const mapDispatchToProps = (dispatch) => ({
  incrementX: () => dispatch(moveRight()),
  decrementX: () => dispatch(moveLeft()),
  incrementY: () => dispatch(moveUp()),
  decrementY: () => dispatch(moveDown())
});

export default connect(mapStateToProps, mapDispatchToProps)(PlayerController);
