import { DIR, COLOR } from "../components/utils/constants";

const {LEFT, TOP, RIGHT, BOTTOM} = DIR;

export default class Prim {

    init(size) {
        this.size = size;
        this.done = false;
        this.active = [Math.floor((Math.random() * (size*size)) + 0)];
        this.linked = new Set();
    }
    
    reset() {
        this.done = false;
        this.active = [Math.floor((Math.random() * (this.size*this.size)) + 0)];
        this.linked = new Set();
    }

    status() {
        return this.done;
    }


    _isLinked(i) {
        return this.linked.has(i)
    }

    _getNeighbourCells(i, refArray) {
        let neighbours = [];
        
        let topRef = refArray[i - this.size];
        let bottomRef = refArray[i+this.size];
        let leftRef = refArray[i-1];
        let rightRef = refArray[i+1];

        let col =  i % this.size;

        if ((topRef !== undefined) && !this._isLinked(i - this.size)) {
            neighbours.push(i - this.size);
        }
        if ((bottomRef !== undefined) && !this._isLinked(i+this.size)) {
            neighbours.push(i+this.size);
        }
        if ((leftRef !== undefined) && !this._isLinked(i-1) && (col !== 0)) {
            neighbours.push(i-1);
        }
        if ((rightRef !== undefined) && !this._isLinked(i+1) && (col !== (this.size-1))) {
            neighbours.push(i+1);
        }
        return neighbours;
    }

    async step(refArray, setColor, removeSide, setColors) {
        // If the maze is already completed
        if (this.done) return this.done;
        
        // If there are any active cells
        if (this.active.length !== 0) {
            
            // Get a random active cell
            let randomCell = this.active[Math.floor((Math.random() * this.active.length) + 0)];
            
            // Find neighbours of randomCell that haven't been linked
            let neighbours = this._getNeighbourCells(randomCell, refArray);

            await setColors([randomCell].concat(neighbours), [COLOR.GREEN].concat(new Array(neighbours.length).fill(COLOR.YELLOW)));

            
            //  
            if (neighbours.length !== 0) {
                let randomNeighbour = neighbours[Math.floor((Math.random() * neighbours.length) + 0)];
                
                let diff = randomCell - randomNeighbour;
                await removeSide(randomCell, refArray, (diff === 1) ? LEFT : (diff === -1) ? RIGHT : (diff === this.size) ? TOP : BOTTOM);
                
                this.linked.add(randomCell);
                this.linked.add(randomNeighbour);

                this.active.push(randomNeighbour);
                
                let randomNeighbourNeighbours = this._getNeighbourCells(randomNeighbour, refArray);

                await setColors([randomCell, randomNeighbour].concat(randomNeighbourNeighbours), [COLOR.RED, COLOR.RED].concat(new Array(randomNeighbourNeighbours.length).fill(COLOR.YELLOW)));
    
            }
            // Remove from active list
            else {
                this.active = this.active.filter(i => i !== randomCell);
                await setColors([randomCell], [COLOR.WHITE]);
            }


        }
        else {
            this.done = true;
        }
        
        return this.done;
    }

}