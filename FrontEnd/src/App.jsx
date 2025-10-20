import { useState } from 'react'
import Canvas from './Components/Background/Canvas'
import NavBar from './Components/NavBar'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Canvas >
        {/* Navbar */}
        <NavBar />
      
      </Canvas>
    </>
  )
}

export default App
