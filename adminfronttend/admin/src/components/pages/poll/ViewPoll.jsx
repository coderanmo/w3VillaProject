import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Link } from "react-router";

const ViewPoll = () => {

    let apiBaseUrlAdmin = import.meta.env.VITE_APIBASEURLADMIN
    let [polls, setPolls] = useState([]);
    let [message, setMessage] = useState("");
    
    let fetchPolls = () => {
        axios.get(`${apiBaseUrlAdmin}poll/view`)
            .then((resApi) => resApi.data)
            .then((resFinal) => {
                setPolls(resFinal.data)
            })
    }

    useEffect(() => {
        fetchPolls();
    }, []);


    let deleteQuery = (id) => {
        axios.delete(`${apiBaseUrlAdmin}poll/delete/${id}`)
            .then((resApi) => resApi.data)
            .then((resFinal) => {
                if (resFinal.status == 1) {
                    toast.success(resFinal.msg)
                    fetchPolls()
                }
                else {
                    toast.error(resFinal.msg)
                }
            })
    }

   

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
                All Polls
            </h1>

            <div className="bg-white shadow-lg rounded-xl p-6 max-w-5xl mx-auto">
                {polls.length === 0 ?
                    (
                        <p className="text-center text-gray-500">No polls found</p>
                    ) :
                    (
                        <div className="overflow-x-auto">
                            <table className="min-w-full border border-gray-300 rounded-lg">
                                <thead className="bg-gray-200 text-gray-700">
                                    <tr>
                                        <th className="p-2">#</th>
                                        <th className="p-2 text-left">Question</th>
                                        <th className="p-2">Status</th>
                                        <th className="p-2">Closing Date</th>
                                        <th className="p-2">Action</th>
                                        <th className="p-2">Update</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {polls.map((poll, i) => {
                                        const expired =
                                            new Date(poll.closingDateTime) < new Date();
                                        return (
                                            <tr
                                                key={poll._id}
                                                className="border-t border-gray-200 text-center"
                                            >
                                                <td className="p-2">{i + 1}</td>
                                                <td className="p-2 text-left">{poll.pollQuestion}</td>
                                                <td
                                                    className={`p-2 font-semibold ${expired ? "text-red-500" : "text-green-600"
                                                        }`}
                                                >
                                                    {expired ? "Expired" : "Active"}
                                                </td>
                                                <td className="p-2">
                                                    {new Date(poll.closingDateTime).toLocaleString()}
                                                </td>
                                                <td className="p-2">
                                                    <button onClick={() => deleteQuery(poll._id)} className="cursor-pointer bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600">
                                                        Delete
                                                    </button>
                                                </td>

                                                <td className="p-2">
                                                    <Link to={`/update-poll/${poll._id}`}>
                                                        <button className="cursor-pointer bg-sky-500 text-white px-3 py-1 rounded-lg hover:bg-red-600">
                                                            update
                                                        </button>
                                                    </Link>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    )}

                {message && (
                    <p className="text-center text-gray-700 text-sm mt-4">{message}</p>
                )}
            </div>
        </div>
    );
};

export default ViewPoll;
