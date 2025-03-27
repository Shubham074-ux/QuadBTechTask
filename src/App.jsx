import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import NavBar from './components/NavBar'
import Middle from './components/Middle'
import TaskList from './components/TaskList'
function App() {

  return (
    <>
     <NavBar/>
     <Middle/>
     <TaskList/>
    </>
  )
}

export default App
