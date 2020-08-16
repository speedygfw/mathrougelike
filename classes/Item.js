class Item {
    constructor(tile, x, y) {
        this._tile = tile;
        this._x = x;
        this._y = y;
        this._pickable = true;
    }

    pick(plr){

    }
    getX = () => this._x;
    getY = () => this._y;
    getGlyph = () => {return this._tile.getGlyph();}

}

export default Item;