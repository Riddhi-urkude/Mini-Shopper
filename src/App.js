import NavbarMenu from "./Components/NavbarMenu";
import { Routes, Route } from "react-router-dom";
import { Login } from "./Pages/Login";
import { Register } from "./Pages/Register";
import Home from "./Pages/Home";
import { About } from "./Pages/About";
import Contact from "./Pages/Contact";
import { SingleProductPage } from "./Pages/Users/SingleProductPage";
import { CategoryProductsPage } from "./Pages/Users/CategoryProduct";
import { Products } from "./Pages/Users/Products";





const App = () => {
  


  return (
    <div>
      <NavbarMenu/>

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
              </Routes>
    </div>
  );
};

export default App;
