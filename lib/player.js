class Player {
    constructor({ position, name, salary }) {
        this.name = name
        this.typePosition = position;
        this.assigned = false;
        this.salary = salary;
    }
    assignTo(position) {
        return !this.assigned && position.doIfIsAssignable(this.typePosition, () => {
            this.assigned = true;
            position.addPlayer(this)
        });
    }
    
    toObject() {
        return {
            player: this.name,
            salary: this.salary,
        }  
    }
    challenge() {
        return this;
    }
}


export default Player;