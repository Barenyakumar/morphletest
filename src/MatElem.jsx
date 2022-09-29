import React, { useEffect, useState } from 'react'

function MatElem(props) {
    const [theme, setTheme] = useState("notVisited");
    useEffect(()=>{
        if(props.col == 300)
            setTheme("visited");
        else if(props.col === 400)
            setTheme("focused");
        else if(props.col === 500)
            setTheme("captured")
    })
  return (

    <span  className={`${theme} matElem`} 
    style={{background:`${props.color}`}}
    >
        {props.col}
    </span>
  )
}

export default MatElem