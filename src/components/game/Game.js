import './style.css'

import React, { useState } from 'react';
import gameFieldService from "./services/GameFieldService";
import Field from "./Field";

function Game() {
    const [field, setField] = useState({ tiles: [] });

    const newGame = () => {
        gameFieldService.newGame()
            .then(response => {
                setField(response.data);
            })
            .catch(error => {
                console.error('Error fetching game field:', error);
            });
    };

    return (
        <div className="game-container">
            <div>
                <h1>Bricks Breaking</h1>
                <div className="toolbar">
                    <h3>Score:  Lives:</h3>
                    <button onClick={newGame}>
                        New Game
                    </button>
                </div>
                <header className="GameFieldComponent">
                    <Field field={field}/>
                </header>
            </div>
        </div>
    );
}

export default Game;
