import Position from "./position";

class RB extends Position{
    constructor() {
        super('RB')
    }
    
    static check(position) {
        return position instanceof RB;
    }
}

export default RB