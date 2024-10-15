//SignIn page
import { BottomWarning } from "../components/BottomWarning"
import { Heading } from "../components/Heading"
import { InputBox } from "../components/InputBox"
import axios from "axios";
import { GlowingButton } from "../components/GlowingButton"
import { useNavigate } from "react-router-dom"
import { useState } from "react"

export const Signin = () => {
   const API_URL = import.meta.env.VITE_API_URL; // Use import.meta.env for Vite

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState("");
return (<div className=" flex justify-center">
        <div className="h-screen flex flex-col justify-center items-center">
            <div className="rounded-xl bg-white bg-opacity-30 w-full items-center text-center h-max px-10 mx-10">
                <Heading label={"Log in"} />
                <InputBox onChange={e => {
                    setUsername(e.target.value);
                }} placeholder="John@gmail.com" label={"Email"} />
                <InputBox onChange={(e) => {
                    setPassword(e.target.value);
                }} placeholder="*********" label={"Password"} />
                {errorMessage && <div className="text-red-500 mb-2 font-semibold">{errorMessage}</div>}
                <GlowingButton label="Log In" to={async () => {
                    try{
                        const response = await axios.post(
                            `${API_URL}/api/v1/user/signin`, {
                            username,
                            password
                        })
                        localStorage.setItem("token", response.data.token)
                        navigate("/dashboard")
                    }
                    catch(error){
                        if (error.response) {
                            setErrorMessage(error.response.data.message); // Display backend error message
                          } else {
                            setErrorMessage("An unexpected error occurred.");
                          }
                    }
                }}></GlowingButton>
                <BottomWarning label={"Don't have an account?"} buttonText={"Sign up"} to={"/signup"} />
            </div>
        </div>
    </div>)
}