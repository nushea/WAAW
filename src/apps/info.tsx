import { useState, useEffect, useRef } from "react";
import "../css/format.css";
import "../css/other.css";
import "../css/root.css";
import "../css/info.css";

export default function INFO({PID, modPID, parent}) {
  const [title, setTitle] = useState("WÃÃW")
  const [body, setBody] = useState(<>
    <b>W</b>indow F<b>ĩ</b>le <b>W</b>atcher
    <a href="https://github.com/nushea/WAAW"> https://github.com/nushea/WAAW </a>
    </>)
  const [ver, setVer] = useState("V 1.0");
  const [credits, setCredits] = useState(
        <div className="credits">
          <a href={"https://icons8.com/"}>Icons by https://icons8.com/</a>
        </div>);

  useEffect(() => {
    if(PID.args.length > 1){
      const args = PID.args.split('\\');
      if(args[0].length > 0)
        setTitle(args[0]);
      if(args[1].length > 0)
        setBody(args[1]);
      if(args[2].length > 0)
        setVer(args[2]);
      if(args[3].length >0 && args[3]!=' ')
        setCredits(args[3]);
    }
    
    modPID({title: "About WAAW", icon: "/img/icons8-information-100.png"});
    if(parent.current){
      parent.current.style.width = "20%";
      parent.current.style.height = "45%";
    }
  }, []);
  useEffect(() => 
            modPID({title: "About - "+ title, icon: "/img/icons8-information-100.png"})
  , [title]);
  return (
    <>
      <div className="InfoWindow" style={{ whiteSpace: "pre-line" }}>
        <div className="InfoData">
          <p>{title}</p>
          <p>{body}</p>
          <p>{ver}</p>
        </div>
        {credits}
      </div>
    </>
  );
}
