import React, { useState } from "react";
import {
    BrowserRouter,
    Link,
    Route,
    Routes,
} from "react-router-dom";


import './App.css';
import Login from "./Login";
import Register from "./Register";
import Home from './Home';
import PrivateRoute from './PrivateRoute';
function App() {
    const [currentForm, setCurrentForm] = useState('login')
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const toggleForm = (formName) => {
        setCurrentForm(formName)
    }

    return (
        /*<Router>
                <Route path={"/login"}>
                    <Login setIsLoggedIn={setIsLoggedIn}/>
                </Route>
                <PrivateRoute
                    path="/"
                    component={Home}
                    isLoggedIn={isLoggedIn}
                    exact
                />

        </Router>*/
        <div className="App">
            {
                currentForm === 'login' ? <Login onFormSwitch={toggleForm} /> : <Register onFormSwitch={toggleForm}/>
            }
        </div>
    );
}

export default App;
