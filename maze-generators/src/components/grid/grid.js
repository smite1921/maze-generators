import React, { useState } from "react";
import Text from "../text/text";
import { COLOR, FONT, SIZE } from "../../components/text/text_constants";
import * as styles from "./grid.module.css";
import Button from "../button/button";


export default function Grid({size,title}) {
    let gridArray = [...Array(size * size).keys()]
    return (
        <div className={styles.container}>
            <div className={styles.inner}>
                <div className={styles.title}>
                    <Text text={title} color={COLOR.WHITE} font={FONT.AVENIR_CAST_BLACK} size={SIZE.S} />
                </div>

                <div className={styles.grid} style={{gridTemplateRows:'1fr '.repeat(size), gridTemplateColumns:'1fr '.repeat(size)}}>
                    {
                        gridArray.map(i => {
                            let [row, col] = [Math.floor(i/size), i % size]
                            let classes = `${styles.gridBoxAll} `
                            if (row == 0) {
                                classes += ` ${styles.gridBoxTop} `
                            }
                            if (col == 0) {
                                classes += ` ${styles.gridBoxLeft} `
                            }
                            if (row == (size-1)) {
                                classes += ` ${styles.gridBoxBottom} `

                            }
                            if (col == (size-1)) {
                                classes += ` ${styles.gridBoxRight} `
                            }
                            return <div key={i} className={classes}> </div>
                        })
                    }

                </div>  


                <div className={styles.buttons}>
                    <Button text='start' color={COLOR.GREEN} onClick={ () => console.log(title,'start')}/>
                    <Button text='stop'  color={COLOR.RED} onClick={ () => console.log(title,'stop')} />
                    <Button text='reset' color={COLOR.YELLOW} onClick={ () => console.log(title,'reset')}/>
                </div>
            </div>

        </div>
    );
}