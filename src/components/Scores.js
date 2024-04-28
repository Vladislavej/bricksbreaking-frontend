import React from 'react';
import axios from 'axios';
import "../css/Scores.css"; // Import the CSS file for styling

const SCORES_API_REST_URL = "http://localhost:8080/api/score/bricksbreaking";

export default class Scores extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            scores: []
        };
    }

    componentDidMount() {
        axios.get(SCORES_API_REST_URL)
            .then(response => {
                this.setState({ scores: response.data });
            })
            .catch(error => {
                console.error('Error fetching scores:', error);
            });
    }

    formatDate(dateString) {
        const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
        const formattedDate = new Date(dateString).toLocaleDateString('sk', options);
        return formattedDate;
    }

    render() {
        return (
            <div>
                <h2 className="text-center">Scores</h2>
                <table className="table table-striped scores-table">
                    <thead>
                    <tr>
                        <th>Player</th>
                        <th>Points</th>
                        <th>Date</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.state.scores.map(score =>
                        <tr key={score.id}>
                            <td>{score.player}</td>
                            <td>{score.points}</td>
                            <td>{this.formatDate(score.playedOn)}</td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>
        );
    }
}
