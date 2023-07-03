import React, { useRef } from 'react';
import { MDBInputGroup, MDBInput, MDBIcon, MDBBtn } from 'mdb-react-ui-kit';
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Search() {
    const userInputRef = useRef(null);
    const navigate = useNavigate();

    const handleSearch = async () => {
        try {
            const searchTerm = userInputRef.current.value;
            const response = await axios.get("http://localhost:20063/users/getByUserName", {
                params: {
                    userName: searchTerm
                },
                withCredentials: true
            });

            const user = response.data.user;
            console.log(user.firstName);
            navigate('/showProfile', { state: { user: response.data.user } });

        } catch (error) {
            console.error("Fehler beim Abruf des Users", error);
        }
    };

    return (
        <div>
            <div className="search-box">
                <button className="btn-search" onClick={handleSearch}><i className="fas fa-search"></i></button>
                <input type="text" className="input-search" ref={userInputRef} placeholder="Type to Search..."/>
            </div>
        </div>
    );
}
