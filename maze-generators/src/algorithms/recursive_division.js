import { DIR, COLOR } from "../components/utils/constants";

const {LEFT, TOP, RIGHT, BOTTOM} = DIR;




export default class RecursiveDivision {

    init(size) {
        this.size = size;
        this.done = false;

        this.stack = [];
        this.blank = false;
    }
    
    reset() {
        this.done = false;
        this.blank = false;
        this.stack = [];
    }

    status() {
        return this.done;
    }

    _getRandInt(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    }

    async divideHorizontally(setColors, addSides, row, col, height, width) {

        // divideRow is the row that will have a bottom border
        // randomCell is the cell in the divideRow that won't have a border
        const divideRow = this._getRandInt(row, row+height-1);
        const randomCell = this._getRandInt(col, col+width)

        let cells = [];
        let borderCells = [];
        let colors = [];

        for (let i=row;i<row+height;i++) {
            for (let j=col;j<col+width;j++) {
                if ((i === divideRow) && (j !== randomCell)) borderCells.push(j+ this.size*i);
                cells.push(j+ this.size*i)
                colors.push( i<=divideRow ? COLOR.RED : COLOR.GREEN)
            }
        }
        await setColors(cells, colors)
        await addSides(borderCells, Array(borderCells.length).fill(BOTTOM))
        await setColors(cells, Array(cells.size).fill(COLOR.WHITE));

        this.stack.push({
            row:row,
            col:col,
            height: divideRow-row+1,
            width: width
        });
        this.stack.push({
            row:divideRow+1,
            col:col,
            height: height-(divideRow-row+1),
            width: width
        });
    }

    async divideVertically(setColors, addSides, row, col, height, width) {
        
        // divideCol is the row that will have a right border
        // randomCell is the cell in the divideCol that won't have a border
        const divideCol = this._getRandInt(col, col+width-1);
        const randomCell = this._getRandInt(row, row+height)  

        let cells = [];
        let borderCells = [];
        let colors = [];

        for (let i=row;i<row+height;i++) {
            for (let j=col;j<col+width;j++) {
                if ((j === divideCol) && (i !== randomCell)) borderCells.push(j+ this.size*i);
                cells.push(j+ this.size*i)
                colors.push( j<=divideCol ? COLOR.RED : COLOR.GREEN)
            }
        }
        await setColors(cells, colors)
        await addSides(borderCells, Array(borderCells.length).fill(RIGHT))
        await setColors(cells, Array(cells.size).fill(COLOR.WHITE));
        this.stack.push({
            row:row,
            col:col,
            height: height,
            width: divideCol-col+1
        });
        this.stack.push({
            row:row,
            col:divideCol+1,
            height: height,
            width: width - (divideCol-col+1)
        });

    }


    async step(refArray, setColor, removeSide, setColors, addSides) {
        // If the maze is already completed
        if (this.done) return this.done;
        
        // If this is the first step we have to blank out the grid
        if (!this.blank) {
            for (let i=0;i<this.size*this.size;i++) {
                let cell = refArray[i];
                cell.current.setProps({...cell.current.props, borderAll: false})
            }
            this.blank = true;
            // Add the entire grid to the stack.
            this.stack.push({
                row:0,
                col:0,
                height: this.size,
                width: this.size
            });
        }
        // Else there are elements in the stack
        else if (this.stack.length !== 0) {

            let {row, col, height, width} = this.stack.pop();

            if ((height <=1) || (width <= 1)) return;

            if (height > width) {
                await this.divideHorizontally(setColors,addSides, row, col, height, width);
            }
            else {
                await this.divideVertically(setColors, addSides, row, col, height, width);
            }
            
        }
        else {
            this.done = true;
        }

        return this.done;


    }

}