import React from 'react';
import gameFieldService from "./services/GameFieldService";
import Tile from "./Tile";


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
        gameFieldService.getField()
            .then(response => {
                this.setState({ field: response.data });
            })
            .catch(error => {
                console.error('Error fetching game field:', error);
            });
    }

    render() {
        const { field } = this.state;
        return (
            <div className="field-container">
                <div>
                    <div className="toolbar">
                        <h3>State: {field.gameState}</h3>
                    </div>
                </div>
                <table className="game-field">
                    <tbody>
                    {field.tiles.map((row, rowIndex) => (
                        <tr key={rowIndex}>
                            {row.map((tile, colIndex) => (
                                <td key={colIndex}>
                                    <Tile tile={tile}/>
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
