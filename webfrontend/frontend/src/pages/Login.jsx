import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { getUser } from "../redux/slice/loginSlice";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

export default function Login() {
    let apiBaseUrlWeb =import.meta.env.VITE_APIBASEURL
    console.log(apiBaseUrlWeb)
    let loginUser = useSelector((store) =>store.login.user)
    let dispatch = useDispatch()
    let [formValue, setFormValue] = useState({
        userEmail: '',
        userPassword: ''
    })
    let navigate=useNavigate()

    let getOrSetFormValue = (e) => {
        let obj = { ...formValue }
        let inputName = e.target.name
        let inputValue = e.target.value
        obj[inputName] = inputValue
        setFormValue(obj)
    }

    let loginAccount = (e) => {
        e.preventDefault()
        axios.post(`${apiBaseUrlWeb}userauth/login`, formValue)
            .then((resApi) => resApi.data)
            .then((resFinal) => {
                if (resFinal.status == 1) {
                    dispatch(getUser({ data: resFinal.data, token: resFinal.token }))
                    console.log(resFinal.token)
                    toast.success(resFinal.msg)
                }
                else {
                    toast.error(resFinal.msg)
                }
            })

    }

    useEffect(() => {
        if (loginUser) {
            navigate('/voting')
        }
    }, [loginUser])



    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <ToastContainer/>
            <div className="w-[90%] max-w-md bg-white shadow-lg rounded-2xl p-8">
                <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">
                    Login
                </h2>
                <form onSubmit={loginAccount} className="space-y-5">
                    <div>
                        <label className="block mb-1 text-gray-700 font-medium">
                            Email
                        </label>
                        <input
                            type="email"
                            name="userEmail"
                            onChange={getOrSetFormValue}
                            value={formValue.userEmail}
                            placeholder="Enter your email"
                            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>
                    <div>
                        <label className="block mb-1 text-gray-700 font-medium">
                            Password
                        </label>
                        <input
                            type="password"
                            name="userPassword"
                            onChange={getOrSetFormValue}
                            value={formValue.userPassword}
                            placeholder="Enter password"
                            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>


                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white font-semibold py-2.5 rounded-lg hover:bg-blue-700 transition duration-200"
                    >
                        Login
                    </button>

                    <p className="text-center text-sm text-gray-500 mt-4">
                        Don’t have an account?{" "}
                        <a href="/register" className="text-blue-600 hover:underline">
                            Register
                        </a>
                    </p>
                </form>
            </div>
        </div>
    );
}
