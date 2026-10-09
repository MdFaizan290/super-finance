import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import "./home.css";
import { ExpenseContext } from "./ContextProvider";
import {
    BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, ComposedChart, Line,
    Tooltip, ResponsiveContainer, PieChart, Pie, Legend
} from "recharts";
import { useEffect } from 'react';
import { useState } from 'react';

function Home() {
    const { expense, budget, goal, fetchExpense, fetchBudget, fetchGoal } = useContext(ExpenseContext);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    // const totalExpense = expenseContext.reduce((total, exp) => {
    //     return total 
    //     + Number(exp.expenseAmt);
    // }, 0)

    const handleMouseMove = (e) => {
        const card = e.currentTarget;
        const rect = card.getBoundingClientRect();

        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const moveX = (x / rect.width - 0.5) * 2;
        const moveY = (y / rect.height - 0.5) * 2;

        setMousePosition({
            x: moveX,
            y: moveY
        });
    };


    useEffect(() => {
        fetchBudget();
        fetchExpense();
        fetchGoal();
    }, [])

    const navigate = useNavigate();

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


    const pieDataGoals = goal.map((g) => ({
        name: g.title,
        targetAmount: Number(g.targetAmount),
        savingAmount: Number(g.currentAmount)
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

    const token = localStorage.getItem("token");

    const formatAmount = (value) => {
        if (value >= 1000) {
            return `${value / 1000}K`;
        }
        return value;
    };

    const getGoalColor = (index, total) => {
        const hue = (index * 360) / total;
        return `hsl(${hue}, 75%, 55%)`;
    };


    return (

        token ? (<div className='mt-4' >
            <div className='dashboard'>
                <div className='investment box'>
                    <h5><i className="fa-solid fa-arrow-trend-up"></i> Investments</h5>
                </div>
                <div className='expense box'>
                    <h5><i className="fa-solid fa-money-bill-1-wave"></i> Expenses</h5>
                    <p>&#8377; {totalExpense()}</p>
                </div>
                <div className='budget box'>
                    <h5><i className="fa-solid fa-hand-holding-dollar"></i> Budget</h5>
                    <p>&#8377; {totalBudget()}</p>
                </div>
                <div className='budget box'>
                    <h5><i className="fa-solid fa-piggy-bank"></i> Savings Target</h5>
                    <p>&#8377; {SavingGoal()}</p>
                </div>
            </div>
            <div className='chartContainer'>
                {expense.length > 0 && <div className="expenseChart">
                    <h2>Expense Chart</h2>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={chartData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="title" />
                            <YAxis tickFormatter={formatAmount} />
                            <Tooltip />
                            <Bar dataKey="amount" barSize={70}>
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
                }
                {budget.length > 0 && <div className="expenseChart">
                    <h2>Budget Chart</h2>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={chartDataBgt}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="title" tick={{ fontSize: 12 }} />
                            <YAxis tickFormatter={formatAmount} tick={{ fontSize: 12 }} />
                            <Tooltip />
                            <Bar dataKey="amount" barSize={70}  >
                                {chartDataBgt.map((entry, index) => (
                                    <Cell
                                        key={`cell-${index}`}
                                        fill={entry.amount > 20000 ? "rgb(44, 194, 44)" : "rgba(255, 40, 40, 0.8)"}
                                    />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>}
                <div className="pieChart">
                    <h2>Investment Chart</h2>
                    <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={130} label={({ percent }) =>
                                ` ${(percent * 100).toFixed(0)}%`
                            }>
                                {pieData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={getGoalColor(index, pieDataGoals.length)} />
                                ))}
                            </Pie>
                            <Tooltip />
                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
                {goal.length > 0 && <div className="pieChart">
                    <h2>Savings Chart</h2>
                    <ResponsiveContainer width="100%" height={400}>
                        <ComposedChart
                            data={pieDataGoals} layout="vertical"
                            margin={{ top: 20, right: 30, left: 30, bottom: 20 }}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis type="number" tickFormatter={formatAmount} tick={{ fontSize: 12 }} />
                            <YAxis type="category" dataKey="name" width={120} tick={{ fontSize: 12 }} />
                            <Tooltip formatter={(value) => `₹${Number(value).toLocaleString("en-IN")}`} />
                            <Legend />
                            {/* Target Amount */}
                            <Bar dataKey="targetAmount" name="Target Amount" barSize={25} fill="#8884d8" />

                            {/* Saving Amount */}
                            <Line
                                type="monotone" dataKey="savingAmount" name="Saving Amount"
                                stroke="#00C49F" strokeWidth={3} dot={{ r: 5 }}
                            />
                        </ComposedChart>
                    </ResponsiveContainer>
                </div>}
            </div>
        </div>) : (
            <div>
                <div className="homeGuest" >
                    <div className="homeGuestCard" onMouseMove={handleMouseMove}
                        style={{
                            transform: `
            perspective(1000px)
            rotateX(${mousePosition.y * -1.2}deg)
            rotateY(${mousePosition.x * 1.2}deg)
        `
                        }}>
                        <div className="fallingCoins">

                            <span style={{
                                transform: `translate(${mousePosition.x * 8}px, ${mousePosition.y * 8}px) rotate(-15deg)`
                            }}>₹</span>
                            <span style={{
                                transform: `translate(${mousePosition.x * -12}px, ${mousePosition.y * 10}px) rotate(20deg)`
                            }}>₹</span>

                            <span style={{
                                transform: `translate(${mousePosition.x * 15}px, ${mousePosition.y * -8}px) rotate(-10deg)`
                            }}>₹</span>

                            <span style={{
                                transform: `translate(${mousePosition.x * -8}px, ${mousePosition.y * 15}px) rotate(25deg)`
                            }}>₹</span>

                            <span style={{
                                transform: `translate(${mousePosition.x * 10}px, ${mousePosition.y * -12}px) rotate(-20deg)`
                            }}>₹</span>

                            <span style={{
                                transform: `translate(${mousePosition.x * -15}px, ${mousePosition.y * -6}px) rotate(15deg)`
                            }}>₹</span>

                            <span style={{
                                transform: `translate(${mousePosition.x * 7}px, ${mousePosition.y * 12}px) rotate(-25deg)`
                            }}>₹</span>

                            <span style={{
                                transform: `translate(${mousePosition.x * -10}px, ${mousePosition.y * 8}px) rotate(20deg)`
                            }}>₹</span>

                            <span style={{
                                transform: `translate(${mousePosition.x * 50}px, ${mousePosition.y * 50}px) rotate(-20deg)`
                            }}>₹</span>
                            <span style={{
                                transform: `translate(${mousePosition.x * 9}px, ${mousePosition.y * 9}px) rotate(50deg)`
                            }}>₹</span>
                        </div>
                        <div className="homeGuestIcon">
                            <i className="fa-solid fa-wallet"></i>
                            {/* <img src='/SF_Logo.png' width={"500px"} height={"200px"} style={{borderRadius:"20px",margin:"20px"}}/> */}
                        </div>

                        <span className="homeGuestBadge">
                            Your Personal Finance Companion
                        </span>

                        <h1>
                            Take Control of Your <span>Financial Future</span> 💰
                        </h1>

                        <p className="homeGuestDescription">
                            Manage your expenses, plan your budget, set savings goals,
                            and build better financial habits — all in one place with
                            <strong> Super Finance</strong>.
                        </p>

                        <div className="homeFeatures">

                            <div className="homeFeature">
                                <div className="homeFeatureIcon">
                                    <i className="fa-solid fa-receipt"></i>
                                </div>

                                <div>
                                    <h5>Track Expenses</h5>
                                    <p>Know exactly where your money goes.</p>
                                </div>
                            </div>

                            <div className="homeFeature">
                                <div className="homeFeatureIcon">
                                    <i className="fa-solid fa-chart-pie"></i>
                                </div>

                                <div>
                                    <h5>Manage Budgets</h5>
                                    <p>Plan your spending and stay within limits.</p>
                                </div>
                            </div>

                            <div className="homeFeature">
                                <div className="homeFeatureIcon">
                                    <i className="fa-solid fa-bullseye"></i>
                                </div>

                                <div>
                                    <h5>Set Goals</h5>
                                    <p>Save with purpose and track your progress.</p>
                                </div>
                            </div>

                            <div className="homeFeature">
                                <div className="homeFeatureIcon">
                                    <i className="fa-solid fa-chart-line"></i>
                                </div>

                                <div>
                                    <h5>Understand Your Finances</h5>
                                    <p>Get a clearer picture of your financial habits.</p>
                                </div>
                            </div>

                        </div>

                        <div className="homeGuestBottom">

                            <h3>
                                Your money. Your goals. Your future.
                            </h3>

                            <p>
                                Login to start managing your finances with Super Finance.
                            </p>

                            <div className="homeGuestButtons">

                                <button
                                    className="homeLoginBtn"
                                    onClick={() => navigate("/login")}
                                >
                                    <i className="fa-solid fa-right-to-bracket"></i>
                                    Login
                                </button>

                                <button
                                    className="homeRegisterBtn"
                                    onClick={() => navigate("/register")}
                                >
                                    <i className="fa-solid fa-user-plus"></i>
                                    Create Account
                                </button>

                            </div>

                        </div>

                    </div>
                </div>
                <div className='a'>
                    <div className='landingPage'>
                        <div className='left'>
                            <img src='/finance_img.png' />
                            <p className='p'><strong style={{ color: "rgb(147, 37, 250)" }}>Super Finance</strong> simplifies finances by bringing all your accounts together into one clear view. Always know where your money is and where it's going, achieve your goals quicker, and collaborate with your partner or professional at no extra cost.</p>
                        </div>
                        <div className='right'>
                            <p className='p'>Dive deep into your finances with customizable charts that reveal where your money’s going. Whether you're tracking spending trends, income, or net worth over time, reports help you turn raw data into insights you can act on.</p>
                            <img src='/dashboard_animation.png' />
                        </div>
                        <div className='left'>
                            <img src='/budgetImg.avif' />
                            <div className='about'>
                                <p>1. Create a clear plan to save for what matters—whether it’s a home, a vacation, or a rainy day fund. Set targets, track your progress, and stay motivated as you watch your savings grow over time.. </p>
                                <p>2. From planning a vacation to a home remodel — track your goals and adjust your cash flow to make sure you stick the landing.</p>
                            </div>
                        </div>
                    </div >
                </div >
            </div>
        )

    );
}

export default Home;