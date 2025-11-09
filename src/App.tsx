import './format.css'
import './other.css'
import FE from './FE.jsx';
import { FunctionComponent, useRef, useEffect, useState } from 'react';
function MinimizeButton(){
	return (
		<>
			<button onClick={() => alert("ACHOO")} className="decButtons">
				<img src="/img/icons8-minimize-100.png" />
			</button>	
		</>
	);
}
function MaximizeButton(){
	return (
		<>
			<button onClick={() => alert("ACHOO")} className="decButtons">
				<img src="/img/icons8-maximize-100.png" />
			</button>	
		</>
	);
}
function ExitButton({remApp}){
	return (
		<>
			<button onClick={() => remApp()} className="decButtons">
				<img src="/img/icons8-exit-96.png" />
			</button>	
		</>
	);
}
function Decorator({AppType, container, remApp}){
	const [relativeX, setRelativeX] = useState(0);
	const [relativeY, setRelativeY] = useState(0);
	const [isDown, setIsDown] = useState(false);
	function handleMouseDown(e) {
		if(isDown == false){
			setIsDown(true);
			const rect = container.current.getBoundingClientRect();
			setRelativeX(e.clientX-rect.left);
			setRelativeY(e.clientY-rect.top);
		}
	}
	function handleMouseUp() {
		setIsDown(false);
	}
	function handleMouseMove(e) {
		var parent = container.current;
		if(isDown){
			parent.style.left = (e.clientX - relativeX) + "px";
			parent.style.top = (e.clientY - relativeY) + "px";
		}
	}
	useEffect(() => {
		window.addEventListener("mousemove", handleMouseMove);
		window.addEventListener("mouseup", handleMouseUp);
		return () => {
			window.removeEventListener("mousemove", handleMouseMove);
			window.removeEventListener("mouseup", handleMouseUp);
		}
	}, [isDown, relativeX, relativeY]);
	const name = AppType.name;
	return (
	<>
		<div className="decorator">
			<div onMouseDown={handleMouseDown} className="decoratorHandle"> 
			<p> {name} </p>
			</div>
			<div className="decoratorButtons">
				<MinimizeButton />
				<MaximizeButton />
				<ExitButton remApp={remApp}/>
			</div>
		</div>
	</>
	)
}

function AppBase({AppType, remApp, setFocus, isFocus}){
	const container = useRef(null);
	console.log(isFocus);
	return (
	<>
		<div className="application" onMouseDown={setFocus} ref={container}  style={{zIndex: (isFocus)? 10: "unset" }} >
			<Decorator container={container} AppType={AppType} remApp={remApp}/>
			<AppType />
		</div>
	</>
	);
}

function App() {
	const [PID, setPID] = useState<{apptype: FunctionComponent, id: number}[]>([]);
	const [focus, setFocus] = useState(0);
	useEffect(() => {
		setPID([{apptype:FE,id:Math.random()}, {apptype:FE,id:Math.random()}]);
	}, []);
	function newApp(){
		setPID([...PID, {apptype:FE,id:Math.random()} ]);
		console.log(focus);
	}
	function remApp(index : number){
		setPID(PID.slice(0, index).concat(PID.slice(index+1)));
	}
		return (
	<>
		<button onClick={() => newApp()} className="decButtons">
			<img src="/img/icons8-exit-96.png" />
		</button>	
		<div className="Windows">
		{...PID.map((PID, i) => (
		<div key={PID.id} className={PID.id.toString().substring(2)}>
			<p>  ‍ </p>
			<AppBase AppType={PID.apptype} remApp={ () => remApp(i)} setFocus={() => setFocus(i)} isFocus={focus==i} />
			</div>
		))}
		</div>
	</>
	)
}


export default App;