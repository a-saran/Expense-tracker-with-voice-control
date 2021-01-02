import React, { useReducer, createContext, useContext } from "react";

import contextReducer from "./contextReducer";

const initialState = JSON.parse(localStorage.getItem("transactions")) || [
  {
    amount: 500,
    category: "Investments",
    type: "Income",
    date: "2021-01-02",
    id: "f3c4e147-b5ad-4b3a-94dd-959c7bf9baaa"
  },
  {
    amount: 400,
    category: "Clothes",
    type: "Expense",
    date: "2021-01-02",
    id: "358e864f-b841-4f3f-ad7e-d27f03f6cacd"
  }
];

const ExpenseTrackerContext = createContext(initialState);

export const ExpenseTrackerProvider = ({ children }) => {
  const [transactions, dispatch] = useReducer(contextReducer, initialState);

  // Actions Creators
  const deleteTransaction = id =>
    dispatch({ type: "DELETE_TRANSACTION", payload: id });

  const addTransaction = Transaction =>
    dispatch({ type: "ADD_TRANSACTION", payload: Transaction });

  return (
    <ExpenseTrackerContext.Provider
      value={{
        deleteTransaction,
        addTransaction,
        transactions
      }}
    >
      {children}
    </ExpenseTrackerContext.Provider>
  );
};

export const useExpenseTracker = () => {
  const context = useContext(ExpenseTrackerContext);
  if (!context) {
    throw new Error(
      "useExpenseTracker must be used within a ExpenseTrackerProvider"
    );
  }
  return context;
};
