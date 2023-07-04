import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import ListFollowers from "./ListFollowers";

import {
    MDBCard,
    MDBCardImage,
    MDBCardBody,
    MDBCardTitle,
    MDBCardText,
    MDBCardLink,
    MDBListGroup,
    MDBListGroupItem
} from 'mdb-react-ui-kit';

const ipAddr = process.env.REACT_APP_IP_ADDR
const UserProfile = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [follower, setFollower] = useState([])
    const [date, setDate] = useState('')

    useEffect(() => {
        // Fetch user data from backend
        const fetchUser = async () => {
            try {
                const response = await axios.get(`http://${ipAddr}:20063/users/getUser/`, {
                    withCredentials: true
                });
                setUser(response.data.user);
                console.log(response.data.user)

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
            const response = await axios.delete(`http://${ipAddr}:20063/users/deleteUser/`, {
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

    /*const handleEditProfile = () => {
        navigate('/editUserProfile', { state: { actualUser: user } });
    };*/

    const handleCTG = async (e) => {
        e.preventDefault();
        try {

            const response = await axios.put(`http://${ipAddr}:20063/users/setCookingTogetherDate/`, {
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

            const response = await axios.delete(`http://${ipAddr}:20063/users/removeCookingTogetherDate`, {
                withCredentials: true
            })

        } catch (error) {

        }
    }

    if (!user) {
        return <div>Loading...</div>;
    }

    return (
        <div className={"User-Profile-Card-HL"}>
            <MDBCard>
                <MDBCardImage position='top' alt='...' src='https://mdbootstrap.com/img/new/standard/city/062.webp' />
                <MDBCardBody>
                    <MDBCardTitle>Hallo</MDBCardTitle>
                    <MDBCardText>{user.firstName}</MDBCardText>
                </MDBCardBody>
                <MDBListGroup >
                    <MDBListGroupItem>Vorname: {user.firstName}</MDBListGroupItem>
                    <MDBListGroupItem>Nachname: {user.lastName}</MDBListGroupItem>
                    <MDBListGroupItem>Benutzername: {user.userName}</MDBListGroupItem>
                    <MDBListGroupItem>E-Mailadresse: {user.emailAddress}</MDBListGroupItem>
                    <MDBListGroupItem>Cooking Together Date: {user.cookingTogetherDate} <button onClick={handleCTGdelete}>löschen</button></MDBListGroupItem>
                    <MDBListGroupItem>CTD setzen:
                        <input  value={date} onChange={(e) => setDate(e.target.value)} type={'date'}/>
                        <button onClick={handleCTG}>speichern</button>
                    </MDBListGroupItem>
                </MDBListGroup>
                <MDBListGroup>
                    <MDBListGroupItem>Deine Follower</MDBListGroupItem>
                    <ul>
                            {user.followers.map((follower) => (
                                <li key={follower._id}>
                                    <p>{follower.userName}</p>
                                </li>
                            ))}
                    </ul>
                </MDBListGroup>
                <MDBCardBody>
                    <MDBCardLink href='/editUserProfile' >Profil bearbeiten</MDBCardLink>
                    <MDBCardLink href='#' onClick={handleDeleteProfile}>Profil löschen</MDBCardLink>
                </MDBCardBody>
            </MDBCard>
        </div>
    );
};

export default UserProfile;