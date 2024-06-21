import React, { useState } from "react";
import { OrderContext } from "./OrderContext";
import { useEffect } from "react";
import { UserContext } from "./UserContext";
import { useContext } from "react";
import { toast } from "react-toastify";


import {
    updateOrderItemService,
    removeItemFromOrder,
    removeAllItemsFromOrder,
    getOrderById,
  } from "../services/order.service";


import { getProductById } from "../services/product.service";



export const OrderProvider = ({ children }) => {
    const { isLogin, userData } = useContext(UserContext);
    const [order, setOrder] = useState(null);
    const [singleProduct, setSingleProduct]= useState(null);






const addSingleProduct= async (data, next = () => {}) => {
    try {
    //   console.log(data);
     
//setOrder(data);
      const product = await getProductById(data.productId);
      product.quantity = data.quantity;
    //  console.log(product);
      setSingleProduct(product);
    //   console.log(product);
      next();
    } catch (error) {
      toast.error("Error in adding item to order", {
        position: "bottom-right",
      });
    }
 };

 const updateOrderItem = async (data, next = () => {}) => {
    try {
        console.log(data);
      const res = await updateOrderItemService(data);
      setOrder(res);
      next();
    } catch (error) {
      toast.error("Error in updating item to order", {
        position: "bottom-right",
      });
    }
  };

  // remove item from cart
  const removeItem = async (itemId,  next = () => {}) => {
    console.log(itemId);
    try {
    //   const newOrder = order.items.filter((item) => item.orderItemId !== itemId);
    //   setOrder({
    //     ...order,
    //     items: newOrder,
    //   });
     const res= await removeItemFromOrder(itemId);
     setOrder(res);
      next();
    } catch (error) {
      toast.error("Error in removing item from orders", {
        position: "bottom-right",
      });
    }
  };

// remove all items from cart
const removeAllItems = async () => {
    try {
      const data = await removeAllItemsFromOrder(userData.userId);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };




  return (
    <OrderContext.Provider
      value={{
        order: order,
        setOrder: setOrder,
        singleProduct: singleProduct,
        setSingleProduct: setSingleProduct,   
        addSingleProduct: addSingleProduct,

        updateOrderItem: updateOrderItem,
        removeItem: removeItem,
        removeAllItems: removeAllItems,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
}


