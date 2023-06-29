import React from 'react';
import { useLocation } from 'react-router-dom';
import button from "mdb-ui-kit/src/js/free/button";
import axios from "axios";

const ShowProfile = () => {
    const location = useLocation();
    const user = location.state.user;

    const handleFollow = async () => {
        const data = {
            followerId: user._id
        };
        console.log(data)
        try {
            const response = await axios.post('https://localhost/20063/users/follow', data, {
                withCredentials: true
            });
            console.log(response.data);
            console.log("Folge Benutzer:", user.userName);
        } catch (error) {
            console.error("Fehler beim Folgen des Benutzers:", error);
        }
    };

    console.log(user);
    return (
        <div>
            <h2>Profil von {user.userName}</h2>
            <button onClick={handleFollow}>Follow</button>
        </div>


    );
};

export default ShowProfile;
