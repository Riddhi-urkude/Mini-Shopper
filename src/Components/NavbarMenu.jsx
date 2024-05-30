import React from 'react'
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import NavbarToggle from 'react-bootstrap/esm/NavbarToggle';
import Nav from "react-bootstrap/Nav";
import { NavLink } from "react-router-dom";
import { useState } from 'react';
import { UserContext } from '../context/UserContext';
import { useContext } from 'react';



const NavbarMenu = ({ handleShowCategorySidebar }) => {
  const userContext = useContext(UserContext);
  const [expanded, setExpanded] = useState(false);

  function toggleCollapse() {
    if (window.innerWidth < 992) {
      setExpanded(!expanded);
    }
  }
  return (
    <>
    <Navbar
      collapseOnSelect
      expand="lg"
      className="bg-navbar"
      variant="dark"
      sticky="top"
      expanded={expanded}
    >
      <Container>
        <Navbar.Brand className='p-0' as={NavLink} to="/">
          <div className="d-flex">
            <img 
            src="/Asset/black-logo.png" 
            width={50}
            fluid="true"
            className="d-inline-block align-top"
            alt="logo" 
            />
            <div className="d-flex flex-column justify-content-center">
              <h4 className="m-0" style={{fontSize:"1rem"}}>
                SHOPPER
              </h4>
              <small style={{fontSize:"0.8rem"}}>
                Rapid Reflection, swift selection
              </small>
            </div>
          </div>
        </Navbar.Brand>
        <NavbarToggle
          aria-controls='responsive-navbar-nav'
          onClick={toggleCollapse}
        />
        <Navbar.Collapse id='responsive-navbar-nav'>
          <Nav className="me-auto">
            <Nav.Link as={NavLink} to="/products" onClick={toggleCollapse}>
              Products
            </Nav.Link>

            <Nav.Link
            onClick={() => {
              toggleCollapse();
              handleShowCategorySidebar();
            }}
            >
              Categories 
            </Nav.Link>
            
            <Nav.Link to="/about" onClick={toggleCollapse}>
              About Us
            </Nav.Link>

            <Nav.Link to="/contact" onClick={toggleCollapse}>
              Contact Us
            </Nav.Link>

            <Nav.Link to="/orders" onClick={toggleCollapse}>
              Orders
            </Nav.Link>

            <Nav.Link as={NavLink} to="/profile" onClick={toggleCollapse}>
                Hello, {userContext.userData.fname}
            </Nav.Link>

            {/* <Nav.Link to="/login" onClick={toggleCollapse}>
              Login
            </Nav.Link>

            <Nav.Link to="/register" onClick={toggleCollapse}>
              Register
            </Nav.Link> */}
          </Nav>
        </Navbar.Collapse>
      </Container>
      </Navbar>
    </>
  );
};

export default NavbarMenu
