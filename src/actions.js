export const MOVE_PLAYER = 'MOVE_PLAYER';

export const movePlayer = (direction) => ({
  type: MOVE_PLAYER,
  payload: direction,
});