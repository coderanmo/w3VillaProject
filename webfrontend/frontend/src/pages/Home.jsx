import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { toast, ToastContainer } from 'react-toastify';

export default function PollingBanner() {
    let token = useSelector((store) => store.login.user)
    let navigate = useNavigate()
    let switchVote = () => {
        if (token) {
            navigate('/voting')
        }
        else {
            toast.error('please login')
        }
    }
    return (
        <div className="bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 ">
            <ToastContainer />
            <div className='max-w-[1170px] lg:mx-auto sm:mx-auto mx-[5px]  text-white  lg:py-[150px] sm:py-[100px] py-[50px]  flex flex-col lg:flex-row items-start gap-8'>

                <div className="lg:w-1/2 w-full space-y-4 sm:space-y-6">
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-serif tracking-tight">
                         Participate in Our Poll!
                    </h2>
                    <p className="text-base sm:text-lg lg:text-xl text-gray-100 leading-relaxed">
                        Your opinion matters! Cast your vote and help us improve our services. Each poll closes at a specific date and time—don’t miss out!
                    </p>
                    <button onClick={switchVote} className="cursor-pointer bg-white text-purple-600 font-semibold px-6 sm:px-8 py-2 sm:py-3 rounded-full shadow-lg hover:scale-105 transition transform duration-300">
                        Vote Now
                    </button>
                </div>

                <div className="lg:w-1/2 w-full flex flex-col space-y-4 sm:space-y-6 ">
                    <div className="bg-black bg-opacity-20 p-4 sm:p-6 rounded-2xl shadow-inner">
                        <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-3">Poll Instructions</h3>
                        <ul className="list-decimal list-inside text-gray-100 space-y-2 sm:space-y-3 text-sm sm:text-base lg:text-lg">
                            <li>Each user can vote only once per poll.</li>
                            <li>Poll closes automatically on the given date and time.</li>
                            <li>Results will be displayed after the poll ends.</li>
                            <li>Read each option carefully before voting.</li>
                        </ul>
                    </div>
                </div>
            </div>


        </div>
    );
}
