import React from 'react';
import gameService from "../../services/GameService";
import Tile from "./Tile";
import "../../css/Field.css";

export default class Field extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            field: { tiles: [] }
        };
    }

    componentDidMount() {
        this.fetchFieldData();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.field !== this.props.field) {
            this.fetchFieldData();
        }
    }

    fetchFieldData() {
        gameService.getField()
            .then(response => {
                this.setState({ field: response.data });
                console.log(response.data);
                this.props.updateStats();
            })
            .catch(error => {
                console.error('Error fetching game field:', error);
            });
    }

    render() {
        const { field } = this.state;
        if (field.tiles == null) {
            return null;
        }
        return (
            <div className="field-container windows-95">
                <table className="game-field">
                    <tbody>
                    {field.tiles.map((row, rowIndex) => (
                        <tr key={rowIndex}>
                            {row.map((tile, colIndex) => (
                                <td key={colIndex}>
                                    <Tile tile={tile} x={colIndex} y={rowIndex} fetchFieldData={this.fetchFieldData.bind(this)} disabled={field.gameState === 'FAILED'} />
                                </td>
                            ))}
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        );
    }
}
