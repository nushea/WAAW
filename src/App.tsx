import "./css/format.css";
import "./css/other.css";
import "./css/root.css";
import SideBar from "./core/sidebar.tsx"
import Desktop from "./core/desktop.tsx"
import Windows from "./core/windows.tsx"

import FE from "./apps/FE.jsx"
import INFO from "./apps/info.tsx"
import READ from "./apps/read.tsx"
import IMV from "./apps/imv.tsx"
import VIV from "./apps/viv.tsx"
import HEX from "./apps/hex.tsx"
import FAUX from "./apps/browser.tsx"
import { FunctionComponent, useRef, useEffect, useState } from "react";

const IMAGE_EXTS = ['png', 'jpg', 'jpeg', 'gif', 'webp', 'avif', 'svg', 'bmp', 'ico'];
const VIDEO_EXTS = ['mp4', 'webm', 'ogg', 'mov', 'avi', 'mkv', 'm4v'];
const TEXT_EXTS  = ['txt', 'md', 'csv', 'json', 'xml', 'html', 'css', 'js', 'ts', 'cpp', 'c', 'bat', 'ini', 'asm'];

function getExtension(name) {
  const cleanName = name.split('?')[0].split('#')[0];
  return cleanName.split('.').pop().toLowerCase();
}
function isImage(name) {
  return IMAGE_EXTS.includes(getExtension(name));
}

function isVideo(name) {
  return VIDEO_EXTS.includes(getExtension(name));
}

function isText(name) {
  return TEXT_EXTS.includes(getExtension(name));
}

  function getAppType(name){
    if(isImage(name))
      return "IMV";
    if(isVideo(name))
      return "VIV";
    if(isText(name))
      return "READ";
    return "HEX";
  }

function App() {
  const [PID, setPID] = useState<
    {
      apptype: FunctionComponent;
      id: number;
      title: string;
      icon: string;
      args: string;
      posX: string;
      posY: string;
    }[]
  >([]);
  const focusCounter = useRef(0);
  const [offsets, setOffsets] = useState< 
    {
      x: number;
      y: number;
      off: number;
    } 
  >({x: 0, y: 0, off: 1});
  const maxX = 5; 
  const maxY = 6;
  function newApp(appType, args: string) {
    if(typeof appType == "string"){
      if(appType == '?'){
        appType = getAppType(args);
      }
      switch(appType){
        case "FE": appType = FE; break;
        case "INFO": appType = INFO; break;
        case "READ": appType = READ; break;
        case "IMV": appType = IMV; break;
        case "VIV": appType = VIV; break;
        case "HEX": appType = HEX; break;
        case "FAUX": appType = FAUX; break;
      }
    }
    setPID([
      ...PID,
      {
        apptype: appType,
        id: Math.random(),
        title: appType.name,
        icon: "/img/icons8-exit-96.png",
        args: args,
        posX: 7 + (offsets.x * 6) + "cqw",
        posY: 2 + (offsets.y * 6) + "cqh",
      },
    ]);
    if(offsets.x >= maxX &&  offsets.y > maxY)
      setOffsets({x: 0, y: 0, off: 1});
    else if(offsets.x <= 0 || offsets.y > maxY){
      if(offsets.off <= maxX)
        setOffsets({x: offsets.off, y: 0, off: offsets.off + 1})
      else
        setOffsets({x: maxX, y: offsets.off - maxX, off: offsets.off + 1})
    }
    else
      setOffsets({x: offsets.x - 1, y: offsets.y + 1, off: offsets.off})
    console.log(offsets);
  }
  function remApp(index: number) {
    setPID(PID.slice(0, index).concat(PID.slice(index + 1)));
  }
  const modPID = (id: number, newData: Partial<{ title: string; icon: string }>) => {
  setPID(prev =>
    prev.map(item =>
      item.id === id
        ? { ...item, ...newData }
        : item
    )
  );
};
  return (
    <>
      <div className="Background">
        <SideBar PID={PID} newApp={newApp} setFocus={() => focusCounter.current++} />
        <Desktop PID={PID} newApp={newApp}/>
      </div>
      <Windows PID={PID} newApp={newApp} setFocus={() => focusCounter.current++} modPID={modPID} remApp={remApp} />

    </>
  );
}

export default App;
