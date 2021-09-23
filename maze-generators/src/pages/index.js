import React from "react";
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
          <Text text='Maze Generation Algorithms' color={COLOR.BLACK} font={FONT.AVENIR_CAST} size={SIZE.L} />
        </div>
      
      </div>

      <div className={styles.body}>

        <div className={styles.bodyAd1}>
          <Text text='Ad' color={COLOR.BLACK} font={FONT.AVENIR} size={SIZE.XXS} />
        </div>


        <div className={styles.bodyMain}>
          <Text text='Main Content' color={COLOR.WHITE} font={FONT.AVENIR} size={SIZE.XXS} />
        </div>


        <div className={styles.bodyAd2}>
          <Text text='Ad' color={COLOR.BLACK} font={FONT.AVENIR} size={SIZE.XXS} />
        </div>

      </div>

      <div className={styles.footer}>
        <Text text='this website was designed and made by smit patel & samritha balamoni.' color={COLOR.WHITE} font={FONT.MONO} size={SIZE.xxs} />

      </div>

    </div>
  )
}