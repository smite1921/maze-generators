import React from "react";
import Grid from "../components/grid/grid";
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


            <div className={styles.bodyMainRow}> <Grid title='Binary' size={12}/> </div>
            <div className={styles.bodyMainRow}> <Grid title='Aldous-Broder' size={12}/> </div>
            <div className={styles.bodyMainRow}> <Grid title='Prims' size={12}/> </div>
            <div className={styles.bodyMainRow}> <Grid title='Kruskal' size={12}/> </div>
            <div className={styles.bodyMainRow}> <Grid title='Recursive Division' size={12}/> </div>
            <div className={styles.bodyMainRow}> <Grid title='Hunt & Kill' size={12}/> </div>
            <div className={styles.bodyMainRow}> <Grid title='Growing Tree' size={12}/> </div>
            <div className={styles.bodyMainRow}> <Grid title='Recursive Backtracking'size={12}/> </div> 

          


      </div>

      <div className={styles.footer}>
        <Text text='this website was designed and made by smit patel.' color={COLOR.WHITE} font={FONT.MONO} size={SIZE.XXS} />

      </div>

    </div>
  )
}