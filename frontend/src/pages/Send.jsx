import { BottomWarning } from "../components/BottomWarning"
import { Heading } from "../components/Heading"
import { InputBox } from "../components/InputBox"
import axios from "axios";
import { GlowingButton } from "../components/GlowingButton"
import { useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"

export const Send = () => {
    const [amount, setAmount] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

    // Extract the userId and name from the URL
    const queryParams = new URLSearchParams(window.location.search);
    const recipientId = queryParams.get("id");
    const recipientName = queryParams.get("name");

    // Handle sending money
    const handleSend = async () => {
        try {
            // Send transfer request
            const response = await axios.post(
                "http://localhost:3000/api/v1/account/transfer",
                {
                    amount: parseFloat(amount), // ensure amount is a number
                    to: recipientId, // pass the recipient userId
                },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`, // Pass the user's token
                    },
                }
            );

            // If successful, navigate to the dashboard
            navigate("/dashboard");
        } catch (error) {
            if (error.response) {
                setErrorMessage(error.response.data.message); // Display backend error message
            } else {
                setErrorMessage("An unexpected error occurred.");
            }
        }
    };

    return (
        <div className="flex justify-center">
            <div className="h-screen flex flex-col justify-center items-center">
                <div className="rounded-xl bg-white bg-opacity-30 w-full items-center text-center h-max px-10 mx-10">
                    <Heading label={"Send Money"} />

                    <div className="text-black flex items-center rounded-md mb-6 font-semibold">
                        <div className="mr-4">
                            <div className="group-hover:bg-black rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
                                <div className="flex flex-col justify-center h-full text-xl group-hover:text-white">
                                    {recipientName[0]} {/* Display the first letter of recipient's name */}
                                </div>
                            </div>
                        </div>
                        <div className="text-white font-bold group-hover:text-black">
                            {recipientName} {/* Display recipient's name */}
                        </div>
                    </div>

                    <InputBox
                        placeholder="Enter amount to send"
                        onChange={(e) => setAmount(e.target.value)}
                        value={amount} // Bind the input to amount state
                    />

                    {errorMessage && <div className="text-red-500 mb-2 font-semibold">{errorMessage}</div>}

                    <GlowingButton label="Send" to={handleSend} /> {/* Call handleSend when button is clicked */}

                    <BottomWarning label={"Don't have an account?"} buttonText={"Sign up"} to={"/signup"} />
                </div>
            </div>
        </div>
    );
};
