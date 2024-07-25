import React from 'react'
import { Card, Col, Container, Row } from 'react-bootstrap';
 
const Contact = () => {
  return (
    <Container className="mt-3 d-flex justify-content-center align-items-center vh-100">
      <Row className="text-center">
        <Col md={12}>
          <h4>Welcome to MINI-SHOPPER</h4>
          <p className="text-muted">
            Please feel free to contact for any questions
          </p>
        </Col>
        <Col md={12} lg={8} xl={6} xxl={6} className='mx-auto'>
          <Card className="mb-3">
            <Card.Body>
              <Row className="text-center">
                <Col xs={{ span: 4, offset: 3 }} md={{ span: 4, offset: 0 }}>
                  <img
                    src="/asset/black-logo.png"
                    alt="Logo"
                    className="img-fluid"
                    style={{
                      width: "100%",
                    }}
                  />
                </Col>
                <Col md={8}>
                  <h5 className="m-0 product-title">
                    <a
                      href="mailto:minishopper@gmail.com"
                      target="_blank"
                      rel="noreferrer"
                      className="nav-link p-0"
                    >
                      MINI-SHOPPER
                    </a>
                  </h5>
                  <small className="text-muted fw-semibold">
                    An E-Commerce Website
                  </small>
                  <a
                    href="minishopper@gmail.com"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <br />
                    <i className="fa-solid fa-envelope text-muted fs-5 me-2"></i>
                  </a>
                  <small>minishopper@gmail.com</small>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};
 
export default Contact
