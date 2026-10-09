import React, { useContext, useEffect, useRef, useState } from 'react';
import { Link, redirect, useNavigate } from 'react-router-dom';
import { ExpenseContext } from "./ContextProvider";
import "./Navbar.css";
import axios from 'axios';
import { BASE_URL } from './BackendUrl';

function Navbar() {
    const { userDetail, fetchUser, setUserDetail, } = useContext(ExpenseContext);
    const [active, setActive] = useState("");
    const [profile, setProfile] = useState(false);
    const navigate = useNavigate();
    let home = active === "home" ? { fontWeight: "bold" } : { fontWeight: "normal" };
    let expense = active === "expense" ? { fontWeight: "bold" } : { fontWeight: "normal" };
    let budget = active === "budget" ? { fontWeight: "bold" } : { fontWeight: "normal" };
    let goal = active === "goal" ? { fontWeight: "bold" } : { fontWeight: "normal" };
    let invest = active === "invest" ? { fontWeight: "bold" } : { fontWeight: "normal" };

    const profileRef = useRef(null);
    useEffect(() => {
        // Close when clicking outside
        const handleClickOutside = (event) => {
            if (
                profileRef.current &&
                !profileRef.current.contains(event.target)
            ) {
                setProfile(false);
            }
        };
        // Close when scrolling
        const handleScroll = () => {
            setProfile(false);
        };
        document.addEventListener("mousedown", handleClickOutside);
        window.addEventListener("scroll", handleScroll);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    // useEffect(() => {
    //     // if (token) {
    //     //     fetchUser();
    //     // }
    //     console.log("Navbar User : ", userDetail);
    // }, [userDetail]);

    const token = localStorage.getItem("token");
    return (
        <div ref={profileRef}>
            <div className='navContainer'>
                <Link to={"/"} className='tagLink'><h5 className='tag'><i className="fa-solid fa-wallet"></i> <i className="fa-solid fa-dollar-sign s"></i>uper Finance</h5></Link>
                <p className='para' style={home} onClick={() => {
                    navigate("/");
                    setActive("home");
                    // window.location.reload();
                }}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                    </svg>
                    {token ? "Dashboard" : "Home"}</p>
                <p className='para' style={expense} onClick={() => {
                    navigate("/expense");
                    setActive("expense");
                }}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 8.25H9m6 3H9m3 6-3-3h1.5a3 3 0 1 0 0-6M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>
                    Expense</p>
                <p className='para' style={budget} onClick={() => {
                    navigate("/budgets/list");
                    setActive("budget")
                }}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z" />
                    </svg>
                    Budget</p>
                <p className='para' style={goal} onClick={() => {
                    navigate("/goals/list");
                    setActive("goal")
                }}><i className="fa-solid fa-bullseye"></i>Goal</p>
                <p className='para' style={invest} onClick={() => {
                    // window.location.href = "http://localhost:3000/";
                    navigate("/investment")
                    setActive("invest")
                }}><i className="fa-solid fa-money-bill-trend-up"></i>Investment</p>
                {token ? (<div id='profile' onClick={() => setProfile(!profile)}><img src='/profile.jpg' /></div>) :
                    (
                        <div><Link to={"/login"} >Login</Link> <Link style={{ paddingLeft: "4px", borderLeft: "1px solid silver" }} to={"/register"}>Register</Link></div>
                    )}

            </div>
            {/* Profile dropdown */}
            {token && profile && (
                <div className="profileContainer">
                    <p><i className="fa-solid fa-user"></i> {userDetail.name}</p>
                    <p><i className="fa-solid fa-gear"></i> Settings</p>
                    {/* <p><i class="fa-solid fa-gear"></i> Dark/Light</p> */}
                    <p onClick={() => {
                        localStorage.removeItem("token");
                        setUserDetail(null);
                        navigate("/login");
                    }}><i className="fa-solid fa-right-from-bracket"></i> Logout</p>
                </div>
            )
            }
        </div >
    );
}

export default Navbar;