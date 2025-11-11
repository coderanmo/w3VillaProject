import axios from "axios";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router";

export default function Voting() {

    let [getPoll, setGetPoll] = useState([])
    let apiBaseUrlAdmin = import.meta.env.VITE_APIBASEURLADMIN
    let apiBaseUrlWeb = import.meta.env.VITE_APIBASEURL
    let token = useSelector((store) => store.login.token)
    let fetchPolls = () => {
        axios.get(`${apiBaseUrlAdmin}poll/view`)
            .then((resApi) => resApi.data)
            .then((resFinal) => {
                setGetPoll(resFinal.data)
            })
    }

    useEffect(() => {
        fetchPolls();
    }, []);

    let [checkResponseData, setCheckResponseData] = useState([])
    let CheckResponse = () => {
        axios.post(`${apiBaseUrlWeb}userpoll/check-response`, {}, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then((resApi) => resApi.data)
            .then((resFinal) => {
                setCheckResponseData(resFinal.data)
            })
    }

    useEffect(() => {
        CheckResponse()
    }, [])
    console.log(checkResponseData)

    return (
        <div className="max-w-[1170px] lg:mx-auto sm:mx-[5px] mx-[6px] ">
            <div className="my-[50px] grid lg:grid-cols-3 sm:grid-cols-3 grid-cols-1 gap-[20px]">
                {
                    getPoll.map((items, index) => {
                        let expired = new Date(items.closingDateTime) < new Date();
                        let alreadyVoted = checkResponseData.some(
                            (response) => response.pollId === items._id)
                        return (
                            <div key={index} className="rounded-[8px] border border-gray-100 p-[20px] bg-gray-100">
                                <button className={`p-[8px_12px] text-[14px] rounded-[22px] font-serif text-white ${expired ? "bg-red-500 " : "bg-green-600"}`}>
                                    {expired ? "Expired" : "Active"}
                                </button>
                                <p className="pt-[10px]">closing Data: {items.closingDateTime}</p>

                                {
                                    alreadyVoted
                                        ?
                                        <button className="mt-[20px] cursor-no-drop p-[10px_24px] rounded-[25px] bg-red-500 text-white font-serif text-[16px]">Already Voted</button>
                                        :
                                        <Link to={`/voting-start/${items._id}`}><button className={`mt-[20px] ${expired ? 'cursor-no-drop' : 'cursor-pointer'} p-[10px_24px] rounded-[25px] bg-sky-500 text-white font-serif text-[16px]`}>{expired ? 'Time-Over':' Start'}</button></Link>
                                }
                            </div>
                        )
                    })
                }
            </div>
        </div >
    );
}
