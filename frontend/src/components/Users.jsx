import { useEffect, useState } from "react"
import { Button } from "./Button"
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { InputBox } from "./InputBox";
import { GlowingButton } from "./GlowingButton";


export const Users = () => {
    // Replace with backend call
    const [users, setUsers] = useState([]);
    const [filter, setFilter] = useState("");

    useEffect(() => {
        axios.get("http://localhost:3000/api/v1/user/bulk?filter=" + filter)
            .then(response => {
                // console.log(response.data.users)
                setUsers(response.data.users)
            })
    }, [filter])

    return <>
        <div className="font-bold mb-6 mt-3 text-white text-4xl">
            Users
        </div>
        <div className="my-2">
            <InputBox onChange={(e) => {
                setFilter(e.target.value)
            }} type="text" placeholder="Search users..." ></InputBox>
        </div>
        <div>

            {
                (users && users.length > 0) ? users.map(u => <User key={u._id} user={u} />) :
                    <div className="text-white font-bold texl-4xl flex justify-center h-screen pt-5">
                        Not Found
                    </div>
            }
        </div>
    </>
}

function User({ user }) {
    const navigate = useNavigate();

    return (
        <div className="flex w-full  rounded-xl bg-white bg-opacity-35 shadow-sm justify-between my-5 transition-all hover:bg-slate-100 duration-300 ease-in-out transform hover:scale-105 active:scale-95 group">

            <nav className="flex ">
                {/* User Profile Card */}
                <div
                    className="text-black flex  items-center rounded-md p-3 font-semibold">
                    <div className="mr-4 ">
                        <div className="group-hover:bg-black rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2 ">
                            <div className="flex flex-col justify-center h-full text-xl group-hover:text-white">
                                {user.firstname[0]}
                            </div>
                        </div>
                    </div>
                    <div className="text-white font-bold group-hover:text-black">

                        {user.firstname} {user.lastname}

                    </div>
                </div>
            </nav>

            {/* Button to navigate */}
            <div className="flex flex-col justify-center h-ful p-3 ">
                <GlowingButton
                    to={() => {
                        navigate("/send?id=" + user._id + "&name=" + user.firstname);
                    }}
                    label={"Send"}
                />
            </div>
        </div>)
}