class Creature
{
    constructor(tile, x, y, map) {
        this._tile = tile;
        this._x = x;
        this._y = y;
        this._map = map;

    }

    move = (x, y) => {
        if (!map.getTile(x, y).isWalkable()){
            return;
        }
        if (map.hitEnemy(x, y) != null)
        {
            let enemy = map.hitEnemy(x,y);

        }
        console.log("x:" + x + " y:" + y);

        this._x = x;
        this._y = y;

    }

    
    render = (display) => {
        display.draw(
            this._x,
            this._y,
            this._tile.getGlyph().getChar(),
            this._tile.getGlyph().getForeground(),
            this._tile.getGlyph().getBackground()
          );
    }

    getX = () => this._x;
    getY = () => this._y;
    getGlyph = () => {return this._tile.getGlyph();}
}

export default Creature;