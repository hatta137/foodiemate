import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import {useIsAuthenticated} from 'react-auth-kit';
import bcrypt from 'bcryptjs'

const EditUserProfile = () => {
    const isAuthenticated = useIsAuthenticated();
    const [userProfile, setUserProfile] = useState(null);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [userName, setUserName] = useState('');
    const [emailAddress, setEmailAddress] = useState('');
    const [password, setPassword] = useState('');
    const saltRounds = 10
    const navigate = useNavigate();


    const handleSave = async (e) => {
        e.preventDefault();
        const userData = {
            userName,
            firstName,
            lastName,
            emailAddress,
            password,
        }

        try {

            if (isAuthenticated()) {



                const response = await axios.put(`http://localhost:20063/users/update/`, userData, {
                    withCredentials: true
                });
                if (response.status === 200) {
                    navigate('/profile')
                }
            } else {
                console.log("nicht eingeloggt")
            }

        } catch (err) {
            console.log('Fehler beim Update des Benutzers', err);
        }
    };

    return (
        <div>
            <h2>Bearbeite dein Profil</h2>
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
