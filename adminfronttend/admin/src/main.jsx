import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router'
import './index.css'

import CreatePoll from './components/pages/poll/CreatePoll'
import ViewPoll from './components/pages/poll/ViewPoll'
import Layout from './components/common/Layout'
import Login from './Login'
import MainContext from './components/context/MainContext'
import PollGraph from './components/pages/home/PollGraph'
import ViewUser from './components/pages/user/ViewUser'

ReactDOM.createRoot(document.getElementById('root')).render(
  <MainContext>
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path='/home' element={<PollGraph/>} />
          <Route path='/create-poll' element={<CreatePoll/>} />
          <Route path='/view-poll' element={<ViewPoll />} />
          <Route path='/update-poll/:id' element={< CreatePoll />} />
          <Route path='/view-user' element={<ViewUser/>} />
        </Route>
        <Route path='/' element={< Login />} />
      </Routes>
    </BrowserRouter>
  </MainContext>
)