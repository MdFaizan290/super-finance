import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Register.css";
import { BASE_URL } from "../BackendUrl";
import axios from "axios";

function Register() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        isAdult: false,
        // terms: false
    });

    const [showPassword, setShowPassword] = useState(false);

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.isAdult) {
            alert("You must confirm that you are 18 or older.");
            return;
        }

        // if (!formData.terms) {
        //     alert("Please accept the Terms and Conditions.");
        //     return;
        // }

        console.log(formData);

        // Add your API call here
        // axios.post("YOUR_API_URL", formData)
        await axios.post(`${BASE_URL}/api/user/register`, {
            ...formData
        })

        navigate("/login");
    };

    return (
        <div className="registerPage">
            <div className="registerCard">
                {/* Logo */}
                <div className="registerLogo">
                    <div className="logoIcon"><i className="fa-solid fa-wallet"></i></div>
                    <h2>Super Finance</h2>
                    <p>Create your account</p>
                </div>
                {/* Form */}
                <form onSubmit={handleSubmit}>
                    <div className="inputGroup">
                        <label>Full Name</label>
                        <div className="inputBox">
                            <i className="fa-solid fa-user"></i>
                            <input type="text" name="name" placeholder="Enter your name" value={formData.name} onChange={handleChange} required />
                        </div>
                    </div>
                    <div className="inputGroup">
                        <label>Email Address</label>
                        <div className="inputBox">
                            <i className="fa-solid fa-envelope"></i>
                            <input type="email" name="email" placeholder="Enter your email" value={formData.email} onChange={handleChange} required />
                        </div>
                    </div>
                    <div className="inputGroup">
                        <label>Password</label>
                        <div className="inputBox">
                            <i className="fa-solid fa-lock"></i>
                            <input type={showPassword ? "text" : "password"} name="password" placeholder="Create a password" value={formData.password} onChange={handleChange} required />
                            <i className={showPassword ? "fa-solid fa-eye-slash passwordIcon" : "fa-solid fa-eye passwordIcon"}
                                onClick={() => setShowPassword(!showPassword)}
                            ></i>
                        </div>
                    </div>

                    <label className="checkRow">
                        <input type="checkbox" name="isAdult" checked={formData.isAdult} onChange={handleChange} />
                        <span>I confirm that I am <strong>18 years or older</strong>.</span>
                    </label>

                    {/* Terms Checkbox */}
                    {/* <label className="checkRow">
                        <input type="checkbox" name="terms" checked={formData.terms} onChange={handleChange} />
                        <span>
                            I agree to the{" "} <Link to="/terms">Terms and Conditions</Link>{" "} and Privacy Policy.
                        </span>
                    </label> */}

                    <button type="submit" className="registerBtn">Create Account<i className="fa-solid fa-arrow-right"></i></button>
                </form>
                <div className="loginText">Already have an account?<Link to="/login"> Login</Link></div>
            </div>
        </div>
    );
}

export default Register;