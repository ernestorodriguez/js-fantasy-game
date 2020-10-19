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

    doIfIsAssignable(positionClass, cb) {
        const isAssignable = this.assignedPlayer instanceof NullPlayer && this instanceof positionClass;
        if (isAssignable) {
            cb();
        }
        return isAssignable;
    }
}

export  default  Position;