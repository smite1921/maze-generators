import React from "react";
import { Link } from "gatsby";
import {COLOR, FONT, SIZE} from "./text_constants"
import * as styles from "./text.module.css";

function colorClass(color) {
    if (color === COLOR.BLUE) {
        return styles.blue;
    }
    else if (color === COLOR.GREEN) {
        return styles.green;
    }
    else if (color === COLOR.YELLOW) {
        return styles.yellow;
    }
    else if (color === COLOR.RED) {
        return styles.red;
    }
    else if (color === COLOR.ORANGE) {
        return styles.navy;
    }
    else if (color === COLOR.NAVY) {
        return styles.navy;
    }
    else if (color === COLOR.BLACK) {
        return styles.black;
    }
    else if (color === COLOR.WHITE) {
        return styles.white;
    }
}

function fontClass(font) {
    if (font === FONT.AVENIR) {
        return styles.avenir;
    }
    else if (font === FONT.MONO) {
        return styles.mono;
    }
    else if (font === FONT.AVENIR_CAST) {
        return styles.avenirCast;
    }
}

function sizeClass(size) {
    if (size === SIZE.XXS) {
        return styles.xxs;
    }
    else if (size === SIZE.XS) {
        return styles.xs;
    }
    else if (size === SIZE.S) {
        return styles.s;
    }
    else if (size === SIZE.M) {
        return styles.m;
    }
    else if (size === SIZE.L) {
        return styles.l;
    }
    else if (size === SIZE.XL) {
        return styles.xl;
    }
    else if (size === SIZE.XXL) {
        return styles.xxl;
    }
}


export default function Text({ text, color, font, size, link }) {
    if (link === undefined) {
        return(
            <div>
                <span className={`${styles.text} ${colorClass(color)} ${fontClass(font)} ${sizeClass(size)}`}> {text} </span>
            </div>
        );
    }
    else if (!link.startsWith('/')) {
        return (
            <div>
                <a href={link} className={`${styles.text} ${colorClass(color)} ${fontClass(font)} ${sizeClass(size)}`}> {text} </a>
            </div>
        );
    }
    else {
        return (
            <div>
                <Link to={link} className={`${styles.text} ${colorClass(color)} ${fontClass(font)} ${sizeClass(size)}`}> {text} </Link>
            </div>
        );
    }
}