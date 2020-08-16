// Tile options
import Tile from "../classes/Tile.js";
import Glyph from "../classes/Glyph.js";
export const NULL_TILE = new Tile(new Glyph(), false);
export const FLOOR_TILE = new Tile(new Glyph("."), true);
export const WALL_TILE = new Tile(new Glyph("#", "goldenrod"), false);
export const PLAYER_TILE = new Tile(new Glyph("@"), null);
export const OUT_TILE = new Tile(new Glyph(">"), true);
export const IN_TILE = new Tile(new Glyph("<"), true);
export const GOLD_TILE = new Tile(new Glyph("$", 'gold'), true);
//Key Data
export const KEYDOWN = "keydown";
export const KEYUP = "keyup";
export const KEYPRESS = "keypress";

//Game options
export const HEIGHT = 40;
export const WIDTH = 90;
