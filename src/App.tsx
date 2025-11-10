import "./css/format.css";
import "./css/other.css";
import "./css/root.css";
import FE from "./FE.jsx";
import INFO from "./info.tsx";
import { FunctionComponent, useRef, useEffect, useState } from "react";
const enum interStateValue {
  Normal = 1,
  Maximized,
}
function MinimizeButton(container) {
  return (
    <>
      <button
        onClick={() => (container.container.current.parentNode.style.display = "none")}
        className="decButtons"
      >
        <img src="/img/icons8-minimize-100.png" />
      </button>
    </>
  );
}
function MaximizeButton({ maximize }) {
  return (
    <>
      <button onClick={() => maximize()} className="decButtons">
        <img src="/img/icons8-maximize-100.png" />
      </button>
    </>
  );
}
function ExitButton({ remApp }) {
  return (
    <>
      <button onClick={() => remApp()} className="decButtons">
        <img src="/img/icons8-exit-96.png" />
      </button>
    </>
  );
}
function Decorator({ AppType, container, maximize, oldState, setInterState, interState, remApp }) {
  const [relativeX, setRelativeX] = useState(0);
  const [relativeY, setRelativeY] = useState(0);
  const [isDown, setIsDown] = useState(false);
  function handleMouseDown(e) {
    if (isDown == false) {
      setIsDown(true);
      const rect = container.current.getBoundingClientRect();
      setRelativeX(e.clientX - rect.left);
      setRelativeY(e.clientY - rect.top);
    }
  }
  function handleMouseUp() {
    setIsDown(false);
  }
  function handleMouseMove(e) {
    var parent = container.current;
    if (isDown) {
      if (interState == interStateValue.Maximized) {
        setInterState(interStateValue.Normal);
        parent.style.width = oldState.oldWidth;
        parent.style.height = oldState.oldHeight;
        const rect = container.current.getBoundingClientRect();
        setRelativeX(rect.left + rect.width / 2);
        setRelativeY(5);
      }
      parent.style.left = e.clientX - relativeX + "px";
      parent.style.top = e.clientY - relativeY + "px";
    }
  }
  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDown, relativeX, relativeY]);
  const name = AppType.name;
  return (
    <>
      <div className="decorator">
        <div onMouseDown={handleMouseDown} className="decoratorHandle">
          <p> {name} </p>
        </div>
        <div className="decoratorButtons">
          <MinimizeButton container={container} />
          <MaximizeButton maximize={maximize} />
          <ExitButton remApp={remApp} />
        </div>
      </div>
    </>
  );
}

function AppBase({ AppType, remApp, setFocus }) {
  const container = useRef<HTMLDivElement>(null);
  const [zIndex, setZIndex] = useState(() => setFocus());
  const [interState, setInterState] = useState(interStateValue.Normal);
  const [oldState, setOldState] = useState<{
    oldX: string;
    oldY: string;
    oldWidth: string;
    oldHeight: string;
  }>({
    oldX: container.current ? container.current.style.left : "0",
    oldY: container.current ? container.current.style.top : "0",
    oldWidth: container.current ? container.current.style.width : "0",
    oldHeight: container.current ? container.current.style.height : "0",
  });
  function maximize() {
    if (!container.current || !interState) return;
    if (interState != interStateValue.Maximized) {
      setInterState(interStateValue.Maximized);
      setOldState({
        oldX: container.current.style.left,
        oldY: container.current.style.top,
        oldWidth: container.current.style.width,
        oldHeight: container.current.style.height,
      });
      container.current.style.width = "calc(100% - 5cqw - 2px)";
      container.current.style.height = "calc(100% - 2px)";
      container.current.style.left = "5cqw";
      container.current.style.top = "0";
    } else {
      container.current.style.left = oldState.oldX;
      container.current.style.top = oldState.oldY;
      container.current.style.width = oldState.oldWidth;
      container.current.style.height = oldState.oldHeight;
      setInterState(interStateValue.Normal);
      setOldState({
        oldX: oldState.oldX,
        oldY: oldState.oldY,
        oldWidth: oldState.oldWidth,
        oldHeight: oldState.oldHeight,
      });
    }
  }
  return (
    <>
      <div
        className="application"
        onMouseDown={() => setZIndex(setFocus())}
        ref={container}
        style={{
          zIndex: zIndex.toString(),
          width: AppType == FE ? "45%" : "20%",
          height: AppType == FE ? "50%" : "45%",
        }}
      >
        <Decorator
          container={container}
          AppType={AppType}
          remApp={remApp}
          maximize={maximize}
          oldState={oldState}
          setInterState={setInterState}
          interState={interState}
        />
        <AppType />
      </div>
    </>
  );
}
function AppSide({ AppType, id, setFocus }) {
  const [isHidden, setIsHidden] = useState(false);
  const [oldZIndex, setOldZIndex] = useState("0");
  function minimize() {
    const obj = document.getElementsByClassName("W" + id.toString().substring(2))[0] as HTMLElement;
    const child = obj.firstElementChild as HTMLElement | null;
    if(!child) return;
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
    child.style.zIndex = "9007199254740991";
  }
  function onLeave() {
    const obj = document.getElementsByClassName("W" + id.toString().substring(2))[0] as HTMLElement;
    const child = obj.firstElementChild as HTMLElement | null;
    if(!child) return;
    obj.style.display = isHidden ? "none" : "unset";
    child.style.opacity = "100%";
    child.style.zIndex = oldZIndex;
  }

  return (
    <>
      <button
        onClick={() => minimize()}
        onMouseEnter={() => onHover()}
        onMouseLeave={() => onLeave()}
        className="sideButtons"
      >
        <img
          src={
            AppType.name == "FE" ? "/img/icons8-folder-96.png" : "/img/icons8-information-100.png"
          }
        />
      </button>
    </>
  );
}
function App() {
  const [PID, setPID] = useState<
    {
      apptype: FunctionComponent;
      id: number;
    }[]
  >([]);
  const focusCounter = useRef(0);
  function newApp(appType) {
    setPID([
      ...PID,
      {
        apptype: appType,
        id: Math.random(),
      },
    ]);
  }
  function remApp(index: number) {
    setPID(PID.slice(0, index).concat(PID.slice(index + 1)));
  }
  return (
    <>
      <div className="SideBar">
        {...PID.map((PID, i) => (
          <div key={PID.id} className={"S" + PID.id.toString().substring(2)}>
            <AppSide AppType={PID.apptype} id={PID.id} setFocus={() => focusCounter.current++} />
          </div>
        ))}

        <button onClick={() => newApp(FE)} className="sideButtons">
          <img src="/img/icons8-exit-96.png" />
        </button>
        <button onClick={() => newApp(INFO)} className="sideButtons">
          <img src="/img/icons8-forward-96.png" />
        </button>
      </div>
      <div className="Windows">
        {...PID.map((PID, i) => (
          <div key={PID.id} className={"W" + PID.id.toString().substring(2)}>
            <AppBase
              AppType={PID.apptype}
              remApp={() => remApp(i)}
              setFocus={() => focusCounter.current++}
            />
          </div>
        ))}
      </div>
    </>
  );
}

export default App;
