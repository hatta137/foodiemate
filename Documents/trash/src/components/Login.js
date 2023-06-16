import React, { useState } from "react";
import axios from "axios"

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (username.trim() === '' || password.trim() === '') {
            setError('Bitte Benutzernamen und Passwort eingeben');
            return;
        }

        try {



            const response = await axios.post('http://user_api:3000/users/login', {
                userName: username,
                password,
            });

            if (response.status === 200) {
                setError('')
                setUsername('')
                setPassword('')
            } else {
                setError('Ungültige Anmeldeinformationen');
            }
        } catch (err) {
            console.log('Fehler bei der Anmeldung:', err);
            setError('Fehler bei der Anmeldung');
        }


    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="username">Benutzername:</label>
                <input
                    type="text"
                    id="username"
                    value={username}
                    onChange={handleUsernameChange}
                />
            </div>
            <div>
                <label htmlFor="password">Passwort:</label>
                <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={handlePasswordChange}
                />
            </div>
            {error && <div>{error}</div>}
            <button type="submit">Anmelden</button>
        </form>
    );
};


export default Login