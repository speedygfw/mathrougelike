class Player {
    constructor(tile, x, y) {
        this._tile = tile;
        this._x = x;
        this._y = y;
        this._hp = 100;
        this._name = "Adventurer";

    }
    fight = (enemy, map) => {
        let one = Math.floor(Math.random() * 10) +1;
        let two = Math.floor(Math.random() * 10) +1;
        let answer = prompt("What is "+ one +"+" + two + "?");
            if (answer == (one + two)){
                console.log("right answer in");
                return true;
            } else {
                console.log("wrong answer.");
                this._hp -= 10;
                return false;
            }

    }
    move = (x, y, map) => {
        if (!map.getTile(x, y).isWalkable()){
            console.log("Not walkable: " + map.getTile(x, y).getGlyph());
            
            return;
        }
        if (map.enemyHit(x, y) != null)
        {
            console.log("fight agains enemy...");
            let enemy = map.enemyHit(x,y);
            let result = this.fight(enemy, map);
            if (result == false){
                return;
            }

        } else {
            console.log("no enemy spotted.");
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
          let el = "<b>Name:" + this._name + " HP:" + this._hp + "</b>"
          document.getElementById('hp').innerHTML= el;
    }

    getX = () => this._x;
    getY = () => this._y;
}

export default Player;