function Tile({tile}) {
    let tileClass;
    tileClass = tile.color.charAt(0);

    return (
     <td className={tileClass}>
        <span>{tile.color.charAt(0)}</span>
     </td>
    )
}
export default Tile;