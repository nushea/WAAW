import { useState, useEffect, useRef } from "react";
import "../css/format.css";
import "../css/other.css";
import "../css/viv.css";


export default function VIV({PID, modPID, parent}) { 
  const [imageData, setImageData] = useState(null);
  useEffect(() => {
    modPID({title: "VIV - " + PID.args , icon: "/img/icons8-video-96.png"});
    fetch("http://localhost/api/wawAPI/"+PID.args)
      .then((response) => response.blob())
      .then((blob) => {
        const url = URL.createObjectURL(blob);
        setImageData(url);
      })
      .catch((err) => console.error("Failed to fetch image:", err));
  }, []);
  return (
    <>
      <div className="VIVWindow"> 
          <video src={(imageData)?imageData : "/img/icons8-video-96.png"} draggable={false} style={{userSelect: "none"}} controls />
      </div>
    </>
  );
}
