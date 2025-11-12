import { useState, useEffect, useRef } from "react";
import "../css/format.css";
import "../css/other.css";
import "../css/info.css";

import FE from "../apps/FE.jsx";
import INFO from "../apps/info.tsx";

function SidePreview({title, curPreview}){
  if(!curPreview) return;
  return (
    <div 
      className="SidePreview" 
      style={{
        display: (title == "")? "none": "unset",
        left: "5cqw",
        top: (curPreview.top + curPreview.height/4)+"px",
      }}
    >
      <p> {title} </p>
    </div>
  )
}

function AppSide({ PID, setFocus, setPreviewTitle, setCurPreview }) {
  const [isHidden, setIsHidden] = useState(false);
  const [oldZIndex, setOldZIndex] = useState("0");
  const ref = useRef(null);
  const id=PID.id;
  function minimize() {
    const obj = document.getElementsByClassName("W" + id.toString().substring(2))[0] as HTMLElement;
    const child = obj.firstElementChild as HTMLElement | null;
    if (!child) return;
    setIsHidden(false);
    obj.style.display = "unset";
    child.style.zIndex = setFocus();
    setOldZIndex(child.style.zIndex);
  }
  function onHover() {
    const obj = document.getElementsByClassName("W" + id.toString().substring(2))[0] as HTMLElement;
    const child = obj.firstElementChild as HTMLElement | null;
    if (!child) return;
    setIsHidden(obj.style.display == "none");
    setOldZIndex(child.style.zIndex);
    obj.style.display = "unset";
    child.style.opacity = "90%";
    child.style.zIndex = "2147483646";
    setPreviewTitle(PID.title);
    if(ref.current)
      setCurPreview({
        top: ref.current.getBoundingClientRect().top,
        height: ref.current.getBoundingClientRect().height,
      });
  }
  function onLeave() {
    const obj = document.getElementsByClassName("W" + id.toString().substring(2))[0] as HTMLElement;
    const child = obj.firstElementChild as HTMLElement | null;
    if (!child) return;
    obj.style.display = isHidden ? "none" : "unset";
    child.style.opacity = "100%";
    child.style.zIndex = oldZIndex;
    setPreviewTitle("");
  }

  return (
    <>
      <button
        ref={ref}
        onClick={() => minimize()}
        onMouseEnter={() => onHover()}
        onMouseLeave={() => onLeave()}
        className="sideButtons" 
      >
        <img src={PID.icon}/>
      </button>
    </>
  );
}
export default function SideBar({PID, newApp, setFocus}) {
  const [previewTitle, setPreviewTitle] = useState("");
  const [curPreview, setCurPreview] = useState<
    {
      top: string;
      height: string;
    }
  >();
  return (
    <>
      <div className="SideBar">
      <SidePreview title={previewTitle} curPreview={curPreview} />
        <div className="SideApps">
          {...PID.map((PID, i) => (
            <div key={PID.id} className={"S" + PID.id.toString().substring(2)}>
              <AppSide PID={PID} setFocus={setFocus} setPreviewTitle={setPreviewTitle} setCurPreview={setCurPreview}/>
            </div>
          ))}
        </div>
        <div className="Contexts">
          <button onClick={() => newApp(FE)} className="sideButtons">
            <img src="/img/icons8-exit-96.png" />
          </button>
          <button onClick={() => newApp(INFO)} className="sideButtons">
            <img src="/img/icons8-forward-96.png" />
          </button>
        </div>
      </div>
    </>);
}
