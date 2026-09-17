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
import Navbar from './Navbar';
import Footer from './Footer';
import ContextProvider from './ContextProvider';
import PageNotFound from './PageNotFound';
// import InvestmentHome from './investment/Home';
// import Dashboard from "./components/Dashboard";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Navbar />
    <ContextProvider>
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
        <Route path='/*' element={<PageNotFound />} />
        {/* <Route path='/investment' element={<Dashboard />} /> */}
        {/* <Route path='/investment' element={<InvestmentHome />} /> */}
      </Routes>
    </ContextProvider>
    <Footer />
  </BrowserRouter>
);
