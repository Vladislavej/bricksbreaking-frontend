function Tile({ tile }) {
    return (
        <td className="tile" data-color={tile.color}>
            <span></span>
        </td>
    );
}

export default Tile;