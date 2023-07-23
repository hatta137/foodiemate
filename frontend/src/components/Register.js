import React, { useState } from "react";
import axios from "axios";
import {useSignIn} from "react-auth-kit";
import {useNavigate} from "react-router-dom";


const Register = (props) => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [userName, setUserName] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')

    const signIn = useSignIn();

    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault()

        try {
            const ipAddr = process.env.REACT_APP_IP_ADDR;
            const response = await axios.post(`http://${ipAddr}:20063/users/register`, {
                firstName: firstName,
                lastName: lastName,
                emailAddress: email,
                password: password,
                userName: userName
            });
            console.log(response.status);

            if (response.status === 200) {
                setUserName('')
                setPassword('')

                signIn({
                    token: response.data.token,
                    expiresIn: 3600,
                    tokenType: 'Bearer',
                    authState: {userId: response.data.userId}
                })

                navigate('/recipes')
            } else if (response.status === 401) {
                alert("Fehler bei der Anmeldung")
            }
        } catch (err) {
            console.log('Serverfehler:', err);
            alert('ServerFehler bei der Anmeldung');
        }
    };

    return (
        <div className={"auth-container-HL"}>
            <h2>Register</h2>
            <form className={"Register-Form-HL"} onSubmit={handleSubmit}>

                <label htmlFor="lastName">Vorname</label>
                <input value={firstName} onChange={(event) => setFirstName(event.target.value)} type="text" placeholder={"Vorname"} id={"firstName"} name={"firstName"}/>

                <label htmlFor="lastName">Nachname</label>
                <input value={lastName} onChange={(event) => setLastName(event.target.value)} type="text" placeholder={"Nachname"} id={"lastName"} name={"lastName"}/>

                <label htmlFor="userName">Benutzername</label>
                <input value={userName} onChange={(event) => setUserName(event.target.value)} type="text" placeholder={"Benutzername"} id={"userName"} name={"userName"}/>

                <label htmlFor="email">email</label>
                <input value={email} onChange={(event) => setEmail(event.target.value)} type="email" placeholder={"youremail@gmail.com"} id={"email"} name={"email"}/>

                <label htmlFor="password">password</label>
                <input value={password} onChange={(event) => setPassword(event.target.value)} type="password" placeholder={"******"} id={"password"} name={"password"}/>

                <button className={"Login-Button-HL"} type={"submit"}>Log In</button>

            </form>
            <button className={"Link-Button-HL"} onClick={() => props.onFormSwitch('login')}>Schon einen Account?</button>

        </div>
    )
}

export default Register