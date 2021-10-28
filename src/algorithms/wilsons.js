import { DIR, COLOR } from "../components/utils/constants";

const {LEFT, TOP, RIGHT, BOTTOM} = DIR;

export default class Wilsons {

    init(size) {
        this.size = size;
        this.done = false;
        this.unvisted = [...Array(size*size).keys()];
        this.path = [];
        this.adding = false;
    }
    
    reset() {
        this.done = false; 
        this.unvisted = [...Array(this.size*this.size).keys()];
        this.path = [];
    }

    status() {
        return this.done;
    }


    _getPossibleNeighbours(i, refArray) {
        
        let neighbours = [];
        const col = i % this.size;

        if (refArray[i - this.size] !== undefined) neighbours.push(i-this.size);
        if (refArray[i + this.size] !== undefined) neighbours.push(i+this.size);
        if ((refArray[i - 1] !== undefined) && (col !== 0)) neighbours.push(i-1);
        if ((refArray[i + 1] !== undefined) && (col !== (this.size-1))) neighbours.push(i+1);
        
        return neighbours;
    }

    _markVisited(cell) {
        const i = this.unvisted.indexOf(cell);
        this.unvisted = this.unvisted.slice(0, i).concat(this.unvisted.slice(i+1));
    }

    async step(refArray, setColor, removeSide, setColors) {
        
        // If the maze is already completed
        if (this.done) return this.done;
        
        // If this the first step, mark a random cell as visted, and mark a random cell the path
        if (this.unvisted.length === this.size*this.size) {
            let randomCell = Math.floor((Math.random() * this.unvisted.length) + 0);
            this._markVisited(randomCell);

            let randomPathCell = this.unvisted[Math.floor((Math.random() * this.unvisted.length) + 0)];
            this.path.push(randomPathCell);
    
            await setColors([randomCell, randomPathCell], [COLOR.GREEN, COLOR.GREEN]);
            await setColors([randomCell, randomPathCell],[COLOR.YELLOW, COLOR.RED]);
        }
        // If this is the last step
        else if (this.unvisted.length === 0) {
            let cell = this.path.shift();
            await setColors([cell], [COLOR.WHITE]);
            this.done = true;
        }
        // If we are done the adding 
        else if ((this.adding) && (this.path.length === 0)) {
            this.adding = false;
            let randomPathCell = this.unvisted[Math.floor((Math.random() * this.unvisted.length) + 0)];
            await setColors([randomPathCell], [COLOR.GREEN]);
            this.path.push(randomPathCell);
            await setColors([randomPathCell], [COLOR.RED]);
            
        }
        // If we are adding path to unvisted cells
        else if (this.adding) {
            let cell = this.path.shift();
            
            // remove border            
            if (this.path.length !== 0) {
                await setColors([cell], [COLOR.YELLOW]);
                this._markVisited(cell);
                let nextCell = this.path[0];
                let diff = cell - nextCell;
                await removeSide(cell, refArray, (diff === 1) ? LEFT : (diff === -1) ? RIGHT : (diff === this.size) ? TOP : BOTTOM);
            }

            await setColors([cell], [COLOR.WHITE]);
            

        }
        // else 
        else {
            // Travel to a random neighbouring cell.
            let neighbours = this._getPossibleNeighbours(this.path[this.path.length - 1], refArray);
            let cell = neighbours[Math.floor((Math.random() * neighbours.length) + 0)];
            let cellOriginalColor = refArray[cell].current.props.color;
            await setColors([cell], [COLOR.GREEN]);

            // If the cell formed a loop, then remove the loop
            if (cellOriginalColor === COLOR.RED) {
                const index = this.path.indexOf(cell);
                const loopCells = this.path.slice(index+1);
                await setColors([cell].concat(loopCells),[COLOR.RED].concat(Array(loopCells.length).fill(COLOR.GREY)));
                this.path = this.path.slice(0, index+1);
            }
            // If the cell is a visited cell, then add the path to maze
            else if ((cellOriginalColor === COLOR.WHITE) || (cellOriginalColor === COLOR.YELLOW)) {                
                this.adding = true;
                this.path.push(cell);
                await setColors([cell], [COLOR.YELLOW]);
            }
            // else continue random walk
            else {
                await setColors([cell], [COLOR.RED]);
                this.path.push(cell);
            }


        }
        
        return this.done;



    }

}
