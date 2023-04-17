import React, {useState, useContext} from "react";
import Body from "../components/Body";
import Calculation from "../components/Calculation";
import Header from "../components/Header";
import Optionals from "../components/Optionals";
import { budgetContext } from "../context/Reducer";
interface homeProps{
  showModal:boolean;
  setShowModal:React.Dispatch<React.SetStateAction<boolean>>
}
export default function Home({showModal,setShowModal}:homeProps) {
  const {state} = useContext(budgetContext)

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
