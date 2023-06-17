import { useState } from 'react'

import './App.css'
import Login from "./components/Login.jsx";
import Register from "./components/Register.jsx";

function App() {
    const [currentForm, setCurrentForm] = useState('login')
    //const [isLoggedIn, setIsLoggedIn] = useState(false);

    const toggleForm = (formName) => {
        setCurrentForm(formName)
    }

  return (
      <div className="App">
          {
              currentForm === 'login' ? <Login onFormSwitch={toggleForm} /> : <Register onFormSwitch={toggleForm}/>
          }
      </div>

  )
}

export default App
