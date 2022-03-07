import React from 'react';
import Sketch from "react-p5";

function Scratchoff() {
	const setup = (p5, canvasParentRef) => {
    p5.createCanvas(400, 400).parent(canvasParentRef);
  };

  const draw = (p5) => {
    p5.strokeWeight(50);
    if(p5.mouseIsPressed === true) {
      p5.line(p5.mouseX, p5.mouseY, p5.pmouseX, p5.pmouseY);
    }
  };

	return (
		<div style={{ position: "relative" }}>
			<section>
        <div className="box">
            <h2>DeScratchOff Card</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
        </div>
      </section>
      <Sketch setup={setup} draw={draw} />
		</div>
	)
}

export default Scratchoff;