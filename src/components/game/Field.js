import React from 'react';
import gameFieldService from "./services/GameFieldService";
import Tile from "./Tile";


export default class Field extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            field: { tiles: [] } // Initialize field with an empty tiles array
        };
    }

    componentDidMount() {
        // Fetch the game field data from the backend API
        gameFieldService.getField()
            .then(response => {
                // Update component state with received field data
                this.setState({ field: response.data });
            })
            .catch(error => {
                console.error('Error fetching game field:', error);
            });
    }

    render() {
        const { field } = this.state;

        return (
            <div>
                <h2 className="text-center">Game Field</h2>
                <div className="game-field">
                    {field.tiles.map((row, rowIndex) => (
                        <div key={rowIndex} className="row">
                            {row.map((tile, colIndex) => (
                                <Tile tile={tile}/>
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        );
    }
}
