import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./BudgetList.css";
import { BASE_URL } from "../BackendUrl";

function BudgetList() {
    const [budget, setBudget] = useState([]);
    const [loading, setLoading] = useState(true);
    const randomNumber = Math.floor(Math.random() * 3000) + 200;

    const navigate = useNavigate();
    const ApiUrl = `${BASE_URL}/api/budgets`;

    const fetchBudget = async () => {
        const token = localStorage.getItem("token");
        if (!token) {
            return;
        }
        const budgets = await axios.get(`${BASE_URL}/api/budgets`,
            {
                headers: {
                    Authorization: token
                }
            }
        );
        setBudget(budgets.data);
        // console.log(budgets.data);
    };

    useEffect(() => {
        fetchBudget();
    }, []);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, randomNumber);
        return () => clearTimeout(timer);
    }, []);

    const deleteBudget = async (id) => {
        const dltBudget = await axios.delete(`${ApiUrl}/${id}`, {
            headers: {
                Authorization: token
            }
        });
        console.log(dltBudget);
        fetchBudget();
    };

    const token = localStorage.getItem("token");
    return (
        token ? (<div className="budgetPage">
            {/* Heading */}
            <div className="budgetHead">
                <h1>Budget List</h1>
                <Link to="/budgets/new" className="addBudgetTop"><i className="fa-solid fa-pen"></i> Add Budget</Link>
            </div>

            {/* Loading */}
            {loading ? (
                <div className="loadingContainer">
                    <p>Loading...</p>
                    <div className="load"></div>
                </div>
            ) : budget.length === 0 ? (<p className="noBudget">No Budget</p>) : (
                <div className="budgetContainer">
                    {budget.map((list) => (
                        <div key={list._id} className="budgetCard">
                            <div className="budgetCardBody">
                                <h3>{list.category}</h3>
                                <h5>&#8377; {list.amount}</h5>
                                <p>Budget Created On -{" "}{new Date(list.createdAt).toLocaleString()}</p>
                                <div className="budgetButtons">
                                    <Link to={`/budgets/edit/${list._id}`}>
                                        <button className="btn btn-success">
                                            <i className="fa-solid fa-pen-to-square"></i>{" "}
                                            Edit
                                        </button>
                                    </Link>
                                    <button className="btn btn-danger" onClick={() => deleteBudget(list._id)}>
                                        <i className="fa-solid fa-trash"></i>{" "}
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
            {/* Bottom Add Button */}
            <div className="bottomAddBudget">
                <Link to="/budgets/new" className="btn btn-primary"><i className="fa-solid fa-plus"></i> Add Budget</Link>
            </div>
        </div>) : (
            <div className="budgetGuest mt-5">
                <div className="budgetGuestCard">

                    <div className="budgetGuestIcon">
                        <i className="fa-solid fa-chart-pie"></i>
                    </div>

                    <h3>Plan Your Money, Reach Your Goals 🎯</h3>

                    <p className="budgetGuestDescription">
                        Create smart budgets, control your spending, and make every
                        rupee count with <strong>Super Finance</strong>.
                    </p>

                    <div className="budgetFeatures">

                        <div className="budgetFeature">
                            <div className="budgetFeatureIcon">💰</div>
                            <div>
                                <h5>Create Your Budget</h5>
                                <p>Set spending limits and plan your money for every category.</p>
                            </div>
                        </div>

                        <div className="budgetFeature">
                            <div className="budgetFeatureIcon">📊</div>
                            <div>
                                <h5>Monitor Your Spending</h5>
                                <p>See how much you've spent and how much budget is remaining.</p>
                            </div>
                        </div>

                        <div className="budgetFeature">
                            <div className="budgetFeatureIcon">🚦</div>
                            <div>
                                <h5>Stay Within Your Limits</h5>
                                <p>Avoid unnecessary spending by keeping your expenses under control.</p>
                            </div>
                        </div>

                        <div className="budgetFeature">
                            <div className="budgetFeatureIcon">🎯</div>
                            <div>
                                <h5>Build Better Habits</h5>
                                <p>Develop healthy financial habits and work towards your goals.</p>
                            </div>
                        </div>

                    </div>

                    <div className="budgetGuestBottom">
                        <h5>Ready to start planning your money?</h5>
                        <p>Login to create and manage your budgets.</p>

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

export default BudgetList;









// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";

// function BudgetList() {
//     const [budget, setBudget] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const randomNumber = Math.floor(Math.random() * 3000) + 200;

//     const ApiUrl = `http://localhost:5000/api/budgets`;
//     const fetchBudget = async () => {
//         const budgets = await axios.get(ApiUrl);
//         setBudget(budgets.data);
//         console.log(budgets.data);
//     }
//     useEffect(() => {
//         fetchBudget();
//     }, []);

//     useEffect(() => {
//         setTimeout(() => {
//             setLoading(false);
//         }, randomNumber)
//     }, []);

//     const deleteBudget = async (id) => {
//         const dltBudget = await axios.delete(`${ApiUrl}/${id}`);
//         console.log(dltBudget);
//         fetchBudget();
//     }
//     return (
//         <div>
//             <div style={styles.head}>
//                 <h1 className="mt-4 mb-5 end">Budget List</h1>
//                 <Link to={"/budgets/new"} style={styles.p} className="mt-4 mb-5"><p className=""><i class="fa-solid fa-pen"></i> Add Budget</p></Link>
//             </div>

//             {
//                 loading ? (<p className='text-center fs-5'>Loading...<div className='load'></div></p>) : (budget.length === 0 ? (<p className="text-center">No Budget</p>) : (
//                     budget.map((list) => (
//                         <div key={list._id} className="card mb-2" style={styles.card}>
//                             <div className="card-body" style={styles.cardBody}>
//                                 <h3>{list.category}</h3>
//                                 <h5>&#8377; {list.amount}</h5>
//                                 <p>Budget Created On - {new Date(list.createdAt).toLocaleString()}</p>
//                                 <Link to={`/budgets/edit/${list._id}`}><button className="btn btn-success me-3 p-2"><i class="fa-solid fa-pen-to-square"></i> Edit</button></Link>
//                                 <button className="btn btn-danger ms-3 p-2" onClick={() => deleteBudget(list._id)}><i class="fa-solid fa-trash"></i> Delete</button>
//                             </div>
//                         </div>
//                     ))
//                 ))
//             }
//             {/* <button >Show All Budget</button> */}
//             <div className="text-center"><Link to={"/budgets/new"} className="btn btn-primary mt-4 mb-5 p-2"><i class="fa-solid fa-plus"></i> Add Budget</Link></div>
//         </div>
//     );
// }

// const styles = {
//     card: {
//         width: "40%",
//         textAlign: "center",
//         padding: "20px",
//         margin: "0 auto",
//         backgroundColor: "rgb(240, 240, 173)"
//     },
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
// export default BudgetList;