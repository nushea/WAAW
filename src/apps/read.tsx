import { useState, useEffect, useRef } from "react";
import "../css/format.css";
import "../css/other.css";
import "../css/root.css";
import "../css/info.css";

export default function READ({PID, modPID, parent}) {
  const [data, setData] = useState("");

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
      <div className="ReadWindow" style={{ whiteSpace: "pre-line" }}>
          <p>{data}</p>
      </div>
    </>
  );
}
