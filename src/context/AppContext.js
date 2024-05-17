import React, { createContext, useReducer } from 'react';

// The reducer - this is used to update the state, based on the action
export const AppReducer = (state, action) => {
    switch (action.type) {
        case 'ADD_EXPENSE':
            const addExpense = state.expenses.map((expense) =>
                expense.name === action.payload.name
                    ? { ...expense, cost: expense.cost + action.payload.cost }
                    : expense
            );
            return { ...state, expenses: addExpense };

        case 'RED_EXPENSE':
            const redExpense = state.expenses.map((expense) =>
                expense.name === action.payload.name && expense.cost - action.payload.cost >= 0
                    ? { ...expense, cost: expense.cost - action.payload.cost }
                    : expense
            );
            return { ...state, expenses: redExpense };

        case 'DELETE_EXPENSE':
            const filteredExpenses = state.expenses.filter((expense) => expense.id !== action.payload);
            return { ...state, expenses: filteredExpenses };

        case 'SET_BUDGET':
            return { ...state, budget: action.payload };

        case 'CHG_CURRENCY':
            return { ...state, currency: action.payload };

        default:
            return state;
    }
};

// Sets the initial state when the app loads
const initialState = {
    budget: 2000,
    expenses: [
        { id: "Marketing", name: 'Marketing', cost: 50 },
        { id: "Finance", name: 'Finance', cost: 300 },
        { id: "Sales", name: 'Sales', cost: 70 },
        { id: "Human Resource", name: 'Human Resource', cost: 40 },
        { id: "IT", name: 'IT', cost: 500 },
    ],
    currency: '£'
};

// Creates the context this is the thing our components import and use to get the state
export const AppContext = createContext();

// Provider component - wraps the components we want to give access to the state
// Accepts the children, which are the nested(wrapped) components
export const AppProvider = (props) => {
    const [state, dispatch] = useReducer(AppReducer, initialState);
    const totalExpenses = state.expenses.reduce((total, item) => total + item.cost, 0);
    const remaining = state.budget - totalExpenses;

    return (
        <AppContext.Provider
            value={{
                budget: state.budget,
                expenses: state.expenses,
                remaining,
                currency: state.currency,
                dispatch,
            }}
        >
            {props.children}
        </AppContext.Provider>
    );
};
