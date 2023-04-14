import React, { useContext, useState } from 'react'
import { budgetContext } from '../context/Reducer'
import Button from './Button'
import { AnimatePresence } from "framer-motion";
import Modal from '../widgets/Modal';

interface headerProps{
  showModal:boolean
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>
  
}
export default function Header({showModal,setShowModal}:headerProps) {
  const {state} = useContext(budgetContext)
  // const [showModal,setShowModal] = useState<boolean>(false)

  const openModal = () =>{
    setShowModal(true)
  }

  const closeModal = () =>{
    setShowModal(false)
  }

  return (
    <div className='w-full border-b flex flex-col lg:flex-row items-start justify-between lg:items-center p-2'>
      <div className=''>
        <p className='text-xs hidden lg:block lg:text-lg text-yellow-100 leading-[29px] -mb-5'>Expenses</p>
        <h2 className='text-sm lg:text-5xl text-white-primary leading-[82px] font-extrabold'>Monthly <span className='text-green-100'>budget</span></h2>
      </div>

      <div>
        <Button type="openModal" openModal={openModal} content='New  Expense'/>
        <span className='ml-9 text-white-primary'>Welcome <b>{state.username}</b></span>
      </div>

      <AnimatePresence
                initial={false}
                // exitBeforeEnter={true}
                mode="wait"
                onExitComplete={() => null}
              >
                {showModal && <Modal closeModal={closeModal} />}
              </AnimatePresence>
    </div>
  )
}
