import React, { useReducer, createContext, useContext } from "react";

import contextReducer from "./contextReducer";

const initialState = [];

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
        addTransaction
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
