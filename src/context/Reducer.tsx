import { createContext, ReactNode, useReducer } from "react";
import { toast } from "react-toastify";

interface providerInterface {
  children: ReactNode;
}
interface expenseInterface {
  id: string;
  name: string;
  amount: number | null;
  category: string;
  createdAt: string;
}

interface initailStateInterface {
  username: string;
  goals: number | null;
  income: number | null;
  isLoggedIn: boolean;
  expenses: expenseInterface[];
}

type UpdateUsernameAction = { type: "update_username"; payload: string };
type UpdateGoalsAction = { type: "update_goals"; payload: number | null };
type UpdateLoginStatusAction = {
  type: "update_login_status";
  payload: boolean;
};
type UpdateIncomeAction = { type: "update_income"; payload: number | null };
type AddExpenseAction = { type: "add_expense"; payload: expenseInterface };
type DeleteExpenseAction = { type: "delete_expense"; payload: string };

const username = localStorage.getItem("username");
const goals = localStorage.getItem("goals");
const income = localStorage.getItem("income");
const userProfile = localStorage.getItem("userProfile");
const expenses = localStorage.getItem("expenses");

const initialState: initailStateInterface = {
  username: username ? JSON.parse(username) : "",
  goals: goals ? JSON.parse(goals) : 0,
  income: income ? JSON.parse(income) : null,
  isLoggedIn: userProfile ? true : false,
  expenses: expenses ? JSON.parse(expenses) : [],
};

type Action =
  | UpdateUsernameAction
  | UpdateGoalsAction
  | UpdateLoginStatusAction
  | UpdateIncomeAction
  | AddExpenseAction
  | DeleteExpenseAction;

const reducer = (
  state: initailStateInterface,
  action: Action
): initailStateInterface => {
  switch (action.type) {
    case "update_username":
      localStorage.setItem("username", JSON.stringify(action.payload));
      return { ...state, username: action.payload };
    case "update_goals":
      localStorage.setItem("goals", JSON.stringify(action.payload));
      return { ...state, goals: action.payload };
    case "update_login_status":
      localStorage.setItem("userProfile", JSON.stringify(action.payload));
      return { ...state, isLoggedIn: action.payload };
    case "update_income":
      localStorage.setItem("income", JSON.stringify(action.payload));
      return { ...state, income: action.payload };
    case "add_expense":
      const newExpenses = action.payload;
      // check if expenses already exist
      const existingExpense = state.expenses.find(
        (exp) => exp.name === newExpenses.name
      );
      let updatedExpenses: expenseInterface[];
      if (existingExpense) {
        updatedExpenses = state.expenses.map((exp) =>
          exp.name === newExpenses.name
            ? {
                ...exp,
                amount:
                  exp.amount &&
                  newExpenses.amount &&
                  exp.amount + newExpenses.amount, 
              }
            : exp
        );
        toast.success(`${newExpenses.name} price increased`)
      } else {
        updatedExpenses = [...state.expenses, newExpenses];
        toast.success(`new expense: ${newExpenses.name} added`)
      }
      localStorage.setItem("expenses", JSON.stringify(updatedExpenses));
      return { ...state, expenses: updatedExpenses};

    case "delete_expense":
      const newExpensesArr = state.expenses.filter(
        (exp) => exp.id !== action.payload
      );
      localStorage.setItem("expenses", JSON.stringify(newExpensesArr));
      toast.error(`expense removed successfully`)
      return {
        ...state,
        expenses: newExpensesArr,
      };
    default:
      return state;
  }
};

export const budgetContext = createContext<{
  state: initailStateInterface;
  dispatch: React.Dispatch<Action>;
}>({
  state: initialState,
  dispatch: () => null,
});

export const ReducerProvider = ({ children }: providerInterface) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <budgetContext.Provider value={{ state, dispatch }}>
      {children}
    </budgetContext.Provider>
  );
};
