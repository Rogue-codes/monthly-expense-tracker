import React, { useContext,useState,useEffect } from "react";
import { amazon, netflix, spotify } from "../assets";
import { budgetContext } from "../context/Reducer";
import { v4 as uuidv4 } from 'uuid';
import {RiErrorWarningLine} from "react-icons/ri"

interface expense{
  id: string
  name: string
  amount: number
  category: string
  createdAt: string
}
interface optionsInterface {
  img: string;
  name: string;
  expenses:expense
}
export default function Optionals() {
  const createdAt = new Date(Date.now());
  const data: optionsInterface[] = [
    {
      img: netflix,
      name: "Netflix",
      expenses:{
          id: uuidv4(),
          name: "Netflix Subscription",
          amount: 3000,
          category: "Hobies",
          createdAt: createdAt.toLocaleDateString()
      }
    },
    {
      img: spotify,
      name: "Spotify",
      expenses:{
        id: uuidv4(),
        name: "Spotify Subscription",
        amount: 3000,
        category: "Hobies",
        createdAt: createdAt.toLocaleDateString()
    }
    },
    {
      img: amazon,
      name: "Amazon",
      expenses:{
        id: uuidv4(),
        name: "Amazon Subscription",
        amount: 3000,
        category: "Hobies",
        createdAt: createdAt.toLocaleDateString()
    }
    },
  ];

  const {state,dispatch} = useContext(budgetContext)

  const handleClick =(e:expense)=>{
    dispatch({type:"add_expense", payload:e})
  }

  const [totalExpense, setTotalExpense] = useState<number>(0);
  const [availableAmount, setAvailableAmount] = useState<number>(0);

  const handleCurrAmount = () =>{
    state.income &&
    setAvailableAmount(state.income - totalExpense)
  }

  useEffect(() => {
    const expenseTotal = state.expenses.reduce(
      (acc, cur) => acc + (cur.amount || 0),
      0
    );
    setTotalExpense(expenseTotal)
    handleCurrAmount()
  }, [state.expenses,totalExpense]);

  const percentage = (state.goals && state.income && (state.goals/100)*state.income)  

  console.log(percentage)
  return (
    <div className="w-full overflow-hidden lg:w-[18rem] pt-3 pb-8 mt-8 bg-[#FBFBFB]">
      <div className="p-4 border-b-2 flex justify-center items-center">
        <h2 className="text-2xl font-normal left-10">Optionals</h2>
      </div>

      <div className="w-[14rem] rounded mx-auto mt-[1.6rem] pt-4 pb-8 px-5 bg-yellow-200">
        {data.map((item, index) => (
          <div className="mt-6 flex justify-between items-center" key={index}>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 border-2 flex justify-center items-center border-green-100 rounded-full">
                <img src={item.img} alt="" />
              </div>
              <span className="leading-[17px] text-xs">{item.name}</span>
            </div>

            <button className="w-[4.5rem] h-[1.6rem] bg-green-100 rounded-[22px] text-xs " onClick={()=>handleClick(item.expenses)}>
              Select
            </button>
          </div>
        ))}
      </div>

      <div className="w-full border-dashed border-t-2 border-black mt-28"></div>

      <h2 className="text-2xl leading-10 font-normal text-center mt-8">Goals</h2>

      <div className={`${percentage && percentage > availableAmount ? "border-red-500" :"border-green-100"} flex items-center gap-2 w-[18rem] border-l-4 p-5 mt-3`}>
        <p className="text-sm font-bold leading-[17px]">"Save <b>{state.goals}%</b> of this amount entered this month from my salary"</p>
        <span>{percentage && percentage > availableAmount&&<RiErrorWarningLine color="red"/>}</span>
      </div>
    </div>
  );
}
