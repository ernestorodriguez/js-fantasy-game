class Lineup {
    constructor(positions) {
        this.positions = positions;
    }
    
    add(player) {
       return this.positions.find((position) => position.assignPlayer(player));
    }
    
    toObject() {
        const positions = this.positions.map((position) => {
            return position.toObject()
        })
        return JSON.parse(JSON.stringify({ positions }));
    }
}


export default Lineup