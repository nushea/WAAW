import { useState, useEffect, useRef } from "react";
import "../css/format.css";
import "../css/other.css";
import "../css/root.css";
import "../css/info.css";

export default function ContextMenu({ContextValues, SetContextValues, PID, newApp}){
  function stopContext(){
    SetContextValues({
    isDisplayed: false,
    name: "umm?",
    pos: {
      x: -1,
      y: -1,
    },
    content: [],
  });
  }
  function handleClicks(args){
    console.log(args);
    if(PID == null){
      newApp(args.substring(0, args.indexOf(" ")), args.substring(args.indexOf(" ")+1));
    }
    stopContext();
  }
  return (
    <div className="ContextMenu"
      onMouseLeave={() => stopContext()}
      onContextMenu={(e) => {stopContext(); e.preventDefault()}}
      style={{
        left: (-10 + ContextValues.pos.x).toString(10) + "px",
        top: (-60 + ContextValues.pos.y).toString(10) + "px",
        display: (ContextValues.isDisplayed)? "flex" : "none",
      }}
    > 
      <h3> {ContextValues.name} </h3>
      <hr/>
      <div className="ContextItems">
        {...ContextValues.content.map((item, i) => (
          <button onClick={()=> {handleClicks(item.args);}}>
            <p className="ContextText">{item.label}</p> 
          </button>
        ))}
      </div>
    </div>
  );
}
