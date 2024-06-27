import React, { useState, useEffect, useContext } from "react";
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { Col, Container, Row, Form, Button, Spinner } from "react-bootstrap";
import { UserContext } from "../../Context/UserContext";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { placeOrderSchema } from "../../utils/schema/PlaceOrderSchema";
import Swal from "sweetalert2";
import { createOrderByExcelSheet, getAllProductsForExcel } from "../../Services/Order.Service";

import { date } from "yup";
import { getUserById } from "../../Services/User.Service";

export const UploadExcelSheet = ({ onUpload }) => {     
  const [excelData, setExcelData] = useState([]);     
  const [allProducts, setAllProducts] = useState([]);     
  const { userData } = useContext(UserContext);     
  const navigate = useNavigate();     
  const [loading, setLoading] = useState(false);     
  const [shippingAddress, setShippingAddress] = useState("");     



  

  const userContext = useContext(UserContext);
  const [user, setUser] = useState(false);

  
  const fetchProductsLive = async () => {         
    try {             
      const products = await getAllProductsForExcel();
      console.log(products.data);
     // console.log(allProducts)             
      const addedQuantity=products.data.map((d)=>{
        let tempData=d;
        tempData.quantity =0;
        tempData.image="";
        return tempData;
      });

      console.log(addedQuantity);
      setAllProducts(addedQuantity);

    } catch (err) {             
      console.log(err);         
    }    
  };     
  
  useEffect(() => {         
    fetchProductsLive(allProducts);     
  }, []);     
  
  const handleFileChange = async (e) => {         
    const reader = new FileReader();         
    reader.readAsBinaryString(e.target.files[0]);         
    reader.onload = (e) => {             
      const excelFile = e.target.result;             
      const workbook = XLSX.read(excelFile, { type: "binary" });             
      const worksheetName = workbook.SheetNames[0];             
      const worksheet = workbook.Sheets[worksheetName];             
      const data = XLSX.utils.sheet_to_json(worksheet);     



      setExcelData(data);         
    };    
  };     
  const handleFileSubmit = async (e) => {         
    e.preventDefault();     
  };     
  
  const handleAddressInputChange = (event) => {         
    const inputValue = event.target.value;         
    setShippingAddress(inputValue);         
    setFieldValue("shippingAddress", inputValue);     
  };     
  
  const handleAddressInputBlur = (event) => {         
    const inputValue = event.target.value;         
    setShippingAddress(inputValue);         
    setFieldTouched("shippingAddress", true);         
    setFieldValue("shippingAddress", inputValue);     
  };     
  





  useEffect(() => {
    getUserFromServer();
  },[userContext.userData]);
 
  const getUserFromServer = () => {
    if(userContext.userData) {
      const userId = userContext.userData.userId;
 
      getUserById(userId)
      .then((res) => {
        console.log(res);
        setUser(res);
 
        setValues({
          firstName: res.firstName,
          lastName: res.lastName,
          phoneNumber: res.phoneNumber,
          shippingAddress: res.address+", "+res.street == null ? "":res.address+", "+res.street,
          city: res.city == null ? "":res.city,
          state: res.state == null ? "":res.state,
          pinCode: res.pinCode == null ? "":res.pinCode,
         
         
        });
 
        res.address == null ? setShippingAddress(""):setShippingAddress(res.address+", "+res.street);
      });
    }
  };





  const placeOrder = async (data) => {         
    try {             
     // console.log(data);
      const result = await createOrderByExcelSheet(data);             
      Swal.fire({                 
        icon: "success",                 
        title: "Order placed successfully",                 
        timer: 2000,             
      });            
      navigate(`/order/${result.orderId}`);         
    } catch (error) {             
      let title = "Unable to place order";            
       if (error.response?.data?.message) {                 
        title = error.response.data.message;             
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
    setValues,
    setFieldTouched,        
    values,        
    touched,        
    errors,    
  } = useFormik({         
    initialValues: {             
      firstName: "",
      lastName: "",             
      phoneNumber: "",             
      shippingAddress: shippingAddress,             
      city: "",             
      state: "",             
      pinCode: "", 
    }, 
    validationSchema: placeOrderSchema, 
    onSubmit: (values, actions) => { 
      setLoading(true); 
      const data = { 
        userId: userData.userId, 
        orderStatus: "PENDING", 
        paymentStatus: "NOT PAID", 
        ...values, 
        pinCode: values.pinCode.replace(/\s+/g, ""), 
        products: excelData, 
      }; 

      placeOrder(data); 
      actions.resetForm(); 
      setLoading(false); 
    }, 
  }); 
  
  const handleOnExport = () => { 
    console.log(allProducts);
    const ws = XLSX.utils.json_to_sheet(allProducts); 
    
    const wb = XLSX.utils.book_new(); 
    XLSX.utils.book_append_sheet(wb, ws, "Products"); 
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" }); 
    const data = new Blob([excelBuffer], { type: "application/octet-stream" }); 
    saveAs(data, "Products.xlsx"); 
  }; 
  
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
            <input type="file" accept=".xlsx, .xls" onChange={handleFileChange} />
            <br />

               <br />

            <Button
                                                variant="success"
                                               
                                                disabled={loading}
                                                className="me-2 mb-3" 
                                                
                                                >
                                                  
                                                  <Spinner
                                                  animation="border"
                                                  as="span"
                                                  size="sm"
                                                  className="me-2"
                                                  hidden={!loading} 
                                                  ></Spinner>
                                                  <span>Upload</span>
                                                  </Button>
            <br />
            </Col>
            </Row>
            </Col>
            </Row>
            <Row>
              <Col>
              <Button onClick={handleOnExport} className="btn btn-success mb-3">Export Data to Excel Sheet</Button>
              <table className="table" id="table-to-xls">
                <thead className="thead-dark">
                  <tr>
                    <th>Product Id</th>
                    <th>Brand</th>
                    <th>Category</th>
                    <th>Product Name</th>
                    <th>Unit Price</th>
                    <th>Discounted Price</th>
                    </tr>
                    </thead>
                    <tbody> 
                      {Array.isArray(allProducts) && allProducts.map((product) => ( 
                      <tr key={product.productId}>
                        <td>{product.productId}</td>
                        <td>{product.brand}</td>
                        <td>{product.category}</td>
                        <td>{product.productName}</td>
                        <td>{product.unitPrice}</td>
                        <td>{product.discountedPrice}</td>
                        </tr> 
                        ))} 
                        </tbody>
                        </table>
                        </Col>
                        </Row>
                        <Row key={23132} className="mb-3">
                          <Col xs={4} sm={3} md={2} lg={3} xl={2} className="d-flex align-items-center justify-content-center"></Col>
                          <Col lg={6}>
                          <Form noValidate onSubmit={handleSubmit}>
          <Row>
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
