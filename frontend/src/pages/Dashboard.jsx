import { Appbar } from "../components/Appbar";
import { Balance } from "../components/Balance";
import { Users } from "../components/Users";
import { useState, useEffect } from "react";
import axios from "axios";


export const Dashboard = () => {
   const API_URL = import.meta.env.VITE_API_URL; // Use import.meta.env for Vite

    const [user, setUser] = useState(null);
    const [balance, setBalance] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch the current logged-in user details
                const userResponse = await axios.get(`${API_URL}/api/v1/user/me`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`, // assuming token is stored in localStorage
                    },
                });
                setUser(userResponse.data);

                // Fetch balance
                const balanceResponse = await axios.get(`${API_URL}/api/v1/account/balance`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                });
                // Set balance with 2 decimal places
            setBalance(parseFloat(balanceResponse.data.balance).toFixed(2));
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    if (!user) {
        return <div>Loading...</div>;
    }

    return (
        <div className="bg-white bg-opacity-10 w-full h-screen">
            <Appbar name={user.firstname} user={user.firstname[0]}></Appbar>
            <div className="mx-14 my-8">
                <Balance value={balance} />
                <br />
                <Users />
            </div>
        </div>
    );
};
