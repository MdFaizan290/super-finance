import React, { createContext, useEffect, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import "./Expense.css";
import axios from 'axios';
import { BASE_URL } from '../BackendUrl';
// import { ExpenseContext } from "../ContextProvider";

function Expense() {
    const [title, setTitle] = useState("");
    const [expenseAmt, setExpenseAmt] = useState(null);
    const [expense, setExpense] = useState([]);
    const [editId, setEditId] = useState(null);
    const [keyword, setKeyword] = useState("");
    const [loading, setLoading] = useState(true);
    const randomNumber = Math.floor(Math.random() * 3000) + 200;

    const navigate = useNavigate();
    const ApiUrl = `${BASE_URL}/api/expense`;

    const addExpense = async () => {
        const token = localStorage.getItem("token");
        if (!token) {
            return;
        }
        if (!title || !expenseAmt) {
            alert("Enter All Fields");
            return;
        }
        if (expenseAmt <= 0) {
            alert("Expense Cannot Be Negative");
            return;
        }
        const exp = await axios.post(ApiUrl,
            {
                title,
                expenseAmt
            },
            {
                headers: {
                    Authorization: token
                }
            }
        );
        fetchExpense();
        setTitle("");
        setExpenseAmt("");
    }

    const totalExpense = () => {
        let amt = 0;
        for (let i = 0; i < expense.length; i++) {
            amt += Number(expense[i].expenseAmt);
        }
        // console.log(amt);
        return amt;
    }

    const fetchExpense = async () => {
        const token = localStorage.getItem("token");
        if (!token) {
            return;
        }
        const exp = await axios.get(ApiUrl,
            {
                headers: {
                    Authorization: token
                }
            }
        );
        setExpense(exp.data);
    }
    useEffect(() => {
        fetchExpense();
    }, []);

    // useEffect(() => {
    //     setTimeout(() => {
    //         setLoading(false);
    //     }, randomNumber)
    // })

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, randomNumber);
        return () => clearTimeout(timer);
    }, []);

    const editExpense = async (id) => {
        const token = localStorage.getItem("token");
        if (!token) {
            return;
        }
        const exp = await axios.put(`${ApiUrl}/${id}`,
            {
                title,
                expenseAmt
            },
            {
                headers: {
                    Authorization: token
                }
            }
        );
        setEditId(null);
        fetchExpense();
        setExpenseAmt("");
        setTitle("");
    }

    const searchExpense = async () => {
        if (!keyword.trim()) {
            fetchExpense();
            return;
        }
        const exp = await axios.get(`${ApiUrl}/search?keyword=${keyword}`);
        setExpense(exp.data);
        setKeyword("");
    }

    const deleteExpense = async (id) => {
        const token = localStorage.getItem("token");
        if (!token) {
            return;
        }
        const dltExp = await axios.delete(`${ApiUrl}/${id}`,
            {
                headers: {
                    Authorization: token
                }
            }
        );
        fetchExpense();
    }

    const token = localStorage.getItem("token");

    return (

        token ? (<div>
            <h1 className="text-center heading">Expense</h1>
            <div className="search" >
                <div className="addExp">
                    <h3 className="">Add Expense</h3>
                    <div className='addInput exp'>
                        <input placeholder="Enter Title" value={editId == null ? title : ""} onChange={(e) => setTitle(e.target.value)} />
                        <input placeholder="Expense" type="number" value={editId == null ? expenseAmt : ""} onChange={(e) => setExpenseAmt(e.target.value)} />
                        <button onClick={addExpense} className="btn btn-success add">Add</button>
                    </div>
                </div>
                <div className="addExp">
                    <h3 className="">Search</h3>
                    <div className='addInput'>
                        <input placeholder="search" value={keyword} onChange={(e) => setKeyword(e.target.value)} />
                        <button className="btn btn-success" onClick={searchExpense}>Search</button>
                    </div>
                </div>
                <div className="addExp">
                    <h3 className="">Filter</h3>
                    <div className='addInput'>
                        <input placeholder="Enter Title" />
                        <button className="btn btn-success" >Filter</button>
                    </div>
                </div>
            </div>
            <div className='listHeading'><h1 className="text-center" >
                <span id='head' onClick={fetchExpense}>Expense List</span></h1>
                {expense.length === 0 ? (<p id='total'>No Expense</p>) : (
                    <p id='total'>Total Expense : &#8377;{totalExpense()}</p>)}
            </div>
            {
                loading ? (<div className='text-center fs-5'>Loading...<div className='load'></div></div>) : (expense.length === 0 ? (<p className='text-center fs-4 mt-5'>Add Expenses To See</p>) : (
                    <div className="card-container">
                        {expense.map((exp) => (
                            <div className="cardBody mb-4">
                                {
                                    editId === exp._id ? (
                                        <div className='editContainer'>
                                            <input className='editInput' placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
                                            <input className='editInput' placeholder='Expense' value={expenseAmt} onChange={(e) => setExpenseAmt(e.target.value)} />
                                            <button className='btn btn-primary expBtn' onClick={() => editExpense(exp._id)}>Save</button>
                                        </div>
                                    ) : (
                                        <div>
                                            <h3>{exp.title}</h3>
                                            <h6>Expense : &#8377; {exp.expenseAmt}</h6>
                                            <button className="btn btn-success p-2 expBtn" onClick={() => {
                                                setEditId(exp._id);
                                                setTitle(exp.title);
                                                setExpenseAmt(exp.expenseAmt);
                                            }
                                            }><i class="fa-solid fa-pen-to-square"></i> Edit</button>
                                            <button className="btn btn-danger p-2 expBtn" onClick={() => deleteExpense(exp._id)}><i class="fa-solid fa-trash"></i> Delete</button>
                                        </div>
                                    )
                                }
                            </div>
                        ))}
                    </div>
                ))
            }
        </div >) :
            (<div className="expenseGuest mt-5">
                <div className="expenseGuestCard">
                    <div className="expenseGuestIcon"><i className="fa-solid fa-wallet"></i></div>
                    <h3>Take Control of Your Spending 💰</h3>
                    <p className="expenseGuestDescription">
                        Keep track of your daily expenses, understand where your money
                        goes, and build better financial habits with <strong>Super Finance</strong>.
                    </p>
                    <div className="expenseFeatures">
                        <div className="expenseFeature">
                            <div className="featureIcon">📊</div>
                            <div>
                                <h5>Track Expenses</h5>
                                <p>Record and organize your daily spending.</p>
                            </div>
                        </div>
                        <div className="expenseFeature">
                            <div className="featureIcon">🔍</div>
                            <div>
                                <h5>Know Where Your Money Goes</h5>
                                <p>Get a clear view of your spending habits.</p>
                            </div>
                        </div>
                        <div className="expenseFeature">
                            <div className="featureIcon">💡</div>
                            <div>
                                <h5>Spend Smarter</h5>
                                <p>Identify unnecessary expenses and manage your money better.</p>
                            </div>
                        </div>
                        <div className="expenseFeature">
                            <div className="featureIcon">🎯</div>
                            <div>
                                <h5>Reach Your Goals</h5>
                                <p>Keep your spending under control and save for what matters.</p>
                            </div>
                        </div>
                    </div>
                    <div className="expenseGuestBottom">
                        <h5>Ready to take control of your finances?</h5>
                        <p>Login to start tracking your expenses.</p>
                        <button onClick={() => navigate("/login")}><i className="fa-solid fa-right-to-bracket"></i>Login to Continue</button>
                    </div>
                </div>
            </div>)
    );
}

export default Expense;