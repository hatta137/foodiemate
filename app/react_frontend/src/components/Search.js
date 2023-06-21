import React, {useEffect, useState} from 'react';
import { MDBInputGroup, MDBInput, MDBIcon, MDBBtn } from 'mdb-react-ui-kit';
import axios from "axios";
import {useNavigate} from "react-router-dom";

export default function Search() {
    const [user, setUser] = useState(null)
    const [userName, setUserName] = useState('')
    const [searchTerm, setSearchTerm] = useState('')
    const [searchSubmitted, setSearchSubmitted] = useState(false)

    const navigate = useNavigate();

    useEffect( () => {

        if (searchSubmitted && userName !=='') {
            axios.get("http://localhost:3000/users/getByUserName", {
                params: {
                    userName: userName
                }})
                .then((response) => {
                    setUser(response.data)
                })
                .catch((error) => {
                    console.error("Fehler beim Abruf des Users", error)
                })
        }
    }, [searchSubmitted,userName])

    const handleSearch = async () => {
        setUserName(searchTerm)
        setSearchSubmitted(true)
        console.log(user)
        navigate('/profile', { state: { user: user } });

    }

    return (
        <div className="text-white">
            <MDBInputGroup>
                <MDBInput label="Search" onChange={(e) => setSearchTerm(e.target.value)} />
                <MDBBtn onClick={handleSearch} rippleColor="dark">
                    <MDBIcon icon="search" />
                </MDBBtn>
            </MDBInputGroup>
        </div>
    );
}