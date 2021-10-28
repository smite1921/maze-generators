import { DIR, COLOR } from "../components/utils/constants";

const {LEFT, TOP, RIGHT, BOTTOM} = DIR;

export default class HuntAndKill {

    init(size) {
        this.size = size;
        this.i = Math.floor((Math.random() * (size*size)) + 0);
        this.done = false;

        this.hunt = false;
        this.j = 0;
    }
    
    reset() {
        this.i = Math.floor((Math.random() * (this.size*this.size)) + 0);
        this.done = false; 
        this.hunt = false;
        this.j = 0;
    }

    status() {
        return this.done;
    }

    _getPossibleDir(i, size, refArray, flag) {
        let dirs = [];
        
        let topRef = refArray[i - size];
        let bottomRef = refArray[i+size];
        let leftRef = refArray[i-1];
        let rightRef = refArray[i+1];

        let [row, col] = [Math.floor(i/size), i % size];


        if ((topRef !== undefined) && (flag ? this._isVisited(topRef) : !this._isVisited(topRef))) {
            dirs.push(DIR.TOP);
        }
        if ((bottomRef !== undefined) && (flag ? this._isVisited(bottomRef) : !this._isVisited(bottomRef))) {
            dirs.push(DIR.BOTTOM);
        }
        if ((leftRef !== undefined) && (flag ? this._isVisited(leftRef) : !this._isVisited(leftRef)) && (col !== 0)) {
            dirs.push(DIR.LEFT);
        }
        if ((rightRef !== undefined) && (flag ? this._isVisited(rightRef) : !this._isVisited(rightRef)) && (col !== (size-1))) {
            dirs.push(DIR.RIGHT);
        }

        return dirs;

    }

    _isVisited(ref) {
        return ref.current.props.color === COLOR.WHITE;
    }

    async step(refArray, setColor, removeSide) {
        // If the maze is already completed
        if (this.done) return this.done;
        // Color Guide:
        //  - Default cells are grey
        //  - Hunting cells are red
        //  - Active cells are green
        //  - Visitied cells are white

        // If there were no possible directions for previous step, then we hunt
        if (this.hunt) {

            // If we looked through the whole grid, then we are done
            if (this.j === (this.size*this.size)) {
                this.done = true;
                return this.done;
            }

            // Get the current hunt cell
            let huntRef = refArray[this.j];
            let isVisited = this._isVisited(huntRef);
            await setColor(huntRef, COLOR.RED);
            
            // if the current hunt cell is unvisited and connects to one of the visited cells
            let dirs = this._getPossibleDir(this.j, this.size, refArray, true);
            if (!isVisited && (dirs.length !== 0)) {
                // Make the current hunt cell connect to the visited cell, and set the current active cell to 
                // the current hunt cell.
                let randomDir = dirs[Math.floor((Math.random() * dirs.length) + 0)];
                await removeSide(this.j, refArray, randomDir);
                this.i = this.j;
                this.hunt = false;
                this.j = 0;
            }
            // Else, we have to keep hunting.
            else {
                this.j++;
            }
            
            // Set the hunt cell back to original color
            await setColor(huntRef, isVisited ? COLOR.WHITE : COLOR.GREY);
            
        }
        // Else, visit another unvisited cell
        else {
            // Highlight the current cell
            let ref = refArray[this.i];
            await setColor(ref, COLOR.GREEN);

            // Get possible directions that travel to unvisited cells
            let dirs = this._getPossibleDir(this.i, this.size, refArray, false);
            
            // if there are no unvisted cells, then we need to hunt the next iteration.
            if (dirs.length === 0) {
                this.hunt = true;
            }
            // else travel to unvisited cell
            else {
                let randomDir = dirs[Math.floor((Math.random() * dirs.length) + 0)]        
                await removeSide(this.i, refArray, randomDir);
                this.i = (randomDir === TOP) ? (this.i-this.size) : (randomDir === BOTTOM) ? (this.i+this.size) : (randomDir === LEFT) ? (this.i-1) : (this.i+1);
            }
            await setColor(ref, COLOR.WHITE);
        }
        return this.done;
    }

}
