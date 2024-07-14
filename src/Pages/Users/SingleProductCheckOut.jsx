import React, { useEffect,useState } from "react";
import { Button, Col, Container, Form, Row, Spinner } from "react-bootstrap";
import { placeOrderSchema } from "../../utils/schema/PlaceOrderSchema";
import { useFormik } from "formik";
import { AddressAutofill } from "@mapbox/search-js-react";
import { useContext } from "react";
import { UserContext } from "../../Context/UserContext";
import { CartContext } from "../../Context/CartContext";
import { OrderContext } from "../../Context/OrderContext";
import { createOrderwithSingleProduct } from "../../Services/Order.Service";
import Swal from "sweetalert2";
//import { IKContext, IKImage } from "imagekitio-react";
import { useNavigate,useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { date } from "yup";
import { getUserById } from "../../Services/User.Service";

export const SingleProductCheckOut = () => {
  document.title = "MINI-SHOPPER | Finalize Your Purchase";

  const {singleProduct , setSingleProduct} = useContext(OrderContext);
  const { userData } = useContext(UserContext);
  const { cart, setCart } = useContext(CartContext);
  const navigate = useNavigate();
  const userContext = useContext(UserContext);
  const [user, setUser] = useState(null);
  const [addresses, setAddresses] = useState([]);

  // loading state for save button
  const [loading, setLoading] = useState(false);

  const [shippingAddress, setShippingAddress] = useState("");

  // handle address input change
  const handleAddressInputChange = (event) => {
    const inputValue = event.target.value;
    setShippingAddress(inputValue);
    setFieldValue("shippingAddress", inputValue);
  };

  // handle address input blur
  const handleAddressInputBlur = (event) => {
    const inputValue = event.target.value;
    setShippingAddress(inputValue);
    setFieldTouched("shippingAddress", true);
    setFieldValue("shippingAddress", inputValue);
  };

  useEffect(() => {
    getUserFromServer();
  },[userContext.userData]);
 
  const getUserFromServer = async () => {
    if(userContext.userData) {
      const userId = userContext.userData.userId;
      try{
        const userRes = await getUserById(userId);
        console.log(userRes);
        setUser(userRes);
        setAddresses(userRes.address || []);
 
        setValues({
          firstName: userRes.firstName,
          lastName: userRes.lastName,
          phoneNumber: userRes.phoneNumber,
          street: "",
          shippingAddress: "",
          city: "",
          state: "",
          pinCode: "",
          orderName: "",
        });
 
        //res.address == null ? setShippingAddress(""):setShippingAddress(res.address+", "+res.street);
      } catch (error) {
        console.error("Error fetching user or addresses", error);
      }
    }
  };





  const placeOrder = async (data) => {
    try {
//      console.log(data);
      const result = await createOrderwithSingleProduct(data);

     // setCart({ items: [] });
      Swal.fire({
        icon: "success",
        title: "Order placed successfully",
        timer: 2000,
      });
      console.log(result.orderId);
      navigate(`/order/${result.orderId}`);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Unable to place order",
        timer: 2000,
      });
    }
  };

  const handleSaveAddressSelect = (address) => {
    setShippingAddress(`${address.address}`);
    setValues({
      ...values,
      shippingAddress: `${address.address}`,
      city: address.city,
      state: address.state,
      pinCode: address.pinCode,
    });
  };

  const {
    handleSubmit,
    handleChange,
    handleBlur,
    setFieldValue,
    setValues,
    setFieldTouched,
    values,
    touched,
    errors,
  } = useFormik({
    initialValues: {
      orderName: "",
      firstName: "",
      lastName: "",
      phoneNumber: "",
      shippingAddress: shippingAddress,
      street: "",
      city: "",
      state: "",
      pinCode: "",
    },
    validationSchema: placeOrderSchema,
    onSubmit: (values, actions) => {
      setLoading(true);
      const data = {
        userId: userData.userId,
        //cartId: cart.cartId,
        orderStatus: "PENDING",
        paymentStatus: "NOT PAID",
        ...values,
        pinCode: values.pinCode.replace(/\s+/g, ""),
        productId: singleProduct.productId,
        quantity: singleProduct.quantity,
      };
      placeOrder(data);
      actions.resetForm();
      setLoading(false);
    },
  });

  console.log("Addresses state inside render:", addresses);

  return (
    <Container className="mt-3">
      <Row>
        <Col>
          <h3>Review & Place Order</h3>
          <hr />
        </Col>
      </Row>
      <Row>
      {singleProduct &&
        <Col lg={6}>
          <Row>
            <Col>
              <h4>Order Summary</h4>
            </Col>
          </Row>
          {/* {singleProduct && */}
             
                <Row  className="mb-3">
                  {/* item image */}
                  <Col
                    xs={4}
                    sm={3}
                    md={2}
                    lg={3}
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
                      <img
         src={'data:image/jpeg;base64,' +singleProduct.image} 
         alt={singleProduct.productName}
          width="80%"
          height="80%"
          style={{
            objectFit: "cover",
            cursor: "pointer",
            borderRadius: "50%",
          }}
        />
                  </Col>
                  {/* Product Details */}
                  <Col xs={8} sm={6} lg={9}>
                    <Row>
                      <Col>
                        <h6
                          className="product-title"
                          onClick={() =>
                            navigate("/product/" + singleProduct.productId)
                          }
                        >
                          {singleProduct.productName}
                        </h6>
                      </Col>
                    </Row>
                    <Row>
                      <Col md={6}>
                        <small>Quantity: {singleProduct.quantity} </small>
                      </Col>
                      <Col md={6}>
                        <small>
                          Total Price: ₹ {singleProduct.discountedPrice != 0 ? (+singleProduct.quantity*singleProduct.discountedPrice)
    :  (+singleProduct.quantity*singleProduct.unitPrice)}
                        </small>
                      </Col>
                    </Row>
                  </Col>
                </Row>
               
               
          <Row className="mb-3">
            <Col>
              <h4>Total Order Amount: ₹ {singleProduct.discountedPrice != 0 ? (+singleProduct.quantity*singleProduct.discountedPrice)
    :  (+singleProduct.quantity*singleProduct.unitPrice)}</h4>
            </Col>
          </Row>
        </Col>
       }
        <Col lg={6}>
        <Form noValidate onSubmit={handleSubmit}>
        <Row>
            <Form.Group controlId="savedAddresses" className="mb-3">
              <Form.Label>
                <h3>Select a delivery Address</h3>
              </Form.Label>
              <div>
                {Array.isArray(addresses) && addresses.length > 0 ? (
                  addresses.map((address, index) => (
                  <Form.Check
                    type="radio"
                    key={index}
                    name="savedAddress"
                    label={`${address.address}, ${address.city}, ${address.state}, ${address.pinCode}`}
                    value={index}
                    onChange={() => handleSaveAddressSelect(address)}
                  />
                ))
                ) : (
                  <p>No saved addresses found</p>
                )}
              </div>
            </Form.Group>
            </Row>
            <hr />
          <Row>
              <Form.Group
                as={Col}
                md={6}
                controlId="orderName"
                className="mb-3"
              >
                <Form.Label>Order Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Order Name"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.orderName}
                  isInvalid={touched.orderName && !!errors.orderName}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.orderName}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group
                as={Col}
                md={6}
                controlId="firstName"
                className="mb-3"
              >
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="First Name"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.firstName}
                  isInvalid={touched.firstName && !!errors.firstName}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.firstName}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group
                as={Col}
                md={6}
                controlId="lastName"
                className="mb-3"
              >
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Last Name"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.lastName}
                  isInvalid={touched.lastName && !!errors.lastName}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.lastName}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group
                as={Col}
                md={6}
                controlId="phoneNumber"
                className="mb-3"
              >
                <Form.Label>Phone Number</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Phone Number"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.phoneNumber}
                  isInvalid={touched.phoneNumber && !!errors.phoneNumber}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.phoneNumber}
                </Form.Control.Feedback>
              </Form.Group>
            </Row>

            {/* Adding mapbox address autofill */}
            {/* <AddressAutofill
            //  accessToken={process.env.REACT_APP_MAPBOX_TOKEN}
              options={{
                country: "CA",
                language: "en",
              }}
            > */}
              <Row>
                <Form.Group
                  as={Col}
                  controlId="shippingAddress"
                  className="mb-3"
                >
                  <Form.Label>Address Line</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Shipping Address"
                    autoComplete="address-line-1"
                    value={shippingAddress}
                    onChange={handleAddressInputChange}
                    onBlur={handleAddressInputBlur}
                    isInvalid={
                      touched.shippingAddress && !!errors.shippingAddress
                    }
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.shippingAddress}
                  </Form.Control.Feedback>
                </Form.Group>
              </Row>
              <Row>
              <Form.Group as={Col} controlId="street" className="mb-3" md={6}>
                  <Form.Label>Street</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="street"
                    autoComplete="address-level2"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.street}
                    isInvalid={touched.street && !!errors.street}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.street}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} controlId="city" className="mb-3" md={6}>
                  <Form.Label>City</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="City"
                    autoComplete="address-level2"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.city}
                    isInvalid={touched.city && !!errors.city}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.city}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} controlId="state" className="mb-3">
                  <Form.Label>State</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="State"
                    autoComplete="address-level1"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.state}
                    isInvalid={touched.state && !!errors.state}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.state}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} controlId="pinCode" className="mb-3">
                  <Form.Label>PinCode</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="PinCode"
                    autoComplete="pinCode"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.pinCode}
                    isInvalid={touched.pinCode && !!errors.pinCode}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.pinCode}
                  </Form.Control.Feedback>
                </Form.Group>
              </Row>
            {/* </AddressAutofill> */}
            <Button
              variant="primary"
              type="submit"
              disabled={loading}
              className="me-2 mb-3"
            >
              <Spinner
                animation="border"
                as="span"
                size="sm"
                className="me-2"
                // loading state for save button
                hidden={!loading}
              ></Spinner>
              <span>Proceed Order</span>
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

