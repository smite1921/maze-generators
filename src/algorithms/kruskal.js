import { DIR, COLOR } from "../components/utils/constants";

const {LEFT, TOP, RIGHT, BOTTOM} = DIR;

export default class Kruskal {

    init(size) {
        this.size = size;
        this.done = false;
        this._initialize();
    }
    
    reset() {
        this.done = false;
        this._initialize();

    }

    status() {
        return this.done;
    }

    _initialize() {
        // neighhours represents cells that are neighbours in the grid
        // setForCell gives representative for a cell index
        // cellsInSet gives the set for a representative value
        this.neighbours = [];
        this.setForCell = {};
        this.cellsInSet = {};

        // Initialization
        for (let i=0;i<this.size*this.size;i++) {

            let set = new Set();
            set.add(i);

            this.setForCell[i] = i;
            this.cellsInSet[i] = set; 

            let [row, col] = [Math.floor(i/this.size), i % this.size];
            if (row !== (this.size - 1)) this.neighbours.push([i,i+this.size]);
            if (col !== (this.size - 1)) this.neighbours.push([i,i+1]);

        }

    }

    _canMerge(x,y) {
        // Two cells can merge only if they are part of different disjoint sets;
        return this.setForCell[x] !== this.setForCell[y];
    }

    // removeSide(i, refArray,  side)
    async _merge(x, y, refArray, removeSide) {
    
        // Remove the border between the boxes
        let diff = x - y;
        let side = (diff === 1) ? LEFT : (diff === -1) ? RIGHT : (diff === this.size) ? TOP : BOTTOM
        await removeSide(x, refArray, side);

        // For all the cells with y
        //  - Make thier representative the representative of x
        //  - Add them to x's disjoint set
        let xRep = this.setForCell[x];
        let yRep = this.setForCell[y];
        let ySet = this.cellsInSet[yRep];
        let xSet = this.cellsInSet[xRep];
        for (let cell of ySet.values()) {
            this.setForCell[cell] =  xRep;
            xSet.add(cell);
        }
        this.cellsInSet[xRep] = xSet;
        this.cellsInSet[yRep].clear();
    }

    _randomPair() {
        let randomIndex = Math.floor((Math.random() * this.neighbours.length) + 0);
        let [[x,y]] = this.neighbours.slice(randomIndex, randomIndex + 1);
        this.neighbours = this.neighbours.slice(0, randomIndex).concat(this.neighbours.slice(randomIndex+1));
        return [x,y];
    }

    async step(refArray, setColor, removeSide, setColors) {
        // If the maze is already completed
        if (this.done) return this.done;

        if (this.neighbours.length !== 0) {

            let [x, y] = this._randomPair();

            // Highlight both sets

            if (this._canMerge(x,y)) {

                let setX = Array.from(this.cellsInSet[this.setForCell[x]]);
                let setY = Array.from(this.cellsInSet[this.setForCell[y]]);
                let colorX = new Array(setX.length).fill(COLOR.GREEN);
                let colorY = new Array(setY.length).fill(COLOR.RED);
                await setColors(setX.concat(setY), colorX.concat(colorY));

                await this._merge(x,y,refArray,removeSide);

                setX = Array.from(this.cellsInSet[this.setForCell[x]]);

                await setColors(setX, new Array(setX.length).fill(COLOR.WHITE));
            }
            
            if (this.neighbours.length === 0) this.done = true;


        }
        
        return this.done;
    }

}