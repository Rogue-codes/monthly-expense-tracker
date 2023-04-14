import React from 'react'


interface filterProps{
  filterVal:string
  setFilterVal: React.Dispatch<React.SetStateAction<string>>
}
export default function Filter({filterVal,setFilterVal}:filterProps) {
  return (
    <div className='w-full mt-8 p-2 flex justify-between items-center'>
        <p className='text-lg hidden lg:block text-yellow-100 font-normal leading-7'>Description</p>
        <div className='!w-56 rounded-lg py-5 px-2 h-[1.8rem] flex justify-between items-center border border-yellow-100'>
            <p className='text-white-primary font-bold text-md leading-5'>Filter  expenses</p>
            <select value={filterVal} onChange={(e)=>setFilterVal(e.target.value)} className='w-16 pl-3 border-l-2 border-white-primary bg-[#000] text-yellow-100 focus:outline-none' name="" id="">
                <option value="" selected>All</option>
                <option value="Debts">Debts</option>
                <option value="Food">Food</option>
                <option value="Hobies">Hobies</option>
                <option value="Rent">Rent</option>
                <option value="Savings">Savings</option>
                <option value="Health">Health</option>
            </select>
        </div>
    </div>
  )
}
