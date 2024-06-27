import React, { useState } from "react";
import axios from "axios";
import {
  Alert,
  Button,
  Col,
  Container,
  Form,
  Row,
  Spinner,
} from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { useFormik } from "formik";
import { registerSchema } from "../utils/schema/RegisterSchema.js";
import { registerUser, testHere } from "../Services/User.Service.js";
 
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { InputGroup } from "react-bootstrap";
 
export const Register = () => {
  document.title = "MINI-SHOPPER | Register";
 
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  // Server side validation error
  const [serverError, setServerError] = useState(null);
 
  // Loading state for register button
  const [loading, setLoading] = useState(false);
 
  const { handleSubmit, handleChange, handleBlur, values, touched, errors, setFieldValue } =
   
    useFormik({
      initialValues: {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        cpassword: "",
        userId: "",
      },
     
      validationSchema: registerSchema,
      onSubmit: (values, actions) => {
        //set loading to true for spinner
        console.log("printing in register");
       // setLoading(true);
        registerUser(values)
          .then((res) => {
            // console.log(res);
            // console.log("response in register page "+res.data.message);
            // console.log("response in register page "+res.data.statusMessage);
            // console.log("response in register page "+res.data.status);
            if(res.data.status==="201"){
             // navigate to login page
             toast.success("Registered successfully!");
             navigate("/login");
            // reset server error
            setServerError(null);
            // reset form
            actions.resetForm();
 
            }else if(res.data.status==="208"){
              toast.success(res.data.message);
 
            }
          })
          .catch((err) => {
            if (
              err.response &&
              err.response.data &&
              err.response.data.message
            ) {
              setServerError(err.response.data.message);
            } else {
              toast.error("Something went wrong!");
            }
          })
          .finally(() => {
            //set loading to false for spinner
            setLoading(false);
          });
      },
    });
    const customHandleChange=(e)=>{
      handleChange(e);
      if(e.target.id==='email'){
        setFieldValue('userId', e.target.value);
      }
       
      };
      // const registerNewUser=(event)=> {
      //    event.preventDefault();
      //    //  console.log(firstName+" "+lastName+" "+email+" "+password+" "+city+" "+state+" "+pincode);
      //    //console.log(event);
      //    const data = { firstName: "fi", lastName: "la", email: "emmp@gmail.com", password:"pass", userId: "emmp@gmail.com" };
      //    //console.log("user "+data);
      //   // data.userId=data.email;
      //    // data.firstName=data.fname;
      //    // data.lastName=data.lname;
      //    // data.password="Kishore@123";
      //    try {
      //       axios.post("http://localhost:8080/users/newUser", data).then((res) => {
      //        console.log("response in register jsx " + res.data);
 
      //        navigate("/login");
      //        //return res;
      //      });
      //    } catch (err) {
      //      alert(err);
      //    }
     
      //  }
   
 
 
  return (
    <>
      <Container fluid="sm" style={{ maxWidth: "900px" }}>
        <Row>
          <Col className="text-center mt-3">
            <div>
              <img
                src="/Asset/black-logo.png"
                width={50}
                fluid="true"
                className="d-inline-block align-top"
                alt="Logo"
              />
              <div className="d-flex flex-column justify-content-center">
                <h4 className="m-0" style={{ fontSize: "1rem" }}>
                MINI-SHOPPER
                </h4>
                <small style={{ fontSize: "0.8rem" }}>
                  Rapid Reflection, Swift Selection
                </small>
              </div>
            </div>
          </Col>
        </Row>
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
                    {serverError.map((error) => (
                      <li key={error}>{error}</li>
                    ))}
                  </ul>
                </Alert>
              )}
            </Col>
          </Row>
        )}
 
        {/* Register Form */}
        <Row>
          <Col>
            <h3>Register</h3>
          </Col>
        </Row>
        <Form noValidate className="mt-2" onSubmit={handleSubmit}>
          <Row className="mb-3 justify-content-center" md={10}>
            <Form.Group as={Col} controlId="firstName">
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
            <Form.Group as={Col} controlId="lastName">
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
          </Row>
          <Row className="mb-3">
            <Form.Group as={Col} controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Email"
                autoComplete="on"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
                isInvalid={touched.email && errors.email}
              />
              <Form.Control.Feedback type="invalid">
                {errors.email}
              </Form.Control.Feedback>
            </Form.Group>
          </Row>
          {/* <InputGroup className="mb-3">
   <Form.Control
type={showPassword ? "text" : "password"}     
placeholder="Password"
autoComplete="on"
onChange={handleChange}
onBlur={handleBlur}
value={values.password}
isInvalid={touched.password && !!errors.password} 
/>
<Button
variant="outline-secondary"
onClick={() => setShowPassword(!showPassword)}
   >
     {showPassword ? "Hide" : "Show"}
   </Button>
<Form.Control.Feedback type="invalid">
    {errors.password}
  </Form.Control.Feedback>
</InputGroup> */}
          <Row className="mb-3">
            <Form.Group as={Col} controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                autoComplete="on"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
                isInvalid={touched.password && errors.password}
              />
              <Form.Control.Feedback type="invalid">
                {errors.password}
              </Form.Control.Feedback>
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group as={Col} controlId="cpassword">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Confirm Password"
                autoComplete="on"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.cpassword}
                isInvalid={touched.cpassword && !!errors.cpassword}
              />
              <Form.Control.Feedback type="invalid">
                {errors.cpassword}
              </Form.Control.Feedback>
            </Form.Group>
          </Row>
          {/* Register Button */}
          {/* Disable button while loading and show spinner as well */}
          <Button variant="primary" type="submit" disabled={loading} >
            <Spinner
              animation="border"
              as="span"
              size="sm"
              className="me-2"
              // loading state for register button
              hidden={!loading}
            ></Spinner>
            <span>Register</span>
          </Button>
          <small className="text-left mt-2 mb-2 d-block">
            Already have an account?{" "}
            <NavLink to="/login" className="text-decoration-none">
              login
            </NavLink>
          </small>
        </Form>
      </Container>
    </>
  );
};
 




// import React, { useState } from "react";
// import axios from "axios";
// import {
//   Alert,
//   Button,
//   Col,
//   Container,
//   Form,
//   Row,
//   Spinner,
// } from "react-bootstrap";
// import { NavLink } from "react-router-dom";
// import { useFormik } from "formik";
// import { registerSchema } from "../utils/schema/RegisterSchema.js";
// import { registerUser, testHere } from "../Services/User.Service.js";

// import { toast } from "react-toastify";
// import { useNavigate } from "react-router-dom";

// export const Register = () => {
//   document.title = "MINI-SHOPPER | Register";

//   const navigate = useNavigate();

//   // Server side validation error
//   const [serverError, setServerError] = useState(null);

//   // Loading state for register button
//   const [loading, setLoading] = useState(false);

//   const { handleSubmit, handleChange, handleBlur, values, touched, errors, setFieldValue } =
    
//     useFormik({
//       initialValues: {
//         firstName: "",
//         lastName: "",
//         email: "",
//         password: "",
//         cpassword: "",
//         userId: "",
//       },
      
//       validationSchema: registerSchema,
//       onSubmit: (values, actions) => {
//         //set loading to true for spinner
//         console.log("printing in register");
//        // setLoading(true);
//         registerUser(values)
//           .then((res) => {
//             // console.log(res);
//             // console.log("response in register page "+res.data.message);
//             // console.log("response in register page "+res.data.statusMessage);
//             // console.log("response in register page "+res.data.status);
//             if(res.data.status==="201"){
//              // navigate to login page
//              toast.success("Registered successfully!");
//              navigate("/login");
//             // reset server error
//             setServerError(null);
//             // reset form
//             actions.resetForm();

//             }else if(res.data.status==="208"){
//               toast.success(res.data.message);

//             }
//           })
//           .catch((err) => {
//             if (
//               err.response &&
//               err.response.data &&
//               err.response.data.message
//             ) {
//               setServerError(err.response.data.message);
//             } else {
//               toast.error("Something went wrong!");
//             }
//           })
//           .finally(() => {
//             //set loading to false for spinner
//             setLoading(false);
//           });
//       },
//     });
//     const customHandleChange=(e)=>{
//       handleChange(e);
//       if(e.target.id==='email'){
//         setFieldValue('userId', e.target.value);
//       }
       
//       };
//       // const registerNewUser=(event)=> {
//       //    event.preventDefault();
//       //    //  console.log(firstName+" "+lastName+" "+email+" "+password+" "+city+" "+state+" "+pincode);
//       //    //console.log(event);
//       //    const data = { firstName: "fi", lastName: "la", email: "emmp@gmail.com", password:"pass", userId: "emmp@gmail.com" };
//       //    //console.log("user "+data);
//       //   // data.userId=data.email;
//       //    // data.firstName=data.fname;
//       //    // data.lastName=data.lname;
//       //    // data.password="Kishore@123";
//       //    try {
//       //       axios.post("http://localhost:8080/users/newUser", data).then((res) => {
//       //        console.log("response in register jsx " + res.data);

//       //        navigate("/login");
//       //        //return res;
//       //      });
//       //    } catch (err) {
//       //      alert(err);
//       //    }
     
//       //  }
    
  

//   return (
//     <>
//       <Container fluid="sm" style={{ maxWidth: "900px" }}>
//         <Row>
//           <Col className="text-center mt-3">
//             <div>
//               <img
//                 src="/Asset/black-logo.png"
//                 width={50}
//                 fluid="true"
//                 className="d-inline-block align-top"
//                 alt="Logo"
//               />
//               <div className="d-flex flex-column justify-content-center">
//                 <h4 className="m-0" style={{ fontSize: "1rem" }}>
//                 MINI-SHOPPER
//                 </h4>
//                 <small style={{ fontSize: "0.8rem" }}>
//                   Rapid Reflection, Swift Selection
//                 </small>
//               </div>
//             </div>
//           </Col>
//         </Row>
//         {/* server side validation alert */}
//         {serverError && (
//           <Row>
//             <Col>
//               {typeof serverError === "string" ? (
//                 <Alert variant="danger" className="p-2 mt-2">
//                   {serverError}
//                 </Alert>
//               ) : (
//                 <Alert variant="danger" className="p-2 mt-2">
//                   <ul>
//                     {serverError.map((error) => (
//                       <li key={error}>{error}</li>
//                     ))}
//                   </ul>
//                 </Alert>
//               )}
//             </Col>
//           </Row>
//         )}

//         {/* Register Form */}
//         <Row>
//           <Col>
//             <h3>Register</h3>
//           </Col>
//         </Row>
//         <Form noValidate className="mt-2" onSubmit={handleSubmit}>
//           <Row className="mb-3 justify-content-center" md={10}>
//             <Form.Group as={Col} controlId="firstName">
//               <Form.Label>First Name</Form.Label>
//               <Form.Control
//                 type="text"
//                 placeholder="First Name"
//                 onChange={handleChange}
//                 onBlur={handleBlur}
//                 value={values.firstName}
//                 isInvalid={touched.firstName && !!errors.firstName}
//               />
//               <Form.Control.Feedback type="invalid">
//                 {errors.firstName}
//               </Form.Control.Feedback>
//             </Form.Group>
//             <Form.Group as={Col} controlId="lastName">
//               <Form.Label>Last Name</Form.Label>
//               <Form.Control
//                 type="text"
//                 placeholder="Last Name"
//                 onChange={handleChange}
//                 onBlur={handleBlur}
//                 value={values.lastName}
//                 isInvalid={touched.lastName && !!errors.lastName}
//               />
//               <Form.Control.Feedback type="invalid">
//                 {errors.lastName}
//               </Form.Control.Feedback>
//             </Form.Group>
//           </Row>
//           <Row className="mb-3">
//             <Form.Group as={Col} controlId="email">
//               <Form.Label>Email</Form.Label>
//               <Form.Control
//                 type="email"
//                 placeholder="Email"
//                 autoComplete="on"
//                 onChange={handleChange}
//                 onBlur={handleBlur}
//                 value={values.email}
//                 isInvalid={touched.email && errors.email}
//               />
//               <Form.Control.Feedback type="invalid">
//                 {errors.email}
//               </Form.Control.Feedback>
//             </Form.Group>
//           </Row>
//           <Row className="mb-3">
//             <Form.Group as={Col} controlId="password">
//               <Form.Label>Password</Form.Label>
//               <Form.Control
//                 type="password"
//                 placeholder="Password"
//                 autoComplete="on"
//                 onChange={handleChange}
//                 onBlur={handleBlur}
//                 value={values.password}
//                 isInvalid={touched.password && errors.password}
//               />
//               <Form.Control.Feedback type="invalid">
//                 {errors.password}
//               </Form.Control.Feedback>
//             </Form.Group>
//           </Row>
//           <Row className="mb-3">
//             <Form.Group as={Col} controlId="cpassword">
//               <Form.Label>Confirm Password</Form.Label>
//               <Form.Control
//                 type="password"
//                 placeholder="Confirm Password"
//                 autoComplete="on"
//                 onChange={handleChange}
//                 onBlur={handleBlur}
//                 value={values.cpassword}
//                 isInvalid={touched.cpassword && !!errors.cpassword}
//               />
//               <Form.Control.Feedback type="invalid">
//                 {errors.cpassword}
//               </Form.Control.Feedback>
//             </Form.Group>
//           </Row>
//           {/* Register Button */}
//           {/* Disable button while loading and show spinner as well */}
//           <Button variant="primary" type="submit" disabled={loading} >
//             <Spinner
//               animation="border"
//               as="span"
//               size="sm"
//               className="me-2"
//               // loading state for register button
//               hidden={!loading}
//             ></Spinner>
//             <span>Register</span>
//           </Button>
//           <small className="text-left mt-2 mb-2 d-block">
//             Already have an account?{" "}
//             <NavLink to="/login" className="text-decoration-none">
//               login
//             </NavLink>
//           </small>
//         </Form>
//       </Container>
//     </>
//   );
// };







