import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { welcome } from "../assets";
import Form from "../components/Form";
import { budgetContext } from "../context/Reducer";
import { motion } from "framer-motion";
export default function Welcome() {
  const navigate = useNavigate();
  const { state, dispatch } = useContext(budgetContext);
  const [welcomeModal, setWelcomeModal] = useState(false);

  console.log(state);

  const closeWelcomeModal = () => {
    setWelcomeModal(false);
  };

  useEffect(() => {
    state.isLoggedIn
      ? navigate("/home")
      : setTimeout(() => {
          setWelcomeModal(true);
        }, 3000);
  }, []);

  const dropIn = {
    hidden: {
      scale: 0.5,
      opacity: 0,
    },
    visible: {
      scale: 1,
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

  return (
    <div className="lg:w-[80%] h-screen flex flex-col lg:flex-row py-4">
      <div className="h-full lg:w-1/2 bg-[#C2B7BC]">
        <img src={welcome} className="w-full h-full object-cover" alt="" />
      </div>

      <Form />
      {welcomeModal && (
        <motion.div
          variants={dropIn}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="fixed flex justify-center items-center left-0 top-0 backdrop-blur-sm w-full h-full"
        >
          <div className="w-[90%] lg:w-[38rem] flex flex-col gap-5 justify-center items-center py-6 px-5 overflow-scroll lg:h-96 bg-[#fff] shadow-md">
            <p className="text-md leading-8 text-center">
              Welcome to our budget tracker app! Our app is designed to help you
              manage your finances and achieve your savings goals. Simply input
              your monthly salary and set your savings target as a percentage of
              your income, and our app will help you track your spending and
              keep you within your budget. Whether you're saving up for a
              vacation or just trying to be more mindful of your spending, our
              app makes it easy to take control of your finances. Start tracking
              your budget today and see how much you can save!🙂🙂
            </p>

            <button
              className="w-36 font-bold hover:bg-black-main hover:text-[#fff] transition-all rounded-md border-2 h-12 border-black-main"
              onClick={closeWelcomeModal}
            >
              Got it
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
}
