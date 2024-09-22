//SignUp page
import { useState } from "react"
import { BottomWarning } from "../components/BottomWarning"
import { Heading } from "../components/Heading"
import { InputBox } from "../components/InputBox"
import axios from "axios";
import { useNavigate } from "react-router-dom"
import { GlowingButton } from "../components/GlowingButton"

export const Signup = () => {

  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [cmfpass, setcmfPass] = useState("");
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");

  return <div className=" flex justify-center">
    <div className="h-screen flex flex-col justify-center items-center">
      <div className="rounded-xl bg-white bg-opacity-30 w-full items-center text-center h-max px-10 mx-10">
        <Heading label={"Create an account"} />
        <InputBox onChange={e => {
          setFirstName(e.target.value);
        }} placeholder="John" label={"First Name"} />
        <InputBox onChange={(e) => {
          setLastName(e.target.value);
        }} placeholder="Doe" label={"Last Name"} />
        <InputBox onChange={e => {
          setUsername(e.target.value);
        }} placeholder="John@gmail.com" label={"Email"} />
        <InputBox onChange={(e) => {
          setPassword(e.target.value)
        }} placeholder="123456" label={"Password"} />
        <InputBox onChange={(e) => {
          setcmfPass(e.target.value)
        }} placeholder={"123456"} label={"Confirm Password"}></InputBox>
        {errorMessage && <div className="text-red-500 mb-2 font-semibold">{errorMessage}</div>}
        <GlowingButton label="Sign Up" to={async () => {
          try {
            const response = await axios.post("http://localhost:3000/api/v1/user/signup", {
              username,
              firstname,
              lastname,
              password,
              cmfpass
            })
            localStorage.setItem("token", response.data.token)
            navigate("/dashboard")
          }
          catch (error) {
            // Set the error message from the backend response
            if (error.response) {
              setErrorMessage(error.response.data.message); // Display backend error message
            } else {
              setErrorMessage("An unexpected error occurred.");
            }
          }
        }}></GlowingButton>
        <BottomWarning label={"Already have an account?"} buttonText={"Log in"} to={"/signin"} />
      </div>
    </div>
  </div>
}