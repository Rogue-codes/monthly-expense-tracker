import React, { ReactNode } from 'react'
import { motion } from "framer-motion";

interface modalProps{
    children: ReactNode,
    closeModal?: any
}

export default function Backdrop({children,closeModal}:modalProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={closeModal}
      className="w-full h-screen fixed top-0 left-0 z-30 flex justify-center items-center backdrop-blur-sm"
    >
        {children}
    </motion.div>
  )
}
