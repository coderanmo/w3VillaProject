import axios from 'axios'
import React, { useEffect, useState } from 'react'

export default function PollGraph() {
  let apiBaseUrlAdmin=import.meta.env.VITE_APIBASEURLADMIN

  let [poll,setPoll]=useState([])
  let getPoll=()=>{
    axios.get(`${apiBaseUrlAdmin}poll/view`)
    .then((resApi)=>resApi.data)
    .then((resFinal)=>{
      setPoll(resFinal.data)
    })
  }
  useEffect(()=>{
    getPoll()
  },[])

  return (
    <div className='max-w-[1320px] mx-auto '>
      <div className='grid lg:grid-cols-3 sm:grid-cols-3 grid-cols-1 gap-[20px]   mt-[50px] rounded-[5px] p-[20px] '>
       
         {
                    poll.map((items, index) => {
                        let expired = new Date(items.closingDateTime) < new Date();
                        
                        return (
                            <div key={index} className="rounded-[8px] border border-gray-100 p-[20px] bg-gray-100">
                                <button className={`p-[8px_12px] text-[14px] rounded-[22px] font-serif text-white ${expired ? "bg-red-500 " : "bg-green-600"}`}>
                                    {expired ? "Expired" : "Active"}
                                </button>
                                <p className="pt-[10px]">closing Data: {items.closingDateTime}</p>

                            </div>
                        )
                    })
                }
        
      </div>
    </div>

  )
}
