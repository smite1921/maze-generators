import React, { createRef, useRef } from "react";
import Text from "../text/text";
import { COLOR, FONT, SIZE, DIR } from "../utils/constants";
import GridBox from "../gridbox/gridbox";
import * as styles from "./maze.module.css";
import Button from "../button/button";

const LENGTH = 12;
const {LEFT, TOP, RIGHT, BOTTOM} = DIR;


const delay = (time=10) => new Promise(resolve => setTimeout(resolve, time));

async function setColor(ref, color) {
    ref.current.setProps({...ref.current.props, color: color});
    await delay();
}

function getSetColors(refArray) {    
    
    async function setColors(indexes, colors) {
        for (let i=0;i<indexes.length;i++) {
            let index = indexes[i];
            let color = colors[i];
            refArray[index].current.setProps({...refArray[index].current.props, color: color});
        }
        await delay();
    }

    return setColors;
}

async function removeSide(i, refArray,  side) {

    let arrayShift = (side === TOP) ? (i-LENGTH) : (side === BOTTOM) ? (i+LENGTH) : (side === LEFT) ? (i-1) : (i+1);
    let refBoxHighlightProps =  (side === TOP) ? {highlightTop: true} : (side === BOTTOM) ? {highlightBottom: true} : (side === LEFT) ? {highlightLeft: true} : {highlightRight: true};
    let adjaRefBoxHighlightProps =  (side === TOP) ? {highlightBottom: true} : (side === BOTTOM) ? {highlightTop: true} : (side === LEFT) ? {highlightRight: true} : {highlightLeft: true};
    let refBoxBorderProps =  (side === TOP) ? {borderNoTop: true, highlightTop: false} : (side === BOTTOM) ? {borderNoBottom: true, highlightBottom: false} : (side === LEFT) ? {borderNoLeft: true, highlightLeft:false} : {borderNoRight: true, highlightRight: false};
    let adjaRefBoxBorderProps =  (side === TOP) ? {borderNoBottom:true ,highlightBottom: false} : (side === BOTTOM) ? {borderNoTop:true ,highlightTop: false} : (side === LEFT) ? {borderNoRight:true ,highlightRight: false} : {borderNoLeft:true ,highlightLeft: false};
    
    let refBox = refArray[i];
    let adjaRefBox = refArray[arrayShift];

    refBox.current.setProps({...refBox.current.props, ...refBoxHighlightProps});
    if (adjaRefBox !== undefined) adjaRefBox.current.setProps({...adjaRefBox.current.props, ...adjaRefBoxHighlightProps});
    await delay();

    refBox.current.setProps({...refBox.current.props, ...refBoxBorderProps});
    if (adjaRefBox !== undefined) adjaRefBox.current.setProps({...adjaRefBox.current.props, ...adjaRefBoxBorderProps});
    await delay();

}

function getAddSides(refArray) {    
    
    async function addSides(indexes, sides) {
        for (let i=0;i<indexes.length;i++) {

            const side = sides[i];
            const refI = indexes[i];

            const arrayShift = (side === TOP) ? (refI-LENGTH) : (side === BOTTOM) ? (refI+LENGTH) : (side === LEFT) ? (refI-1) : (refI+1);
            const refBoxBorderProps =  (side === TOP) ? {borderTopN: true} : (side === BOTTOM) ? {borderBottomN: true} : (side === LEFT) ? {borderLeftN: true} : {borderRightN: true};
            const adjaRefBoxBorderProps =  (side === TOP) ? {borderBottomN: true} : (side === BOTTOM) ? {borderTopN: true} : (side === LEFT) ? {borderRightN: true} : {borderLeftN: true};

            const refBox = refArray[refI];
            const adjaRefBox = refArray[arrayShift];
        
            refBox.current.setProps({...refBox.current.props, ...refBoxBorderProps});
            if (adjaRefBox !== undefined) adjaRefBox.current.setProps({...adjaRefBox.current.props, ...adjaRefBoxBorderProps});

        }
        await delay();
    }

    return addSides;
}

export default function Maze({title, algo}) {
    const LOOP = useRef(false);
    const STARTED = useRef(false);
    algo.init(LENGTH);
    
    const refArray = [...Array(LENGTH * LENGTH).keys()].map( () => createRef());
    const setColors = getSetColors(refArray);
    const addSides = getAddSides(refArray);
    const runAlgo = async () => {

        if (!STARTED.current) {
            STARTED.current = true;
            let done = algo.status();
            
            while (!done) {
                if (!LOOP.current) {
                    STARTED.current = false;
                    break;
                }
                done = await algo.step(refArray, setColor, removeSide, setColors, addSides);
            }
            STARTED.current = false;
            LOOP.current = false;

        }
        else {
            console.log(title, 'started already!');
        }  
    };

    return (
        <div className={styles.container}>
            <div className={styles.inner}>
                <div className={styles.title}>
                    <Text text={title} color={COLOR.WHITE} font={FONT.AVENIR_CAST_BLACK} size={SIZE.S} />
                </div>

                <div className={styles.grid} style={{gridTemplateRows:'1fr '.repeat(LENGTH), gridTemplateColumns:'1fr '.repeat(LENGTH)}}>
                    {/* {gridArray.map(val => val.component)} */}
                    {
                        refArray.map((ref,i) => {
                            let [row, col] = [Math.floor(i/LENGTH), i % LENGTH];
                            return <GridBox 
                                key={i} 
                                index={i} 
                                borderAll={true} 
                                borderTop={row===0} 
                                borderLeft={col===0} 
                                borderBottom={row===(LENGTH-1)} 
                                borderRight={col===(LENGTH-1)}
                                color={COLOR.GREY}
                                ref={ref}/>
                        })
                    }
                </div>

                <div className={styles.buttons}>

                    <Button text='start' color={COLOR.GREEN} onClick={() => {
                        LOOP.current = true;
                        runAlgo();
                    }}/>

                    <Button text='stop'  color={COLOR.RED}  onClick={() => {
                        LOOP.current = false;
                        STARTED.current = false;
                    }}/>

                    <Button text='reset' color={COLOR.YELLOW} onClick={ async ()=> {
                        LOOP.current = false;
                        await delay(50);
                        for (let i=0;i<refArray.length;i++) {
                            let ref = refArray[i];
                            ref.current.setProps( {...ref.current.props, 
                                                    active:false, 
                                                    visited: false,
                                                    borderAll:true,
                                                    borderTopN: false,
                                                    borderLeftN: false,
                                                    borderRightN: false,
                                                    borderBottomN: false,
                                                    borderNoTop: false, 
                                                    borderNoLeft: false, 
                                                    borderNoRight: false, 
                                                    borderNoBottom: false,  
                                                    highlightTo: false, 
                                                    highlightLeft: false, 
                                                    highlightRight: false, 
                                                    highlightBottom: false,
                                                    color: COLOR.GREY
                                                });
                        }
                        STARTED.current = false;
                        algo.reset();
                        console.log(title, 'reset!')
                        
                    }} />
                </div>
            </div>

        </div>
    );
}