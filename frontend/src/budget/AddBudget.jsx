import React, { useState } from "react";
import "./AddBudget.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../BackendUrl";

export default function AddBudget() {
    const [category, setCategory] = useState("");
    const [amount, setAmount] = useState(null);
    const navigate = useNavigate();
    const ApiUrl = `${BASE_URL}/api/budgets`;
    const handleCategory = (e) => {
        // console.log(e.target.value);
        setCategory(e.target.value);
    }
    const handleAmount = (e) => {
        setAmount(e.target.value);
        // console.log(e.target.value);
    }
    const addBudget = async () => {
        if (!category || !amount) {
            alert("Enter All Fields");
            return;
        }
        const addData = await axios.post(ApiUrl, {
            category,
            amount
        });
        console.log(`Data Added ${addData.data}`);
        navigate("/budgets/list")
    }
    return (
        <div>
            {/* <h1 className="text-center mt-4 mb-4">Budget Page</h1> */}
            <div class="card budget-form mt-4" >
                <div class="card-body form-body">
                    <h3 className="fs-3 mb-5">Add Budget</h3>
                    <input id="inp" placeholder="Enter Category" value={category} onChange={handleCategory} />
                    <input id="inp" placeholder="Enter Amount" type="number" value={amount} onChange={handleAmount} />
                    <button className="btn btn-success add-budget-btn" onClick={addBudget}>Add Budget</button>
                </div>
            </div>
        </div>
    )
}