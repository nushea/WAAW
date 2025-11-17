import { useState, useEffect, useRef } from "react";
import "../css/format.css";
import "../css/other.css";
import "../css/root.css";

export default function Desktop({PID, newApp}) {
  return (
    <>
      <div className="Desktop">
        <button onClick={() => newApp("INFO", "")} className="DesktopButton">
          <img src="/img/icons8-information-100.png" />
          <p> INFO </p>
        </button>
        <button onClick={() => newApp("FE", "--home")} className="DesktopButton">
          <img src="/img/icons8-home-144.png" />
          <p> Home </p>
        </button>
        <button onClick={() => newApp("FE", "/")} className="DesktopButton">
          <img src="/img/icons8-folder-96.png" />
          <p> FE </p>
        </button>
        <button onClick={() => newApp("FAUX", "https://she-a.eu")} className="DesktopButton">
          <img src="/img/icons8-browser-96.png" />
          <p> Faux </p>
        </button>
        <button onClick={() => newApp("IMV", "/home/myou/s/a.png")} className="DesktopButton">
          <img src="/img/icons8-image-96.png" />
          <p> a.png </p>
        </button>
        <button onClick={() => newApp("VIV", "/home/myou/a.mp4")} className="DesktopButton">
          <img src="/img/icons8-video-96.png" />
          <p> a.mp4 </p>
        </button>
        </div>
    </>
  );
}
