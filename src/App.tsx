import "./css/format.css";
import "./css/other.css";
import "./css/root.css";
import SideBar from "./core/sidebar.tsx"
import Windows from "./core/windows.tsx"
import { FunctionComponent, useRef, useEffect, useState } from "react";
function App() {
  const [PID, setPID] = useState<
    {
      apptype: FunctionComponent;
      id: number;
      title: string;
      icon: string;
    }[]
  >([]);
  const focusCounter = useRef(0);
  function newApp(appType) {
    setPID([
      ...PID,
      {
        apptype: appType,
        id: Math.random(),
        title: appType.name,
        icon: "/img/icons8-exit-96.png",
      },
    ]);
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
      <SideBar PID={PID} newApp={newApp} setFocus={() => focusCounter.current++} />
      <Windows PID={PID} newApp={newApp} setFocus={() => focusCounter.current++} modPID={modPID} remApp={remApp} />

    </>
  );
}

export default App;
