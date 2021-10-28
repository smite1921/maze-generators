import { DIR, COLOR } from "../components/utils/constants";

const {LEFT, TOP, RIGHT, BOTTOM} = DIR;

export default class AldousBroder {

    init(size) {
        this.size = size;
        
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

    _getRandomDir(i, size) {
        let [row, col] = [Math.floor(i/size), i % size];
        
        // Corner Cases
        let randomDir = Math.floor((Math.random() * 2) + 0);
        // Top left corner
        if ((row === 0) && (col === 0)) {
            return randomDir ? RIGHT : BOTTOM;
        }
        // Top right corner
        if ((row === 0) && (col === (size - 1))) {
            return randomDir ? LEFT : BOTTOM;
        }
        // Bottom left corner
        if ((row === (size - 1)) && (col === 0)) {
            return randomDir ? RIGHT : TOP;
        }
        // Bottom right corner
        if ((row === (size - 1)) && (col === (size - 1))) {
            return randomDir ? LEFT : TOP;
        }

        // Edge Cases
        randomDir = Math.floor((Math.random() * 3) + 0)
        // Top Row
        if (row === 0) {
            return (randomDir === 0) ? LEFT : (randomDir === 1) ? BOTTOM : RIGHT;
        }
        // Top column
        if (col === 0) {
            return (randomDir === 0) ? TOP : (randomDir === 1) ? RIGHT : BOTTOM;
        }
        // Bottom row
        if (row === (size - 1)) {
            return (randomDir === 0) ? LEFT: (randomDir === 1) ? TOP : RIGHT;
        }
        // Bottom column 
        if (col === (size - 1)) {
            return (randomDir === 0) ? TOP : (randomDir === 1) ? LEFT : BOTTOM;
        }

        // Normal case
        randomDir = Math.floor((Math.random() * 4) + 0);
        return randomDir;
        
    } 

    _getNeighbourRef(dir, refArray) {
        const arrayShift = (dir === TOP) ? (this.i-this.size) : (dir === BOTTOM) ? (this.i+this.size) : (dir === LEFT) ? (this.i-1) : (this.i+1);
        return refArray[arrayShift];
    }

    _isVisited(ref) {
        return ref.current.props.color === COLOR.WHITE;
    }

    async step(refArray, setColor, removeSide) {
        
        // If the maze is already completed
        if (this.done) return this.done;

        // Color Guide:
        //  - Default cells are grey
        //  - Active cells are green
        //  - Visitied cells are white

        // This step must be done for the first iteration.
        if (this.unvisted === this.size*this.size) this.unvisted -= 1;

        // Get the current cell
        let ref = refArray[this.i];

        // If there are unvisited cells in the grid
        if (this.unvisted > 0) {

            // mark the current cell as active
            await setColor(ref, COLOR.GREEN);

            // Get a random neighbouring adjacent cell
            let randomDir = this._getRandomDir(this.i, this.size);
            let neighbourRef = this._getNeighbourRef(randomDir, refArray);
            
            // If the neigbouring cell is not visited
            if (!this._isVisited(neighbourRef)) {
                await removeSide(this.i, refArray, randomDir);
                this.unvisted -= 1;
            }

            // Update current index 
            this.i = (randomDir === TOP) ? (this.i-this.size) : (randomDir === BOTTOM) ? (this.i+this.size) : (randomDir === LEFT) ? (this.i-1) : (this.i+1);
            
            // Mark the current cell as visited
            await setColor(ref, COLOR.WHITE);
        }
        // Else all the cells are visited, and the maze is complete
        else {
            await setColor(ref, COLOR.WHITE);
            this.done = true;
        }

        return this.done;


    }

}
