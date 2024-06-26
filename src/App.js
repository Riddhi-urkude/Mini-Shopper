import NavbarMenu from "./Components/NavbarMenu";
import { Routes, Route } from "react-router-dom";
import { Login } from "./Pages/Login";
import { Register } from "./Pages/Register";
import Home from "./Pages/Home";
import { About } from "./Pages/About";
import { useState } from "react";
import Contact from "./Pages/Contact";

import { CategorySideBar } from "./Components/CategorySideBar";
import {CategoryProductsPage} from "./Pages/users/CategoryProductsPage";

import UserProvider from "./Context/UserProvider";
import { CategoryProvider } from "./Context/CategoryProvider";
import {Products} from "./Pages/users/Products";
import {SingleProductPage} from "./Pages/users/SingleProductPage";

import Profile from "./Pages/users/Profile";
import { ShoppingCart } from "./Pages/users/ShoppingCart";
import { CartProvider } from "./Context/CartProvider";
import {OrderProvider } from "./Context/OrderProvider";
import {OrderCheckout} from "./Pages/users/OrderCheckout";
import { Orders } from "./Pages/users/Orders";
import { OrderDetail } from "./Pages/users/OrderDetail";
import {SingleProductCheckOut} from "./Pages/users/SingleProductCheckOut";
import {UploadExcelSheet} from "./Pages/users/UploadExcelSheet";

import PrivateRoutes from "./Components/auth/PrivateRoutes";

const App = () => {
  // state for category sidebar
  const [showCategorySidebar, setShowCategorySidebar] = useState(false);

  // functions for category sidebar
  const handleCloseCategorySidebar = () => setShowCategorySidebar(false);
  const handleShowCategorySidebar = () => setShowCategorySidebar(true);


  return (
    <div>
      <UserProvider>
        <CartProvider>
          <OrderProvider>
      {/* <NavbarMenu/> */}
      <CategoryProvider>
            <NavbarMenu
              handleShowCategorySidebar={handleShowCategorySidebar}
            ></NavbarMenu>
              <CategorySideBar
              showCategorySideBar={showCategorySidebar}
              handleCloseCategorySideBar={handleCloseCategorySidebar}
            ></CategorySideBar>
      <Routes>
              {/* Routes anyone can access*/}
              <Route path="/" element={<Home />}></Route>
              <Route path="/login" element={<Login />}></Route>
              <Route path="/register" element={<Register />}></Route>
              <Route path="/about" element={<About />}></Route>
              <Route path="/contact" element={<Contact />}></Route>
              <Route path="/products" element={<Products />}></Route>

              <Route
                path="/product/:productId"
                element={<SingleProductPage />}
              ></Route>
            
             <Route
                path="/category/:categoryId/products"
                element={<CategoryProductsPage />}
              ></Route>

              <Route
                element={
                  <PrivateRoutes  />
                }
              >
                 <Route path="/profile" element={<Profile/>}></Route>
               <Route path="/cart" element={<ShoppingCart />}></Route>
               
               <Route path="/order-single-product/:data" element={<SingleProductCheckOut/>}></Route>

               <Route path="/place-order" element={<OrderCheckout />}></Route>
               <Route path="/UploadExcelSheet" element={<UploadExcelSheet />}></Route>
               <Route path="/orders" element={<Orders />}></Route>
               <Route path="/order/:orderId" element={<OrderDetail />}></Route>
               </Route> 
              {/* Routes only admin and logged in user can access*/}
               {/* <Route
                element={
                  <PrivateRoutes />
                }
              >
                <Route path="/profile" element={<Profile />}></Route>
               </Route>  */}
              </Routes> 
        {/* </AuthProvider> */}
        </CategoryProvider>
        </OrderProvider>
        </CartProvider>
        </UserProvider>
    </div>
    
  );
};

export default App;
