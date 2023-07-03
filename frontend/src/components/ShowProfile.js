import React, {useState} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import button from "mdb-ui-kit/src/js/free/button";
import axios from "axios";


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
const ShowProfile = () => {
    const location = useLocation();
    const [user, setUser] = useState(location.state.user)
    const navigate = useNavigate()


    const handleFollow = async () => {
        const data = {
            followerId: user._id
        };
        console.log(data)
        try {
            const response = await axios.post('http://194.94.204.27:20063/users/follow', data, {
                withCredentials: true
            });
            console.log(response.data);
            console.log("Folge Benutzer:", user.userName);
        } catch (error) {
            console.error("Fehler beim Folgen des Benutzers:", error);
        }
    };

    const handleUnFollow = async () => {
        const data = {
            userId: user._id
        };

        try {

            const response = await axios.post(`http://localhost:20063/users/unfollow`, data,{
                withCredentials: true
            })
            if (response.status === 200) {
                console.log('erfolgreich entfolgt')
                navigate('/showProfile', { state: { user: response.data.user } });
            } else {
                console.log('unfollow gescheitert')
                console.log(response.status)
                navigate('/showProfile', { state: { user: response.data.user } });
            }
        } catch (error) {
        }
    }

    const handleInviteCookingBuddy = async () => {

    }

    console.log(user);
    return (
        <div>
            <div className={"User-Profile-Card-HL"}>
                <MDBCard>
                    <MDBCardImage position='top' alt='...' src='https://mdbootstrap.com/img/new/standard/city/062.webp' />
                    <MDBCardBody>
                        <MDBCardTitle>Profil von {user.userName}</MDBCardTitle>
                    </MDBCardBody>
                    <MDBListGroup >
                        <MDBListGroupItem>Cooking Together Date: {user.cookingTogetherDate}</MDBListGroupItem>
                        <MDBListGroupItem>Invite Cooking Buddy?
                            <button onClick={handleInviteCookingBuddy}>send</button>
                        </MDBListGroupItem>
                    </MDBListGroup>
                    <MDBCardBody>
                        <MDBListGroupItem> <button onClick={handleFollow}>Follow</button></MDBListGroupItem>
                        <MDBListGroupItem> <button onClick={handleUnFollow}>unFollow</button></MDBListGroupItem>
                    </MDBCardBody>
                </MDBCard>
            </div>
        </div>
    );
};

export default ShowProfile;
