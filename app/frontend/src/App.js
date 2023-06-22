import React, { useState } from "react";




import './styles/App.css';

import Login from "./components/Login";
import Register from "./components/Register";

const App = () => {
  const [currentForm, setCurrentForm] = useState('login')
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const toggleForm = (formName) => {
    setCurrentForm(formName)
  }



  return (
    <div className="App">
        {
            currentForm === 'login' ? <Login onFormSwitch={toggleForm} setIsLoggedIn={setIsLoggedIn} /> : <Register onFormSwitch={toggleForm}/>
        }
    </div>
  );
}

export default App;
