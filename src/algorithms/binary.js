import { DIR, COLOR } from "../components/utils/constants";

const {LEFT, TOP, RIGHT, BOTTOM} = DIR;

export default class Binary {

    init(size) {
        this.size = size;
        this.i = 0;
        this.done = false;
    }

    reset() {
        this.i = 0;
        this.done = false; 
    }

    status() {
        return this.done;
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

        // Get the current cell, and mark it active
        let ref = refArray[this.i];
        await setColor(ref, COLOR.GREEN);

        // If the current cell is not visited
        if (!this._isVisited(ref)) {

            let [row, col] = [Math.floor(this.i/this.size), this.i % this.size];

            // if current cell is the at bottom right corner then then maze is completed.
            if ((row === (this.size - 1)) && (col === (this.size -1))) { 
                this.done = true;
            }
            // if current cell is in last row we can only remove right border
            else if (row === (this.size -1)) {
                await removeSide(this.i,refArray, RIGHT);
            }
            // if current cell is at last column we can only remove bottom border
            else if (col === (this.size - 1)) {
                await removeSide(this.i, refArray, BOTTOM);
            }
            // Otherwise we can remove the bottom or right cell from the current cell (we choose randomly)
            else {
                await removeSide(this.i, refArray,  (Math.floor((Math.random() * 2) + 0) === 0) ? BOTTOM : RIGHT);
            }
        }
        
        // Mark the current cell as visited
        await setColor(ref, COLOR.WHITE);

        // Increment index for next iteration
        this.i++;
        return this.done;
    }

} 

