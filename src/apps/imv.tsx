import { useState, useEffect, useRef } from "react";
import "../css/format.css";
import "../css/other.css";
import "../css/imv.css";

function handleWheel(event, height, setHeight){
    if (event.deltaY > 0) {
      if(height > 5)
        setHeight(height - 5);
    } else {
      setHeight(height + 5);
    }
  };
function handleMove(event, isPressed, pos, setPos){
  if(isPressed){
    setPos(prevPos => ({
      x: prevPos.x + event.movementX,
      y: prevPos.y + event.movementY
    }));
    console.log(pos.x, pos.y);
  }
}

export default function IMV({PID, modPID, parent}) { 
  const [imageData, setImageData] = useState(null);
  const [height, setHeight] = useState(100);
  const [pos, setPos] = useState<
    {
      x: number;
      y: number;
    }
  >(
    {
      x: 0,
      y: 0,
    }
  );
  const [isPressed, setIsPressed] = useState(0);
  useEffect(() => {
    modPID({title: "IMV - " + PID.args , icon: "/img/icons8-image-96.png"});
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
      <div className="IMVWindow" 
        onWheel={(event) => handleWheel(event, height, setHeight)} 
        onMouseMove={(event) => {handleMove(event, isPressed, pos, setPos); event.preventDefault();}}
        onMouseDown={() => setIsPressed(1)}
        onMouseUp={() => setIsPressed(0)}>
        <div className="IMVWImage" 
          style={{
            marginLeft:pos.x.toString()+"px",
            marginTop:pos.y.toString()+"px",
            height: height+"%",
          }}>
          <img src={(imageData)?imageData : "/img/icons8-image-96.png"} draggable={false} style={{userSelect: "none"}} />
        </div>
      </div>
    </>
  );
}
