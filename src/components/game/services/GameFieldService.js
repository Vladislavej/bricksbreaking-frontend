import axios from 'axios';

const FIELD_URL = "http://localhost:8080/api/bricksbreaking/field";
const NEW_GAME_URL = "http://localhost:8080/api/bricksbreaking/field/newgame";
const BREAK_BRICK_URL = "http://localhost:8080/api/bricksbreaking/field/breakbrick";

const getField = () => axios.get(FIELD_URL);
const newGame = () => axios.get(NEW_GAME_URL);
const breakBrick = (row,col) => axios.get(`${BREAK_BRICK_URL}?row=${row}?col=${col}`);

const gameFieldService = {getField, newGame, breakBrick};
export default gameFieldService;