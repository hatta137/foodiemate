import { Outlet } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css'
import React, { useState } from 'react';
import {
    MDBNavbar,
    MDBContainer,
    MDBIcon,
    MDBNavbarNav,
    MDBNavbarItem,
    MDBNavbarLink,
    MDBNavbarToggler,
    MDBNavbarBrand,
    MDBCollapse
} from 'mdb-react-ui-kit';
import Search from "./Search";

export default function Navbar() {



    const [showNavColorSecond, setShowNavColorSecond] = useState(false);

    return (
        <>
            <MDBNavbar expand="lg" dark bgColor="dark">
                <MDBContainer fluid>
                    <MDBNavbarBrand href="/">FoodieMate</MDBNavbarBrand>
                    <MDBNavbarToggler
                        type="button"
                        data-target="#navbarColor02"
                        aria-controls="navbarColor02"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                        onClick={() => setShowNavColorSecond(!showNavColorSecond)}
                    >
                        <MDBIcon icon="bars" fas />
                    </MDBNavbarToggler>
                    <MDBCollapse show={showNavColorSecond} navbar id="navbarColor02">
                        <MDBNavbarNav className="me-auto mb-2 mb-lg-0">
                            <MDBNavbarItem className="active"><MDBNavbarLink aria-current="page" href="/">Home</MDBNavbarLink></MDBNavbarItem>
                            {/*<MDBNavbarItem>     <MDBNavbarLink href="/home"><img className={"FM-Logo-HL"} src={FMLogo} alt="LogoFM"/></MDBNavbarLink></MDBNavbarItem>*/}
                            <MDBNavbarItem>     <MDBNavbarLink href="/grillomat">Grillomat</MDBNavbarLink></MDBNavbarItem>
                            <MDBNavbarItem>     <MDBNavbarLink href="/login">Login</MDBNavbarLink></MDBNavbarItem>
                            <MDBNavbarItem>     <MDBNavbarLink href="/newRecipe">Neues Rezept</MDBNavbarLink></MDBNavbarItem>
                            <MDBNavbarItem>     <MDBNavbarLink href="/myRecipes">Meine Rezepte</MDBNavbarLink></MDBNavbarItem>
                            <MDBNavbarItem>     <MDBNavbarLink href="/recipes">Alle Rezepte</MDBNavbarLink></MDBNavbarItem>
                            <MDBNavbarItem className="ms-auto"></MDBNavbarItem>
                            <MDBNavbarItem>     <Search></Search></MDBNavbarItem>
                            <MDBNavbarItem>     <MDBNavbarLink className="ms-auto" href="/profile"><MDBIcon fas icon="user" /></MDBNavbarLink></MDBNavbarItem>
                            <MDBNavbarItem>     <MDBNavbarLink href="/login"><MDBIcon fas icon="sign-in-alt" /></MDBNavbarLink></MDBNavbarItem>
                            <MDBNavbarItem>     <MDBNavbarLink href="/logOut"><MDBIcon fas icon="sign-out-alt" /></MDBNavbarLink></MDBNavbarItem>
                        </MDBNavbarNav>
                    </MDBCollapse>
                </MDBContainer>
            </MDBNavbar>
            <Outlet />
        </>
    );
}


