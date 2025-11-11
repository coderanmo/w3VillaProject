import React, { createContext, useEffect, useState } from 'react'
import Cookies from 'js-cookie'

export let loginContext=createContext()
export default function MainContext({children}) {
    let [login,setLogin]=useState(Cookies.get('ID') ?? '')
    let funObj={
        login,
        setLogin
    }
    useEffect(()=>{
       Cookies .set('ID',login)
    },[login])
  return (
    <loginContext.Provider value={funObj}>
        {children}
    </loginContext.Provider>
  )
}
