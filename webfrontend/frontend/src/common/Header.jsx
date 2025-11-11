import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router'
import { FaCircleUser } from "react-icons/fa6";
import { logOut } from '../redux/slice/loginSlice';
import { RxCross1 } from "react-icons/rx";

export default function Header() {
    let user = useSelector((store) => store.login.user)
    let token = useSelector((store) => store.login.token)
    let [leftSlider, setLeftSlider] = useState(false)
    let [name, setName] = useState(false)
    let dispatch = useDispatch()
    let navigate = useNavigate()

    let logoutHandle = () => {
        dispatch(logOut())
        navigate('/')
    }
    return (
        <>
            {/* left slider */}
            {
                leftSlider &&
                (
                    <div className='fixed  h-full bg-white z-[99999] top-0 shadow-lg border   w-[250px] lg:hidden md:hidden'>
                        <div className='p-[20px] flex justify-between items-center'>
                            <h2 className='font-bold text-[18px] font-serif'>W3 Polling</h2>
                            <RxCross1 onClick={() => setLeftSlider(false)} className='cursor-pointer' />
                        </div>
                        <div className='mt-[10px] border border-t-gray-200 p-[20px]'>
                            <Link to={'/'}>
                            <h3 className='font-serif text-[16px] text-gray-500'>Home</h3>
                            </Link>

                            {
                                user ?
                                    <div className='relatve mt-[20px]' onMouseEnter={() => setName(true)} onMouseLeave={() => setName(false)}>
                                        <FaCircleUser className='text-[35px] cursor-pointer' />
                                        {
                                            name &&
                                            (
                                                <div className='absolute p-[20px] bg-white rounded-[5px] border border-gray-200'>
                                                    <h3>{user.userName}</h3>
                                                    <div className='border border-t-gray-100 text-gray-300'></div>
                                                    <button onClick={logoutHandle} className='text-gray-400 font-serif  cursor-pointer'>Logout</button>

                                                </div>
                                            )
                                        }
                                    </div>
                                    :
                                    <Link to={'/login'}><button className='p-[10px_16px] text-white border border-gray-300 rounded-[22px] bg-red-500 hover:bg-red-300 cursor-pointer'>Login</button></Link>

                            }

                        </div>
                    </div>
                )
            }

            {/* left slider end */}

            <header className='sticky top-0 shadow-lg'>
                <nav class="bg-white border-gray-200 dark:bg-gray-900">
                    <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                        <a href="https://flowbite.com/" class="flex items-center space-x-3 rtl:space-x-reverse">
                            <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white font-serif">W3 Polling</span>
                        </a>
                        <button onClick={() => setLeftSlider(true)} data-collapse-toggle="navbar-default" type="button" class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-default" aria-expanded="false">

                            <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15" />
                            </svg>
                        </button>
                        <div class="hidden w-full md:block md:w-auto" id="navbar-default">
                            <ul class="font-medium flex flex-col items-center p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                                <Link to={'/'}> <li class="block py-2 px-3 text-white bg-blue-700 rounded-sm md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:text-blue-500" aria-current="page">Home
                                </li></Link>

                                {
                                    user ?
                                        <div className='relatve' onMouseEnter={() => setName(true)} onMouseLeave={() => setName(false)}>
                                            <FaCircleUser className='text-[35px] cursor-pointer' />
                                            {
                                                name &&
                                                (
                                                    <div className='absolute p-[10px] bg-white rounded-[5px] border border-gray-200 border border-gray-200'>
                                                        <h3>{user.userName}</h3>
                                                        <div className='border border-t-gray-100 text-gray-300'></div>
                                                        <button onClick={logoutHandle} className='text-gray-400 font-serif  cursor-pointer'>Logout</button>

                                                    </div>
                                                )
                                            }
                                        </div>
                                        :
                                        <Link to={'/login'}><button className='p-[10px_16px] text-white border border-gray-300 rounded-[22px] bg-red-500 hover:bg-red-300 cursor-pointer'>Login</button></Link>

                                }
                            </ul>
                        </div>
                    </div>
                </nav>

            </header>
        </>
    )
}
