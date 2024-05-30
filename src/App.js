import NavbarMenu from "./Components/NavbarMenu";
import { Routes, Route } from "react-router-dom";
import { Login } from "./Pages/Login";
import { Register } from "./Pages/Register";
import Home from "./Pages/Home";
import { About } from "./Pages/About";
import Contact from "./Pages/Contact";
import Profile from "./Pages/Users/Profile";
import { AuthProvider } from "./context/AuthContext";
//import PrivateRoutes from "./Components/auth/PrivateRoutes";
//import UserProvider from "./context/UserProvider";
//import { CartProvider } from "./context/CartProvider";




const App = () => {
  // state for category sidebar


  return (
    <div>
      <AuthProvider>
      <NavbarMenu/>

      <Routes>
              {/* Routes anyone can access*/}
              <Route path="/" element={<Home />}></Route>
              <Route path="/login" element={<Login />}></Route>
              <Route path="/register" element={<Register />}></Route>
              <Route path="/about" element={<About />}></Route>
              <Route path="/contact" element={<Contact />}></Route>
              <Route path="/profile" element={<Profile />}></Route>
              </Routes> 
        </AuthProvider>
    </div>
    
  );
};

export default App;
