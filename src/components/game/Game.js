import React, { useEffect, useState } from 'react';
import gameService from "../../services/GameService";
import Field from "./Field";
import "../../css/Game.css";
import mainTheme from "../../sounds/main.mp3";
import victorySound from "../../sounds/victory.mp3";
import failSound from "../../sounds/fail.mp3";
import buttonSound from "../../sounds/button.mp3";
import goodSound from "../../sounds/good.mp3";
import badSound from "../../sounds/bad.mp3";
import heartImage from "../../images/heart.png";
import starImage from "../../images/star.png";
import Help from "./Help";
import Confetti from 'react-confetti';
function Game({ user }) {
    const [field, setField] = useState({ tiles: [] });
    const [score, setScore] = useState(0);
    const [lives, setLives] = useState(3);
    const [difficulty, setDifficulty] = useState(1);
    const [gameState, setGameState] = useState('');
    const [rows, setRows] = useState(10);
    const [cols, setCols] = useState(10);
    const [numColors, setNumColors] = useState(5);
    const [isCustomGame, setIsCustomGame] = useState(false);
    const isGuest = user && user.username === 'Guest';
    const [themeAudio] = useState(new Audio(mainTheme));
    const [victoryAudio] = useState(new Audio(victorySound));
    const [failAudio] = useState(new Audio(failSound));
    const [buttonAudio] = useState(new Audio(buttonSound));
    const [showHelp, setShowHelp] = useState(false);
    const [goodAudio] = useState(new Audio(goodSound));
    const [badAudio] = useState(new Audio(badSound));

    const toggleHelp = () => {
        setShowHelp(!showHelp);
    };

    useEffect(() => {
        if (gameState === 'SOLVED' && user != null) {
            uploadScore();
        }
    }, [gameState, user]);

    useEffect(() => {
        if(score === 0) { return }
        goodAudio.currentTime = 0;
        goodAudio.volume = 0.5;
        goodAudio.play().catch((error) => {
            console.error('Error playing good sound effect:', error);
        });
    }, [score, goodAudio]);

    useEffect(() => {
        if(lives === 3) { return }
        badAudio.currentTime = 0;
        badAudio.volume = 0.5;
        badAudio.play().catch((error) => {
            console.error('Error playing bad sound effect:', error);
        });
    }, [lives, badAudio]);

    useEffect(() => {
        themeAudio.volume = 0.1;
        if (gameState === 'PLAYING') {
            themeAudio.play();
            themeAudio.play().then(() => {
                console.log('Music playing');
            }).catch((error) => {
                console.error('Error playing sounds:', error);
            });
        } else if (gameState === 'SOLVED') {
            victoryAudio.volume = 0.1;
            victoryAudio.play();
        } else if (gameState === "FAILED") {
            failAudio.volume = 0.1;
            failAudio.play();
        } else {
            themeAudio.pause();
            themeAudio.currentTime = 0;
        }
        return () => {
            themeAudio.pause();
            themeAudio.currentTime = 0;
            failAudio.pause();
            failAudio.currentTime = 0;
            victoryAudio.pause();
            victoryAudio.currentTime = 0;
        };
    }, [gameState, themeAudio, victoryAudio]);

    const handleButtonClick = () => {
        buttonAudio.volume = 0.5;
        buttonAudio.play().catch((error) => {
            console.error('Error playing button click sound effect:', error);
        });
    };

    const newGame = () => {
        console.log('Classic game: difficulty ' + difficulty);
        gameService.newGame(difficulty)
            .then(response => {
                setField(response.data);
            })
            .catch(error => {
                console.error('Error fetching game field:', error);
            });
    };

    const newCustomGame = () => {
        console.log('Custom game: ' + numColors + ' colors, ' + rows + ' rows, ' + cols + ' cols.');
        gameService.newGameCustom(numColors, rows, cols)
            .then(response => {
                setField(response.data);
            })
            .catch(error => {
                console.error('Error fetching game field:', error);
            });
    };

    const toggleCustomGame = () => {
        setIsCustomGame(!isCustomGame);
    };

    const fetchScore = () => {
        gameService.getScore()
            .then(response => {
                setScore(response.data);
                console.log('Score:' + response.data);
            })
            .catch(error => {
                console.error('Error fetching score:', error);
            });
    }

    const fetchLives = () => {
        gameService.getLives()
            .then(response => {
                setLives(response.data);
                console.log('Lives:' + response.data);
            })
            .catch(error => {
                console.error('Error fetching lives:', error);
            });
    }

    const fetchGameState = () => {
        gameService.getGameState()
            .then(response => {
                setGameState(response.data);
            })
            .catch(error => {
                console.error('Error fetching gamestate:', error);
            });
    }

    const uploadScore = () => {
        if (isGuest) {
            console.log('Score not uploaded. Logged in as guest.');
            return;
        }

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
        fetchGameState();
    };

    return (
        <div className="game-container">
            {gameState === 'SOLVED' && (
                    <Confetti
                        width={window.innerWidth}
                        height={1500}
                    />
            )}
            <div className="game-container2">
                <div className="toolbar">
                    <div className="classic-game">
                        <button onClick={() => {
                            newGame();
                            handleButtonClick();
                        }}>Classic Game
                        </button>
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
                    </div>
                    <div className="custom-game-and-help">
                        <div className="button-container">
                            <button className="custom-game" onClick={() => {
                                toggleCustomGame();
                                handleButtonClick();
                            }}>
                                {isCustomGame ? 'Hide' : 'Custom Game'}
                            </button>
                            <Help/>
                        </div>
                        {isCustomGame && (
                            <>
                                <form>
                                    <label htmlFor="rows">Rows: <text>{rows}</text></label><br/>
                                    <input type="range" id="rows" name="rows" min="5" max="25" value={rows}
                                           onChange={(e) => setRows(parseInt(e.target.value))}/><br/>
                                    <label htmlFor="cols">Cols: <text>{cols}</text></label><br/>
                                    <input type="range" id="cols" name="cols" min="5" max="25" value={cols}
                                           onChange={(e) => setCols(parseInt(e.target.value))}/><br/>
                                    <label htmlFor="numColors">Colors: <text>{numColors}</text></label><br/>
                                    <input type="range" id="numColors" name="numColors" min="2" max="8"
                                           value={numColors}
                                           onChange={(e) => setNumColors(parseInt(e.target.value))}/><br/>
                                </form>
                                <button onClick={() => {
                                    newCustomGame();
                                    handleButtonClick();
                                }}>
                                    Start Custom Game
                                </button>
                            </>
                        )}
                    </div>
                </div>
                <div className="field-container">
                    <div className="score">
                        <h3>{score}
                            <header className="star">
                                <img src={starImage} alt="Star"/>
                            </header>
                        </h3>
                    </div>
                    {gameState === 'SOLVED' && (
                        <div className="you-won-message">You Won!</div>
                    )}
                    {gameState === 'FAILED' && (
                        <div className="you-lost-message">You Lost!</div>
                    )}
                    <Field field={field} updateStats={updateStats}/>
                    <div className="lives">
                        <h3>{lives}
                            <header className="heart">
                                <img src={heartImage} alt="Heart"/>
                            </header>
                        </h3>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Game;
