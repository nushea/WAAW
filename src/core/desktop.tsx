import { useState, useEffect, useRef } from "react";
import "../css/format.css";
import "../css/other.css";
import "../css/root.css";

export default function Desktop({PID, newApp}) {
  const [apps, setApps] = useState([]);

  useEffect(() => {
    fetch("/src/core/json/desktop.json")
      .then(res => res.json())
      .then(data => {setApps(data);
      });
  }, []);
  return (
    <div className="Desktop">
      {apps.map((entry, index) => (
        <button
          key={index}
          onClick={() => newApp(entry.app, entry.arg)}
          className="DesktopButton"
        >
          <img src={entry.img} alt={entry.label} />
          <p>{entry.label}</p>
        </button>
      ))}
    </div>
  );
}
