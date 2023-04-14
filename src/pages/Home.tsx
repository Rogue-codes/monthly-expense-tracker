import React, {useState, useContext} from "react";
import BarChart from "../components/BarChart";
import Body from "../components/Body";
import Calculation from "../components/Calculation";
import Header from "../components/Header";
import Optionals from "../components/Optionals";
import { budgetContext } from "../context/Reducer";
import { Userdata } from "../utils/data";
interface homeProps{
  showModal:boolean;
  setShowModal:React.Dispatch<React.SetStateAction<boolean>>
}
export default function Home({showModal,setShowModal}:homeProps) {
  const {state} = useContext(budgetContext)
  // const [expenseData,setExpenseData] = useState({
  //   labels: state.expenses.map((item)=>item.category),
  //   datasets: [
  //     {
  //       label: "Users Gained",
  //       data: state.expenses.map((data) => data.amount),
  //       // backgroundColor: [
  //       //   "rgba(75,192,192,1)",
  //       //   "#ecf0f1",
  //       //   "#50AF95",
  //       //   "#f3ba2f",
  //       //   "#2a71d0",
  //       // ],
  //       // borderColor: "black",
  //       // borderWidth: 2,
  //     },
  //   ],

  // })
  const userData = {
    labels: Userdata.map((item) => item.year),
    datasets: [
      {
        label: "Users Gained",
        data: Userdata.map((data) => data.userGain),
        backgroundColor: [
          "rgba(75,192,192,1)",
          "#ecf0f1",
          "#50AF95",
          "#f3ba2f",
          "#2a71d0",
        ],
        borderColor: "black",
        borderWidth: 2,
      },
    ],
    options: {
      scales: {
        x: {
          type: "time", // use a time scale for the x-axis
          time: {
            unit: "year", // display the label as years
          },
          ticks: {
            source: "labels",
          },
        },
      },
    },
  };
  return (
    <div className="w-full pb-5">
      <Header showModal={showModal} setShowModal={setShowModal} />
      <div className="w-full flex flex-col lg:flex-row justify-between">
        <div className="w-full lg:w-[33rem] flex flex-col justify-center p-2 overflow-hidden">
          <Body showModal={showModal} setShowModal={setShowModal}/>
        </div>
        <Calculation />
        <Optionals />
      </div>
    </div>
  );
}
