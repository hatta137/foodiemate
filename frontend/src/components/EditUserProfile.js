import React, { useEffect, useState } from 'react';
import axios from 'axios';

const EditUserProfile = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false); // Zustand für den Benutzerstatus
    const [userProfile, setUserProfile] = useState(null);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [userName, setUserName] = useState('');
    const [emailAddress, setEmailAddress] = useState('');
    const [password, setPassword] = useState('');
    const [userId, setUserId] = useState('');

    useEffect(() => {


        const checkLoggedInStatus = async () => {
            try {
                const response = await fetch('http://localhost:20063/users/userStatus', { credentials: 'include' });
                if (response.ok) {
                    const data = await response.json();
                    console.log(data);
                    setUserProfile(data);
                    setIsLoggedIn(true);
                    setUserName(data.userName);
                    setEmailAddress(data.emailAddress);
                    setFirstName(data.firstName);
                    setLastName(data.lastName);
                    setPassword(data.password);
                    setUserId(data.userId);
                } else {
                    setIsLoggedIn(false);
                }
            } catch (err) {
                console.log('Fehler beim Überprüfen des Benutzerstatus', err);
                setIsLoggedIn(false);
            }
        };

        checkLoggedInStatus();

        return () => {
            // Cleanup-Funktion für die useEffect-Hook
        };


        // const checkLoggedInStatus = async () => {
        //     try {
        //         const instance = axios.create({ withCredentials: true });
        //         axios.defaults.withCredentials = true
        //         const response = await axios.get('http://localhost:20063/users/userStatus', { withCredentials: true });
        //         console.log(response.data)
        //         if (response.status === 200) {
        //             setUserProfile(response.data);
        //             setIsLoggedIn(true);
        //             setUserName(response.data.userName);
        //             setEmailAddress(response.data.emailAddress);
        //             setFirstName(response.data.firstName);
        //             setLastName(response.data.lastName);
        //             setPassword(response.data.password);
        //             setUserId(response.data.userId);
        //         }
        //     } catch (err) {
        //         console.log('Fehler beim Überprüfen des Benutzerstatus', err);
        //         setIsLoggedIn(false);
        //     }
        // };
        //
        // checkLoggedInStatus();
        //
        // return () => {
        //     // Cleanup-Funktion für die useEffect-Hook
        // };
    }, []);

    const handleSave = async () => {
        try {
            const response = await axios.put(`http://localhost:20063/users/update/${userId}`, {
                userName,
                firstName,
                lastName,
                emailAddress,
                password,
            });
            if (response.status === 200) {
                // Erfolgreich aktualisiert
            }
        } catch (err) {
            console.log('Fehler beim Update des Benutzers', err);
        }
    };

    if (!isLoggedIn) {
        return <p>Bitte logge dich ein, um dein Profil zu bearbeiten.</p>;
    }

    return (
        <div>
            <h2>Bearbeite dein Profil</h2>
            <p>Benutzername: {userName}</p>
            <form>
                <div>
                    <label>Vorname:</label>
                    <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                </div>
                <div>
                    <label>Nachname:</label>
                    <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                </div>
                <div>
                    <label>Benutzername:</label>
                    <input type="text" value={userName} onChange={(e) => setUserName(e.target.value)} />
                </div>
                <div>
                    <label>E-Mail-Adresse:</label>
                    <input type="email" value={emailAddress} onChange={(e) => setEmailAddress(e.target.value)} />
                </div>
                <div>
                    <label>Passwort:</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <button type="button" onClick={handleSave}>Speichern</button>
            </form>
        </div>
    );
};

export default EditUserProfile;
