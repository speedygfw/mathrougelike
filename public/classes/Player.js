import Helpers from "./Helpers.js";

class Player {
    constructor(tile, x, y) {
        this._tile = tile;
        this._x = x;
        this._y = y;
        this._hp = 100;
        this._ap = 20;
        this._name = "Adventurer";
        this._rip = false;
        this._level = 1;
        this._items = [];
        

    }
    setPosition = (x, y) =>{
        this._x = x;
        this._y = y;
    }
    fight = (enemy, map) => {
        let one = Math.floor(Math.random() * (parseInt(map.getLevel()) * 10)) +1;
        let two = Math.floor(Math.random() * (parseInt(map.getLevel()) * 10)) +1;
        let answer = prompt("What is "+ one + enemy.getArithmeticSymbol() + two + "?");
        let answer_right;
        let is_right = false;
        let arithmeticS = enemy.getArithmeticSymbol();
        switch(arithmeticS)
        {
            case "+":
                answer_right = (one + two)
                is_right = answer == answer_right;
                break;
            case "-":
                answer_right = (one - two);
                is_right = answer == answer_right;
                break;
            case "*":
                answer_right = (one*two);
                is_right = answer == answer_right;
                break;
        }
        
            if (is_right){
                let msg = "right answer: " + one + enemy.getArithmeticSymbol() + two +"=" + answer
                Helpers.message(msg);
                Helpers.serverMessage(msg);
                enemy.hit(this);
                if (enemy.isDeath()){
                    map.deleteCreature(enemy);
                }

                return true;
            } else {
                let msg = "wrong answer: " + one + enemy.getArithmeticSymbol() + two +"=" + answer;
                Helpers.message(msg);
                Helpers.serverMessage(msg);
                Helpers.message("right answer is: " + answer_right);
                Helpers.serverMessage("right answer is: " + answer_right);
                this.hit(enemy);
                if (this.isDeath()){
                    Helpers.serverMessage(this.getName() + " died.");
                }
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
            Helpers.serverMessage(this.getName() + " fight against enemy...");
            let enemy = map.enemyHit(x,y);
            let result = this.fight(enemy, map);
            if (result == false){
                return;
            }

        } else {
            //console.log("no enemy spotted.");
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

    hit = (player) => {
        
        this._hp -= player.getAP();

        if (this._hp <= 0)
        {
            this._rip = true;
        }
        let msg = player.getName() + " hits " + this.getName() + " with " + player.getAP();
        Helpers.message(msg);
        Helpers.serverMessage(msg);

        if (this._rip){
            Helpers.message(player.getName() + " is death. ");
        }
    }

    pickUp = (item) => {
        
    }
    setName = (name) => this._name = name;
    getX = () => this._x;
    getY = () => this._y;
    getName = () => this._name;
    getHP = () => this._hp;
    getAP = () => this._ap;
    isDeath = () => this._rip;
    getLevel = () => this._level;

}

export default Player;