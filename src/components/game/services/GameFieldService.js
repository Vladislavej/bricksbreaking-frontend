import axios from 'axios';

const FIELD_URL = "http://localhost:8080/api/bricksbreaking/field";
const NEW_GAME_URL = "http://localhost:8080/api/bricksbreaking/field/newgame";
const BREAK_BRICK_URL = "http://localhost:8080/api/bricksbreaking/field/breakbrick";

const getField = () => axios.get(FIELD_URL);
const newGame = () => axios.get(NEW_GAME_URL);
const breakBrick = (x, y) => axios.get(`${BREAK_BRICK_URL}?x=${x}&y=${y}`);

const gameFieldService = {getField, newGame, breakBrick};
export default gameFieldService;