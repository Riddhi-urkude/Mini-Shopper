import NavbarMenu from "./Components/NavbarMenu";
import { Routes, Route } from "react-router-dom";
import { Login } from "./Pages/Login";
import { Register } from "./Pages/Register";
import Home from "./Pages/Home";
import { About } from "./Pages/About";
import Contact from "./Pages/Contact";




const App = () => {
  // state for category sidebar


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
              </Routes>
    </div>
  );
};

export default App;