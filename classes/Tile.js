class Tile {
  constructor(glyph, walkable) {
    this._glyph = glyph;
    this._walkable = walkable;
    
  }
  getGlyph = () => this._glyph;
  isWalkable = () => this._walkable;
}

export default Tile;
