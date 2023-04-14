import Welcome from "./pages/Welcome"
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import { useContext, useState } from "react"
import { budgetContext } from "./context/Reducer"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Home from "./pages/Home";
function App() {
  const {state,dispatch} = useContext(budgetContext)
  
  const [showModal,setShowModal] = useState<boolean>(false)

  console.log(state.expenses)

  return (
    <div className="t40-container flex justify-center items-center">
      <Router>
      <ToastContainer />
        <Routes>
          <Route path='/' element={<Welcome/>}/>
          <Route path='/home' element={<Home showModal={showModal} setShowModal={setShowModal}/>}/>
        </Routes>
      </Router>
    </div>
  )
}

export default App
