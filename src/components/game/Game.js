import './style.css'

import React, { useState } from 'react';
import gameFieldService from "../services/GameFieldService";
import Field from "./Field";

function Game() {
    const [field, setField] = useState({ tiles: [] });
    const [score, setScore] = useState(0);
    const [lives, setLives] = useState(3);
    const [difficulty, setDifficulty] = useState(1);

    const newGame = () => {
        console.log(difficulty);
        gameFieldService.newGame(difficulty)
            .then(response => {
                setField(response.data);
            })
            .catch(error => {
                console.error('Error fetching game field:', error);
            });
    };

    const fetchScore = () => {
        gameFieldService.getScore()
            .then(response => {
                setScore(response.data);
                console.log(response);
            })
            .catch(error => {
                console.error('Error fetching score:', error);
            });
    }

    const fetchLives = () => {
        gameFieldService.getLives()
            .then(response => {
                setLives(response.data);
                console.log(response);
            })
            .catch(error => {
                console.error('Error fetching lives:', error);
            });
    }

    const updateStats = () => {
        fetchScore();
        fetchLives();
    }

    return (
        <div className="game-container">
            <div>
                <h1>Bricks Breaking</h1>
                <div className="toolbar">
                    <h3>Score: {score} Lives: {lives} </h3>
                    <label htmlFor="difficulty">Difficulty:</label>
                    <select
                        id="difficulty"
                        value={difficulty}
                        onChange={(e) => setDifficulty(parseInt(e.target.value))}
                    >
                        <option value={0}>Easy</option>
                        <option value={1}>Medium</option>
                        <option value={2}>Hard</option>
                    </select>
                    <button onClick={newGame}>
                        New Game
                    </button>
                </div>
                <header className="GameFieldComponent">
                    <Field field={field} updateStats={updateStats} />
                </header>
            </div>
        </div>
    );
}

export default Game;
