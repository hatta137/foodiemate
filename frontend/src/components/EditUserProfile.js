import React, {useContext, useState} from 'react';

const EditUserProfile = ({ userProfile, onSave }) => {


    const [firstName, setFirstName] = useState(userProfile.firstName);
    const [lastName, setLastName] = useState(userProfile.lastName);
    const [userName, setUserName] = useState(userProfile.userName);
    const [emailAddress, setEmailAddress] = useState(userProfile.emailAddress);
    const [password, setPassword] = useState(userProfile.password);

    const handleSave = () => {
        const updatedUserProfile = {
            ...userProfile,
            firstName,
            lastName,
            userName,
            emailAddress,
            password,
        };
        onSave(updatedUserProfile);
    };

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

