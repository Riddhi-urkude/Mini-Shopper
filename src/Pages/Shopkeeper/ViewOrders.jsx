
import React, { useEffect, useState } from 'react'
import { getAllOrders, updateOrder } from '../../Services/Order.Service';
import { toast } from 'react-toastify';
import { Loader } from '../../Components/Loader';
//import { SingleOrderView } from '../../Components/Users/SingleOrderView';
import { SingleOrderView } from '../../Components/Users/SingleOrderView';
import { OrderStatusSchema } from '../../utils/schema/OrderStatusSchema';
import { Alert, Button,Card, CardBody, Col, Container, Form, Modal, Row, Spinner, Table } from 'react-bootstrap';
import { useFormik } from 'formik';
import { SideBar } from '../../Components/SideBar';
import {OrderView} from "./OrderView";
import { placeOrderSchema } from '../../utils/schema/PlaceOrderSchema';

// import React, { useEffect, useState } from 'react'
// import { getAllOrders, updateOrder } from '../../Services/Order.Service';
// import { toast } from 'react-toastify';
// import { Loader } from '../../Components/Loader';
// import { SingleOrderView } from '../../Components/Users/SingleOrderView';
// import { orderSchema } from '../../utils/Schema/OrderSchema';
// import { Alert, Button, Card, CardBody, Col, Container, Form, Modal, Row, Spinner, Table } from 'react-bootstrap';
// import { useFormik } from 'formik';
// import { SideBar } from '../../Components/SideBar';
// import { OrderView } from '../../Components/Shopkeeper/OrderView';




export const ViewOrders = () => {
    document.title = "MINI-SHOPPER|View Orders";
 
    const [show, setShow] = useState(false);
 
    // method for sidebar
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [ orders, setOrders] = useState(undefined);
    const [loading, setLoading] = useState(true);
 
    const [selectedOrder, setSelectedOrder] = useState(undefined);
    const [showOrderViewModal, setShowOrderViewModal] = useState(false);

    const [updateData, setUpdateData] =useState('');

 
    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const data = await getAllOrders();
                console.log(data);
                setOrders(data);
                setLoading(false);
            } catch (error) {
                toast.error("Failed to load orders");
            }
        };
 
        fetchOrders();
    }, [updateData]);
 
    const handleOrderViewModalClose = () => setShowOrderViewModal(false);
    const handleOrderViewModalShow = (order) => {
        console.log(order);
        setSelectedOrder(order);
        setShowOrderViewModal(true);
    };
 
    // order view modal
    const OrderViewModal = () => {
 
        // server side validation error
        const [serverError, setServerError] = useState(null);
 
        // update order function
        const updateOrderDetails = async (values, orderId) => {
            try {
                // console.log(values);
                // console.log(orderId);
                const updatedData  = {
                   reason: values.comments,
                    expectedDeliveryDate : values.deliveredDate,
                   orderStatus : values.orderStatus,
                   orderId : orderId
                }
                const data = await updateOrder(updatedData);
                toast.success("Order updated successfully");
                // const newArray = orders.content.map((order) => {
                //     if(order.orderId === orderId) {
                //         return data;
                //     } else {
                //         return order;
                //     }
                // });
                //  console.log("coming here");
                // setOrders({...orders, content: newArray});
                // setSelectedOrder(data);
              

                handleOrderViewModalClose();
                setUpdateData(orderId);
                console.log("reached end");

            } catch (err) {
                toast.error("Something went wrong! Unable to update order");
 
                //server validation errors
                if(err?.response?.data?.message) {
                    setServerError(err.response.data.message);
                } else if (err?.response?.data?.errors) {
                    setServerError(err.response.data.errors);
                }
                setUpdateData("yes");
            }
        };
 
        const { handleSubmit, handleChange, handleBlur, values, touched, errors } =
        useFormik({
            initialValues: {
                orderName: selectedOrder?.orderName,
                shippingAddress: selectedOrder?.shippingAddress,
                postalCode: selectedOrder?.pinCode,
                city: selectedOrder?.city,
                state: selectedOrder?.state,
                phoneNumber: selectedOrder?.phoneNumber,
           //     orderStatus: selectedOrder?.orderStatus,
                orderStatus: "",
                // paymentStatus: selectedOrder?.paymentStatus,
                comments: selectedOrder?.reason,
                deliveredDate: selectedOrder?.deliveredDate == null ? "" : selectedOrder.deliveredDate,
            },
           validationSchema: OrderStatusSchema,
            onSubmit: (values) => {
                console.log("in on submit");
                console.log(values);
                setLoading(true);
                updateOrderDetails(
                    {
                        ...values,
                        deliveredDate:
                            values.deliveredDate === "" ? null: values.deliveredDate,
                    },
                    selectedOrder?.orderId
                );
                setLoading(false);
            },
        });
        // const handleRejectOrder = async () => {
        //     try {
        //         const data = await updateOrder({
        //             ...selectedOrder,
        //             orderStatus: "REJECTED",
        //             comments: values.comments,
        //         }, selectedOrder.orderId);
        //         toast.success("Order rejected successfully");
        //         const newArray = orders.content.map((order) => {
        //             if (order.orderId === selectedOrder.orderId) {
        //                 return data;
        //             } else {
        //                 return order;
        //             }
        //         });
        //         setOrders({ ...orders, content: newArray });
        //         setSelectedOrder(data);
        //         setShowOrderViewModal(false);
        //     } catch (err) {
        //         toast.error("Failed to reject order");
        //     }
        // };
 
        // const handleSendForModification = async () => {
        //     try {
        //         const data = await updateOrder({
        //             ...selectedOrder,
        //             orderStatus: "MODIFICATION",
        //             comments: values.comments,
        //         }, selectedOrder.orderId);
        //         toast.success("Order sent for modification successfully");
        //         const newArray = orders.content.map((order) => {
        //             if (order.orderId === selectedOrder.orderId) {
        //                 return data;
        //             } else {
        //                 return order;
        //             }
        //         });
        //         setOrders({...orders, content: newArray});
        //         setSelectedOrder(data);
        //         setShowOrderViewModal(false);
        //     } catch (err) {
        //         toast.error("Failed to send order for modification");
        //     }
        // };
 
        // //check if any order item is out of stock
        // const isOutOfStock = selectedOrder?.orderItems.some(item => item.quantity > item.product.stock);
 
  return (
    // <div>
    //   <Container classname="mt-3">
    //     <Row>
    //         <Col>
    //             <h3>All Orders (Shopper View)</h3>
    //             <hr />
    //         </Col>
    //     </Row>
 
    //     { loading ? (
    //         <Loader show={loading} />
    //     ) : (
    //        <>
    //         {orders.length === 0 ? (
    //             <h4 className="text-center">No orders found</h4>
    //         ) : (
    //             orders.map((order, index) => (
    //                 <SingleOrderView order={order} key={index} />
    //             ))    
    //         )}
    //        </>    
    //     )}
    //   </Container>
    // </div>
 
    <>
        {selectedOrder && (
            <Modal
            show={showOrderViewModal}
            onHide={handleOrderViewModalClose}
            size='lg'
            >
                <Modal.Header>
                    <Modal.Title>{selectedOrder?.orderNumber}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {/* server side validation alert */}
                    {serverError && (
                        <Row>
                            <Col>
                            {typeof serverError === "string" ? (
                                <Alert variant="danger" className="p-2 mt-2">
                                    {serverError}
                                </Alert>
                            ) : (
                                <Alert variant="danger" className="p-2 mt-2">
                                    <ul>
                                        {serverError.map((error) => {
                                            <li key={error}>{error}</li>
                                        })}
                                    </ul>
                                </Alert>
                            )}
                            </Col>
                        </Row>
                    )}
                    <Row>
                        <Col>
                            <p>
                                <strong>Ordered By: </strong>
                                {selectedOrder.firstName} {selectedOrder.lastName}
                            </p>
                        </Col>
                    </Row>
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
                            placeholder="Shopper Name"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.orderName}
                            isInvalid={touched.orderName && !! errors.orderName}
                            disabled
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.orderName}
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
                            isInvalid={touched.phoneNumber && !! errors.phoneNumber}
                            disabled
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.phoneNumber}
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
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.shippingAddress}
                            isInvalid={touched.shippingAddress && !! errors.shippingAddress}
                            disabled
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.shippingAddress}
                            </Form.Control.Feedback>
                        </Form.Group>
                        </Row>
 
                        <Row>
                        <Form.Group
                            as={Col}
                            controlId="city"
                            className="mb-3"
                        >
                            <Form.Label>City</Form.Label>
                            <Form.Control
                            type="text"
                            placeholder="City"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.city}
                            isInvalid={touched.city && !! errors.city}
                            disabled
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.city}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group
                            as={Col}
                            controlId="state"
                            className="mb-3"
                        >
                            <Form.Label>State</Form.Label>
                            <Form.Control
                            type="text"
                            placeholder="state"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.state}
                            isInvalid={touched.state && !! errors.state}
                            disabled
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.state}
                            </Form.Control.Feedback>
                        </Form.Group>
 
                        <Form.Group
                            as={Col}
                            controlId="postalCode"
                            className="mb-3"
                        >
                            <Form.Label>Pin Code</Form.Label>
                            <Form.Control
                            type="text"
                            placeholder="Postal Code"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.postalCode}
                            isInvalid={touched.postalCode && !! errors.postalCode}
                            disabled
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.postalCode}
                            </Form.Control.Feedback>
                        </Form.Group>
                        </Row>
 
                        <Row>
                        <Form.Group
                            as={Col}
                            md={6}
                            controlId="orderStatus"
                            className="mb-3"
                        >
                            <Form.Label>Order Status</Form.Label>
                            <Form.Select
                            value={values.orderStatus}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            isInvalid={touched.orderStatus && !! errors.orderStatus}
                            // disabled = {selectedOrder.orderStatus === "FULFILL"  }
                            >
                                <option value="">Select Order Status</option>
                                <option value="PENDING">PENDING</option>
                                <option value="SEND FOR MODIFICATION">SEND FOR MODIFICATION</option>
                                <option value="FULFILL">FULFILL</option>
                                <option value="REJECTED">REJECT ORDER</option>
                            </Form.Select>
                            <Form.Control.Feedback type="invalid">
                                {errors.orderStatus}
                            </Form.Control.Feedback>
                        </Form.Group>
 
                        {/* <Form.Group
                            as={Col}
                            md={6}
                            controlId="paymentStatus"
                            className="mb-3"
                        >
                            <Form.Label>Payment Status</Form.Label>
                            <Form.Select
                            value={values.paymentStatus}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            isInvalid={touched.paymentStatus && !! errors.paymentStatus}
                            >
                                <option value="PAID">PAID</option>
                                <option value="NOT PAID">NOT PAID</option>
                            </Form.Select>
                            <Form.Control.Feedback type="invalid">
                                {errors.paymentStatus}
                            </Form.Control.Feedback>
                        </Form.Group> */}
                        </Row>
 
                        <Row>
                        <Form.Group
                            as={Col}
                            md={6}
                            controlId="deliveredDate"
                            className="mb-3"
                        >
                            <Form.Label>Delivery Date</Form.Label>
                            <Form.Control
                            type="date"
                            value={values.deliveredDate}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            isInvalid={touched.deliveredDate && !! errors.deliveredDate}
                            disabled = {selectedOrder.orderStatus === "FULFILL"  }
                            min={new Date().toLocaleDateString("en-CA", {
                                timeZone: "America/Toronto", // to be changed
                            })}
                            ></Form.Control>
                            <Form.Control.Feedback type="invalid">
                                {errors.deliveredDate}
                            </Form.Control.Feedback>
                        </Form.Group>
                        </Row>
                        <Form.Group
                            as={Col}
                            md={6}
                            controlId="comments"
                            className="mb-3"
                        >
                                <Form.Label>Comment</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows={3}
                                    placeholder="Enter Comments"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.comments}
                                    isInvalid={touched.comments && !! errors.comments}
                                    disabled = {selectedOrder.orderStatus === "FULFILL"  }
                                />
                                <Form.Control.Feedback type="invalid">
                                {errors.comments}
                                </Form.Control.Feedback>
                            </Form.Group>
                        <Button
                        variant="primary"
                        type="submit"
                        disabled={loading}
                        className="me-2"
                        >
                            <Spinner
                            animation="border"
                            as="span"
                            size="sm"
                            className="me-2"
 
                            //loading state for save button
                            hidden={!loading}
                            ></Spinner>
                            <span>Update</span>
                        </Button>
                        {/* conditionally render the buttons */}
                        {/* { isOutOfStock && (
                            <>
                                <Button
                                    variant="danger"
                                    onClick={handleRejectOrder}
                                    disabled={loading} className="me-2">
                                        Reject Order
                                    </Button>
 
                                <Button
                                    variant="warning"
                                    onClick={handleSendForModification}
                                    disabled={loading}>
                                            Send for Modification
                                        </Button>    
                            </>
                        )} */}
 
 
                        <Button variant="secondary" onClick={handleOrderViewModalClose}>
                            Close
                        </Button>
                    </Form>
 
                    <hr />
 
                    {/* Order Items */}
                    <Row>
                        <Col>
                            <h4>Order Items</h4>
                        </Col>
                    </Row>
                    <Row xs={1} md={1} lg={2}>
                        {selectedOrder.orderItems.map((item, index) => {
                            return (
                                <Col key={index} className='mb-3'>
                                    <Card>
                                        <CardBody>
                                            <Row>
                                                <Col md={3} lg={4}>
                                                <img
                                                    src={'data:image/jpeg;base64,' +item.product.image} 
                                                    alt={item.productName}
                                                    width="80%"
                                                    height="80%"
                                                    style={{
                                                      objectFit: "cover",
                                                      cursor: "pointer",
                                                      borderRadius: "50%",
                                                    }}
                                                />
 
                                                </Col>
                                                <Col
                                                md={8}
                                                lg={7}
                                                className="d-flex flex-column justify-content-between"
                                                >
                                                    <div>
                                                        <h6 className="order-item-title">
                                                            {item.product.productName.length > 40
                                                            ? `${item.product.productName.substring(
                                                                0,
                                                                40
                                                            )}...`
                                                        :item.product.productName}
                                                        </h6>
                                                    </div>
                                                    <div>
                                                        <p className="mb-0">
                                                            <span className="fw-semibold">
                                                                Quantity:{" "}
                                                            </span>
                                                            {item.quantity}
                                                        </p>
                                                        {/* <Col md={3} lg={4}> */}
                                                        <p className="mb-0">
                                                     {/* <h3> {item.product.stock}</h3> */}
                                                            <span className="fw-semibold">
                                                                Stock:{" "}
                                                            </span>
                                                            {item.product.stock}
                                                        {/* </Col> */}
                                                        </p>
                                                        <p className="mb-0">
                                                            <span className="fw-semibold">
                                                            Total Price:{" "}
                                                            </span>
                                                            ₹{item.totalPrice}
                                                        </p>
                                                    </div>
                                                </Col>
                                                {/* <Col md={3} lg={4}>
                                                     <h3> {item.product.stock}</h3>
                                                </Col> */}
                                            </Row>
                                        </CardBody>
                                    </Card>
                                </Col>
                            );
                        })}
                    </Row>
 
                </Modal.Body>
            </Modal>
        )}
    </>
  );
};
 
return (
    <>
        <OrderViewModal/>
        <SideBar show={show} handleClose={handleClose}></SideBar>
        <Container>
            <Row>
                <Col>
                <h2 className="mt-3">
                    <i
                    className="fa-solid fa-bars me-2"
                    style={{ cursor: "pointer"}}
                    onClick={handleShow}
                    ></i>
                    Orders
                </h2>
 
                <hr />
 
                </Col>
            </Row>
            {orders && (
                <Container>
                    <Row>
                        <Col>
                            <Table responsive hover size="sm">
                                <thead>
                                    <tr>
                                        <th className="small">S.NO</th>
                                        <th className="small">Order Number</th>
                                        <th className="small">Order Name</th>
                                        <th className="small">Order Amount</th>
                                        <th className="small">Order Status</th>
                                        <th className="small">Payment Status</th>
                                        <th className="small">Order Date</th>
                                        <th className="small">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {orders.map((order, index) => {
                                        return(
                                            <OrderView
                                            order={order}
                                            index={index}
                                            key={order.orderId}
                                            handleOrderViewModalShow={handleOrderViewModalShow}
                                           />
                                        );
                                    })}
                                </tbody>
                            </Table>
                        </Col>
                    </Row>
                    </Container>
                   )}
        </Container>
 
    </>
);
};
 
   
 
 
export default ViewOrders




