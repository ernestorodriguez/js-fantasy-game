import Position from "./position";

class QB extends Position{
    constructor() {
        super('QB')
    }
    
    static check(position) {
        return position instanceof QB;
    }
}

export default QB