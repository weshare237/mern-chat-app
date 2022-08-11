import React from 'react'

import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Chats from './pages/Chats'

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='chats' element={<Chats />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
