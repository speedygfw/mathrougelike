import GameScreen from "../classes/GameScreen.js";
import { HEIGHT, WIDTH } from "./types.js";
import Helpers from "../classes/Helpers.js";

//  Options passed when we initialize our display object
//var tileSet = document.createElement("img");
//tileSet.src = "tiles.gif";

let options = {
  //bg: "transparent",
    //layout: "tile",
 /*    tileWidth: 32,
    tileHeight: 32,
    tileSet: tileSet,
    tileMap: {
        "@": [0, 128],
        "#": [128, 5*32],
        ".": [0, 0],
        "P": [0, 128],
        "<": [0, 256],
        ">": [0, 292],
        " ": [0, 0]
    }, */
  width: WIDTH,
  height: HEIGHT
};
// Wait for window to load before rendering
window.onload = () => {
  //initialize a gamescreen and append it to the DOM.
  document.mrl = {}

  let game = new GameScreen(options);
  document.mrl.gameScreen = game;
  document.mrl.Helpers = Helpers;

  let el = document.getElementById("game");
  el.appendChild(game.getDisplay().getContainer());
  game.switchScreen(game.startScreen);
};
