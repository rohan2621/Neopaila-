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
        {/* breadgumbs */}
        {/* Intrroductuin */}
        {/* Featured */}
        {/* Footer */}
      </Canvas>
    </>
  )
}

export default App
