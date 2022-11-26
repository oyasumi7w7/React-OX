import { useState } from 'react'
import reactLogo from './assets/react.svg'
import { BrowserRouter, Routes, Route, Outlet, useNavigate } from 'react-router-dom'
import './App.css'
import Menu from './Components/menu/menu'
import Field from './Components/Gamepage/Field'
import ListReplay from './Components/Replay/listReplay'
import Replay from './Components/Replay/Replay'

function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>

      <Routes>
        <Route index element={<Menu />} ></Route>
        <Route path='/game' element={<Field />} ></Route>
        <Route path='/listReplay' element={<ListReplay />} ></Route>
        <Route path='/replay/:_id' element={<Replay />} ></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
