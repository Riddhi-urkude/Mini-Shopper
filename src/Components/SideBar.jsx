import React, { useContext, useEffect, useState } from "react";
import { Nav, Offcanvas } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";


export const SideBar = ({ show, handleClose }) => {
  const userContext = useContext(UserContext);
  const navigate = useNavigate();

  
  // logout function
  const doLogout = () => {
    // remove user data and token from local storage and user context
    userContext.doLogout();
    navigate("/login"); // redirect to login page
  };

  return (
    <Offcanvas
      show={show}
      onHide={handleClose}
      scroll={true}
      style={{
        backgroundColor: "var(--primary-color)",
        color: "white",
        maxWidth: "220px",
      }}
    >
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>MINI- SHOPPER</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body className="p-0">
        <ul className="list-group">
          <Nav.Link
            as={NavLink}
            to="/profile"
            className="list-group-item sidebar-item"
          >
            <i className="fa-solid fa-user me-2"></i>
            <span>Profile</span>
          </Nav.Link>

          <Nav.Link className="list-group-item sidebar-item" onClick={doLogout}>
            <i className="fa-solid fa-right-from-bracket me-2"></i>
            <span>Logout</span>
          </Nav.Link>
        </ul>
      </Offcanvas.Body>
    </Offcanvas>
  );
};