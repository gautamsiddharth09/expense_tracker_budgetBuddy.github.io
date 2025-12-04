import { createContext, useContext, useEffect, useReducer } from "react";

// global store container
//Anything inside this context can access shared values (expenses, details, etc.)
const ExpenseContext = createContext();
let expenses = [];

//localStorage stores data as a string, so you must convert it back to JSON.
//Wrapping in try–catch prevents the app from crashing if user has corrupt data

try {
  const stored = localStorage.getItem("expenses");
  if (stored) {
    expenses = JSON.parse(stored);
  }
} catch (err) {
  console.error("Invalid JSON in localStorage:", err);
}
//Initial state of the reducer
const initialState = {
  expenses,
  loading: false,
  error: null,
};
//Reducer function n All state logic in one place
const expenseReducer = (state, action) => {
  switch (action.type) {
    case "ADD_EXPENSE":
      return { ...state, expenses: [...state.expenses, action.payload] };
    case "DELETE_EXPENSE":
      return {
        ...state,
        expenses: state.expenses.filter(
          (expense) => expense.id !== action.payload.id
        ),
      };
    case "UPDATE_EXPENSE":
      return {
        ...state,
        expenses: state.expenses.map((expense) =>
          expense.id === action.payload.id ? action.payload : expense
        ),
      };
      //SET_EXPENSES / SET_LOADING / SET_ERROR These are useful for future expansion (API calls)
    case "SET_EXPENSES":
      return { ...state, expenses: action.payload };
    case "SET_LOADING":
      return { ...state, loading: action.payload };
    case "SET_ERROR":
      return { ...state, error: action.payload };
    default:
      return state;
  }
};


// Provider Component, Every context needs a provider and This component will wrap our entire app
//here in usereducer hook --dispatch is how you tell the reducer to update state. dispatch({ type: "ADD_EXPENSE", payload: data });
export const ExpenseProvider = ({ children }) => {
  const [state, dispatch] = useReducer(expenseReducer, initialState); 

  // in useEffect hook -- Save expenses to localStorage when they change, Runs every time state.expenses changes.
useEffect(() => {
    try {
      //its method of local storage -- localStorage.setItem("key", "value");
      localStorage.setItem("expenses", JSON.stringify(state.expenses));
    } catch (error) {
      console.error("Failed to save expenses to local storage: ", error);
      dispatch({ type: "SET_ERROR", payload: error });
    }
  }, [state.expenses]);


  const value = {
    ...state,
    addExpense: (expense) => {
      const newExpense = {
        ...expense,
        id: crypto.randomUUID(),
      };
      dispatch({ type: "ADD_EXPENSE", payload: newExpense });
    },
    deleteExpense: (id) => {
      dispatch({ type: "DELETE_EXPENSE", payload: { id } });
    },
    updateExpense: (expense) => {
      dispatch({ type: "UPDATE_EXPENSE", payload: expense });
    },
  };

  return (
    <ExpenseContext.Provider value={value}>{children}</ExpenseContext.Provider>
  );
};

export const useExpenses = () => {
  const context = useContext(ExpenseContext);
  if (context === undefined) {
    throw new Error("useExpenses must be used within an ExpenseProvider");
  }
  return context;
};