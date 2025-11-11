import React, { useContext, useEffect } from 'react'
import Header from './Header'
import { Outlet, useNavigate } from 'react-router'
import Footer from './Footer'
import { loginContext } from '../context/MainContext'
import axios from 'axios'

export default function Layout() {

  let { login, setLogin } = useContext(loginContext)
  let navigate = useNavigate()
  let apiBaseurl = import.meta.env.VITE_APIBASEURLADMIN

  useEffect(() => {
    if (login == null || login == undefined || login == '') {
      navigate('/')
    }
    else {
      if (login) {
        axios.get(`${apiBaseurl}adminauth/check-id/${login}`)
          .then((resApi) => resApi.data)
          .then((resFinal) => {
            if (resFinal.status == 0) {
              setLogin(null)
            }
          })
      }
    }
  }, [login])
  return (
    <div className='flex flex-col min-h-screen'>
      <Header />
      <main className="flex-grow">

        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
