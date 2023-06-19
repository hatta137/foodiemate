import React, { useState } from "react";

import Button from 'react-bootstrap/Button'
import "bootstrap/dist/css/bootstrap.css"

import './App.css';

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
          currentForm === 'login' ? <Login onFormSwitch={toggleForm} /> : <Register onFormSwitch={toggleForm}/>
        }
    </div>
  );
}

export default App;
