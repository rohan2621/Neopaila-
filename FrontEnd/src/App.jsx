import { useState } from "react";
import Canvas from "./Components/Background/Canvas";
import NavBar from "./Components/NavBar";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Canvas>
        {/* Navbar */}
        <NavBar />
      </Canvas>
    </>
  );
}

export default App;
