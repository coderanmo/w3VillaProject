import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate, useParams } from "react-router";

const CreatePoll = () => {
  let apiBaseUrlAdmin = import.meta.env.VITE_APIBASEURLADMIN;
  const { id } = useParams();
  const [pollQuestion, setPollQuestion] = useState("");
  const [pollAnswers, setPollAnswers] = useState(["", ""]);
  const [pollOrder, setPollOrder] = useState("");
  const [closingDateTime, setClosingDateTime] = useState("");
  const [message, setMessage] = useState("");
  let navigate = useNavigate();

  const addAnswer = () => setPollAnswers([...pollAnswers, ""]);

  const handleAnswerChange = (index, value) => {
    const updated = [...pollAnswers];
    updated[index] = value;
    setPollAnswers(updated);
  };

  const removeAnswer = (index) => {
    if (pollAnswers.length > 2) {
      const updated = pollAnswers.filter((_, i) => i !== index);
      setPollAnswers(updated);
    }
  };

  // Fetch poll if id exists (edit mode)
  useEffect(() => {
    if (id) {
      axios
        .get(`${apiBaseUrlAdmin}poll/single-poll/${id}`)
        .then((res) => res.data)
        .then((resFinal) => {
          if (resFinal.data) {
            const poll = resFinal.data;
            setPollQuestion(poll.pollQuestion);
            setPollAnswers(poll.pollAnswers);
            setPollOrder(poll.pollOrder || "");
            // Convert ISO date to local datetime format for input
            setClosingDateTime(
              poll.closingDateTime
                ? new Date(poll.closingDateTime)
                    .toISOString()
                    .slice(0, 16)
                : ""
            );
          }
        })
        .catch((err) => {
          console.error("Error fetching poll:", err);
          toast.error("Failed to load poll data");
        });
    }
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!pollQuestion || pollAnswers.length < 2 || !closingDateTime) {
      setMessage("Please fill all fields and at least 2 options");
      return;
    }

    const payload = {
      pollQuestion,
      pollAnswers,
      pollOrder,
      closingDateTime,
    };

    // Create or update depending on id
    const request = id
      ? axios.put(`${apiBaseUrlAdmin}poll/update/${id}`, payload)
      : axios.post(`${apiBaseUrlAdmin}poll/create`, payload);

    request
      .then((res) => res.data)
      .then((resFinal) => {
        if (resFinal.status === 1) {
          toast.success(resFinal.msg);
          setTimeout(() => {
            navigate("/view-poll");
          }, 2000);
        } else {
          toast.error(resFinal.msg);
        }
      })
      .catch((err) => {
        console.error("Error submitting poll:", err);
        toast.error("Something went wrong, please try again");
      });
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-6">
      <ToastContainer />
      <div className="p-6 w-full shadow-lg border border-gray-200 rounded-[5px] max-w-lg bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center mb-4 text-indigo-700">
          {id ? "Edit Poll" : "Create Poll"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Question */}
          <div>
            <label className="block font-medium mb-1">Poll Question</label>
            <input
              type="text"
              value={pollQuestion}
              onChange={(e) => setPollQuestion(e.target.value)}
              className="border border-gray-300 w-full p-[5px] rounded-[5px]"
              placeholder="Enter your question"
            />
          </div>

          {/* Answers */}
          <div>
            <label className="block font-medium mb-1">Poll Answers</label>
            {pollAnswers.map((ans, i) => (
              <div key={i} className="flex items-center mb-2">
                <input
                  type="text"
                  value={ans}
                  onChange={(e) => handleAnswerChange(i, e.target.value)}
                  className="border border-gray-300 w-full p-[5px] rounded-[5px]"
                  placeholder={`Answer ${i + 1}`}
                />
                {pollAnswers.length > 2 && (
                  <button
                    type="button"
                    onClick={() => removeAnswer(i)}
                    className="ml-2 text-red-500 font-bold"
                  >
                    ✕
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={addAnswer}
              className="text-indigo-600 hover:underline text-sm"
            >
              + Add another option
            </button>
          </div>

          {/* Poll Order */}
          <div>
            <label className="block font-medium mb-1">Poll Order</label>
            <input
              type="number"
              value={pollOrder}
              onChange={(e) => setPollOrder(e.target.value)}
              className="border border-gray-300 w-full p-[5px] rounded-[5px]"
              placeholder="Enter order number"
            />
          </div>

          {/* Closing Date */}
          <div>
            <label className="block font-medium mb-1">Closing Date & Time</label>
            <input
              type="datetime-local"
              value={closingDateTime}
              onChange={(e) => setClosingDateTime(e.target.value)}
              className="w-full border rounded-lg p-2 outline-indigo-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 rounded-lg transition"
          >
            {id ? "Update Poll" : "Create Poll"}
          </button>
        </form>

        {message && (
          <p className="text-center text-gray-700 text-sm mt-3">{message}</p>
        )}
      </div>
    </div>
  );
};

export default CreatePoll;
