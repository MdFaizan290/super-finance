import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AddBudget from './budget/AddBudget';
import BudgetList from './budget/BudgetList';
import EditBudget from './budget/EditBudget';
import AddGoal from './goal/AddGoal';
import EditGoal from './goal/EditGoal';
import Home from './Home';
import GoalList from './goal/GoalList';
import GoalView from './goal/GoalView';
import Expense from './expense/Expense';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ContextProvider from './components/ContextProvider';
import PageNotFound from './components/PageNotFound';
import SignIn from './register/SignUp';
import Register from './login/Register';
import Login from './login/Login';
import Investment from './invest/Investment';
import "@fortawesome/fontawesome-free/css/all.min.css";
import Invest from "./invest/invest";
import StockNews from './invest/StockNews';

// import InvestmentHome from './investment/Home';
// import Dashboard from "./components/Dashboard";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <ContextProvider>

      <Navbar />

      <Routes>
        <Route path='/' element={<Home />} />

        <Route path='/budgets/new' element={<AddBudget />} />
        <Route path='/budgets/list' element={<BudgetList />} />
        <Route path='/budgets/edit/:id' element={<EditBudget />} />

        <Route path='/goals/new' element={<AddGoal />} />
        <Route path='/goals/list' element={<GoalList />} />
        <Route path='/goals/edit/:id' element={<EditGoal />} />
        <Route path='/goals/view/:id' element={<GoalView />} />

        <Route path='/expense' element={<Expense />} />

        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/investment' element={<Investment />} />
        {/* <Route path='/invest' element={<Invest />} /> */}
        <Route path='/news' element={<StockNews />} />
        <Route path='/*' element={<PageNotFound />} />

      </Routes>

      <Footer />

    </ContextProvider>
  </BrowserRouter>
);
