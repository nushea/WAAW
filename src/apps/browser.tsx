import { useState, useEffect, useRef } from "react";
import "../css/format.css";
import "../css/other.css";
import "../css/root.css";
import "../css/faux.css";

function BreadCrumbs({ src, setSrc }) {
  const [crumb, setCrumb] = useState(src);
  useEffect(() => {
    setCrumb(src.substring(8));
  }, [src]);

  return (
    <>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          setSrc("https://" + crumb);
        }}
      >
        <input
          className="breadcrumbs"
          type="text"
          value={crumb}
          onChange={(event) => {
            setCrumb(event.target.value);
          }}
        />
      </form>
    </>
  );
}
export default function FAUX({PID, modPID, parent, newApp}) {
  const [src, setSrc] = useState("/");
  useEffect(() => {
    modPID({title: "Browse - "+ PID.args, icon: "/img/icons8-browser-96.png"});
    setSrc(PID.args);
  }, [src]);
  return (
    <>
      <div className="FauxWindow" style={{ whiteSpace: "pre-line" }}>
        <div className="FauxMenu">
          <p> Go to: </p>
          <BreadCrumbs src={src} setSrc={setSrc} />
          <button className="FauxInfo" onClick={() => newApp("INFO", "Faux\\Faux Browser\nAn iframe cosplaying a browser\n(very limited due to very good technical limitations from the browser)\\v1.0\\‍")}>
            <img src="/img/icons8-information-100.png"/> 
          </button>
        </div>
        <iframe className="FauxFrame" src={src} 
          sandbox="allow-scripts allow-same-origin"/>
      </div>
    </>
  );
}
