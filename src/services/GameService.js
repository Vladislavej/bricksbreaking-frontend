import axios from 'axios';

const FIELD_URL = "http://localhost:8080/api/bricksbreaking/field";
const NEW_GAME_URL = "http://localhost:8080/api/bricksbreaking/field/newgame";
const BREAK_BRICK_URL = "http://localhost:8080/api/bricksbreaking/field/breakbrick";
const GET_SCORE = "http://localhost:8080/api/bricksbreaking/field/score";
const GET_LIVES = "http://localhost:8080/api/bricksbreaking/field/lives";
const GET_GAME_STATE = "http://localhost:8080/api/bricksbreaking/field/gamestate";
const NEW_GAME_CUSTOM_URL = "http://localhost:8080/api/bricksbreaking/field/customgame";

const getField = () => axios.get(FIELD_URL);
const newGame = (difficulty) => axios.get(`${NEW_GAME_URL}?difficulty=${difficulty}`);
const breakBrick = (x, y) => axios.get(`${BREAK_BRICK_URL}?x=${x}&y=${y}`);
const getScore = () => axios.get(GET_SCORE);
const getLives = () => axios.get(GET_LIVES);
const getGameState = () => axios.get(GET_GAME_STATE);
const newGameCustom = (numColors, rows, cols) => axios.get(`${NEW_GAME_CUSTOM_URL}?numColors=${numColors}&rows=${rows}&cols=${cols}`);

const gameService = {getField, newGame, breakBrick, getScore, getLives, getGameState, newGameCustom};
export default gameService;