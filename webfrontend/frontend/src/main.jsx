
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter, Route, Routes } from 'react-router'
import Layout from './common/Layout'
import Header from './common/Header'
import Login from './pages/Login'
import Register from './pages/Register'
import Home from './pages/Home'
import Voting from './pages/Voting'
import MainLayout from './MainLayout'
import VotingQuestion from './pages/VotingQuestion'

createRoot(document.getElementById('root')).render(
  <MainLayout>
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>

          <Route path='/voting' element={<Voting />} />
          <Route path='/' element={<Home />} />
          <Route path='/voting-start/:id' element={<VotingQuestion/>} />

        </Route>
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
      </Routes>
    </BrowserRouter>
  </MainLayout>
)
