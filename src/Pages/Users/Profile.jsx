import React, { useContext } from "react";
import { useState } from "react";
import {
  Button,
  Col,
  Container,
  Form,
  Row,
  Spinner,
} from "react-bootstrap";
import { SideBar } from "../../Components/SideBar";
import { useFormik } from "formik";
import { UserContext } from "../../Context/UserContext";
import { useEffect } from "react";
import { getUserById } from "../../Services/User.Service";
import { toast } from "react-toastify";


const Profile = () => {
  document.title = "MINI-SHOPPER | Profile"
  const userContext = useContext(UserContext);

  const [show, setShow] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    getUserFromServer();
  }, [userContext.userData]);

  const getUserFromServer = () => {
    if (userContext.userData) {
      const userId = userContext.userData.userId;
      
      getUserById(userId)
      .then((userRes) => {
        setUser(userRes);
      })
      .catch((error) => {
        toast.error("Failed to fetch user data. Please try again later.");
      });
    }
  };

  return (
    <>
      <SideBar show={show} handleClose={handleClose} />

      <Container>
        <Row>
          <Col>
            <h2 className="mt-3">
              <i className="fa-solid fa-bars me-2" style={{ cursor: "pointer"}} onClick={handleShow}></i>
                Profile
            </h2>
          </Col>
        </Row>
      </Container>
      
      {user == null ? (
        <div className="text-center mb-3">
          <Spinner animation="border" as="span" size="lg" />
        </div>
      ) : (
        <>
        <Container>
          <Row className="align-items-center">
            <Col>
              <h2>{userContext.userData.userId}</h2>
            </Col>
          </Row>

            <hr />
          <Row className="mt-3">
             <Col xs={12}>
              <Card className="mb-3">
                <Card.Body>
                  <Card.Title>Edit Profile</Card.Title>
                  <Button variant="link" href="/edit-profile" className="stretched-link"></Button>
                </Card.Body>
              </Card>
            </Col>
            
            <Col xs={12}>
            <Card className="mb-3">
                <Card.Body>
                  <Card.Title>Save Addresses</Card.Title>
                  <Button variant="link" href="/save-addresses" className="stretched-link"></Button>
                </Card.Body>
              </Card>
            </Col>

            <Col xs={12}>
            <Card className="mb-3">
                <Card.Body>
                  <Card.Title>Orders</Card.Title>
                  <Button variant="link" href="/orders" className="stretched-link"></Button>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
    </>
    )}
  </>
  )
}

export default Profile;
