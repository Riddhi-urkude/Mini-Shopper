import React, { useContext } from 'react'
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import NavbarToggle from 'react-bootstrap/esm/NavbarToggle';
import Nav from "react-bootstrap/Nav";
import { NavLink, useNavigate } from "react-router-dom";
import { useState } from 'react';
import { Badge } from "react-bootstrap";

import { UserContext } from "../Context/UserContext";

import { CartContext } from "../Context/CartContext";

const NavbarMenu = ({ handleShowCategorySidebar }) => {
  const [expanded, setExpanded] = useState(false);

  const navigate = useNavigate();
  const userContext =  useContext(UserContext);
  const { cart } = useContext(CartContext);

//  console.log(userContext);
  const doLogout = () => {
    // remove user data and token from local storage and user context
    userContext.doLogout();
    navigate("/login"); // redirect to login page
  };


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
                MINI-SHOPPER
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
            
            <Nav.Link as={NavLink} to="/about" onClick={toggleCollapse}>
              About Us
            </Nav.Link>

            <Nav.Link as={NavLink} to="/contact" onClick={toggleCollapse}>
              Contact Us
            </Nav.Link>


            {userContext.isLogin && userContext.userData.role === 'shopkeeper' && (
            <Nav.Link as={NavLink} to="/getAllOrders" onClick={toggleCollapse}>
                 View Orders
            </Nav.Link>
             )}

           

          </Nav>
          <Nav>
              {userContext.isLogin  ? (
                <>
                 {userContext.userData.role === "user" || userContext.userData.role === "normal user" ? (
                    <>
                      <Nav.Link as={NavLink} to="/cart" onClick={toggleCollapse}>
                    <i className="fa-solid fa-cart-shopping"></i>
                    {cart && cart?.items.length === 0 ? (
                      ""
                    ) : (
                      <Badge className="cart-badge" bg="danger">
                        {cart && cart?.items?.length}
                      </Badge>
                    )}
                  </Nav.Link>
                  <Nav.Link as={NavLink} to="/orders" onClick={toggleCollapse}>
                    Orders
                  </Nav.Link>
                </>
     
                ) : null}

                 <Nav.Link
                    onClick={() => {
                      toggleCollapse();
                      doLogout();
                    }}
                  >
                    Logout
                  </Nav.Link>
                  <Nav.Link as={NavLink} to="/profile" onClick={toggleCollapse}>
                    Hello, {userContext.userData.firstName}
                  </Nav.Link>
                </>
              ) : (
                <>
                  <Nav.Link as={NavLink} to="/login" onClick={toggleCollapse}>
                    Login
                  </Nav.Link>
                  <Nav.Link
                    as={NavLink}
                    to="/register"
                    onClick={toggleCollapse}
                  >
                    Register
                  </Nav.Link>
                </>
              )}
            </Nav>
        </Navbar.Collapse>
      </Container>
      </Navbar>
    </>
  );
};

export default NavbarMenu

