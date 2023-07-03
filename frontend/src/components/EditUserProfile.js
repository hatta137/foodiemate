import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import {useIsAuthenticated} from 'react-auth-kit';
import bcrypt from 'bcryptjs'
import {
    MDBCard,
    MDBCardBody,
    MDBCardImage, MDBCardLink,
    MDBCardText,
    MDBCardTitle,
    MDBListGroup,
    MDBListGroupItem
} from "mdb-react-ui-kit";

const EditUserProfile = () => {
    const isAuthenticated = useIsAuthenticated();
    const [userProfile, setUserProfile] = useState(null);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [userName, setUserName] = useState('');
    const [emailAddress, setEmailAddress] = useState('');
    const [passwordUnhash, setPasswordUnhash] = useState('');
    const saltRounds = 10
    const navigate = useNavigate();
    const [actualUser, setActualUser] = useState(null)

    const ipAddr = process.env.REACT_APP_IP_ADDR;

    useEffect(() => {
        // Fetch user data from backend
        const fetchUser = async () => {
            try {
                const response = await axios.get(`http://ipAddr:20063/users/getUser/`, {
                    withCredentials: true
                });
                setActualUser(response.data.user);
                console.log(response.data.user)

            } catch (error) {
                console.error(error);
            }
        };

        fetchUser();
    }, []);

    const handleSave = async (e) => {
        e.preventDefault();
        const userData = {}

        if (userName !== '') {
            userData.userName = userName;
        }
        if (firstName !== '') {
            userData.firstName = firstName;
        }
        if (lastName !== '') {
            userData.lastName = lastName;
        }
        if (emailAddress !== '') {
            userData.emailAddress = emailAddress;
        }
        if (passwordUnhash !== '') {
            userData.passwordUnhash = passwordUnhash;
        }

        try {
            if (isAuthenticated()) {
                const response = await axios.put(`http://${ipAddr}:20063/users/update/`, userData, {
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

    if (!actualUser) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <div className={"User-Profile-Card-HL"}>
                <MDBCard>
                    <MDBCardImage position='top' alt='...' src='https://mdbootstrap.com/img/new/standard/city/062.webp' />
                    <MDBCardBody>
                        <MDBCardTitle>Bearbeite dein Profil</MDBCardTitle>
                        <MDBCardText>{actualUser.firstName}</MDBCardText>
                    </MDBCardBody>
                    <MDBListGroup >
                        <MDBListGroupItem>
                            Vorname: {actualUser.firstName}
                            <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                        </MDBListGroupItem>
                        <MDBListGroupItem>
                            Nachname: {actualUser.lastName}
                            <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                        </MDBListGroupItem>
                        <MDBListGroupItem>
                            Benutzername: {actualUser.userName}
                            <input type="text" value={userName} onChange={(e) => setUserName(e.target.value)} />
                        </MDBListGroupItem>
                        <MDBListGroupItem>
                            E-Mailadresse: {actualUser.emailAddress}
                            <input type="email" value={emailAddress} onChange={(e) => setEmailAddress(e.target.value)} />
                        </MDBListGroupItem>
                        <MDBListGroupItem>
                            Passwort:
                            <input type="password" value={passwordUnhash} onChange={(e) => setPasswordUnhash(e.target.value)} />
                        </MDBListGroupItem>
                    </MDBListGroup>
                    <MDBCardBody>
                        <button type="button" onClick={handleSave}>Speichern</button>
                    </MDBCardBody>
                </MDBCard>
            </div>
        </div>
    );
};

export default EditUserProfile;
