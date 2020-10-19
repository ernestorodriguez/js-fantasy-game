import Position from "./position";
import RB from "./RB";
import WR from "./WR";
import TE from "./TE";

class FLEX extends Position{
    constructor() {
        super('FLEX')
    }
    
    doIfIsAssignable(positionClass, cb) {
        const isRBAssignable = positionClass === RB;
        const isWRAssignable = positionClass === WR;
        const isTEAssignable = positionClass === TE;
        const isAssignable = isRBAssignable || isWRAssignable || isTEAssignable;
         if (isAssignable) {
            cb();
        }
        return isAssignable;
    }
    
}

export default FLEX