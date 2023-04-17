import React, { useContext, useState } from 'react'
import { budgetContext } from '../context/Reducer'
import Button from './Button'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

export default function Form() {
  const [userIncome,setUserIncome] = useState<number|null>(null)
  const [userGoals,setUserGoals] = useState<number|null>(null)
  const [user,setUser] = useState<string>('')  

  const navigate = useNavigate()
  
  
  const {dispatch} = useContext(budgetContext)

  const handleSubmit = (e:React.FormEvent<HTMLFormElement>) =>{
    e.preventDefault()
    !userIncome || !user || !userGoals ?
    toast.error("All three fields must be filled before you can proceed"):
    dispatch({ type: 'update_username', payload: user });
    dispatch({ type: 'update_goals', payload: userGoals });
    dispatch({ type: 'update_income', payload: userIncome });
    dispatch({ type: 'update_login_status', payload: true });
    navigate('/home')
    toast.success(`"login successful"`)

  }

  return (
    <div className='h-full w-full lg:w-1/2 pb-5 lg:pb-0 bg-[#1E1E1E]' >
        <h2 className='font-normal text-md lg:text-[3rem] leading-[81.66px] text-white-primary flex justify-center mt-2 lg:mt-[6rem]'>Monthly <span className='text-green-100'>budget</span></h2>
        <form action=""className='flex w-full flex-col' onSubmit={handleSubmit}>
          <div className='mx-auto w-[90%]'>
            <input type="number" value={userIncome?.toString() ?? ""} onChange={(e)=>setUserIncome(parseInt(e.target.value))} className='border-b-2 h-12 mb-11 bg-transparent focus:outline-none p-2 text-white-primary w-full  lg:w-[20.5rem]' name="" id="" placeholder="insert your income" />
          </div>

          <div className='mx-auto w-[90%]'>
            <input type="text" value={user} onChange={(e)=>setUser(e.target.value)} className='border-b-2 h-12 mb-11 bg-transparent focus:outline-none p-2 text-white-primary w-full lg:w-[20.5rem]' name="" id="" placeholder='insert your name' />
          </div>

          <div className='mx-auto w-[90%]'>
            <input type="number" value={userGoals?.toString() ?? ""} onChange={(e)=>setUserGoals(parseInt(e.target.value))} className='border-b-2 h-12 mb-11 bg-transparent focus:outline-none p-2 text-white-primary w-full lg:w-[20.5rem]' name="" id="" placeholder='insert your goals' />
          </div>

          <Button content='start your calculation'/>
        </form>
    </div>
  )
}
