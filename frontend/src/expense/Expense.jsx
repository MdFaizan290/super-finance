import React, { createContext, useEffect, useState } from 'react';
import { Link } from "react-router-dom";
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

    const ApiUrl = `${BASE_URL}/api/expense`;

    const addExpense = async () => {
        if (!title || !expenseAmt) {
            alert("Enter All Fields");
            return;
        }
        if (expenseAmt <= 0) {
            alert("Expense Cannot Be Negative");
            return;
        }
        const exp = await axios.post(ApiUrl, {
            title,
            expenseAmt
        });
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
        const exp = await axios.get(ApiUrl);
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
        const exp = await axios.put(`${ApiUrl}/${id}`, {
            title,
            expenseAmt
        });
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
        const dltExp = await axios.delete(`${ApiUrl}/${id}`);
        fetchExpense();
    }

    return (
        <div>
            <h1 className="text-center heading">Expense</h1>
            <div class="search" >
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
                loading ? (<p className='text-center fs-5'>Loading...<div className='load'></div></p>) : (expense.length === 0 ? (<p className='text-center fs-4 mt-5'>Add Expenses To See</p>) : (
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
        </div >
    );
}

export default Expense;