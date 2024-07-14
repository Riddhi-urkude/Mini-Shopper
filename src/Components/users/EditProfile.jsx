import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../context/UserContext'
import { useFormik } from 'formik';
import { profileSchema } from '../../utils/schema/ProfileSchema';
import { getUserById, updateUser } from '../../services/user.service';
import { toast } from 'react-toastify';
import { Button, Col, Container, Form, Row, Spinner } from 'react-bootstrap';
import axios from 'axios';

const EditProfile = ( history ) => {
    const userContext = useContext(UserContext);

    const [loading, setLoading] = useState(false);

    const [user, setUser] = useState(null);

    const formik = useFormik({
        initialValues: {
            firstName: '',
            lastName: '',
            email: '',
            phoneNumber: '',
            addressType: '',
            address: '',
            street:'',
            city: '',
            state: '',
            pinCode: '',
        },
        validationSchema: profileSchema,
        onSubmit: (values) => {
            setLoading(true);
            console.log('Submitting forms with values:', values);
            updateUser(userContext.userData.userId, values)
                .then((response) => {
                    console.log('Update user Response:', response.data);
                    toast.success("Profile Updated Successfully");
                    console.log('Profile updated successfully');
                    history.push('/'); // Redirect to profile page 
                })
                .catch((error) => {
                    toast.error("Failed to update profile. Please try again later.");
                    console.log('Error in updating profile');
                })
                .finally(() => {
                    setLoading(false);
                });
        },
    });

    useEffect(() => {
        getUserFromServer();
  }, [userContext.userData]);

  const getUserFromServer = () => {
    if (userContext.userData) {
      const userId = userContext.userData.userId;
      
      getUserById(userId)
      .then((userRes) => {
        console.log(userRes);
        setUser(userRes);

        formik.setValues({
          firstName: userRes.firstName || '',
          lastName: userRes.lastName || '',
          email: userRes.email || '',
          phoneNumber: userRes.phoneNumber || '',
          addressType: userRes.addressType || '',
          address: userRes.shippingAddress || '',
          city: userRes.city || '',
          street: userRes.street || '',
          state: userRes.state || '',
          pinCode: userRes.pinCode || '',
        });
      })
      .catch((error) => {
        toast.error("Failed to fetch user data. Please try again later.");
      });
    }
  };


  return (
    <Container>
        <Row>
            <Col>
                <h2 className="mt-3">Edit Profile</h2>
                <hr />
            </Col>
        </Row>
        
        <Row>
            <Col>
                <Form onSubmit={formik.handleSubmit}>
                    <Form.Group controlId="firstName" className="mb-3">
                        <Form.Label>First Name</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="firstName"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.firstName}
                            isInvalid={formik.touched.firstName && !!formik.errors.firstName}
                        />
                        <Form.Control.Feedback type="invalid">
                            {formik.errors.firstName}
                        </Form.Control.Feedback>
                    </Form.Group>
                    
                    <Form.Group controlId="lastName" className="mb-3">
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="lastName"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.lastName}
                            isInvalid={formik.touched.lastName && !!formik.errors.lastName}
                         />
                         <Form.Control.Feedback type="invalid">
                            {formik.errors.lastName}              
                        </Form.Control.Feedback>
                        </Form.Group>
                        
                        <Form.Group controlId="email" className="mb-3">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="email"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.email}
                                isInvalid={formik.touched.email && !!formik.errors.email}
                            />
                            <Form.Control.Feedback type="invalid">                
                                {formik.errors.email}              
                            </Form.Control.Feedback>
                        </Form.Group>
                        
                        <Form.Group controlId="phoneNumber" className="mb-3">
                            <Form.Label>Phone Number</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="phoneNumber"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.phoneNumber}
                                isInvalid={formik.touched.phoneNumber && !!formik.errors.phoneNumber}
                            />
                            <Form.Control.Feedback type="invalid">                
                                {formik.errors.phoneNumber}              
                            </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group controlId="addressType" className="mb-3">
                                <Form.Label>Address Type</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Ex: Home, Office, etc"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.addressType}
                                    isInvalid={formik.touched.addressType && !!formik.errors.addressType}
                                />
                                <Form.Control.Feedback type="invalid">                
                                    {formik.errors.addressType}              
                                </Form.Control.Feedback>
                            </Form.Group>
                            
                            <Form.Group controlId="address" className="mb-3">
                                <Form.Label>Address Line</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="address"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.address}
                                    isInvalid={formik.touched.address && !!formik.errors.address}
                                />
                                <Form.Control.Feedback type="invalid">                
                                    {formik.errors.address}              
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Row>
                            <Col md={6}>
                            <Form.Group controlId="street" className="mb-3">
                                <Form.Label>Street</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="street"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.street}
                                    isInvalid={formik.touched.street && !!formik.errors.street}
                                />
                                <Form.Control.Feedback type="invalid">                
                                    {formik.errors.street}              
                                </Form.Control.Feedback>
                            </Form.Group>
                            </Col>

                            <Col md={6}>
                            <Form.Group controlId="city" className="mb-3">
                                <Form.Label>City</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="city"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.city}
                                    isInvalid={formik.touched.city && !!formik.errors.city}
                                />
                                <Form.Control.Feedback type="invalid">                
                                    {formik.errors.city}              
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
                                    placeholder="state"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.state}
                                    isInvalid={formik.touched.state && !!formik.errors.state}
                                />
                                <Form.Control.Feedback type="invalid">                
                                    {formik.errors.state}              
                                </Form.Control.Feedback>
                                </Form.Group>
                                </Col>

                                <Col md={6}>
                                <Form.Group controlId="pinCode" className="mb-3">
                                    <Form.Label>Pin Code</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="pinCode"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.pinCode}
                                        isInvalid={formik.touched.pinCode && !!formik.errors.pinCode}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                         {formik.errors.pinCode} 
                                    </Form.Control.Feedback>
                                    </Form.Group>
                                    </Col>
                                </Row> 
                                    
                                    <Button variant="primary" type="submit" disabled={loading}>
                                         {loading ? <Spinner animation="border" as="span" size="sm" /> : 'Save'} 
                                    </Button>
                                </Form>
                            </Col>
                        </Row>
                    </Container>

  )
}

export default EditProfile
