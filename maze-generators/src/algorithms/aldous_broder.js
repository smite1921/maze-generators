
export default class AldousBroder {

    init(size, TOP, BOTTOM, LEFT, RIGHT) {
        this.size = size;
        this.TOP = TOP;
        this.BOTTOM = BOTTOM;
        this.LEFT = LEFT;
        this.RIGHT = RIGHT;
        
        this.i = Math.floor((Math.random() * (size*size)) + 0);
        this.unvisted = size * size;
        this.done = false;
    }
    
    reset() {
        this.i = Math.floor((Math.random() * (this.size*this.size)) + 0);
        this.unvisted = this.size * this.size;
        this.done = false; 
    }

    status() {
        return this.done;
    }

    _getRandomDir() {
        let [row, col] = [Math.floor(this.i/this.size), this.i % this.size];
        
        // Corner Cases
        let randomDir = Math.floor((Math.random() * 2) + 0);
        // Top left corner
        if ((row === 0) && (col === 0)) {
            return randomDir ? this.RIGHT : this.BOTTOM;
        }
        // Top right corner
        if ((row === 0) && (col === (this.size - 1))) {
            return randomDir ? this.LEFT : this.BOTTOM;
        }
        // Bottom left corner
        if ((row === (this.size - 1)) && (col === 0)) {
            return randomDir ? this.RIGHT : this.TOP;
        }
        // Bottom right corner
        if ((row === (this.size - 1)) && (col === (this.size - 1))) {
            return randomDir ? this.LEFT : this.TOP;
        }

        // Edge Cases
        randomDir = Math.floor((Math.random() * 3) + 0)
        // Top Row
        if (row === 0) {
            return (randomDir === 0) ? this.LEFT : (randomDir === 1) ? this.BOTTOM : this.RIGHT;
        }
        // Top column
        if (col === 0) {
            return (randomDir === 0) ? this.TOP : (randomDir === 1) ? this.RIGHT : this.BOTTOM;
        }
        // Bottom row
        if (row === (this.size - 1)) {
            return (randomDir === 0) ? this.LEFT: (randomDir === 1) ? this.TOP : this.RIGHT;
        }
        // Bottom column 
        if (col === (this.size - 1)) {
            return (randomDir === 0) ? this.TOP : (randomDir === 1) ? this.LEFT : this.BOTTOM;
        }

        // Normal case
        randomDir = Math.floor((Math.random() * 4) + 0)
        return randomDir;
        
    } 

    _getNeighbourRef(dir, refArray) {
        const arrayShift = (dir === this.TOP) ? (this.i-this.size) : (dir === this.BOTTOM) ? (this.i+this.size) : (dir === this.LEFT) ? (this.i-1) : (this.i+1);
        return refArray[arrayShift];
    }

    async step(refArray, markActive, markVisited, removeSide) {
        
        if (this.done) return this.done;
        
        if (this.unvisted === this.size*this.size) this.unvisted -= 1;

        let ref = refArray[this.i];
        if (this.unvisted > 0) {

            await markActive(ref);

            let randomDir = this._getRandomDir();
            let neighbourRef = this._getNeighbourRef(randomDir, refArray);
            
            if (!neighbourRef.current.props.visited) {
                await removeSide(this.i, refArray, randomDir);
                this.unvisted -= 1;
            }
            this.i = (randomDir === this.TOP) ? (this.i-this.size) : (randomDir === this.BOTTOM) ? (this.i+this.size) : (randomDir === this.LEFT) ? (this.i-1) : (this.i+1);
            await markVisited(ref);
        }
        else {
            await markVisited(ref);
            this.done = true;
        }


    }

}
