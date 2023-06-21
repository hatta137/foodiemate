import React from 'react';

const ShowProfile = ({ user }) => {
    return (
        <div>
            <h2>Profil von {user.firstName}</h2>
            <p>Benutzername: {user.username}</p>
            <p>Email: {user.emailAddress}</p>
            {/* Weitere Informationen zum Benutzer anzeigen */}
        </div>
    );
};

export default ShowProfile;