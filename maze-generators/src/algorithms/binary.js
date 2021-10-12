export default class Binary {

    init(size, TOP, BOTTOM, LEFT, RIGHT) {
        this.size = size;
        this.TOP = TOP;
        this.BOTTOM = BOTTOM;
        this.LEFT = LEFT;
        this.RIGHT = RIGHT;
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

    async step(refArray, markActive, markVisited, removeSide) {
        
        if (this.done) return this.done;

        let ref = refArray[this.i];
        let [row, col] = [Math.floor(this.i/this.size), this.i % this.size];
        await markActive(ref);

        if (!ref.current.props.visited) {
            // bottom corner right
            if ((row === (this.size - 1)) && (col === (this.size -1))) { 
                this.done = true;
            }
            // Last row
            else if (row === (this.size -1)) {
                await removeSide(this.i,refArray, this.RIGHT);
            }
            // Last column
            else if (col === (this.size - 1)) {
                await removeSide(this.i, refArray, this.BOTTOM);
            }
            // Else
            else {
                await removeSide(this.i, refArray,  (Math.floor((Math.random() * 2) + 0) === 0) ? this.BOTTOM : this.RIGHT);
            }
        }
        await markVisited(ref);
        this.i++;
        return this.done;
    }

} 

