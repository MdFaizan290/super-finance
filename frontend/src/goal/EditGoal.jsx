import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import "./AddGoal.css";
import { BASE_URL } from '../BackendUrl';

function EditGoal() {
    const [title, setTitle] = useState("");
    const [targetAmount, setTargetAmount] = useState(null);
    const { id } = useParams();
    const navigate = useNavigate();
    const ApiUrl = `${BASE_URL}/api/goals`;
    const handleTitle = (e) => {
        // console.log(e.target.value);
        setTitle(e.target.value);
    }
    const handleTargetAmount = (e) => {
        setTargetAmount(e.target.value);
        // console.log(e.target.value);
    }

    const fetchGoal = async () => {
        const goal = await axios.get(`${ApiUrl}/${id}`);
        setTitle(goal.data.title);
        setTargetAmount(goal.data.targetAmount);
    }
    useEffect(() => {
        fetchGoal();
    }, [])

    const updateGoal = async () => {
        const updatedGoal = await axios.put(`${ApiUrl}/${id}`, {
            title,
            targetAmount
        });
        navigate("/goals/list");
    }

    return (
        <div className='mb-5'>
            <h1 className='text-center mt-5 mb-5'>Edit Goal</h1>
            <div class="card goal-form" >
                <div class="card-body form-body">
                    <h3 className="fs-3 mb-5">Edit Your Goal</h3>
                    <input id='inp' placeholder="Enter Goal" value={title} onChange={handleTitle} />
                    <input id='inp' placeholder="Target Amount" type="number" value={targetAmount} onChange={handleTargetAmount} />
                    <button className="btn btn-success " onClick={updateGoal}>Update</button>
                </div>
            </div>
        </div>
    );
}

export default EditGoal;