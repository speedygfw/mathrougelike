import { Color, KEYS, Map, FOV } from "../lib/index.js";
import Game from "./Game.js";
import Player from "./Player.js";
import Helpers from "./Helpers.js";

import {
  KEYDOWN,
  HEIGHT,
  WIDTH,
  NULL_TILE,
  FLOOR_TILE,
  WALL_TILE,
  PLAYER_TILE,
  OUT_TILE,
  IN_TILE,
  GOLD_TILE
} from "../assets/types.js";
// import Tile from "./Tile.js";
// import Glyph from "./Glyph.js";
import GameMap from "./GameMap.js";
import Tile from "./Tile.js";
import Glyph from "./Glyph.js";
import Creature from "./Creature.js";
import Item from "./Item.js";

/* GameScreen handles all Screen management for the Game object */
class GameScreen extends Game {
  /*
   * Inherit _display and _currentScreen properties from Game.
   */
  constructor(options = { width: WIDTH, height: HEIGHT }) {
    super(options);
    this._player = null;

  }

  /*
   * When we switch screens we need to notify old screens of change.
   * @param screen - The screen you wish to change to
   */
  switchScreen = screen => {
    //before switching screen call exit to indicate a change
    if (this._currentScreen !== null) {
      this._currentScreen.exit();
    }
    //clear screen and change current screen to new
    this.getDisplay().clear();
    this._currentScreen = screen;
    if (!this._currentScreen !== null) {
      this._currentScreen.enter();
      this._currentScreen.render(this._display);
    }
  };
  
  generateRandomMap()
  {
    let map = this.initMap();

      let generator = new Map.Cellular(WIDTH, HEIGHT);
    generator.randomize(0.5);

      let totalIterations = 30;
      for (let i = 0; i < totalIterations - 1; i++) {
        generator.create();
      }

      generator.create((x, y, v) => {
      
        // generate floor title
        if (v === 1) {
          map[x][y] = FLOOR_TILE;
        } else {
          map[x][y] = WALL_TILE;
        }
      });
      
      this.placePlayerOnMap(map);
      this.placeExitOnMap(map);
        
     
      return map;
  };

  generateRandomDungeon()
  {
    let map = this.initMap();

    new Map.Uniform(WIDTH, HEIGHT).create(function(x, y, type) {
      
      let tile = "";
      
      if (type == 1)
        tile = WALL_TILE;
      else
        tile = FLOOR_TILE;
      map[x][y] = tile;
      //display.draw(x, y, char);
    });

    this.placePlayerOnMap(map);
    this.placeExitOnMap(map);

    return map;
    
  };

  placeExitOnMap(map){
    let outCoords = this.getRandomPlace(map);
    map[outCoords[0]][outCoords[1]] = OUT_TILE;
  };

  placePlayerOnMap(map)
  {
    let coords = this.getRandomPlace(map);
    map[coords[0]][coords[1]] = IN_TILE;
    if (this._player == null)
      this._player = new Player(PLAYER_TILE, coords[0], coords[1]);
    else
      this._player.setPosition(coords[0], coords[1])

  };

  initMap()
  {
    let map = [];
    for (let x = 0; x < WIDTH; x++) {
      map.push([]);
      for (let y = 0; y < HEIGHT; y++) {
        map[x].push(NULL_TILE);
      }
    }
    return map;
  };

  getRandomPlace(map)
  {
    let ready = false;
    while(ready == false)
    {
      let rndX = Math.floor(Math.random() * WIDTH);
      let rndY = Math.floor(Math.random() * HEIGHT);
      let coord = [];
      if (map[rndX][rndY] == FLOOR_TILE)
      {
        return[rndX, rndY];
        xxx = true;
      }
    }
  }
  /*
   * Start Screen will be a placeholder for our game's main menu.
   */
  startScreen = {
    enter: () => {
      console.log("Entered start screen");
    },
    exit: () => {
      console.log("Exited start screen");
    },
    render: display => {
      display.drawText(1, 1, "%c{yellow}Mathrougelike!");
      display.drawText(1, 2, "Press [Enter] to start!");
    },
    handleInput: (inputType, inputData) => {
      if (inputType === KEYDOWN) {
        if (inputData.keyCode === KEYS.VK_RETURN) {
          this.switchScreen(this.playScreen);
        } 
      }
    }
  };
  switchMap(level){
    let creatures = []
    let items = []

    let map = this.generateRandomDungeon();
    for(let n=0; n < 10; n++)
      {
        let coords = this.getRandomPlace(map);
        let chars = ["p", "m", "M"];
        let rnd_chars = Math.floor(Math.random() * chars.length);
        let g = new Tile(new Glyph(chars[rnd_chars]),true);
        let mname = "";
        
        switch (chars[rnd_chars])
        {
          case "p":
            mname = "plus";
            break;
          case "m":
            mname = "minus";
            break;
          case "M":
            mname = "multiple";
            break;
        }
        mname += " " + level;

        let c = new Creature(mname, level, g, coords[0], coords[1], map);
        creatures.push(c);
      }
      for (let i=0; i < 10; i++){
        let coords = this.getRandomPlace(map);
        let item = new Item(GOLD_TILE, coords[0], coords[1]);
        items.push(item);
      }
      this._map = new GameMap(map, level, creatures, items,  this._player);
      document.mrl.player = this._player || null;
      document.mrl.map = this._map;
  }
  initLevel(){
      this.switchMap(1);
      
      
      
      
  }
  renderStats(){
    let el = "Name:" + this._player.getName() + " "
    + "Map:" + this._map.getLevel()+ " "
    + "HP:" + this._player.getHP()+ " "
    document.getElementById('hp').innerHTML= el;
  }
  
  /*
  * Play screen currently takes either Enter or Escape keyboard inputs,
  and switches screen accordingly. 
  */
  playScreen = {
    
    enter: () => {
      console.log("Entered play screen");
      this.initLevel();
      Helpers.message("Welcome to Math Rougelike.");
      Helpers.message("Those who are any good at mental arithmetic");
      Helpers.message("will be the heroes of our time.");
      //this._map.setFOV(new FOV.PreciseShadowcasting(this.lightPasses));

    },
    exit: () => {
      console.log("Exited play screen");
    },
    
    render: display => {

      this._map.renderMap(display);
      //this._map.renderCreatures(display);
      this._player.render(display);
      this.renderStats();
      Helpers.drawMessages();

      
    },
    handleInput: (inputType, inputData) => {
      if (inputType === KEYDOWN) {
        if (inputData.keyCode === KEYS.VK_ESCAPE) {
          this.switchScreen(this.loseScreen);
        } else if (inputData.keyCode == KEYS.VK_W){
          this._player.move(this._player.getX(), this._player.getY()-1, this._map)
          this._currentScreen.render(this._display);
        } else if (inputData.keyCode == KEYS.VK_S){
          this._player.move(this._player.getX(), this._player.getY()+1, this._map)
          this._currentScreen.render(this._display);
        } else if (inputData.keyCode == KEYS.VK_A){
          this._player.move(this._player.getX()-1, this._player.getY(), this._map)
          this._currentScreen.render(this._display);
        } else if (inputData.keyCode == KEYS.VK_D){
          this._player.move(this._player.getX()+1, this._player.getY(), this._map)
          this._currentScreen.render(this._display);
        } else if (inputData.keyCode == KEYS.VK_RETURN){
          let x = this._player.getX();
          let y = this._player.getY();
          let c = this._map.getTile(x, y);
          
          if (c == OUT_TILE){
            this.switchMap(this._map.getLevel()+1)
            this._display.clear();
            this._currentScreen.render(this._display);
          }
        } else if (inputData.keyCode == KEYS.VK_ALT){
            this._map.pickUp();
        }

        if (this._map.getPlayer().isDeath()){
          this.switchScreen(this.loseScreen);
        }
      }
    },
    map: null
  };
  
  /*
   * Win screen is our win condition screen, later we can implement highscore values.
   */
  winScreen = {
    enter: () => {
      console.log("Entered win screen");
    },
    exit: () => {
      console.log("Exited win screen");
    },
    render: display => {
      let r, g, b, background;
      for (let i = 0; i < 22; i++) {
        r = Math.round(Math.random() * 255);
        g = Math.round(Math.random() * 255);
        b = Math.round(Math.random() * 255);
        background = Color.toRGB([r, g, b]);
        display.drawText(2, i + 1, "%b{" + background + "}You win!");
      }
    },
    handleInput: (inputType, inputData) => {}
  };

  /*
   * Identical to win screen, however requires different conditions.
   */
  loseScreen = {
    enter: () => {
      console.log("Entered lose screen");
    },
    exit: () => {
      console.log("Exited lose screen");
    },
    render: display => {
        display.drawText(2, 1, "%b{red}You lose! :(");
    },
    handleInput: (inputType, inputData) => {}
  };
}

export default GameScreen;
