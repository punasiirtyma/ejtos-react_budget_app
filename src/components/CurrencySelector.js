import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';

const CurrencySelector = () => {
    const { currency, dispatch } = useContext(AppContext);

    const handleCurrencyChange = (event) => {
        dispatch({ type: 'CHG_CURRENCY', payload: event.target.value });
    };

    return (
        <div className="alert alert-secondary">
            <label htmlFor="currency" className="mr-2">Currency:</label>
            <select id="currency" value={currency} onChange={handleCurrencyChange} className="form-control w-auto d-inline">
                <option value="£">£ Pound</option>
                <option value="$">$ Dollar</option>
                <option value="€">€ Euro</option>
                <option value="₹">₹ Rupee</option>
            </select>
        </div>
    );
};

export default CurrencySelector;
