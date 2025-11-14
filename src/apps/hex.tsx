import { useState, useEffect, useRef } from "react";
import "../css/format.css";
import "../css/other.css";
import "../css/hex.css";

export default function HEX({PID, modPID, parent}) {
  const [data, setData] = useState("");
  const [hexData, setHexData] = useState([0]);
  useEffect(() => {
    const encoder = new TextEncoder();
    setHexData(Array.from(encoder.encode(data)));

    console.log(data);
  }, [data]);
  useEffect(() => {
    console.log(hexData);
  }, [hexData]);
  useEffect(() => {
    modPID({title: "Read - "+ PID.args, icon: "/img/icons8-text-100.png"})
    fetch("http://localhost/api/wawAPI/"+PID.args)
          .then((response) => response.text())
          .then((text) => {
            setData(text);
          })
  }
  , []);
  return (
    <>
      <div className="HexWindow" style={{ whiteSpace: "pre-line" }}>
        <div className="HexWrap">
            {...hexData.map((item, i) => (
                <div className={"Hexxie H"+i}>{item.toString(16).padStart(2, '0').toUpperCase()}</div>
            ))}
        </div>
        <div className="HexWrap">
            {...hexData.map((item, i) => (
                <div className={"Hexxie T"+i}>{String.fromCharCode(item)}</div>
            ))}
        </div>
      </div>
    </>
  );
}
