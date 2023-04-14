import React from 'react'
interface buttonProps{
    content: string
    openModal?:any
    type?: string
    form?:any
}
export default function Button({content,openModal,type,form}:buttonProps) {
  const clickOptions = () =>{
    if(type = "openModal") {
      openModal()
    }else if(type = "submit"){
      console.log(form)
    }    
  }
  return (
    <button className='lg:w-[20.5rem] text-sm p-2 lg:text-lg mx-auto rounded-[4px] h-12 bg-yellow-100' onClick={clickOptions}>{content}</button>
  )
}
