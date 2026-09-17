import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./BudgetList.css";
import { BASE_URL } from "../BackendUrl";

function BudgetList() {
    const [budget, setBudget] = useState([]);
    const [loading, setLoading] = useState(true);
    const randomNumber = Math.floor(Math.random() * 3000) + 200;

    const ApiUrl = `${BASE_URL}/api/budgets`;

    const fetchBudget = async () => {
        const budgets = await axios.get(ApiUrl);
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
        const dltBudget = await axios.delete(`${ApiUrl}/${id}`);
        console.log(dltBudget);
        fetchBudget();
    };

    return (
        <div className="budgetPage">
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
        </div>
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