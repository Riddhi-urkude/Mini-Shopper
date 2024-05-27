import React from "react";
import Hero from "../Components/Hero";

export default function Home() {
  document.title = "SHOPPER | Your Trusted Destination for the Latest Electronics";

  return (
    <Hero
      title={"SHOPPER"}
      description={
        "Welcome to SHOPPER, your one-stop-shop. Our easy-to-use platform makes it simple to find and purchase the products you need. Plus, enjoy exceptional customer service and support from our dedicated team."
      }
    >
    </Hero>
  );
}
