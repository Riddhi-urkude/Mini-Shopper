import React, { useState,useContext } from "react";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { getAllProducts } from "../../Services/Product.Service";
import { Container, Row, Spinner } from "react-bootstrap";
import { Loader } from "../../Components/Loader";
import { ProductCard } from "../../Components/Users/ProductCard";
import { getCartByUserId } from "../../Services/Cart.Service";

import { UserContext } from "../../Context/UserContext";

import { CartContext } from "../../Context/CartContext";

export const Products = () => {
  document.title =    "MINI-SHOPPER";
    const userContext =  useContext(UserContext);
   // console.log(userContext);
    const { cart } = useContext(CartContext);
 //   console.log(cart);
//    const productsArray= cart.items.map(c => c.product);
  //  console.log(productsArray);

  const [products, setProducts] = React.useState(null);
  const [loading, setLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(0);

  const fetchProductsLive = async (currentPage = 0) => {
    try {
      if (currentPage === 0) {
        const data = await getAllProducts(0);
        //console.log(data);
        setProducts(data);
      //  console.log(data);
        setLoading(false);
      } else if (currentPage > 0) {
       // const data = await getProductsLive(currentPage);
        // setProducts({
        //   content: [...products.content, ...data.content],
        //   lastPage: data.lastPage,
        //   pageNumber: data.pageNumber,
        //   pageSize: data.pageSize,
        //   totalElements: data.totalElements,
        //   totalPages: data.totalPages,
        // });
      }
    } catch (error) {
      toast.error("Something went wrong! unable to fetch products");
    }
  };

  const loadNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  useEffect(() => {
    fetchProductsLive(currentPage);
  }, [currentPage]);

  return loading ? (

   

   <Loader show={loading} />
 ) : (
      products && (
 
        <Container className="mt-4">
          <Row>
            {products.data.map((product, index) => {
              return <ProductCard product={product} key={index} ></ProductCard>;
            })}
          </Row>
        </Container>
   
      )
  );
};
