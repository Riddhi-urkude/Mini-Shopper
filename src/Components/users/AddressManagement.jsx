import React, { useContext } from "react";
import { useState } from "react";
import {
  Alert,
  Button,
  Col,
  Container,
  Form,
  Row,
  Spinner,
  Card,
  Modal
} from "react-bootstrap";
import { useFormik } from "formik";
import { UserContext } from "../../Context/UserContext";
import { profileSchema } from "../../utils/schema/ProfileSchema";
import { AddressSchema } from "../../utils/schema/AddressSchema";
import { useEffect } from "react";
import { getUserById, updateUser } from "../../Services/User.Service";
import { toast } from "react-toastify";


export const AddressManagement = () => {
  document.title = "MINI-SHOPPER | AddressManagement";
  const userContext = useContext(UserContext);

  // Loading state for save button
  const [loading, setLoading] = useState(false);

  const [user, setUser] = useState(null);

  // Server side validation error
  const [serverError, setServerError] = useState(null);

  // state for address
  const [addresses, setAddresses] = useState("");

  const [shippingAddress, setShippingAddress] = useState("");

  const [editingAddress, setEditingAddress] = useState(null);

  const [showModal, setShowModal] = useState(false);

 let [updatedAddress, setUpdatedAddress] = useState("");

  useEffect(() => {
    getUserFromServer();
}, [userContext.userData, updatedAddress]);

  const getUserFromServer = () => {
    if (userContext.userData) {
      // get user id from context
      const userId = userContext.userData.userId;

      // get user data from database
      getUserById(userId)
        .then((userRes) => {
            // console.log("in profile page");
              console.log(userRes);
          setUser(userRes);
          setAddresses(userRes.address);

          // setting the values of the form
          setValues({
            firstName: userRes.firstName,
            lastName: userRes.lastName,
            phoneNumber: userRes.phoneNumber,
            addressType: "",
            state: "",
            address: "",
            city: "",
            pinCode:"",
          });
        });
    }
  };

  const handleEditAddress = (address) => {
    // console.log("Editing Address: ", address);
    setEditingAddress(address);
    setShowModal(true);
  };

  const handleModalClose = () => {
    setEditingAddress(null);
    setShowModal(false);
  };

  const handleModalSave = async (values) => {
    // console.log("saved values: ", values);
    try {
    const updateAddress = { ...editingAddress, ...values };
    const updateAddresses = addresses.map((addr) =>
      addr._id === editingAddress._id ? { ...addr, ...values } : addr
    );
    setAddresses(updateAddresses);
    const updatedAddress = await updateUserAddresses(values);
    setShowModal(false);
    setUpdatedAddress(updatedAddress);
    // console.log(updatedAddress);
    toast.success("Address updated successfully");
      
    // Update the form values to reflect the save address
    setValues({
      ...values,
      phoneNumber: updateAddress.phoneNumber,
      addressType: updateAddress.addressType,
      address: updateAddress.address,
      city: updateAddress.city,
      state: updateAddress.state,
      pinCode: updateAddress.pinCode
    });
  } catch (error) {
    // console.error("Error updating address:", error);
    toast.error("Failed to update address, Please try again later.")
  }
  }; 
  
  const updateUserAddresses = async (updateAddresses) => {
    const data = {
      ...user,
      address: updateAddresses,
    };
    // console.log("Data to be sent to server: ", data);
   return await updateUser(userContext.userData.userId, updateAddresses);
      
    
  };

  const handleSaveAddressSelect = (address) => {
    setShippingAddress(`${address.address}`);
    setValues({
      ...values,
      addressLine: `${address.addressLine}`,
      addressType: `${address.addressType}`,
      street: address.street,
      city: address.city,
      state: address.state,
      pinCode: address.pinCode,
      phoneNumber: address.phoneNumber
    });
  };

 // formik form for editing address
 const {
    handleSubmit,
    handleChange,
    handleBlur,
    setValues,
    values,
    touched,
    errors,
 }  = useFormik({
  initialValues: {
    phoneNumber: "",
    addressLine: "",
    addressType: "",
    street: "",
    city: "",
    state: "",
    pinCode: "",
  },
  validationSchema: AddressSchema,
  onSubmit: (values) => {
    handleModalSave(values);
  },
 });

 useEffect(() => {
  if (editingAddress) {
    setValues({
        addressId: editingAddress.addressId,
        addressLine: editingAddress.addressLine,
      phoneNumber: editingAddress.phoneNumber,
      addressType: editingAddress.addressType,
      street: editingAddress.street,
      city: editingAddress.city,
      state: editingAddress.state,
      pinCode: editingAddress.pinCode,
    });
  }

 }, [editingAddress ]);

  return (
    <>

      <Container>

                <Row>
                  <Form.Group controlId="savedAddresses" className="mb-3">
                    <Form.Label>
                      <h3>Delivery Address</h3>
                    </Form.Label>
                    <div>
                      {Array.isArray(addresses) && addresses.length > 0 ? (
                        addresses.map((address, index) => (
                          <Card key={index} className="mb-3">
                            <Card.Body>
                              <Card.Text>
                                 {address.addressLine}, {address.street}, {address.phoneNumber}, {address.city}, {address.state}, {address.pinCode}
                              </Card.Text>
                              <Button
                                variant="secondary"
                                onClick={() => handleEditAddress(address)}
                               >
                                  Edit
                                </Button> 
                            </Card.Body>
                          </Card>
                        ))
                      ) : (
                        <p>No saved addresses found</p>
                      )}
                    </div>
                    </Form.Group>
                </Row>
      </Container>
    

      <Modal show={showModal} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Address</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form noValidate onSubmit={handleSubmit}>
          <Form.Group controlId="addressType" className="mb-3">
              <Form.Label>Address Type</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ex: Home, Office"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.addressType}
                isInvalid={touched.addressType && !!errors.addressType}
              />
              <Form.Control.Feedback type="invalid">
                {errors.addressType}
              </Form.Control.Feedback> 
            </Form.Group>

            <Form.Group controlId="addressLine" className="mb-3">
              <Form.Label>Address Line</Form.Label>
              <Form.Control
                type="text"
                placeholder="Address"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.addressLine}
                isInvalid={touched.addressLine && !!errors.addressLine}
              />
              <Form.Control.Feedback type="invalid">
                {errors.addressLine}
              </Form.Control.Feedback> 
            </Form.Group>
            <Row>
            <Col md={6}>
            <Form.Group controlId="street" className="mb-3">
              <Form.Label>Street</Form.Label>
              <Form.Control
                type="text"
                placeholder="Address"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.street}
                isInvalid={touched.street && !!errors.street}
              />
              <Form.Control.Feedback type="invalid">
                {errors.street}
              </Form.Control.Feedback> 
            </Form.Group>
            </Col>

            <Col md={6}>
            <Form.Group controlId="city" className="mb-3">
              <Form.Label>City</Form.Label>
              <Form.Control
                type="text"
                placeholder="City"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.city}
                isInvalid={touched.city && !!errors.city}
              />
              <Form.Control.Feedback type="invalid">
                {errors.city}
              </Form.Control.Feedback> 
            </Form.Group>
            </Col>
           </Row>

          <Row>
            <Col md={6}>

            <Form.Group controlId="state" className="mb-3">
              <Form.Label>State</Form.Label>
              <Form.Control
                type="text"
                placeholder="State"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.state}
                isInvalid={touched.state && !!errors.state}
              />
              <Form.Control.Feedback type="invalid">
                {errors.state}
              </Form.Control.Feedback> 
            </Form.Group>
            </Col>

            <Col md={6}>

            <Form.Group controlId="pinCode" className="mb-3">
              <Form.Label>Pin Code</Form.Label>
              <Form.Control
                type="text"
                placeholder="Pin Code"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.pinCode}
                isInvalid={touched.pinCode && !!errors.pinCode}
              />
              <Form.Control.Feedback type="invalid">
                {errors.pinCode}
              </Form.Control.Feedback> 
            </Form.Group>
            </Col>
           </Row>
            <Form.Group controlId="phoneNumber" className="mb-3">
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


            <Button variant="primary" type="submit">
              Save
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

//export default AddressManagement;
