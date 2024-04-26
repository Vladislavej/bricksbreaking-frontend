import React from 'react';
import axios from 'axios';

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

    render() {
        return (
            <div>
                <h2 className="text-center">Scores</h2>
                <table className="table table-striped">
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
                            <td>{score.playedOn}</td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>
        );
    }
}
