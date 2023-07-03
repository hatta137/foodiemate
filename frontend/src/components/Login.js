import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"
import { useSignIn } from "react-auth-kit";



const Login = (props) => {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('');

    const signIn = useSignIn();

    const navigate = useNavigate();

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault()

        if (username.trim() === '' || password.trim() === '') {
            alert('Bitte Benutzernamen und Passwort eingeben');
            return;
        }

        try {

            const ipAddr = process.env.REACT_APP_IP_ADDR;
            console.log(process.env)
            const response = await axios.post(`http://${ipAddr}:20063/users/login`, {
                password: password,
                userName: username,
            });

            console.log(response.status)

            if (response.status === 200) {
                setError('')
                setUsername('')
                setPassword('')

                signIn({
                    token: response.data.token,
                    expiresIn: 3600,
                    tokenType: 'Bearer',
                    authState: {userId: response.data.userId}
                })

                navigate('/recipes')
            } else if (response.status === 401) {
                setError("Ungültige Anmeldeinformationen")
            }
        } catch (err) {
            console.log('Serverfehler:', err);
            setError('Fehler bei der Anmeldung');
        }
    }

    return (
        <div className={"auth-container-HL"}>
            <h2>Login</h2>
            <form className={"Login-Form-HL"} onSubmit={handleSubmit}>

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

                <button className={"Login-Button-HL"} type={"submit"}>Log In</button>
                {error && <div>{error}</div>}
            </form>
            <button type={"submit"} className={"Link-Button-HL"} onClick={() => props.onFormSwitch('register')}>Kein Account?</button>

        </div>

    )
}

export default Login