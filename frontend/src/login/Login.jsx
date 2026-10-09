import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../BackendUrl";
import axios from "axios";
import { ExpenseContext } from "../ContextProvider";
import "./Login.css";

function Login() {
    const { fetchUser } = useContext(ExpenseContext);
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [showPassword, setShowPassword] = useState(false);
    const [loggedIn, setLoggedIn] = useState(null);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // console.log(formData);
        try {
            const response = await axios.post(`${BASE_URL}/api/user/login`, {
                ...formData
            })
            // After successful login
            localStorage.setItem("token", response.data.token);
            await fetchUser();
            alert("Logged In Successfully");
            // setLoggedIn("Logged In Successfully");
            // setTimeout(() => {
            //     setLoggedIn("")
            // }, 5000)
            navigate("/");
        } catch (err) {
            const message = err.response?.data?.message || "Something went wrong";
            setLoggedIn(message);
            // setTimeout(() => {
            //     setLoggedIn("")
            // }, 10000)
            // alert(message);
        }
    };
    const showLoginMessage = async () => {

    }
    return (
        <div className="loginPage">

            <div className="loginCard">
                {loggedIn && <p className="error text-center"><i className="fa-solid fa-exclamation"></i>{loggedIn}</p>}
                {/* Logo */}
                <div className="loginLogo">
                    <div className="loginLogoIcon"><i className="fa-solid fa-wallet"></i></div>
                    <h2>Super Finance</h2>
                    <p>Welcome back!</p>
                </div>

                {/* Login Form */}
                <form onSubmit={handleSubmit}>
                    {/* <p style={{ color: "red",fontSize:"15px" }} className="text-center">{loggedIn}</p> */}
                    <div className="loginInputGroup">
                        <label>Email Address</label>
                        <div className="loginInputBox">
                            <i className="fa-solid fa-envelope"></i>
                            <input type="email" name="email" placeholder="Enter your email" value={formData.email} onChange={handleChange} required />
                        </div>
                    </div>
                    <div className="loginInputGroup">
                        <div className="passwordLabel">
                            <label>Password</label>
                            <Link to="/forgot-password">Forgot Password?</Link>
                        </div>
                        <div className="loginInputBox">
                            <i className="fa-solid fa-lock"></i>
                            <input type={showPassword ? "text" : "password"} name="password" placeholder="Enter your password" value={formData.password} onChange={handleChange} required />
                            <i className={showPassword ? "fa-solid fa-eye-slash loginPasswordIcon" : "fa-solid fa-eye loginPasswordIcon"}
                                onClick={() => setShowPassword(!showPassword)}
                            ></i>
                        </div>
                    </div>
                    <label className="rememberRow">
                        <input type="checkbox" name="remember" />
                        <span>Remember me</span>
                    </label>

                    <button type="submit" className="loginBtn">Login<i className="fa-solid fa-arrow-right"></i></button>
                </form>
                <div className="registerText">Don't have an account?<Link to="/register">Create Account</Link></div>
            </div>
        </div>
    );
}

export default Login;