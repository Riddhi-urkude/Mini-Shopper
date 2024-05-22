import React from "react";
import Hero from "../Components/Hero";

export default function Home() {
  document.title = "SHOPPER | Your Trusted Destination for the Latest Electronics";

  return (
    <Hero
      title={"SHOPPER"}
      description={
        "Welcome to SHOPPER, your one-stop-shop for the latest electronics. Browse our selection of smartphones, laptops, smart home devices, and more. Our easy-to-use platform makes it simple to find and purchase the products you need. Plus, enjoy exceptional customer service and support from our dedicated team. Discover the QuickPik difference and start shopping for your favorite electronics today!"
      }
    >
    </Hero>
  );
}
