import axios from 'axios'
import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router'
import { toast, ToastContainer } from 'react-toastify'
import { loginContext } from './components/context/MainContext'

export default function Login() {


  let apiBaseurl = import.meta.env.VITE_APIBASEURLADMIN
  let { login, setLogin } = useContext(loginContext)
  let [formValue, setFormValue] = useState({
    adminEamil: '',
    adminPassword: ''
  })
  let navigate = useNavigate()

  let getOrSetFormValue = (e) => {
    let obj = { ...formValue }
    let inputName = e.target.name
    let inputValue = e.target.value
    obj[inputName] = inputValue
    setFormValue(obj)
  }

  let adminLogin = (e) => {
    e.preventDefault()
    console.log(formValue)
    axios.post(`${apiBaseurl}adminauth/login`, formValue)
      .then((resApi) => resApi.data)
      .then((resFinal) => {
        if (resFinal.status == 1) {
          setLogin(resFinal.data._id)
          navigate('/home')
        }
        else {
          toast.error(resFinal.msg)
        }
      })
  }



  return (
    <div className='bg-[f9fafb]'>
      <ToastContainer />
      <div className='mt-[150px] '>
        <h2 className='flex text-[40px] font-serif font-bold justify-center uppercase'><span className='text-yellow-500'>Polli</span><span className='text-green-500'>ng</span></h2>
      </div>
      <div className='max-w-[500px] mt-[15px] mx-auto   p-[30px] bg-white shadow-lg border border-gray-300 rounded-[8px]'>
        <form onSubmit={adminLogin}>
          <div className='font-bold font-serif '>
            <h2 className='text-[30px]'>Sign in to your account</h2>
          </div>
          <h3 className='my-[10px] font-medium text-[16px] font-serif'>UserName</h3>
          <input name='adminEmail' onChange={getOrSetFormValue} value={formValue.adminEamil} type='text' className='p-[8px] text-[14px] text-gray-500 border border-gray-300 rounded-[8px] w-full' placeholder='username' />

          <h3 className='my-[10px] font-medium text-[16px] font-serif'>Password</h3>
          <input name='adminPassword' onChange={getOrSetFormValue} value={formValue.adminPassword} type='text' className='p-[8px] text-[14px] text-gray-500 border border-gray-300 rounded-[8px] w-full' placeholder='username' />
          <button type='submit' className='mt-[20px] w-full rounded-[8px] bg-sky-500 text-white text-[20px] font-medium font-serif p-[8px] border border-white hover:border hover:border-red-500 hover:bg-black duration-200 cursor-pointer'>Login</button>
        </form>
      </div>
    </div>
  )
}
