import React from 'react';
import gameFieldService from "./services/GameFieldService";

function Tile({ tile, x, y, fetchFieldData }) {
    const handleClick = () => {
        console.log(x, y);

        gameFieldService.breakBrick(x, y)
            .then(response => {
                console.log('Tile destroyed successfully:', response.data);
                fetchFieldData(); // Call fetchFieldData from props
            })
            .catch(error => {
                console.error('Error destroying tile:', error);
            });
    };

    if (!tile) {
        return <td></td>;
    }

    return (
        <td className="tile" data-color={tile.color} onClick={handleClick}>
            <span></span>
        </td>
    );
}

export default Tile;
