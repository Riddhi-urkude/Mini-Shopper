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
import { UserContext } from "../../context/UserContext";
import { profileSchema } from "../../utils/schema/ProfileSchema";
import { useEffect } from "react";
import { getUserById, updateUser } from "../../services/user.service";
import { toast } from "react-toastify";


const AddressManagement = () => {
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

 

  useEffect(() => {
    getUserFromServer();
}, [userContext.userData]);

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
    console.log("Editing Address: ", address);
    setEditingAddress(address);
    setShowModal(true);
  };

  const handleModalClose = () => {
    setEditingAddress(null);
    setShowModal(false);
  };

  const handleModalSave = async (values) => {
    console.log("saved values: ", values);
    try {
    const updateAddress = { ...editingAddress, ...values };
    const updateAddresses = addresses.map((addr) =>
      addr._id === editingAddress._id ? { ...addr, ...values } : addr
    );
    setAddresses(updateAddresses);
    await updateUserAddresses(updateAddresses);
    setShowModal(false);
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
    console.error("Error updating address:", error);
    toast.error("Failed to update address, Please try again later.")
  }
  }; 
  
  const updateUserAddresses = async (updateAddresses) => {
    const data = {
      ...user,
      address: updateAddresses,
    };
    console.log("Data to be sent to server: ", data);
    await updateUser(userContext.userData.userId, data);
  };

  const handleSaveAddressSelect = (address) => {
    setShippingAddress(`${address.address}`);
    setValues({
      ...values,
      shippingAddress: `${address.address}`,
      addressType: `${address.addressType}`,
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
    addressType: "",
    address: "",
    street: "",
    city: "",
    state: "",
    pinCode: "",
  },
  validationSchema: profileSchema,
  onSubmit: (values) => {
    handleModalSave(values);
  },
 });

 useEffect(() => {
  if (editingAddress) {
    setValues({
      phoneNumber: editingAddress.phoneNumber,
      addressType: editingAddress.addressType,
      address: editingAddress.address,
      city: editingAddress.city,
      state: editingAddress.state,
      pinCode: editingAddress.pinCode,
    });
  }
 }, [editingAddress]);

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
                                {address.phoneNumber}, {address.address}, {address.city}, {address.state}, {address.pinCode}
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

            <Form.Group controlId="address" className="mb-3">
              <Form.Label>Address Line</Form.Label>
              <Form.Control
                type="text"
                placeholder="Address"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.address}
                isInvalid={touched.address && !!errors.address}
              />
              <Form.Control.Feedback type="invalid">
                {errors.address}
              </Form.Control.Feedback> 
            </Form.Group>

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

export default AddressManagement
