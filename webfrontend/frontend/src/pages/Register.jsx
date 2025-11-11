import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router";
import { toast, ToastContainer } from "react-toastify";

export default function Register() {
    const [step, setStep] = useState(1);
    const [formValue, setFormValue] = useState({
        userName: "",
        userEmail: "",
        userPassword: "",
        userConfirm: "",
        otp: "",
    });
    let navigate=useNavigate()
    const [loading, setLoading] = useState(false)

    let apiBaseUrlWeb = import.meta.env.VITE_APIBASEURL
    console.log(apiBaseUrlWeb)

    let getOrsetFormValue = (e) => {
        let obj = { ...formValue }
        let inputName = e.target.name
        let inputValue = e.target.value
        obj[inputName] = inputValue
        setFormValue(obj)
    }

    let registerUser = (e) => {
        e.preventDefault()
        setLoading(true)
        axios.post(`${apiBaseUrlWeb}userauth/send-otp`, formValue)
            .then((resApi) => resApi.data)
            .then((resFinal) => {
                if (resFinal.status == 1) {
                    setStep(2)
                }
                if (resFinal.status == 0) {
                    toast.error(resFinal.msg)
                }
            })
    }

    let registerUserOtp = (e) => {
        e.preventDefault()
        axios.post(`${apiBaseUrlWeb}userauth/create-account`, formValue)
            .then((resApi) => resApi.data)
            .then((resFinal) => {
                if (resFinal.status == 0) {
                    toast.error(resFinal.msg)
                }
                else {
                    toast.success(resFinal.msg)
                    navigate('/login')
                }
            })
    }

    return (
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 p-4">
            <ToastContainer />
            <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 transition-all duration-300">
                <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">
                    {step === 1 ? "Create Account" : "Verify OTP"}
                </h2>

                {step === 1 ? (
                    <form onSubmit={registerUser} className="space-y-5">
                        <div>
                            <label className="block mb-1 text-gray-700 font-medium">
                                Username
                            </label>
                            <input
                                type="text"
                                name="userName"
                                value={formValue.userName}
                                onChange={getOrsetFormValue}
                                placeholder="Enter your username"
                                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            />
                        </div>

                        <div>
                            <label className="block mb-1 text-gray-700 font-medium">
                                Email
                            </label>
                            <input
                                type="email"
                                name="userEmail"
                                onChange={getOrsetFormValue}
                                value={formValue.userEmail}
                                placeholder="Enter your email"
                                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block mb-1 text-gray-700 font-medium">
                                    Password
                                </label>
                                <input
                                    type="password"
                                    name="userPassword"
                                    onChange={getOrsetFormValue}
                                    value={formValue.userPassword}
                                    placeholder="Enter password"
                                    className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                />
                            </div>
                            <div>
                                <label className="block mb-1 text-gray-700 font-medium">
                                    Confirm Password
                                </label>
                                <input
                                    type="password"
                                    name="userConfirm"
                                    onChange={getOrsetFormValue}
                                    value={formValue.userConfirm}
                                    placeholder="Confirm password"
                                    className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            className={`w-full  bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition duration-200 ${loading ? "bg-gray-400 cursor-not-allowed" : "cursor-pointer bg-indigo-600 hover:bg-indigo-700"}`}
                        >
                            Register
                        </button>

                        <p className="text-center text-sm text-gray-500 mt-4">
                            Already have an account?{" "}
                            <a href="/login" className="text-blue-600 hover:underline">
                                Login
                            </a>
                        </p>
                    </form>
                ) : (
                    <form onSubmit={registerUserOtp} className="space-y-5">
                        <p className="text-gray-600 text-center">
                            Enter the 6-digit OTP sent to <br />
                        </p>

                        <input
                            type="text"
                            name="otp"
                            value={formValue.otp}
                            onChange={getOrsetFormValue}
                            maxLength={4}
                            placeholder="Enter OTP"
                            className="w-full border border-gray-300 rounded-lg p-3 text-center tracking-widest text-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />

                        <button
                            type="submit"
                            className="w-full bg-green-600 text-white font-semibold py-3 rounded-lg hover:bg-green-700 transition duration-200"
                        >
                            Verify OTP
                        </button>

                    </form>
                )}
            </div>
        </div>
    );
}
