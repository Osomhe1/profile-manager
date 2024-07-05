import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import ProfileManager from './components/ProfileManager'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className='App'>
        <ProfileManager />
      </div>
      
    </>
  )
}

export default App
