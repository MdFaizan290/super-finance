import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./list.css";
import { BASE_URL } from "../BackendUrl";

function GoalList() {
    const [goals, setGoals] = useState([]);
    const [loading, setLoading] = useState(true);
    const ApiUrl = `${BASE_URL}/api/goals`;
    const randomNumber = Math.floor(Math.random() * 5000) + 200;
    const fetchGoal = async () => {
        const allGoal = await axios.get(ApiUrl);
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
        const dltGoal = await axios.delete(`${ApiUrl}/${id}`);
        // console.log(dltGoal.data.dltGoal);
        fetchGoal();
    };

    return (
        <div className="goal-page">
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
        </div>
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