import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./list.css";
import { BASE_URL } from "../BackendUrl";

function GoalList() {
    const [goals, setGoals] = useState([]);
    const [loading, setLoading] = useState(true);
    const ApiUrl = `${BASE_URL}/api/goals`;
    const randomNumber = Math.floor(Math.random() * 5000) + 200;

    const navigate = useNavigate();
    const fetchGoal = async () => {
        const token = localStorage.getItem("token");
        if (!token) {
            return;
        }
        const allGoal = await axios.get(ApiUrl, {
            headers: {
                Authorization: token
            }
        });
        setGoals(allGoal.data);
    };
    useEffect(() => {
        fetchGoal();
    }, []);

    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, randomNumber);
    }, []);

    const deleteGoal = async (id) => {
        const token = localStorage.getItem("token");
        if (!token) {
            return;
        }
        const dltGoal = await axios.delete(`${ApiUrl}/${id}`, {
            headers: {
                Authorization: token
            }
        });
        // console.log(dltGoal.data.dltGoal);
        fetchGoal();
    };

    const token = localStorage.getItem("token");
    return (
        token ? (<div className="goal-page">
            {/* Header */}
            <div className="goal-header">
                <h1>Goal List</h1>
                <Link to="/goals/new" className="header-add-goal"><i className="fa-solid fa-pen"></i> Add Goal</Link>
            </div>
            {/* Loading */}
            {loading ? (
                <>
                    {[1, 2, 3].map((item) => (
                        <div key={item} className="shimmer-card">
                            <div className="shimmer-body">
                                <div className="shimmer shimmer-title"></div>
                                <div className="shimmer shimmer-amount"></div>
                                <div className="shimmer shimmer-date"></div>
                                <div className="shimmer-buttons">
                                    <div className="shimmer shimmer-button"></div>
                                    <div className="shimmer shimmer-button"></div>
                                    <div className="shimmer shimmer-button"></div>
                                </div>
                            </div>
                        </div>
                    ))}
                </>
            ) : goals.length === 0 ? (<p className="no-goals">No Goals</p>) : (
                goals.map((goal) => (
                    <div
                        key={goal._id} className="goal-card"
                        style={{
                            backgroundColor: goal.currentAmount === goal.targetAmount ? "#a5fdba" : "rgb(244, 244, 186)"
                        }}
                    >
                        <div className="goal-card-body">
                            <h3>{goal.title}</h3>
                            <h5>&#8377; {goal.targetAmount}</h5>
                            {goal.currentAmount === goal.targetAmount && (<p className="completed">Completed ✅</p>)}
                            <p className="goal-date">
                                Goal Created On -{" "}
                                {new Date(goal.createdAt).toLocaleString()}
                            </p>
                            {/* Buttons */}
                            <div className="goal-buttons">
                                <Link to={`/goals/edit/${goal._id}`}>
                                    <button className="btn btn-success"><i className="fa-solid fa-pen-to-square"></i>
                                        {" "}Edit
                                    </button>
                                </Link>
                                <button className="btn btn-danger" onClick={() => deleteGoal(goal._id)}>
                                    <i className="fa-solid fa-trash"></i> {" "} Delete
                                </button>
                                <Link to={`/goals/view/${goal._id}`}>
                                    <button className="btn btn-primary"><i className="fa-solid fa-eye"></i>{" "}View</button>
                                </Link>
                            </div>
                        </div>
                    </div>
                ))
            )}
            {/* Bottom Add Goal */}
            {!loading && (
                <div className="bottom-add-goal">
                    <Link to="/goals/new" className="btn btn-primary"><i className="fa-solid fa-plus"></i>{" "}Add Goal</Link>
                </div>
            )}
        </div>) : (
            <div className="goalGuest mt-5">
                <div className="goalGuestCard">

                    <div className="goalGuestIcon">
                        <i className="fa-solid fa-bullseye"></i>
                    </div>

                    <h3>Turn Your Dreams Into Goals 🎯</h3>

                    <p className="goalGuestDescription">
                        Set clear savings goals, track your progress, and stay motivated
                        to achieve the things that matter most with <strong>Super Finance</strong>.
                    </p>

                    <div className="goalFeatures">

                        <div className="goalFeature">
                            <div className="goalFeatureIcon">🎯</div>
                            <div>
                                <h5>Set Your Goals</h5>
                                <p>
                                    Create savings goals for the things you want to achieve.
                                </p>
                            </div>
                        </div>

                        <div className="goalFeature">
                            <div className="goalFeatureIcon">💰</div>
                            <div>
                                <h5>Save With Purpose</h5>
                                <p>
                                    Decide how much you want to save and stay focused on your target.
                                </p>
                            </div>
                        </div>

                        <div className="goalFeature">
                            <div className="goalFeatureIcon">📈</div>
                            <div>
                                <h5>Track Your Progress</h5>
                                <p>
                                    See how close you are to reaching each of your financial goals.
                                </p>
                            </div>
                        </div>

                        <div className="goalFeature">
                            <div className="goalFeatureIcon">🏆</div>
                            <div>
                                <h5>Celebrate Your Success</h5>
                                <p>
                                    Stay motivated and enjoy the feeling of completing your goals.
                                </p>
                            </div>
                        </div>

                    </div>

                    <div className="goalGuestBottom">
                        <h5>Have something you've always wanted to achieve?</h5>

                        <p>
                            Login to create your first savings goal.
                        </p>

                        <button onClick={() => navigate("/login")}>
                            <i className="fa-solid fa-right-to-bracket"></i>
                            Login to Continue
                        </button>
                    </div>

                </div>
            </div>
        )
    );
}

export default GoalList;






// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { Link } from 'react-router-dom';
// import "./list.css";

// function GoalList() {
//     const [goals, setGoals] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const ApiUrl = "http://localhost:5000/api/goals";
//     const randomNumber = Math.floor(Math.random() * 5000) + 200;
//     const fetchGoal = async () => {
//         const allGoal = await axios.get(ApiUrl);
//         setGoals(allGoal.data);
//     }
//     useEffect(() => {
//         fetchGoal();
//     }, []);
//     useEffect(() => {
//         setTimeout(() => {
//             setLoading(false);
//         }, randomNumber)
//     }, []);
//     const deleteGoal = async (id) => {
//         const dltGoal = await axios.delete(`${ApiUrl}/${id}`);
//         console.log(dltGoal.data.dltGoal);
//         fetchGoal();
//     }
//     return (
//         // <div>
//         //     <h1 className="text-center mt-5 mb-5 ">Your Goal List</h1>
//         //     {
//         //         goals.length === 0 ? (<p className="text-center">No Goals</p>) : (
//         //             goals.map((goal) => (
//         //                 <div key={goal._id} className="card mb-2 cd" style={{
//         //                     backgroundColor: goal.currentAmount === goal.targetAmount ? "#a5fdba" : "rgb(244, 244, 186)",
//         //                 }}>
//         //                     <div className="card-body">
//         //                         <h3>{goal.title}</h3>
//         //                         <h5>&#8377; {goal.targetAmount}</h5>
//         //                         <p style={{ color: "#046638", fontWeight: "bolder" }}>{goal.currentAmount === goal.targetAmount && "Completed ✅"}</p>
//         //                         <p>Goal Created On - {new Date(goal.createdAt).toLocaleString()}</p>
//         //                         <Link to={`/goals/edit/${goal._id}`}><button className="btn btn-success me-3">Edit</button></Link>
//         //                         <button className="btn btn-danger ms-3 me-3" onClick={() => deleteGoal(goal._id)}>Delete</button>
//         //                         <Link to={`/goals/view/${goal._id}`}><button className='btn btn-primary ms-3'>View</button></Link>
//         //                     </div>
//         //                 </div>
//         //             ))
//         //         )
//         //     }
//         //     <div className="text-center"><Link to={"/goals/new"} className="btn btn-primary mt-4 mb-5">Add Goal</Link></div>
//         // </div >
//         <div>
//             <div style={styles.head}>
//                 <h1 className="mt-4 mb-5">Goal List</h1>
//                 <Link to={"/goals/new"} className="mt-4 mb-5 p" style={styles.p}><p className=""><i class="fa-solid fa-pen"></i> Add Goal</p></Link>
//             </div>

//             {loading ? (
//                 <>
//                     {[1, 2, 3].map((item) => (
//                         <div key={item} className="card mb-2 shimmer-card">
//                             <div className="card-body">
//                                 <div className="shimmer shimmer-title"></div>
//                                 <div className="shimmer shimmer-amount"></div>
//                                 <div className="shimmer shimmer-date"></div>
//                                 <div className="shimmer-buttons">
//                                     <div className="shimmer shimmer-button"></div>
//                                     <div className="shimmer shimmer-button"></div>
//                                     <div className="shimmer shimmer-button"></div>
//                                 </div>
//                             </div>
//                         </div>
//                     ))}
//                 </>
//             ) : goals.length === 0 ? (
//                 <p className="text-center">No Goals</p>
//             ) : (
//                 goals.map((goal) => (
//                     <div
//                         key={goal._id}
//                         className="card mb-2 cd"
//                         style={{
//                             backgroundColor:
//                                 goal.currentAmount === goal.targetAmount
//                                     ? "#a5fdba"
//                                     : "rgb(244, 244, 186)",
//                         }}
//                     >
//                         <div className="card-body">
//                             <h3>{goal.title}</h3>

//                             <h5>&#8377; {goal.targetAmount}</h5>

//                             <p
//                                 style={{
//                                     color: "#046638",
//                                     fontWeight: "bolder",
//                                 }}
//                             >
//                                 {goal.currentAmount === goal.targetAmount &&
//                                     "Completed ✅"}
//                             </p>

//                             <p>
//                                 Goal Created On -{" "}
//                                 {new Date(goal.createdAt).toLocaleString()}
//                             </p>

//                             <Link to={`/goals/edit/${goal._id}`}>
//                                 <button className="btn btn-success me-3 p-2">
//                                     <i class="fa-solid fa-pen-to-square"></i> Edit
//                                 </button>
//                             </Link>

//                             <button
//                                 className="btn btn-danger ms-3 me-3 p-2"
//                                 onClick={() => deleteGoal(goal._id)}
//                             >
//                                 <i class="fa-solid fa-trash"></i> Delete
//                             </button>

//                             <Link to={`/goals/view/${goal._id}`}>
//                                 <button className="btn btn-primary ms-3 p-2">
//                                     <i class="fa-solid fa-eye"></i> View
//                                 </button>
//                             </Link>
//                         </div>
//                     </div>
//                 ))
//             )}

//             {!loading && (
//                 <div className="text-center">
//                     <Link
//                         to="/goals/new"
//                         className="btn btn-primary mt-4 mb-5 p-2"
//                     >
//                         <i class="fa-solid fa-plus"></i> Add Goal
//                     </Link>
//                 </div>
//             )}
//         </div>
//     );
// }

// const styles = {
//     head: {
//         display: "flex",
//         alignItems: "center",
//         justifyContent: "center",
//         position: "relative"
//     },
//     p: {
//         position: "absolute",
//         right: "20px",
//         cursor: "pointer",
//         // border:"1px solid grey",
//         padding: "10px",
//         borderRadius: "10px",
//         backgroundColor: "rgba(20,255,20,0.3)",
//         paddingBottom: "0px",
//         textDecoration: "none",
//     }
// }

// export default GoalList;