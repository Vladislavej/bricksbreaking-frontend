import React, { useState } from 'react';
import axios from 'axios';
import "../css/Scores.css";

const SCORES_API_REST_URL = "http://localhost:8080/api/score/bricksbreaking";

export default function Scores() {
    const [showScores, setShowScores] = useState(false);
    const [scores, setScores] = useState([]);

    const toggleScores = () => {
        if (!showScores) {
            axios.get(SCORES_API_REST_URL)
                .then(response => {
                    setScores(response.data);
                    setShowScores(true);
                })
                .catch(error => {
                    console.error('Error fetching scores:', error);
                });
        } else {
            setShowScores(false);
        }
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleString('en', {
            year: 'numeric', month: '2-digit', day: '2-digit',
            hour: '2-digit', minute: '2-digit'
        });
    };

    return (
        <div className="scores-container">
            <button className="showButton" onClick={toggleScores}>Scoreboard</button>
            <div className={`scores-overlay ${showScores ? 'active' : ''}`}>
                <div className="scores-window">
                    <div>
                        <h2>Top 10 High-Scores <button className="close-scores-button" onClick={toggleScores}>X</button></h2>
                    </div>
                    <table className="scores-table">
                        <thead>
                        <tr>
                            <th>Player</th>
                            <th>Points</th>
                            <th>Date</th>
                        </tr>
                        </thead>
                        <tbody>
                        {scores.map(score =>
                            <tr key={score.id}>
                                <td>{score.player}</td>
                                <td>{score.points}</td>
                                <td>{formatDate(score.playedOn)}</td>
                            </tr>
                        )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}