import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
// import { Link } from 'react-router-dom';
import './AddBudget.css'
import { BASE_URL } from '../BackendUrl';
function EditBudget() {
    const [category, setCategory] = useState("");
    const [amount, setAmount] = useState(null);
    const { id } = useParams();
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
    const fetchBudget = async () => {
        const budget = await axios.get(`${ApiUrl}/${id}`);
        setCategory(budget.data.category);
        setAmount(budget.data.amount);
    }
    useEffect(() => {
        fetchBudget();
    }, [])

    const updateBudget = async () => {
        const updatedBdg = await axios.put(`${ApiUrl}/${id}`, {
            category,
            amount
        });
        navigate("/budgets/list");
    }

    return (
        <div className='mb-5'>
            {/* <h1 className='text-center mt-5 mb-5'>Edit Budget</h1> */}
            <div class="card budget-form  mt-4" >
                <div class="card-body form-body">
                    <h3 className="fs-3 mb-5">Edit Your Budget</h3>
                    <input id="inp" placeholder="Category" value={category} onChange={handleCategory} />
                    <input id="inp" placeholder="Amount" type="number" value={amount} onChange={handleAmount} />
                    {/* <Link to={"/budgets/list"}></Link> */}
                    <button className="btn btn-success add-budget-btn" onClick={updateBudget}>Update</button>
                </div>
            </div>
        </div>
    );
}


export default EditBudget;