import NullPlayer from "../nullPlayer";

class Position {
    constructor(name) {
        this.name = name;
        this.assignedPlayer = new NullPlayer();
    }
    assignPlayer(player) {
        return player.assignTo(this);
    }
    
    addPlayer(player) {
        this.assignedPlayer = this.assignedPlayer.challenge(player);
    }
    
    toObject() {
        return {
            name: this.name,
            ...this.assignedPlayer.toObject(),
        }
    }
}

export  default  Position;