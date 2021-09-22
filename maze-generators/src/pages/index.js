import React from "react";
import Text from "../components/text/text";
import { COLOR, FONT, SIZE } from "../components/text/text_constants";
import * as styles from "../css/index.module.css";

// markup
export default function Index() {
  return (
    <div className={styles.home}>
      <div className={styles.header}>
        <Text text='Maze Generation Algorithms' color={COLOR.BLACK} font={FONT.AVENIR_CAST} size={SIZE.L} />
      </div>

      <div className={styles.body}>
        body
      </div>

      <div className={styles.footer}>
        <Text text='this website was designed and made by smit patel.' color={COLOR.WHITE} font={FONT.MONO} size={SIZE.xxs} />

      </div>

    </div>
  )
}