import React from "react";
import Binary from "../algorithms/binary";
import Maze from "../components/maze/maze";
import Text from "../components/text/text";
import { COLOR, FONT, SIZE } from "../components/text/text_constants";
import * as styles from "../css/index.module.css";

// markup
export default function Index() {
  return (
    <div className={styles.home}>
      <div className={styles.header}>
        
        
        <div className={styles.headerPattern}>

        </div>
        
        <div className={styles.headerTitle}>
          <Text text='Maze Generation Algorithms' color={COLOR.BLACK} font={FONT.AVENIR_CAST_WHITE} size={SIZE.L} />
        </div>
      
      </div>

      <div className={styles.body}>


            <div className={styles.bodyMainRow}> <Maze title='Binary' algo={new Binary()} /> </div>
            <div className={styles.bodyMainRow}> <Maze title='Aldous-Broder' algo={new Binary()}/> </div>
            <div className={styles.bodyMainRow}> <Maze title='Prims' algo={new Binary()}/> </div>
            <div className={styles.bodyMainRow}> <Maze title='Kruskal' algo={new Binary()}/> </div>
            <div className={styles.bodyMainRow}> <Maze title='Recursive Division' algo={new Binary()}/> </div>
            <div className={styles.bodyMainRow}> <Maze title='Hunt & Kill' algo={new Binary()}/> </div>
            <div className={styles.bodyMainRow}> <Maze title='Growing Tree' algo={new Binary()}/> </div>
            <div className={styles.bodyMainRow}> <Maze title='Recursive Backtracking' algo={new Binary()}/> </div> 

          


      </div>

      <div className={styles.footer}>
        <Text text='this website was designed and made by smit patel.' color={COLOR.WHITE} font={FONT.MONO} size={SIZE.XXS} />

      </div>

    </div>
  )
}