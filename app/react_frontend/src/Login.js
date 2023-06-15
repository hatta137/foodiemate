import React, { useState } from "react";



export const Login = (props) => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')


    const handleSubmit = (event) => {
        event.preventDefault()
        console.log(email)
    }

    return (
        <div className={"auth-container"}>
            <h2>Login</h2>
            <form className={"Login-Form"} onSubmit={handleSubmit}>

                <label htmlFor="email">email</label>
                <input value={email} onChange={(event) => setEmail(event.target.value)} type="email" placeholder={"youremail@gmail.com"} id={"email"} name={"email"}/>

                <label htmlFor="password">password</label>
                <input value={password} onChange={(event) => setPassword(event.target.value)} type="password" placeholder={"******"} id={"password"} name={"password"}/>

                <button type={"submit"}>Log In</button>

            </form>
            <button className={"Link-Button"} onClick={() => props.onFormSwitch('register')}>Kein Account?</button>

        </div>

    )
}