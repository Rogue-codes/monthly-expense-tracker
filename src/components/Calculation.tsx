import React, { useContext, useEffect, useState } from "react";
import { budgetContext } from "../context/Reducer";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

export default function Calculation() {
  const { state } = useContext(budgetContext);
  // Function to calculate total expense amount
  const [totalExpense, setTotalExpense] = useState<number>(0);
  const [availableAmount, setAvailableAmount] = useState<number>(0);

  const handleCurrAmount = () => {
    state.income && setAvailableAmount(state.income - totalExpense);
  };

  useEffect(() => {
    const expenseTotal = state.expenses.reduce(
      (acc, cur) => acc + (cur.amount || 0),
      0
    );
    setTotalExpense(expenseTotal);
    handleCurrAmount();
  }, [state.expenses, totalExpense]);

  const resetAmount = () => {
    state.expenses = [];
    localStorage.removeItem("expenses");
    window.location.reload();
  };

  const percentage =
    state.goals && state.income && (state.goals / 100) * state.income;

    const value: number = state.income && totalExpense
      ? (totalExpense / state.income) * 100
      : 0;
    
      const roundedValue = Number(value.toFixed(2));

  return (
    <div className="w-full lg:w-[18rem] pt-2 pb-8 mt-8 bg-[#FBFBFB]">
      <div className="p-4 border-b-2 flex justify-center items-center">
        <h2 className="text-xl font-normal left-10">Calculation</h2>
      </div>
      <div className="w-[14rem] h-[5.4rem] rounded mx-auto mt-[1.6rem] pt-4 bg-yellow-200">
        <p className="text-sm text-black font-bold text-center">Income</p>
        <h2 className="text-xl font-normal text-center leading-10">
          <b>
          ₦
            {state.income &&
              state.income.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
          </b>
        </h2>
      </div>
      <div className="w-[12rem] mx-auto">
        <CircularProgressbar
          value={roundedValue}
          text={`${state.income && (totalExpense / state.income) * 100}%`}
          styles={
            state.income && (totalExpense / state.income) * 100 <= 50
              ? { path: { stroke: "green" }, trail: { stroke: "#d6d6d6" } }
              : state.income && (totalExpense / state.income) * 100 <= 70
              ? { path: { stroke: "orange" }, trail: { stroke: "#d6d6d6" } }
              : { path: { stroke: "red" }, trail: { stroke: "#d6d6d6" } }
          }
        />
        <p className="text-lg font-bold leading-7 flex justify-center items-center">
          Spent
        </p>
      </div>
      <div className="w-[18.25rem] flex justify-center gap-3 items-center h-[4.3rem]  mx-auto mt-8">
        <div className="w-[6.5rem] cursor-pointer h-full rounded flex flex-col justify-center items-center bg-[#1E1E1E]">
          <p className="text-xs text-white-primary leading-4">Available</p>
          <p
            className={`${
              percentage && percentage > availableAmount
                ? "text-red-800"
                : "text-green-100"
            } text-md font-normal leading-7`}
          >
            ₦{availableAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
          </p>
        </div>

        <div className="w-[6.5rem] cursor-pointer h-full rounded flex flex-col justify-center items-center bg-[#1E1E1E]">
          <p className="text-xs text-white-primary leading-4">Spent</p>
          <p className="text-md font-normal text-yellow-100 leading-7">
          ₦{totalExpense.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
          </p>
        </div>
      </div>{" "}
      <br />
      <hr />
      {percentage && percentage > availableAmount && (
        <p className="text-xs px-5 py-2 font-bold text-center text-red-900">
          You didn't keep to your financial goal for this month😭
        </p>
      )}
      <br />
      <button
        className="w-[14.25rem] flex justify-center items-center text-lg font-medium !mx-auto h-[3.3rem] bg-yellow-100 rounded"
        onClick={resetAmount}
      >
        Reset Expenses
      </button>
    </div>
  );
}
