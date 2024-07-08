import React from "react";
import { useContext } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { CartContext } from "../../Context/CartContext";
import { SingleCartItem } from "../../Components/Users/SingleCartItem";
import { NavLink } from "react-router-dom";

//import { getProductsByCategoryId } from "../../services/product.service";

export const ShoppingCart = () => {
   
  const { cart } = useContext(CartContext);
 // console.log(cart);

  const getTotalAmount = () => {
    let totalAmount = 0;
    cart &&
      cart.items.forEach((item) => {
        totalAmount += item.totalPrice;
      });
    return totalAmount.toFixed(2);
  };

  return (
    <Container className="mt-3">
      <Row >
        <Col>
          <h3> Upload through ExcelSheet</h3>
          <hr />
          <Row>
          <Col className="text-left">
            <h6>You can also Order through Excel Sheet</h6>
            <Button className="mb-3" as={NavLink} to="/UploadExcelSheet">Upload ExcelSheet</Button>
          </Col>
         
        </Row>
 
        </Col>
        </Row>
      <Row>
        <Col>
          <h3>Shopping Cart ({cart?.items.length} items)</h3>
          <hr />
        </Col>
      </Row>
      {cart?.items.length === 0 ? (
        <Row>
          <Col className="text-center">
            <h3>No items in cart</h3>
            <Button className="mb-3" as={NavLink} to="/products">Go Shopping</Button>
          </Col>
        </Row>
      ) : (
        <>
          <Row>
            {cart?.items.map((item, index) => (
              <SingleCartItem item={item} key={index} />
            ))}
          </Row>
          <Container>
            <Row>
              <Col className="text-end">
                <h5>Total Amount: ₹ {getTotalAmount()}</h5>
                <Button className="mb-3" as={NavLink} to="/place-order">Proceed to Checkout</Button>
              </Col>
            </Row>
          </Container>
        </>
      )}
    </Container>
  );
};
