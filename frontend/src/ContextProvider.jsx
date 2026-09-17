import React, { createContext, useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "./BackendUrl";

export const ExpenseContext = createContext([]);

function ContextProvider({ children }) {

    const [expense, setExpense] = useState([]);
    const [budget, setBudget] = useState([]);
    const [goal, setGoal] = useState([]);

    const ApiUrl = `${BASE_URL}/api`;

    const fetchExpense = async () => {
        try {
            const exp = await axios.get(`${ApiUrl}/expense`);
            setExpense(exp.data);
        } catch (error) {
            console.log(error);
        }
    };

    const fetchGoal = async () => {
        const goals = await axios.get(`${ApiUrl}/goals`);
        setGoal(goals.data);
    }

    const fetchBudget = async () => {
        const budgets = await axios.get(`${ApiUrl}/budgets`);
        setBudget(budgets.data);
        console.log(budgets.data);
    }

    useEffect(() => {
        fetchExpense();
        fetchBudget();
        fetchGoal();
    }, []);

    return (
        <ExpenseContext.Provider value={{ expense, fetchExpense, budget, fetchBudget, goal, fetchGoal }}>
            {children}
        </ExpenseContext.Provider>
    );
}

export default ContextProvider;

