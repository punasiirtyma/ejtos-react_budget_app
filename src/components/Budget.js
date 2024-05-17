import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';

const Budget = () => {
    const { budget, expenses, currency, dispatch } = useContext(AppContext);
    const [newBudget, setNewBudget] = useState(budget);

    const totalExpenses = expenses.reduce((total, item) => total + item.cost, 0);

    const handleBudgetChange = (event) => {
        const value = event.target.value;

        if (!isNaN(value) && value.trim() !== '') {
            const numericValue = parseInt(value);

            if (numericValue > 20000) {
                alert('The budget cannot exceed £20,000.');
            } else if (numericValue < totalExpenses) {
                alert('The budget cannot be lower than the spending.');
            } else {
                setNewBudget(numericValue);
                dispatch({ type: 'SET_BUDGET', payload: numericValue });
            }
        } else {
            alert('Please enter a valid number.');
        }
    };

    return (
        <div className='alert alert-secondary d-flex flex-column'>
            <div className='d-flex justify-content-between align-items-center'>
                <span>Budget: {currency}</span>
                <input
                    type="number"
                    step="10"
                    value={newBudget}
                    onChange={handleBudgetChange}
                    className="form-control w-auto"
                    min="0"
                    max="20000"
                />
            </div>
        </div>
    );
};

export default Budget;
