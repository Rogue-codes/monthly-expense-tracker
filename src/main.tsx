import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import {ReducerProvider} from './context/Reducer'
import './index.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ReducerProvider>
      <App />
    </ReducerProvider>
  </React.StrictMode>,
)
