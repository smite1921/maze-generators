import { DIR, COLOR } from "../components/utils/constants";

const {LEFT, TOP, RIGHT, BOTTOM} = DIR;




export default class RecursiveBacktracking {

    init(size) {
        this.size = size;
        this.done = false;
        this.stack = [Math.floor((Math.random() * (size*size)) + 0)]
    }
    
    reset() {
        this.stack = [Math.floor((Math.random() * (this.size*this.size)) + 0)];
        this.done = false;
    }

    status() {
        return this.done;
    }

    _getPossibleDir(i, size, refArray) {
        let dirs = [];
        
        let topRef = refArray[i - size];
        let bottomRef = refArray[i+size];
        let leftRef = refArray[i-1];
        let rightRef = refArray[i+1];

        let [row, col] = [Math.floor(i/size), i % size];


        if ((topRef !== undefined) && !this._inStack(topRef)) {
            dirs.push(DIR.TOP);
        }
        if ((bottomRef !== undefined) && !this._inStack(bottomRef)) {
            dirs.push(DIR.BOTTOM);
        }
        if ((leftRef !== undefined) && !this._inStack(leftRef) && (col !== 0)) {
            dirs.push(DIR.LEFT);
        }
        if ((rightRef !== undefined) && !this._inStack(rightRef) && (col !== (size-1))) {
            dirs.push(DIR.RIGHT);
        }

        return dirs;

    }

    _inStack(ref) {
        return ref.current.props.color !== COLOR.GREY;
    }

    async step(refArray, setColor, removeSide) {
        // If the maze is already completed
        if (this.done) return this.done;
        

        // Color Guide:
        //  - Default cells are grey
        //  - Cells on stack are red
        //  - Cells popped off stack are white
        //  - Active cells are green

        // Get the top cell from the stack
        let i = this.stack[this.stack.length - 1];
        let ref = refArray[i];
        await setColor(ref, COLOR.GREEN);

        // Get possible directions that travel to unvisited cells
        let dirs = this._getPossibleDir(i, this.size, refArray);
        
        // if there are no unvisted cells, then we pop off stack
        if (dirs.length === 0) {
            this.stack.pop();
            if (this.stack.length === 0) this.done = true;
            await setColor(ref, COLOR.WHITE);
        }
        // else travel to unvisited cell
        else {
            let randomDir = dirs[Math.floor((Math.random() * dirs.length) + 0)]        
            await removeSide(i, refArray, randomDir);
            this.stack.push((randomDir === TOP) ? (i-this.size) : (randomDir === BOTTOM) ? (i+this.size) : (randomDir === LEFT) ? (i-1) : (i+1));
            await setColor(ref, COLOR.RED);
        }

        return this.done;

    }

}