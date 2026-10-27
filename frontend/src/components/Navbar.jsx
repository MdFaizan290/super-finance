import React, { useContext, useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ExpenseContext } from "./ContextProvider";
import "./Navbar.css";
import { BASE_URL } from './BackendUrl';

function Navbar() {
    const { userDetail, fetchUser, setUserDetail, } = useContext(ExpenseContext);
    const [active, setActive] = useState("");
    // const [profile, setProfile] = useState(false);
    // const [userData, setUserData] = useState(false);
    const [profileImage, setProfileImage] = useState("");
    const [showFullImage, setShowFullImage] = useState(false);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [selectedSection, setSelectedSection] = useState("profile");
    const navigate = useNavigate();
    let home = active === "home" ? { fontWeight: "bold" } : { fontWeight: "normal" };
    let expense = active === "expense" ? { fontWeight: "bold" } : { fontWeight: "normal" };
    let budget = active === "budget" ? { fontWeight: "bold" } : { fontWeight: "normal" };
    let goal = active === "goal" ? { fontWeight: "bold" } : { fontWeight: "normal" };
    let invest = active === "invest" ? { fontWeight: "bold" } : { fontWeight: "normal" };



    const handleImageUpload = async (event) => {
        const file = event.target.files[0];
        if (!file) return;
        if (!file.type.startsWith("image/")) {
            alert("Please select a valid image.");
            event.target.value = "";
            return;
        }

        // Limit image size to 10 MB
        if (file.size > 10 * 1024 * 1024) {
            alert("Image size must be less than 10 MB.");
            event.target.value = "";
            return;
        }

        try {
            const formData = new FormData();
            formData.append("image", file);

            const response = await fetch(
                `${BASE_URL}/api/user/profile-image`,
                {
                    method: "PUT",
                    headers: {
                        Authorization: token
                    },
                    body: formData
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Image upload failed");
            }

            // Store the Cloudinary URL in React state
            setProfileImage(data.image.url);
            alert("Profile image uploaded successfully!");
        } catch (error) {
            console.error("Image upload error:", error);
            alert(error.message || "Unable to upload image.");
        } finally {
            // Allows selecting the same file again
            event.target.value = "";
        }
    };


    // const handleImageUpload = (event) => {
    //     const file = event.target.files[0];

    //     if (!file) return;

    //     if (!file.type.startsWith("image/")) {
    //         alert("Please select a valid image.");
    //         return;
    //     }

    //     // Limit image size to 2 MB
    //     if (file.size > 2 * 1024 * 1024) {
    //         alert("Image size must be less than 2 MB.");
    //         event.target.value = "";
    //         return;
    //     }

    //     const reader = new FileReader();
    //     reader.onloadend = () => {
    //         const imageData = reader.result;
    //         try {
    //             localStorage.setItem("profileImage", imageData);
    //             setProfileImage(imageData);
    //         } catch (error) {
    //             alert("Unable to save the image. Please choose a smaller image.");
    //         }
    //     };

    //     reader.readAsDataURL(file);
    // };

    // const profileRef = useRef(null);
    // useEffect(() => {
    //     // Close when clicking outside
    //     const handleClickOutside = (event) => {
    //         if (
    //             profileRef.current &&
    //             !profileRef.current.contains(event.target)
    //         ) {
    //             setProfile(false);
    //         }
    //     };
    //     // Close when scrolling
    //     const handleScroll = () => {
    //         setProfile(false);
    //     };
    //     document.addEventListener("mousedown", handleClickOutside);
    //     window.addEventListener("scroll", handleScroll);
    //     return () => {
    //         document.removeEventListener("mousedown", handleClickOutside);
    //         window.removeEventListener("scroll", handleScroll);
    //     };
    // }, []);

    // useEffect(() => {
    //     // if (token) {
    //     //     fetchUser();
    //     // }
    //     console.log("Navbar User : ", userDetail);
    // }, [userDetail]);

    const token = localStorage.getItem("token");
    return (
        // <div ref={profileRef}>
        <div>
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

                {/* {token ? (<div id='profile' onClick={() => setProfile(!profile)}><img src='/profile.jpg' /></div>) :
                    (
                        <div><Link to={"/login"} >Login</Link> <Link style={{ paddingLeft: "4px", borderLeft: "1px solid silver" }} to={"/register"}>Register</Link></div>
                    )} */}

                {token ? (
                    <button className="navProfile" onClick={() => setSidebarOpen(true)} aria-label="Open account sidebar">
                        <img src={profileImage ? profileImage :"/profile.jpg"} alt="Profile" />
                        <span>{userDetail?.name || "My Account"}</span>
                        {/* <i className="fa-solid fa-chevron-down"></i> */}
                    </button>
                ) : (
                    <div className="navAuth">
                        <Link to="/login">Login</Link>|
                        <Link to="/register" >Register</Link>
                    </div>
                )}


            </div>
            {/* Profile dropdown */}

            {token && sidebarOpen && (
                <>
                    {/* Background overlay */}
                    <div
                        className="sidebarOverlay"
                        onClick={() => setSidebarOpen(false)}
                    />

                    {/* Account sidebar */}
                    <aside className="accountSidebar">
                        <div className="sidebarHeader">
                            <div className="sidebarUser">

                                <div className="profileImageWrapper">
                                    <img
                                        src={profileImage ? profileImage :"/profile.jpg"}
                                        alt="Profile"
                                        className="sidebarProfileImage"
                                        onClick={() => setShowFullImage(true)}
                                        title="View full image"
                                    />

                                    <label
                                        htmlFor="profileImageUpload"
                                        className="uploadImageButton"
                                        title="Upload profile picture"
                                        onClick={(e) => e.stopPropagation()}
                                    >
                                        <i className="fa-solid fa-camera"></i>
                                    </label>

                                    <input
                                        type="file"
                                        id="profileImageUpload"
                                        accept="image/*"
                                        onChange={handleImageUpload}
                                        hidden
                                    />
                                </div>
                                <div>
                                    <h3>{userDetail?.name || "My Account"}</h3>
                                    <p>{userDetail?.email || "Manage your account"}</p>
                                </div>
                            </div>

                            <button
                                className="sidebarClose"
                                onClick={() => setSidebarOpen(false)}
                                aria-label="Close sidebar"
                            >
                                <i className="fa-solid fa-xmark"></i>
                            </button>
                        </div>

                        <div className="sidebarContent">
                            <p className="sidebarLabel">ACCOUNT</p>

                            <button
                                className={`sidebarItem ${selectedSection === "profile" ? "selected" : ""}`}
                                onClick={() => setSelectedSection("profile")}
                            >
                                <i className="fa-solid fa-user"></i>
                                <span>My Profile</span>
                                <i className="fa-solid fa-chevron-right arrow"></i>
                            </button>

                            <button
                                className={`sidebarItem ${selectedSection === "account" ? "selected" : ""}`}
                                onClick={() => setSelectedSection("account")}
                            >
                                <i className="fa-solid fa-id-card"></i>
                                <span>Account Details</span>
                                <i className="fa-solid fa-chevron-right arrow"></i>
                            </button>

                            <p className="sidebarLabel">PREFERENCES</p>

                            <button
                                className={`sidebarItem ${selectedSection === "settings" ? "selected" : ""}`}
                                onClick={() => setSelectedSection("settings")}
                            >
                                <i className="fa-solid fa-gear"></i>
                                <span>Settings</span>
                                <i className="fa-solid fa-chevron-right arrow"></i>
                            </button>

                            <button
                                className={`sidebarItem ${selectedSection === "appearance" ? "selected" : ""}`}
                                onClick={() => setSelectedSection("appearance")}
                            >
                                <i className="fa-solid fa-palette"></i>
                                <span>Appearance</span>
                                <i className="fa-solid fa-chevron-right arrow"></i>
                            </button>

                            <p className="sidebarLabel">SUPPORT</p>

                            <button
                                className={`sidebarItem ${selectedSection === "help" ? "selected" : ""}`}
                                onClick={() => setSelectedSection("help")}
                            >
                                <i className="fa-solid fa-circle-question"></i>
                                <span>Help & Support</span>
                                <i className="fa-solid fa-chevron-right arrow"></i>
                            </button>
                        </div>

                        <div className="sidebarDetails">
                            {selectedSection === "profile" && (
                                <>
                                    <h3>My Profile</h3>
                                    <p>Welcome, {userDetail?.name || "User"}!</p>
                                    <p>Manage your personal information and profile.</p>
                                </>
                            )}

                            {selectedSection === "account" && (
                                <>
                                    <h3>Account Details</h3>
                                    <p>Name: {userDetail?.name || "Not available"}</p>
                                    <p>Email: {userDetail?.email || "Not available"}</p>
                                </>
                            )}

                            {selectedSection === "settings" && (
                                <>
                                    <h3>Settings</h3>
                                    <p>Manage your Super Finance preferences.</p>
                                </>
                            )}

                            {selectedSection === "appearance" && (
                                <>
                                    <h3>Appearance</h3>
                                    <p>Customize the look of your dashboard.</p>
                                </>
                            )}

                            {selectedSection === "help" && (
                                <>
                                    <h3>Help & Support</h3>
                                    <p>Get help with your Super Finance account.</p>
                                    <p><b>Contact Us - <a href='mailto:mdfaizanuddin123@gmail.com'>mdfaizanuddin123@gmail.com</a></b> </p>
                                </>
                            )}
                        </div>


                        {/* Content changes when a section is selected */}
                        <div className="sidebarFooter">
                            <button
                                className="sidebarItem logoutItem"
                                onClick={() => {
                                    localStorage.removeItem("token");
                                    setUserDetail(null);
                                    setSidebarOpen(false);
                                    navigate("/login");
                                }}
                            >
                                <i className="fa-solid fa-right-from-bracket"></i>
                                <span>Logout</span>
                            </button>
                        </div>
                    </aside>
                </>
            )}

            {token && showFullImage && (
                <div
                    className="fullImageOverlay"
                    onClick={() => setShowFullImage(false)}
                >
                    <button
                        className="fullImageClose"
                        onClick={() => setShowFullImage(false)}
                        aria-label="Close full image"
                    >
                        <i className="fa-solid fa-xmark"></i>
                    </button>

                    <img
                        src={profileImage ? profileImage : "/profile.jpg"}
                        alt="Full profile"
                        className="fullProfileImage"
                        onClick={(e) => e.stopPropagation()}
                    />
                </div>
            )}

            {/* {token && profile && (

                <div className="profileContainer">
                    <p onClick={() => setUserData(!userData)}><i className="fa-solid fa-user"></i> {userDetail.name}</p>
                    <p><i className="fa-solid fa-gear"></i> Settings</p>
                    <p><i class="fa-solid fa-gear"></i> Dark/Light</p>
                    <p onClick={() => {
                        localStorage.removeItem("token");
                        setUserDetail(null);
                        navigate("/login");
                    }}><i className="fa-solid fa-right-from-bracket"></i> Logout</p>
                </div>
            )
            } */}
            {/* {token && userData && (
                <div className='userData'>
                    <p>{userDetail.name}</p>
                    <p>User Details</p>
                </div>
            )} */}
        </div >
    );
}

export default Navbar;