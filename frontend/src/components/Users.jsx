import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { InputBox } from "./InputBox";
import { GlowingButton } from "./GlowingButton";
import axios from "axios";
import {jwtDecode} from "jwt-decode"; // Ensure it's installed: npm install jwt-decode

export const Users = () => {
    const API_URL = import.meta.env.VITE_API_URL;
    const [users, setUsers] = useState([]);
    const [filter, setFilter] = useState("");
    const [currentUserId, setCurrentUserId] = useState(null);

    // Extract userId from JWT token stored in localStorage
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            try {
                const decoded = jwtDecode(token);
                console.log("Decoded Token:", decoded); // Check if userId exists
                setCurrentUserId(decoded.userId); // Store the logged-in user ID
            } catch (error) {
                console.error("Error decoding token:", error);
            }
        } else {
            console.warn("Token not found in localStorage");
        }
    }, []);

    // Fetch users and filter out the logged-in user
    useEffect(() => {
        if (currentUserId !== null) { // Ensure userId is loaded before fetching users
            axios
                .get(`${API_URL}/api/v1/user/bulk?filter=${filter}`)
                .then((response) => {
                    console.log("Fetched Users:", response.data.users); // Verify users data

                    const filteredUsers = response.data.users.filter(
                        (user) => user._id !== currentUserId // Filter out logged-in user
                    );

                    console.log("Filtered Users:", filteredUsers); // Verify filtering logic
                    setUsers(filteredUsers);
                })
                .catch((error) => {
                    console.error("Error fetching users:", error);
                });
        }
    }, [filter, currentUserId]);

    return (
        <>
            <div className="font-bold mb-6 mt-3 text-white text-4xl">Users</div>
            <div className="my-2">
                <InputBox
                    onChange={(e) => setFilter(e.target.value)}
                    type="text"
                    placeholder="Search users..."
                />
            </div>
            <div>
                {users.length > 0 ? (
                    users.map((u) => <User key={u._id} user={u} />)
                ) : (
                    <div className="text-white font-bold text-4xl flex justify-center h-screen pt-5">
                        Not Found
                    </div>
                )}
            </div>
        </>
    );
};

function User({ user }) {
    const navigate = useNavigate();

    return (
        <div className="flex w-full rounded-xl bg-white bg-opacity-35 shadow-sm justify-between my-5 transition-all hover:bg-slate-100 duration-300 ease-in-out transform hover:scale-105 active:scale-95 group">
            <nav className="flex">
                <div className="text-black flex items-center rounded-md p-3 font-semibold">
                    <div className="mr-4">
                        <div className="group-hover:bg-black rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
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

            <div className="flex flex-col justify-center h-full p-3">
                <GlowingButton
                    to={() => {
                        navigate("/send?id=" + user._id + "&name=" + user.firstname);
                    }}
                    label={"Send"}
                />
            </div>
        </div>
    );
}
