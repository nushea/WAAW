import './format.css'
import './other.css'
import FE from './FE.jsx';
import { FunctionComponent, useRef, useEffect, useState } from 'react';
function minimizeButton(){
	return (
		<>
			
		</>
	);
}

function Decorator({AppType, container}){
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
				
				MMX
			</div>
		</div>
	</>
	)
}

function AppBase({AppType}){
	const container = useRef(null);
	return (
	<>
		<div className="application" ref={container}>
			<Decorator container={container} AppType={AppType}/>
			<AppType />
		</div>
	</>
	);
}

function App() {
	const [PID, setPID] = useState<FunctionComponent[]>([]);
	useEffect(() => {
		setPID([FE, FE]);
	}, []);
		return (
	<>
		<div className="cazzo">
			{...PID.map((PID, i) => (
			<div>
				PID={i}
				<AppBase AppType={PID} />
				</div>
			))}
		</div>
	</>
	)
}


export default App;
