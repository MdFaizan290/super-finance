import React, { createContext, useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "./BackendUrl";

export const ExpenseContext = createContext([]);

function ContextProvider({ children }) {

    const [expense, setExpense] = useState([]);
    const [budget, setBudget] = useState([]);
    const [goal, setGoal] = useState([]);
    const [userDetail, setUserDetail] = useState(null);

    const ApiUrl = `${BASE_URL}/api`;

    const fetchUser = async () => {
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                setUserDetail(null);
                return;
            }
            const user = await axios.get(`${ApiUrl}/user`, {
                headers: {
                    Authorization: token
                }
            });
            // console.log(user.data);
            // console.log(user.data.name);
            setUserDetail(user.data);
        } catch (error) {   
            console.log(error);
            setUserDetail(null);
        }
    };

    const fetchExpense = async () => {
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                return;
            }
            const exp = await axios.get(`${ApiUrl}/expense`,
                {
                    headers: {
                        Authorization: token
                    }
                }
            );
            setExpense(exp.data);
        } catch (error) {
            console.log(error);
        }
    };

    const fetchGoal = async () => {
        const token = localStorage.getItem("token");
        if (!token) {
            return;
        }
        const goals = await axios.get(`${ApiUrl}/goals`,
            {
                headers: {
                    Authorization: token
                }
            }
        );
        setGoal(goals.data);
    }

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
        fetchUser();
        fetchExpense();
        fetchBudget();
        fetchGoal();
    }, []);

    return (
        <ExpenseContext.Provider value={{ expense, fetchExpense, budget, fetchBudget, goal, fetchGoal, userDetail, setUserDetail, fetchUser }}>
            {children}
        </ExpenseContext.Provider>
    );
}

export default ContextProvider;

