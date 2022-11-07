import React from 'react';
import "../App.css"
import * as ReactBootStrap from "react-bootstrap";
import {
    Link
} from 'react-router-dom';


const NavBar = () => {
    return(
        <div className="App">
    <ReactBootStrap.Navbar collapseOnSelect expand="xl" bg="danger" variant="dark">
    <ReactBootStrap.Navbar.Brand href="#home">DASHBOARD</ReactBootStrap.Navbar.Brand>
    <ReactBootStrap.Navbar.Toggle aria-controls="responsive-navbar-nav" />
    <ReactBootStrap.Navbar.Collapse id="responsive-navbar-nav">
    <ReactBootStrap.Nav className="mr-auto"> 
    </ReactBootStrap.Nav>
    <ReactBootStrap.Nav>
        <Link to="/Login">
            <ReactBootStrap.Nav.Link eventKey={1} href="#login">
            Login
            </ReactBootStrap.Nav.Link>
        </Link>
        <Link to="/BitrateGraph">
            <ReactBootStrap.Nav.Link eventKey={2} href="#graph">
            Bitrate Graph
            </ReactBootStrap.Nav.Link>
        </Link>
        </ReactBootStrap.Nav>
      </ReactBootStrap.Navbar.Collapse>
    </ReactBootStrap.Navbar>
        </div>
    )
}

export default NavBar;