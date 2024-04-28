import '../../css/Style.css'

import React, {useEffect, useState} from 'react';
import gameService from "../../services/GameService";
import Field from "./Field";

function Game({ user }) {
    const [field, setField] = useState({ tiles: [] });
    const [score, setScore] = useState(0);
    const [lives, setLives] = useState(3);
    const [difficulty, setDifficulty] = useState(1);
    const [gameState, setGameState] = useState('');

    useEffect(() => {
        if (gameState === 'SOLVED' && user != null) {
            uploadScore();
        }
    }, [gameState, user]);

    const newGame = () => {
        console.log(difficulty);
        gameService.newGame(difficulty)
            .then(response => {
                setField(response.data);
            })
            .catch(error => {
                console.error('Error fetching game field:', error);
            });
    };

    const fetchScore = () => {
        gameService.getScore()
            .then(response => {
                setScore(response.data);
                console.log(response);
            })
            .catch(error => {
                console.error('Error fetching score:', error);
            });
    }

    const fetchLives = () => {
        gameService.getLives()
            .then(response => {
                setLives(response.data);
                console.log(response);
            })
            .catch(error => {
                console.error('Error fetching lives:', error);
            });
    }

    const fetchGameState = () => {
        gameService.getGameState()
            .then(response => {
                setGameState(response.data);
                console.log(response);
            })
            .catch(error => {
                console.error('Error fetching gamestate:', error);
            });
    }

    const uploadScore = () => {
        const newScore = {
            player: user.username,
            game: 'bricksbreaking',
            points: score,
            playedOn: new Date()
        };

        fetch('http://localhost:8080/api/score', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newScore)
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to upload score');
                }
                console.log('Score uploaded successfully');
            })
            .catch(error => {
                console.error('Error uploading score:', error);
            });
    };

    const updateStats = () => {
        fetchScore();
        fetchLives();
        fetchGameState()
    }

    return (
        <div className="game-container windows-95">
            <div>
                <div className="toolbar">
                    <h3>Score: {score} Lives: {lives} State: {gameState}</h3>
                    <label htmlFor="difficulty"></label>
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
