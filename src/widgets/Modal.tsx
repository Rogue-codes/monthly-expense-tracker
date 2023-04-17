import React, { useContext, useState } from "react";
import Backdrop from "./Backdrop";
import { motion } from "framer-motion";
import { v4 as uuidv4 } from 'uuid';
import { budgetContext } from "../context/Reducer";
import {MdCancel} from "react-icons/md"
interface modalProps {
  closeModal: () => void;
}

interface formdata{
  id: string;
  name: string
  amount: number | null
  category: string
  createdAt: string
}
export default function Modal({ closeModal }: modalProps) {
  const dropIn = {
    hidden: {
      y: "-100vh",
      opacity: 0,
    },
    visible: {
      y: "0",
      opacity: 1,
      transition: {
        duration: 0.1,
        type: "spring",
        damping: 25,
        stiffness: 500,
      },
    },
    exit: {
      y: "100vh",
      opacity: 0,
    },
  };

  const date =  new Date(Date.now())

  const [formData,setFormData] = useState<formdata>({
    id:uuidv4(),
    name:"",
    amount: null,
    category: "",
    createdAt: date.toLocaleDateString(),
  })

  const {dispatch} = useContext(budgetContext)

  const handleClick =()=>{
    dispatch({type:"add_expense", payload:formData})
    console.log(formData)
    closeModal()
  }
  return (
    <Backdrop closeModal={closeModal}>
      <motion.div
        onClick={(e) => e.stopPropagation()}
        variants={dropIn}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="w-[25rem] relative h-[25rem] bg-[#fff] px-9 py-16 shadow-2xl rounded-md"
      >
        <div className="w-full ">
          <input
            type="text"
            className="w-full h-12 border border-[#000] bg-transparent rounded-lg focus:outline-none p-2"
            placeholder="expense title"
            value={formData.name}
            onChange={(e)=>setFormData({...formData,name:e.target.value})}
          />
          <input
            type="text"
            className="w-full h-12 mt-8 border border-[#000] bg-transparent rounded-lg focus:outline-none p-2"
            placeholder="expense amount"
            value={formData.amount?.toString() ?? ""}
            onChange={(e)=>setFormData({...formData,amount:parseInt(e.target.value)})}
          />
          <select
            name=""
            id=""
            className="w-full mx-auto h-12 mt-8 border border-[#000] bg-transparent rounded-lg focus:outline-none p-2"
            value={formData.category}
            onChange={(e)=>setFormData({...formData,category:e.target.value})}
          >
            <option value="">Select Category</option>
            <option value="miscellaneous">Miscellaneous</option>
            <option value="food">Food</option>
            <option value="rent">Rent</option>
            <option value="health">Health</option>
            <option value="hobbies">Hobbies</option>
          </select>
        </div>

        <div className="w-full mt-2 h-20 flex justify-center items-center">
          <button className='w-[12.5rem] text-md mx-auto rounded-[4px] h-12 bg-yellow-100 hover:scale-110 transition-transform' onClick={handleClick}>
            Submit
          </button>
        </div>

        <div className="absolute right-0 top-0">
          <MdCancel size={30} cursor="pointer" onClick={closeModal}/>
        </div>
      </motion.div>
    </Backdrop>
  );
}
