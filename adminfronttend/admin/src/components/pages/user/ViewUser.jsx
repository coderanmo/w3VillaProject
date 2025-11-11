import axios from "axios";
import React, { useEffect, useState } from "react";

export default function ViewUser() {
    let [userNo, setUserNo] = useState([])
    let apiBaseUrlWeb = import.meta.env.VITE_APIBASEURLWEB
    let getUserRegister = () => {
        axios.get(`${apiBaseUrlWeb}userauth/all-userprofile`)
            .then((resApi) => resApi.data)
            .then((resFinal) => {
                setUserNo(resFinal.data)
            })
    }
    useEffect(() => {
        getUserRegister()
    }, [])
    console.log(userNo)
    return (
        <div className="max-w-4xl mx-auto p-4">
            <h2 className="text-xl font-semibold mb-4 text-center mt-4">Registerd user</h2>

            <div className="overflow-x-auto">
                <table className="min-w-full border border-gray-300 text-sm md:text-base">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="p-3 text-left">ID</th>
                            <th className="p-3 text-left">Name</th>
                            <th className="p-3 text-left">Email</th>
                            <th className="p-3 text-left">Role</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            userNo.map((items, index) => {
                                return (
                                    <tr key={ index} className="border-t">
                                        <td className="p-3">{index+1}</td>
                                        <td className="p-3">{items.userName}</td>
                                        <td className="p-3">{items.userEmail}</td>
                                        <td className="p-3 text-green-600">Active</td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
}
