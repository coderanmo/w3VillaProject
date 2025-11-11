
import React, { useState } from 'react'
import { MdKeyboardArrowDown } from "react-icons/md";
import { Link } from 'react-router';
import { RxCross1 } from "react-icons/rx";

export default function Header() {
    let [ourServicesDropDown, setOurServicesDropDown] = useState(false)
    let [propertiesFor, setPropertiesFor] = useState(false)
    let [leftSlider, setLeftSlider] = useState(false)
    return (
        <>
            {
                leftSlider &&
                (
                    <div className='fixed  h-full bg-white z-[99999] top-0 shadow-lg border border-gray-300  w-[250px] lg:hidden md:hidden'>
                        <div className='p-[20px] flex justify-between items-center'>
                            <h2 className='font-bold text-[18px] font-serif'>W3 Polling</h2>
                            <RxCross1 onClick={() => setLeftSlider(false)} className='cursor-pointer' />
                        </div>
                        <div className='mt-[10px]  p-[20px]'>
                            <Link to={'/home'}>
                                <h3 onClick={()=>setLeftSlider(false)} className='font-serif text-[16px] text-gray-500'>Home</h3>
                                <Link to={'/view-user'}><li className='onClick={()=>setLeftSlider(false)} mt-[15px] cursor-pointer text-gray-600 text-[16px] font-serif font-medium hover:text-blue-800'>View user</li></Link>
                                <div className='relative cursor-pointer text-gray-600  font-serif font-medium hover:text-blue-800' onMouseEnter={() => setOurServicesDropDown(true)} onMouseLeave={() => setOurServicesDropDown(false)}>
                                    <li className='flex items-center justify-between text-[16px] mt-[15px]'>Poll <MdKeyboardArrowDown /></li>
                                    {
                                        ourServicesDropDown &&
                                        (
                                            <div className='w-[150px] absolute  border border-gray-300 rounded-[5px] bg-white p-[10px]  text-black'>
                                                <Link to={'/create-poll'}><h4 onClick={()=>setLeftSlider(false)} className='capitalize text-[14px] py-[10px] hover:bg-[#fff5f6] p-[5px]'>Create Poll</h4></Link>
                                                <Link to={'/view-poll'}><h4 onClick={()=>setLeftSlider(false)} className='capitalize text-[14px] py-[10px] hover:bg-[#fff5f6] p-[5px]'>View Poll </h4></Link>
                                            </div>
                                        )
                                    }
                                </div>
                            </Link>


                        </div>
                    </div>
                )
            }
            {/* fixed right slider */}
            <header className='sticky top-0 shadow-lg bg-white z-[9999]'>
                <nav className='max-w-[1320px] mx-auto p-[15px]   flex justify-between  items-center '>
                    <div>
                        <h2 className='text-[30px] font-serif  text-red-500'>W3.Polling</h2>
                    </div>
                    <button onClick={() => setLeftSlider(true)} data-collapse-toggle="navbar-default" type="button" class="cursor-pointer inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-default" aria-expanded="false">
                        <span class="sr-only">Open main menu</span>
                        <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15" />
                        </svg>
                    </button>
                    <div className='items-center justify-between hidden md:block md:w-auto' id="navbar-default" >
                        <ul className='flex justify-between gap-[30px] items-center font-serif'>
                            <Link to={'/home'}><li className='cursor-pointer text-gray-600 text-[16px] font-serif font-medium hover:text-blue-800'>Home</li></Link>
                            <Link to={'/view-user'}><li className='cursor-pointer text-gray-600 text-[16px] font-serif font-medium hover:text-blue-800'>View user</li></Link>

                            <div className='relative cursor-pointer text-gray-600  font-serif font-medium hover:text-blue-800' onMouseEnter={() => setOurServicesDropDown(true)} onMouseLeave={() => setOurServicesDropDown(false)}>
                                <li className='flex items-center justify-between text-[16px]'>Poll <MdKeyboardArrowDown /></li>
                                {
                                    ourServicesDropDown &&
                                    (
                                        <div className='w-[150px] absolute  border border-gray-300 rounded-[5px] bg-white p-[10px]  text-black'>
                                            <Link to={'/create-poll'}><h4 className='capitalize text-[14px] py-[10px] hover:bg-[#fff5f6] p-[5px]'>Create Poll</h4></Link>
                                            <Link to={'/view-poll'}><h4 className='capitalize text-[14px] py-[10px] hover:bg-[#fff5f6] p-[5px]'>View Poll </h4></Link>
                                        </div>
                                    )
                                }
                            </div>

                        </ul>
                    </div>
                </nav>
            </header>
        </>
    )
}
