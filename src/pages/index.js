import React from "react";
import AldousBroder from "../algorithms/aldous_broder";
import Binary from "../algorithms/binary";
import HuntAndKill from "../algorithms/hunt_and_kill";
import Kruskal from "../algorithms/kruskal";
import Prim from "../algorithms/prim";
import RecursiveBacktracking from "../algorithms/recursive_backtracking";
import RecursiveDivision from "../algorithms/recursive_division";
import Wilsons from "../algorithms/wilsons";
import Maze from "../components/maze/maze";
import Text from "../components/text/text";
import { Helmet } from "react-helmet"
import { COLOR, FONT, SIZE } from "../components/utils/constants";
import * as styles from "../css/index.module.css";

// markup
export default function Index() {
  return (
    <div className={styles.home}>
        <Helmet>
          <title>Maze Generation Algorithms</title>
          <meta name="title" content="Maze Generation Algorithms"/>
          <meta name="description" content="A website that visually showcases popular maze generation algorithms."/>
          <meta charSet="utf-8" />
          <link rel="icon"
            type="image/png"
            href="https://user-images.githubusercontent.com/43019533/139384017-927731dc-8d6f-490f-98d7-6ff432c1d817.png"
          />
          <link rel="canonical" href="https://mazegenerators.gatsbyjs.io/" />
        </Helmet>

      <div className={styles.header}>
        
        <div className={styles.headerPattern}>

        </div>
        
        <div className={styles.headerTitle}>
          <Text text='Maze Generation Algorithms' color={COLOR.BLACK} font={FONT.AVENIR_CAST_WHITE} size={SIZE.L} />
        </div>
      
      </div>

      <div className={styles.body}>

        <Maze title='Binary' algo={new Binary()} /> 
        <Maze title='Aldous-Broder' algo={new AldousBroder()}/>
        <Maze title='Wilsons' algo={new Wilsons()}/>  
        <Maze title='Hunt & Kill' algo={new HuntAndKill()}/> 
        <Maze title='Recursive Backtracking' algo={new RecursiveBacktracking()}/>
        <Maze title='Kruskal' algo={new Kruskal()}/> 
        <Maze title='Prims' algo={new Prim()}/> 
        <Maze title='Recursive Division' algo={new RecursiveDivision()}/>
      
      </div>

      <div className={styles.footer}>
        <Text text='this website was designed and made by smit patel.' color={COLOR.WHITE} font={FONT.MONO} size={SIZE.XXS} />

      </div>

    </div>
  )
}