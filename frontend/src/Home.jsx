import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import "./home.css";
import { ExpenseContext } from "./ContextProvider";
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Legend } from "recharts";

function Home() {
    const { expense, budget, goal } = useContext(ExpenseContext);
    // const totalExpense = expenseContext.reduce((total, exp) => {
    //     return total 
    //     + Number(exp.expenseAmt);
    // }, 0)
    const totalExpense = () => {
        let amt = 0;
        for (let i = 0; i < expense.length; i++) {
            amt += Number(expense[i].expenseAmt);
        }
        return amt.toLocaleString("en-IN");
    };

    const totalBudget = () => {
        let amt = 0;
        for (let i = 0; i < budget.length; i++) {
            amt += Number(budget[i].amount);
        }
        return amt.toLocaleString("en-IN");
    };

    const SavingGoal = () => {
        let amt = 0;
        for (let i = 0; i < goal.length; i++) {
            amt += Number(goal[i].targetAmount);
        }
        return amt.toLocaleString("en-IN");
    }
    //Pie chart
    const pieData = budget.map((bgt) => ({
        name: bgt.category,
        value: Number(bgt.amount)
    }));

    //Bar chart
    const chartData = expense.map((exp) => ({
        title: exp.title,
        amount: Number(exp.expenseAmt)
    }));

    const chartDataBgt = budget.map((bgt) => ({
        title: bgt.category,
        amount: Number(bgt.amount)
    }));

    const formatAmount = (value) => {
        if (value >= 1000) {
            return `${value / 1000}K`;
        }
        return value;
    };
    const COLORS = [
        "#0088FE",
        "#00C49F",
        "#FFBB28",
        "#FF8042",
        "#A020F0",
        "#FF1493"
    ];
    return (
        <div className='mt-4'>
            <div className='dashboard'>
                <div className='investment box'>
                    <h5>Investments</h5>
                </div>
                <div className='expense box'>
                    <h5>Expenses</h5>
                    <p>&#8377; {totalExpense()}</p>
                </div>
                <div className='budget box'>
                    <h5>Budget</h5>
                    <p>&#8377; {totalBudget()}</p>
                </div>
                <div className='budget box'>
                    <h5>Savings Target</h5>
                    <p>&#8377; {SavingGoal()}</p>
                </div>
            </div>
            <div className='chartContainer'>
                <div className="expenseChart">
                    <h2>Expense Chart</h2>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={chartData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="title" />
                            <YAxis tickFormatter={formatAmount} />
                            <Tooltip />
                            <Bar dataKey="amount">
                                {chartData.map((entry, index) => (
                                    <Cell
                                        key={`cell-${index}`}
                                        fill={entry.amount < 50000 ? "green" : "rgba(255, 40, 40, 0.8)"}
                                    />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>
                <div className="expenseChart">
                    <h2>Budget Chart</h2>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={chartDataBgt}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="title" />
                            <YAxis tickFormatter={formatAmount} />
                            <Tooltip />
                            <Bar dataKey="amount">
                                {chartDataBgt.map((entry, index) => (
                                    <Cell
                                        key={`cell-${index}`}
                                        fill={entry.amount > 5000 ? "green" : "rgba(255, 40, 40, 0.8)"}
                                    />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>
                <div className="pieChart">
                    <h2>Investment Chart</h2>
                    <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={130} label={({ percent }) =>
                                ` ${(percent * 100).toFixed(0)}%`
                            }>
                                {pieData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip />
                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
                <div className="pieChart">
                    <h2>Savings Chart</h2>
                    <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={130} label={({ percent }) =>
                                ` ${(percent * 100).toFixed(0)}%`
                            }>
                                {pieData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip />
                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
}

export default Home;