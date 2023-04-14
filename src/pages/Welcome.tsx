import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { welcome } from '../assets'
import Form from '../components/Form'
import { budgetContext } from '../context/Reducer'

export default function Welcome() {
  const navigate =useNavigate()
  const {state,dispatch} = useContext(budgetContext)

  console.log(state)

  useEffect(()=>{
    state.isLoggedIn &&
    navigate("/home")
  },[])

  return (
    <div className='lg:w-[80%] h-screen flex flex-col lg:flex-row py-4'>
      <div className='h-full lg:w-1/2 bg-[#C2B7BC]'>
        <img src={welcome} className="w-full h-full object-cover" alt="" />
      </div>

      <Form/>
    </div>
  )
}
