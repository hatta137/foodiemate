import React, { useState } from "react";



const Register = (props) => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [userName, setUserName] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [dateOfBirth, setDateOfBirth] = useState('')

    const handleSubmit = (event) => {
        event.preventDefault()
        console.log(email)
    }

    return (
        <div className={"auth-container"}>
            <h2>Register</h2>
            <form className={"Register-Form"} onSubmit={handleSubmit}>

                <label htmlFor="lastName">Vorname</label>
                <input value={firstName} onChange={(event) => setFirstName(event.target.value)} type="text" placeholder={"Vorname"} id={"firstName"} name={"firstName"}/>

                <label htmlFor="lastName">Nachname</label>
                <input value={lastName} onChange={(event) => setLastName(event.target.value)} type="text" placeholder={"Nachname"} id={"lastName"} name={"lastName"}/>

                <label htmlFor="dateOfBirth">Geburtstag</label>
                <input value={dateOfBirth} onChange={(event) => setDateOfBirth(event.target.value)} type="date" placeholder={"Geburtstag"} id={"dateOfBirth"} name={"dateOfBirth"}/>

                <label htmlFor="userName">Benutzername</label>
                <input value={userName} onChange={(event) => setUserName(event.target.value)} type="text" placeholder={"Benutzername"} id={"userName"} name={"userName"}/>

                <label htmlFor="email">email</label>
                <input value={email} onChange={(event) => setEmail(event.target.value)} type="email" placeholder={"youremail@gmail.com"} id={"email"} name={"email"}/>

                <label htmlFor="password">password</label>
                <input value={password} onChange={(event) => setPassword(event.target.value)} type="password" placeholder={"******"} id={"password"} name={"password"}/>

                <button type={"submit"}>Log In</button>

            </form>
            <button className={"Link-Button"} onClick={() => props.onFormSwitch('login')}>Schon einen Account?</button>

        </div>
    )
}

export default Register