import { useState, useEffect, useRef } from "react";
import "../css/format.css";
import "../css/other.css";
import "../css/info.css";

export default function INFO({PID, modPID, parent}) {
  useEffect(() => {
    modPID({title: "About me!", icon: "/img/icons8-information-100.png"});
    if(parent.current){
      parent.current.style.width = "20%";
      parent.current.style.height = "45%";
    }
  }, []);
  return (
    <>
      <div className="InfoWindow">
        <div className="InfoData">
          <b> WÃÃW </b>
          <p>
            <b>W</b>indow F<b>ĩ</b>le <b>W</b>atcher
          </p>
          <p> V 0.0.1 </p>
          <a href="https://github.com/nushea/WAAW"> https://github.com/nushea/WAAW </a>
        </div>
        <div className="credits">
          <a href={"https://icons8.com/"}>Icons by https://icons8.com/</a>
        </div>
      </div>
    </>
  );
}
