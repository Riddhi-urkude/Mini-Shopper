import React from "react";

import * as XLSX from 'xlsx';
import { Col, Container, Row, Form, Button, Spinner } from "react-bootstrap";
import { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { useFormik } from "formik";
import { placeOrderSchema } from "../../utils/schema/PlaceOrderSchema";
import Swal from "sweetalert2";
import {createOrderByExcelSheet} from "../../services/order.service";
import {getAllProductsForExcel} from "../../services/order.service";

export const UploadExcelSheet = ({ onUpload }) => {
   
    const [excelData, setExcelData]=useState('');
    
    const [allProducts, setAllProducts] = useState('');


    const fetchProductsLive = async (allProducts = '') => {
      try {
         const allProducts = await getAllProductsForExcel();
         console.log(allProducts);
         setAllProducts(allProducts);
      }catch(err){
        console.log(err);
 
      }
    }

    useEffect(() => {
      fetchProductsLive(allProducts);
    }, []);

    const handleFileChange = async (e) => {

      const reader = new FileReader();

      reader.readAsBinaryString(e.target.files[0]);
      reader.onload = (e) =>{
        const excelFile= e.target.result;
        
        const workbook = XLSX.read(excelFile,{type: "binary"});
        
        const worksheetName = workbook.SheetNames[0];
        
        const worksheet = workbook.Sheets[worksheetName];
        
        const data = XLSX.utils.sheet_to_json(worksheet);

        setExcelData(data);
        

        console.log(excelData);
      }

    };

    const handleFileSubmit= async (e)=>{
        e.preventDefault();

    }
    
  const { userData } = useContext(UserContext);

  const navigate = useNavigate();
 
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
 
  const placeOrder = async (data) => {
    try {
      console.log(data);
      const result = await createOrderByExcelSheet(data);
      Swal.fire({
        icon: "success",
        title: "Order placed successfully",
        timer: 2000,
      });
      // console.log(result.orderId);
       navigate(`/order/${result.orderId}`);
    } catch (error) {
      console.log(error);

      let title="Unable to place order";
      if(error.response.data.message){
        title=error.response.data.message;
      }

      Swal.fire({
        icon: "error",
        title: title,
        timer: 2000,
      });
    }
  };
 
  const {
    handleSubmit,
    handleChange,
    handleBlur,
    setFieldValue,
    setFieldTouched,
    values,
    touched,
    errors,
  } = useFormik({
    initialValues: {
      orderName: "",
      shippingPhone: "",
      shippingAddress: shippingAddress,
      city: "",
      state: "",
      postalCode: "",
    },
    validationSchema: placeOrderSchema,
    onSubmit: (values, actions) => {
      setLoading(true);
      const data = {
        userId: userData.userId,
        orderStatus: "PENDING",
        paymentStatus: "NOT PAID",
        ...values,
        postalCode: values.postalCode.replace(/\s+/g, ""),
        products : excelData,
      };
      placeOrder(data);
      actions.resetForm();
      setLoading(false);
    },
  });

    return (
        <Container className="mt-3">
      <Row>
        <Col>
          <h3>Upload Excel Sheet</h3>
          <hr />
        </Col>
      </Row>
      <Row>
        <Col lg={6}>
          <Row>
            <Col>
            <input type="file" accept=".xlsx, .xls" onChange={handleFileChange}/>
            <br />
            <br />
 
            {/* <button type="Submit" className="btn-outline-primary" onClick={handleFileSubmit}  >Upload</button> */}
            </Col>
          </Row>
          </Col>
          </Row>
          
              {/* return ( */}
                <Row key={23132} className="mb-3">
                  {/* item image */}
                  <Col
                    xs={4}
                    sm={3}
                    md={2}
                    lg={3}
                    xl={2}
                    className="d-flex align-items-center justify-content-center"
                  >
                  </Col>
                
        <Col lg={6}>
          <Form noValidate onSubmit={handleSubmit}>
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
                controlId="shippingPhone"
                className="mb-3"
              >
                <Form.Label>Shipping Phone</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Shipping Phone"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.shippingPhone}
                  isInvalid={touched.shippingPhone && !!errors.shippingPhone}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.shippingPhone}
                </Form.Control.Feedback>
              </Form.Group>
            </Row>

              <Row>
                <Form.Group
                  as={Col}
                  controlId="shippingAddress"
                  className="mb-3"
                >
                  <Form.Label>Shipping Address</Form.Label>
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
                <Form.Group as={Col} controlId="city" className="mb-3" md={4}>
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
                <Form.Group as={Col} controlId="postalCode" className="mb-3">
                  <Form.Label>Postal Code</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Postal Code"
                    autoComplete="postal-code"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.postalCode}
                    isInvalid={touched.postalCode && !!errors.postalCode}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.postalCode}
                  </Form.Control.Feedback>
                </Form.Group>
              </Row>
    
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
