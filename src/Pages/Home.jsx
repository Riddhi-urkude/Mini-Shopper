import React, {useState, useEffect} from "react";
import Hero from "../Components/Hero";
import axios from "axios";

import { NavLink, useNavigate } from "react-router-dom";
//import { getAllProducts } from "../services/product.service";

export default function Home() {
  document.title = "MINI-SHOPPER | Your Trusted Destination";

  return (
    <Hero
      title={"MINI-SHOPPER"}
      description={
        "Welcome to SHOPPER, your one-stop-shop. Our easy-to-use platform makes it simple to find and purchase the products you need. Plus, enjoy exceptional customer service and support from our dedicated team."
      }
    >

   </Hero>
  );
}
