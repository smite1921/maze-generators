import React from "react";
import { COLOR } from "../utils/constants";
import * as styles from "./button.module.css";



function colorClass(color) {
    if (color === COLOR.GREEN) {
        return styles.green;
    }
    else if (color === COLOR.YELLOW) {
        return styles.yellow;
    }
    else if (color === COLOR.RED) {
        return styles.red;
    }
}

export default function Button({ text, color, link, onClick }) {

    return(
        <div className={styles.container}>
            <button onClick={onClick} className={`${styles.button} ${colorClass(color)}`}>{text}</button>
        </div>
    );
}