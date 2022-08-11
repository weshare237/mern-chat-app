import React from 'react'

import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Chat from './pages/Chat'

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <div className='App'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='chats' element={<Chat />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
