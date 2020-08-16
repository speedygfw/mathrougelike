import Helpers from "./Helpers.js";

class Creature
{

    constructor(name, level, tile, x, y, map) {
        this._tile = tile;
        this._x = x;
        this._y = y;
        this._map = map;
        this._level = 1;
        this._hp = 20 * this._level;
        this._ap = 20 * this._level;
        this._rip = false;
        this._name = name;
        this._level = level;

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

    hit = (enemy) => {
        
        this._hp -= enemy.getAP();

        if (this._hp <= 0)
        {
            this._rip = true;
        }
        Helpers.message(enemy.getName() + " hits "+ this.getName() +  " with " + enemy.getAP());
        if (this._rip)
            Helpers.message(enemy.getName() + " killed " + this.getName() + ".");
    }


    getX = () => this._x;
    getY = () => this._y;
    getGlyph = () => {return this._tile.getGlyph();}
    getName = () => this._name;
    getHP = () => this._hp;
    getAP = () => this._ap;
    isDeath = () => this._rip;
    getLevel = () => this._level;
    getArithmeticSymbol = () => {
        let char = this._tile.getGlyph().getChar();
        switch(char)
        {
            case "p":
                return "+";
                break;
            case "m":
                return "-";
                break;
            case "M":
                return "*";
                break;
        }
    }
    setAStar(astar){
        this._astar = astar;
    }
    playerUpdate(){
        
    }
}

export default Creature;