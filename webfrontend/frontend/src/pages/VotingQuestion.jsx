import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { toast, ToastContainer } from "react-toastify";

export default function VotingQuestion() {

    let { id } = useParams()
    let [getPoll, setGetPoll] = useState('')
    let token=useSelector((store)=>store.login.token)
    let navigate=useNavigate()
    let apiBaseUrlAdmin = import.meta.env.VITE_APIBASEURLADMIN
    let apiBaseUrlWeb=import.meta.env.VITE_APIBASEURL
    console.log(token)
    useEffect(() => {
        axios.get(`${apiBaseUrlAdmin}poll/single-poll/${id}`)
            .then((resApi) => resApi.data)
            .then((resFinal) => {
                setGetPoll(resFinal.data)

            })
    }, [id])
    let [answer,setAnswer]=useState('')
    let insertObj={
        answer,
        pollId:id
    }  
    let saveResult=(e)=>{        
        e.preventDefault()
        axios.post(`${apiBaseUrlWeb}userpoll/create`,insertObj,{
            headers:{
                Authorization:`Bearer ${token}`
            }
        })
        .then((resApi)=>resApi.data)
        .then((resFinal)=>{
            if(resFinal.status==1)
            {
                toast.success(resFinal.msg)
                setAnswer('')
                navigate('/voting')
            }
            else{
                toast.error(resFinal.msg)
            }
        })
    }
    return (
        <div className="max-w-4xl mx-auto p-4 my-[50px] border border-gray-300">
            <ToastContainer/>
            <h1 className="text-3xl font-bold text-center mb-8">Polls</h1>

            <form onSubmit={saveResult}>
                <div className="bg-white p-6 rounded-lg shadow-md mb-6">
                    <h2 className="text-xl font-semibold mb-4">
                        {getPoll.pollQuestion}
                    </h2>

                    <div className="flex flex-col gap-3">
                        {getPoll.pollAnswers && getPoll.pollAnswers.map((answer, index) => (
                            <label key={index} className="flex items-center gap-3 cursor-pointer">
                                <input
                                    type="radio"
                                    name="pollAnswer"

                                    onChange={(e)=>setAnswer(e.target.value)}
                                    className="accent-blue-500"
                                    value={answer} />
                                {answer}
                            </label>
                        ))}

                    </div>

                    <button type='submit' className="cursor-pointer mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                        Vote
                    </button>

                </div>
            </form>

        </div>
    );
}
