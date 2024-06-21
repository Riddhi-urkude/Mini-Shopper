import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getOrderById } from "../../services/order.service";
import { OrderContext } from "../../context/OrderContext";
import { useState } from "react";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { useContext } from "react";
import {Button, Card, Col, Container, Row } from "react-bootstrap";
//import { IKContext, IKImage } from "imagekitio-react";
import { Loader } from "../../Components/Loader";

export const OrderDetail = () => {
  document.title = "MINI-SHOPPER | View Order Details";

//  const { orders } = useContext(OrderContext);
const { updateOrderItem, removeItem } = useContext(OrderContext);
  const { orderId } = useParams();
  console.log("order id "+orderId);
  const navigate = useNavigate();

  const [order, setOrder] = useState(null);

  
  const [loading, setLoading] = useState(true);

 
  // fetch order by id
  const fetchOrder = async (orderId) => {
    try {
      console.log("in fetch order");
      const data = await getOrderById(orderId);
      console.log(data);
      setOrder(data);
      setLoading(false);
    } catch (error) {
      toast.error("Something went wrong! unable to fetch order details");
    }
  };

  const editOrder= async (data) => {
    updateOrderItem(data);
//    fetchOrder(orderId);
  }
  const handleRemoveItem = async (orderItemId) => {
    console.log(orderItemId);
    removeItem(orderItemId);
   // fetchOrder(orderId);
  };

  useEffect(() => {
    fetchOrder(orderId);
  }, [orderId, updateOrderItem, removeItem]);

  return (
    <Container className="mt-3">
      <Row>
        <Col>
          <h3>Order Details</h3>
          <hr />
        </Col>
      </Row>

      {loading ? (
        <Loader show={loading} />
      ) : (
        <>
          {order == null ? (
            <h4 className="text-center">No order details found</h4>
          ) : (
            ""
          )}
        </>
      )}

      {order && (
        <>
          <Row>
            {/* Left side */}
            <Col md={6}>
              {/* Order Details */}
              <Row className="mb-3">
                <Col>
                  <h6>Order Number: {order.orderNumber}</h6>
                  <h6>Order Date: {order.createdAt}</h6>
                  {order.deliveredDate ? (
                    <h6>Delivered Date: {order.deliveredDate}</h6>
                  ) : (
                    ""
                  )}
                  <h6>Order Status: {order.orderStatus}</h6>
                  <h6>Payment Status: {order.paymentStatus}</h6>
                </Col>
              </Row>
              {/* Billing Details Card */}
              <Row className="mb-3">
                <Col md={12}>
                  <h6>Billing Details</h6>
                </Col>
                <Col md={8}>
                  <Card>
                    <Card.Body>
                      <Row>
                        <Col>
                          <p className="m-0">
                            {order.user.fname} {order.user.lname}
                          </p>
                        </Col>
                        <Col>
                          <p className="m-0">{order.user.phone}</p>
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          <p className="m-0">{order.user.email}</p>
                        </Col>
                        {/*  user address */}
                      </Row>
                      {order.user.address ? (
                        <Row>
                          <Col>
                            <p className="m-0">{order.user.address}</p>
                          </Col>
                        </Row>
                      ) : (
                        ""
                      )}
                      {/* user city. postal code */}
                      {order.user.city ? (
                        <>
                          <Row>
                            <Col>
                              <p className="m-0">
                                {order.user?.city}
                                {/* , {order.user?.province} */}
                              </p>
                            </Col>
                          </Row>
                          <Row>
                            <Col>
                              <p className="m-0 text-uppercase">
                                {order.user?.postalCode}
                              </p>
                            </Col>
                          </Row>
                        </>
                      ) : (
                        ""
                      )}
                    </Card.Body>
                  </Card>
                </Col>
              </Row>

              {/* Shipping Details Card */}
              <Row className="mb-3">
                <Col md={12}>
                  <h6>Shipping Details</h6>
                </Col>
                {/* Shipping Details Card */}
                <Col md={8}>
                  <Card>
                    <Card.Body>
                      <Row>
                        <Col>
                          <p className="m-0">{order.orderName}</p>
                        </Col>
                        <Col>
                          <p className="m-0">{order.shippingPhone}</p>
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          <p className="m-0">{order.shippingAddress}</p>
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          <p className="m-0">
                            {order.city}, {order.province}
                          </p>
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          <p className="m-0 text-uppercase">
                            {order.postalCode}
                          </p>
                        </Col>
                      </Row>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </Col>
            {/* Right side */}
            <Col md={6}>
              <Row>
                <Col>
                  <h4>Order Items</h4>
                </Col>
              </Row>
              {/* Order Items */}
              {order.orderItems.map((item, index) => {
                return (
                  <Row key={index} className="mb-3">
                    
                    <Col
                      xs={4}
                      sm={3}
                      xl={2}
                      className="d-flex align-items-center justify-content-center"
                    >
                      {/* <IKContext
                        urlEndpoint={process.env.REACT_APP_IMAGE_KIT_URL}
                        publicKey={process.env.REACT_APP_IMAGE_KIT_PUBLIC_KEY}
                      >
                        <IKImage
                          path={`/products/${item.product.productImage}`}
                          transformation={[
                            {
                              height: 200,
                              width: 200,
                            },
                          ]}
                          width="100%"
                          height="100%"
                          style={{ objectFit: "cover", borderRadius: "50%" }}
                        />
                      </IKContext> */}
                    </Col>
                    {/* Product Details */}
                    <Col xs={8} sm={6} md={12} lg={9}>
                      <Row>
                        <Col>
                          <h6
                            className="product-title"
                            onClick={() =>
                              navigate("/product/" + item.product.productId)
                            }
                          >
                            {item.product.productName}
                          </h6>
                        </Col>
                      </Row>
                      <Row>
                        <Col md={6}>
                          <small>Quantity: {item.quantity} </small>
                        </Col>
                        <Col md={6}>
                          <small>
                            Total Price: $ {item.totalPrice.toFixed(2)}
                          </small>
                        </Col>
                      </Row>
                    </Col>
                    {/* Buttons */}
                    {order.orderStatus==="PENDING" ? 
            <Col
              xs={7} sm={4} md={2} lg={2}
              className="d-flex align-items-center justify-content-center"
            >
              <div className="w-100">
                <div className="d-grid">
                  <Button
                    size="sm"
                    variant="danger"
                    onClick={() => {
                       handleRemoveItem(item.orderItemId);
                    }}
                  >
                    Remove 
                  </Button>
                </div>
                <div className="mt-2">
                  <Row>
                    <Col className="d-grid">
                      {/* Decrease quantity */}
                      <Button
                        size="sm"
                        onClick={(e) => {
                          const newQuantity = item.quantity-1;
                          if (newQuantity > 0) {
                            const data = {
                              orderItemId: item.orderItemId,
                              productId: item.product.productId,
                              quantity: newQuantity,
                            };
                            // update item in cart with new quantity
                            editOrder(data);
                           // updateOrderItem(data);
                          } else {
                            toast.info("Quantity can't be less than 1", {
                              position: "bottom-right",
                            });
                          }
                        }}
                      >
                        <i className="fa-solid fa-minus"> - </i>
                      </Button>
                    </Col>
                    <Col className="d-grid">
                      {/* Increase quantity */}
                      <Button
                        size="sm"
                        onClick={() => {
                          const newQuantity =   item.quantity + 1;
                          if (newQuantity > 10) {
                            toast.info("Quantity can't be more than 10", {
                              position: "bottom-right",
                            });
                          } else {
                            const data = {
                              orderItemId: item.orderItemId,
                              productId: item.product.productId,
                              quantity: newQuantity,
                            };
                            // update item in cart with new quantity
                            editOrder(data);
                           // updateOrderItem(data);
                          }
                        }}
                      >
                        <i className="fa-solid fa-plus"> + </i>
                      </Button>
                    </Col>
                  </Row>
                </div>
              </div>
            </Col> :<></>
              }
            </Row>
                );
              })}
              <Row>
                <Col>
                  <hr />
                  <h4>Total Order Amount: $ {order.orderAmount.toFixed(2)}</h4>
                </Col>
              </Row>
            </Col>
          </Row>
        </>
      )}
    </Container>
  );
};
