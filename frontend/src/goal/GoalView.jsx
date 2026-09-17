import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import "./GoalView.css";
import { BASE_URL } from '../BackendUrl';

function GoalView() {
    const { id } = useParams();
    const [goal, setGoal] = useState({});
    const [addAmount, setAddAmount] = useState(false);
    const [saving, setSaving] = useState(null);
    const ApiUrl = `${BASE_URL}/api/goals`;

    const handleSaving = (e) => {
        setSaving(e.target.value);
        console.log(e.target.value);
    }
    const viewGoal = async () => {
        const res = await axios.get(`${ApiUrl}/${id}`);
        setGoal(res.data);
    }
    useEffect(() => {
        viewGoal();
    }, []);

    const updateSaving = async () => {
        const currAmt = goal.currentAmount + Number(saving);
        if (currAmt === goal.targetAmount) {
            alert("goal completed");
        }
        else if (currAmt > goal.targetAmount) {
            alert("Enter less amount");
            // return;
        }

        const res = await axios.patch(`${ApiUrl}/saving/${id}`, {
            currentAmount: saving,
        });
        console.log(res.data);
        setAddAmount(false);
        viewGoal();
    }
    const fill = (goal.currentAmount / goal.targetAmount) * 100;
    // const fill = goal.targetAmount > 0 ? Math.min( (goal.currentAmount / goal.targetAmount) * 100, 100 ) : 0;

    return (
        <div className="goal-view-page">
            {/* Heading */}
            <h1 className="goal-view-heading"> Your Saving Goal </h1>
            {/* Goal Card */}
            <div className="goal-view-card">
                <div className="goal-view-body">
                    <h2> Goal : {goal.title} </h2>
                    <h3> Target : &#8377; {goal.targetAmount} </h3>
                    <h3> Savings : &#8377; {goal.currentAmount} </h3>
                    <p> Created At :{" "} {goal.createdAt && new Date(goal.createdAt).toLocaleString()} </p>
                    <p> Updated At :{" "} {goal.updatedAt && new Date(goal.updatedAt).toLocaleString()} </p>
                </div>
                {/* Add Saving */}
                {addAmount ? (<div className="saving-input-container">
                    <input placeholder="Enter Amount" type="number" value={saving} onChange={handleSaving} className="saving-input" />
                    <button className="btn btn-primary" onClick={updateSaving} > Add </button>
                </div>) : (
                    <button className="btn btn-success add-saving-btn" disabled={goal.currentAmount === goal.targetAmount} onClick={() => setAddAmount(true)} > Add Saving </button>
                )}
            </div>
            {/* Progress Heading */}
            <h1 className="progress-heading"> Goal Progress Bar </h1>
            {/* Progress Bar */}
            <div className="goal-progress">
                <div className="progress-fill" style={{ width: `${fill}%` }} ></div>
            </div>
            {/* Percentage */}
            <p className="progress-percentage"> {fill.toFixed(0)}% </p>
            {/* Completed */}
            {fill === 100 && (<h5 className="goal-completed"> Goal Completed! </h5>)}
        </div>

    );
}

export default GoalView;