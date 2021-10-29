import React, { useImperativeHandle, useState } from "react";
import { COLOR } from "../utils/constants";
import * as styles from "./gridbox.module.css";

function GridBox( 
    {borderAll=true, borderTop=false, borderLeft=false, borderRight=false, borderBottom=false,
    borderTopN=false, borderLeftN=false, borderRightN=false, borderBottomN=false,
    borderNoTop=false, borderNoLeft=false, borderNoRight=false, borderNoBottom=false,  
    highlightTop=false, highlightLeft=false, highlightRight=false, highlightBottom=false,
    color=COLOR.WHITE, index}, ref
    ) {
    const [props, setProps] = useState({borderAll, borderTop, borderLeft, borderRight, borderBottom,
        borderNoTop, borderNoLeft, borderNoRight, borderNoBottom,
        borderTopN, borderLeftN, borderRightN, borderBottomN, 
        highlightTop, highlightLeft, highlightRight, highlightBottom, color, index})
    
    useImperativeHandle(ref, ()=> ({
        props: props,
        setProps: setProps 
    }));

    let className = ''
    className += props.borderAll ? ` ${styles.gridBoxAll}`: '';
    className += props.borderTop ? ` ${styles.gridBoxTop}`: '';
    className += props.borderLeft ? ` ${styles.gridBoxLeft}`: '';    
    className += props.borderRight ? ` ${styles.gridBoxRight}`: '';    
    className += props.borderBottom ? ` ${styles.gridBoxBottom}`: '';  
      
    className += props.borderTopN ? ` ${styles.gridBoxTopN}`: '';
    className += props.borderLeftN ? ` ${styles.gridBoxLeftN}`: '';    
    className += props.borderRightN ? ` ${styles.gridBoxRightN}`: '';    
    className += props.borderBottomN ? ` ${styles.gridBoxBottomN}`: '';  

    className += props.borderNoTop ? ` ${styles.gridBoxNoTop}`: '';
    className += props.borderNoLeft ? ` ${styles.gridBoxNoLeft}`: '';    
    className += props.borderNoRight ? ` ${styles.gridBoxNoRight}`: '';    
    className += props.borderNoBottom ? ` ${styles.gridBoxNoBottom}`: '';    
    className += props.highlightTop ? ` ${styles.gridBoxHighlightTop}`: '';
    className += props.highlightLeft ? ` ${styles.gridBoxHighlightLeft}`: '';    
    className += props.highlightRight ? ` ${styles.gridBoxHighlightRight}`: '';    
    className += props.highlightBottom ? ` ${styles.gridBoxHighlightBottom}`: '';

    className += props.color === COLOR.WHITE ? ` ${styles.gridBoxWhite}` : 
                 props.color === COLOR.GREY ? ` ${styles.gridBoxGrey}` : 
                 props.color === COLOR.GREEN ? ` ${styles.gridBoxGreen}` : 
                 props.color === COLOR.RED ? ` ${styles.gridBoxRed}` :
                 props.color === COLOR.YELLOW ? ` ${styles.gridBoxYellow}` : '';

    return <div key={index} className={className}> </div>;
}

export default React.forwardRef(GridBox);