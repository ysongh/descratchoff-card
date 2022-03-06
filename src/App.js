import React from 'react';
import Sketch from "react-p5";
import './App.css';

function App() {
  const setup = (p5, canvasParentRef) => {
    p5.createCanvas(p5.windowWidth, p5.windowHeight).parent(canvasParentRef);
  };

  const draw = (p5) => {
    p5.strokeWeight(20);
    if(p5.mouseIsPressed === true) {
      p5.line(p5.mouseX, p5.mouseY, p5.pmouseX, p5.pmouseY);
    }
  };
  
  return (
    <div className="App">
      <section>
        <div class="box">
            <h2>DeScratchOff Card</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloremque ducimus voluptatibus numquam, aliquid vitae, praesentium provident iste vero laborum amet molestiae voluptatum nam harum, tempora saepe odit rerum voluptatem enim! Dicta quis dolor voluptatibus vitae, consectetur sint laborum aspernatur neque asperiores tenetur similique veniam iste tempore quas soluta ratione maiores quam quae officiis? Exercitationem culpa inventore possimus necessitatibus, est vitae nesciunt doloremque ipsum ut atque amet, voluptatibus excepturi quae reprehenderit quidem sit nam optio? Aut dolores, facere exercitationem repudiandae consectetur hic similique, quibusdam velit perferendis nemo suscipit deleniti illum quisquam maiores, voluptates libero eum! Ex nam laborum sint harum nesciunt?</p>
        </div>
      </section>
      <Sketch setup={setup} draw={draw} />
    </div>
  );
}

export default App;
