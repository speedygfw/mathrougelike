import Tile from "./Tile.js";
import Glyph from "./Glyph.js";
import { NULL_TILE, WIDTH, HEIGHT, WALL_TILE } from "../assets/types.js";
import { Color, KEYS, Map, FOV } from "../lib/index.js";

var instance = null;
class GameMap {
  _tiles = null;
  constructor(tiles, creatures, player) {
    this._tiles = tiles;
    this._creatures = creatures;
    this._width = tiles.length;
    this._height = tiles[0].length;
    this._player = player;
    this._useFOV = true;
    this._level = 5;
    //this.lightPasses.bind({tiles: this._tiles})
    this._fov = new FOV.PreciseShadowcasting(this.lightPasses);
    instance = this;
  }

  getWidth = () => this._width;
  getHeight = () => this._height;


  enemyHit = (x, y) => {
    //console.log("enemy hit called. creatures to check: " + this._creatures.length);
    for(let n=0; n < this._creatures.length; n++)
    {
      //console.log("creature x: " + this._creatures[n].getX() + " y: " + this._creatures[n].getY());
      if (this._creatures[n].getX() == x && this._creatures[n].getY() == y){
        return this._creatures[n];
      }

      
    }

    return null;
  }

  getTile = (x, y) => {
    if (x < 0 || x >= this._width || y < 0 || y >= this._height) {
      return NULL_TILE;
    } else {
     
      return this._tiles[x][y] || NULL_TILE;
    }
  };
  getCreature = (x, y) => {
    for (let n=0; n < this._creatures.length; n++)
    {
      let c = this._creatures[n];
      if (c.getX() == x && c.getY() == y)
        return c;
    }
    return null;
  };

  deleteCreature(c){
    for (let n=0; n<this._creatures.length; n++)
    {
      if (this._creatures[n] == c)
      {
        this._creatures.splice(n, 1);
        return;
      }
    }
  }
  
  
  /* input callback */
  lightPasses(x, y) {
    
    if (x < 0 || x >= instance._width || y < 0 || y >= instance._height) {
      return false;
    }
    if (instance.getTile(x,y) == WALL_TILE)
    {
      return false;
    }
    //console.log(x, y);
    //console.log(tiles);
    return true;
  }
  renderMap = (display) => {
    var t = this.getTile;
    var ct = this.getCreature;
    if (this._useFOV){
    this._fov.compute(this._player.getX(), this._player.getY(), 10, function(x, y, r, visibility) {
      var ch = (r ? "" : "@");
      
      let map_glyph = t(x,y).getGlyph();
      let c_tile = ct(x,y);

      //var color = (data[x+","+y] ? "#aa0": "#660");
      display.draw(x, y, map_glyph.getChar(), map_glyph.getForeground(), map_glyph.getBackground());
      if (c_tile) {
        //console.log(c_tile);
        let c_glyph = c_tile.getGlyph();
        display.draw(x, y, c_glyph.getChar(), c_glyph.getForeground(), c_glyph.getBackground());
      }
  });
} else {
      for (let x = 0; x < this.getWidth(); x++) {
        for (let y = 0; y < this.getHeight(); y++) {
          let glyph = this.getTile(x, y).getGlyph();
          display.draw(
            x,
            y,
            glyph.getChar(),
            glyph.getForeground(),
            glyph.getBackground()
          );
        }
      
      }
      this.renderCreatures(display);
  } 
 // var data = {};
  //var display = display;
/* new Map.Uniform(WIDTH, HEIGHT).create(function(x, y, type) {
    data[x+","+y] = type;
    let char = "";
    console.log(type)
    if (type == 1)
      char = '#';
    else
      char = '.';
    display.draw(x, y, char);
}); */

  }
  renderCreatures = (display) => {
    console.log("creatures to render:" + this._creatures.length)
    let deaths = [];
    for (let n=0; n < this._creatures.length; n++)
    {
      let c = this._creatures[n];
      console.log('is death: ' + c.isDeath());
      if (c.isDeath())
      {
        console.log("is death = true. delete creature...");
        delete this._creatures[n];
      }
      
      c.render(display);
    }
    
  }
  setFOV(fov) {this._fov = fov;}
  getFOV = () => this._fov;
  setLevel(level) {this._level = level;}
  getLevel = () => this._level;
}

export default GameMap;
