import { useState, useEffect, useRef } from "react";
import "../css/format.css";
import "../css/other.css";
import "../css/root.css";
import "../css/hex.css";

export default function HEX({PID, modPID, parent}) {
  const [data, setData] = useState("");
  const [hexData, setHexData] = useState([0]);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const encoder = new TextEncoder();
    setHexData(Array.from(encoder.encode(data)));
  }, [data]);
  useEffect(() => {
  }, [hexData]);
  useEffect(() => {
    modPID({title: "Hex - "+ PID.args, icon: "/img/icons8-hex-96.png"})
    fetch("http://localhost/api/wawAPI/"+PID.args)
          .then((response) => response.text())
          .then((text) => {
            setData(text);
          })
  }
  , []);
  function EnterHandle(i){
    if(!ref || !ref.current) return;
    ref.current.querySelector(`.Hexxie.H${i}`).style.background = "#A00000FF";
    ref.current.querySelector(`.Hexxie.T${i}`).style.background = "#A00000FF";
  }
  function LeaveHandle(i){
    if(!ref || !ref.current) return;
    ref.current.querySelector(`.Hexxie.H${i}`).style.background = "#00000000";;
    ref.current.querySelector(`.Hexxie.T${i}`).style.background = "#00000000";
  }
  return (
    <>
      <div className="HexWindow" style={{ whiteSpace: "pre-line" }} ref={ref}>
        <div className="HexWrap">
            {...hexData.map((item, i) => (
                <div className={"Hexxie H"+i} 
                onMouseEnter={() => EnterHandle(i)}
                onMouseLeave={() => LeaveHandle(i)}
                >{item.toString(16).padStart(2, '0').toUpperCase()}</div>
            ))}
        </div>
        <div className="HexWrap">
            {...hexData.map((item, i) => (
                <div className={"Hexxie T"+i}
                onMouseEnter={() => EnterHandle(i)}
                onMouseLeave={() => LeaveHandle(i)}
                >{String.fromCharCode(item)}</div>
            ))}
        </div>
      </div>
    </>
  );
}
