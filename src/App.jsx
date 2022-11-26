import { useState } from 'react'
import reactLogo from './assets/react.svg'
import { BrowserRouter, Routes, Route, Outlet, useNavigate } from 'react-router-dom'
import './App.css'
import Menu from './Components/menu/menu'
import Field from './Components/Gamepage/Field'
function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>

      <Routes>
        <Route index element={<Menu />} ></Route>
        <Route path='/game' element={<Field />} ></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
