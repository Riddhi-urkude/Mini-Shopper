import React from "react";
import { Card, Col, Container, Row } from "react-bootstrap";

export const About = () => {
  return (
    <Container className="mt-3">
      <Row className="mb-4">
        <Col className="text-center" md={12}>
          <h2>Your One-Stop-Shop for the Latest Products</h2>
        </Col>
        <Col className="text-center" md={12}>
          <p>
            At MINI-SHOPPER, we're passionate about providing you with a seamless
            online shopping experience for all your needs. Whether
            you're searching for the smartwatches, stationary,
            or groceries, we've got you covered. With our
            extensive product range and user-friendly platform, finding and
            purchasing the perfect shopping has never been easier.
          </p>
        </Col>
      </Row>
      <Row className="mb-3">
        <Col>
          <Card className="ps-4 pe-4">
            <Card.Body>
              <Row>
                {/* <Col md={3}>
                  <Card.Img variant="top" src="" />
                </Col> */}
                <Col
                  className="d-flex  flex-column justify-content-center"
                  // md={6}
                >
                  <h4>Browse Our Exceptional Selection</h4>
                  <p>
                    Discover a world of possibilities as you explore our curated
                    collection of top-notch products. We pride ourselves on
                    offering a wide range of brands, models, and features,
                    ensuring that you'll find the ideal device to suit your
                    needs and preferences.
                  </p>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row className="mb-3">
        <Col>
          <Card className="ps-4 pe-4">
            <Card.Body>
              <Row>
                <Col
                  className="d-flex  flex-column justify-content-center"
                  // md={9}
                >
                  <h4>Simplified Shopping Experience</h4>
                  <p>
                    At MINI-SHOPPER, we understand the importance of simplicity and
                    convenience when it comes to online shopping. Our intuitive
                    platform has been designed with you in mind, making it
                    effortless to navigate through our product categories,
                     and make informed purchase decisions. We've
                    streamlined the buying process to save you time, so you can
                    quickly find what you're looking for and proceed to checkout
                    with confidence.
                  </p>
                </Col>
                {/* <Col md={3}>
                  <Card.Img variant="top" src="" />
                </Col> */}
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row className="mb-3">
        <Col>
          <Card className="ps-4 pe-4">
            <Card.Body>
              <Row>
                {/* <Col md={3}>
                  <Card.Img variant="top" src="" />
                </Col> */}
                <Col className="d-flex flex-column justify-content-center">
                  <h4>Exceptional Customer Service</h4>
                  <p>
                    We believe that exceptional customer service is the
                    foundation of a successful e-commerce business. That's why
                    our dedicated team at MINI-SHOPPER is committed to providing you
                    with unrivaled support throughout your shopping journey.
                    Whether you have a question about a product, need assistance
                    with an order, or simply want personalized recommendations,
                    our friendly and knowledgeable staff is here to help. Your
                    satisfaction is our top priority.
                  </p>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};
