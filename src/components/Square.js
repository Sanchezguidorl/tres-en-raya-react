import React from "react";

function Square({value,handleClick, index}){

    return(
<button className="square" onClick={()=>handleClick((index-1))}>{value}</button>
    );
}
export default Square;