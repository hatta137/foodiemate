import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import ListFollowers from "./ListFollowers";

const UserProfile = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [follower, setFollower] = useState([])
    const [date, setDate] = useState('')

    useEffect(() => {
        // Fetch user data from backend
        const fetchUser = async () => {
            try {
                const response = await axios.get(`http://localhost:20063/users/getUser/`, {
                    withCredentials: true
                });
                setUser(response.data.user);


            } catch (error) {
                console.error(error);
            }
        };

        fetchUser();
    }, []);

    const handleUnfollow = (followerId) => {
        // Handle unfollow logic here
        console.log(`Unfollow user with ID: ${followerId}`);
    };

    const handleDeleteProfile = async () => {
        try {
            const response = await axios.delete(`http://localhost:20063/users/deleteUser/`, {
                withCredentials: true
            })

            if (response.status === 200) {
                console.log('Benutzer gelöscht')
                navigate('/login')
            }

        } catch (error) {
            console.error(error);
        }
    };

    const handleEditProfile = () => {
        // Handle profile editing logic here
        navigate('/editUserProfile')
    };

    const handleCTG = async (e) => {
        e.preventDefault();
        try {

            const response = await axios.put(`http://localhost:20063/users/setCookingTogetherDate/`, {
                cookingTogetherDate: date
            }, {
                withCredentials: true
            })

            if (response.status === 200) {
                console.log('CTG hinzugefügt')
            }

        } catch (error) {
            console.error(error);
        }
    }

    const handleCTGdelete = async (e) => {
        e.preventDefault();
        try {

            const response = await axios.delete('http://localhost:20063/users/removeCookingTogetherDate', {
                withCredentials: true
            })

        } catch (error) {

        }
    }

    if (!user) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h2>User Profile</h2>
            <p>First Name: {user.firstName}</p>
            <p>Last Name: {user.lastName}</p>
            <p>Username: {user.userName}</p>
            <p>Email Address: {user.emailAddress}</p>
            <p>CTG Date: {user.cookingTogetherDate}</p>
            <p>Cooking Together Date setzen:</p>
            <input  value={date} onChange={(e) => setDate(e.target.value)} type={'date'}/>
            <button onClick={handleCTG}>CTG setzen</button>
            <button onClick={handleCTGdelete}>CTG entfernen</button>
            <h2>Followers</h2>
            <ul>
                {user.followers.map((follower) => (
                    <li key={follower._id}>
                        {/*<p>{ListFollowers(follower._id)}</p>*/}
                    </li>
                ))}
            </ul>
            <button onClick={handleDeleteProfile}>Delete Profile</button>
            <button onClick={handleEditProfile}>Edit Profile</button>
        </div>
    );
};

export default UserProfile;