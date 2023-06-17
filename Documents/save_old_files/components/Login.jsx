import React, { useState } from "react";
import axios from "axios"


const Login = (props, {setIsLoggedIn}) => {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('');

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault()

        if (username.trim() === '' || password.trim() === '') {
            setError('Bitte Benutzernamen und Passwort eingeben');
            return;
        }



        try {
            const response = await axios.post('http://localhost:3000/users/login', {
                password: password,
                userName: username,



            });
            console.log(response.status)

            if (response.status === 200) {
                setError('')
                setUsername('')
                setPassword('')
            } else if (response.status === 401) {
                setError("Ungültige Anmeldeinformationen")
            }
        } catch (err) {
            console.log('Serverfehler:', err);
            setError('Fehler bei der Anmeldung');
        }


        setIsLoggedIn(true);
    }

    return (
        <div className={"auth-container"}>
            <h2>Login</h2>
            <form className={"Login-Form"} onSubmit={handleSubmit}>

                <label htmlFor="username">username</label>
                <input value={username}
                       onChange={handleUsernameChange}
                       type="text"
                       placeholder={"username"}
                       id={"username"}
                       name={"username"}/>

                <label htmlFor="password">password</label>
                <input value={password}
                       onChange={handlePasswordChange}
                       type="password"
                       placeholder={"******"}
                       id={"password"}
                       name={"password"}/>

                <button type={"submit"}>Log In</button>
                {error && <div>{error}</div>}
            </form>
            <button type={"submit"} className={"Link-Button"} onClick={() => props.onFormSwitch('register')}>Kein Account?</button>

        </div>

    )
}

export default Login