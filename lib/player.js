class Player {
    constructor({ position, name, salary }) {
        this.name = name
        this.typePosition = position;
        this.assigned = false;
        this.salary = salary;
    }
    assignTo(position) {
        const isAssignable = this.typePosition.check(position) && !this.assigned;
        if(isAssignable) {
            this.assigned = true;
            position.addPlayer(this)
        }
        return isAssignable;
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