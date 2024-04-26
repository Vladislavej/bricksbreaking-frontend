import React from 'react';
import gameFieldService from "./services/GameFieldService";

function Tile({ tile, x, y, fetchFieldData, disabled}) {
    const handleClick = () => {
        if (!disabled) {
            gameFieldService.breakBrick(x, y)
                .then(response => {
                    console.log('Tile destroyed successfully:', x, y);
                    fetchFieldData();
                })
                .catch(error => {
                    console.error('Error destroying tile:', error);
                });
        }
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
