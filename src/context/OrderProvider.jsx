import React, { useState } from "react";
import { OrderContext } from "./OrderContext";
import { useEffect } from "react";
import { UserContext } from "./UserContext";
import { useContext } from "react";
import {
  addItemToOrder,
  getAllOrderByUserId,
  removeAllItemsFromOrder,
  removeItemFromOrder,
} from "../services/order.service";
import { toast } from "react-toastify";

export const OrderProvider = ({ children }) => {
  const { isLogin, userData } = useContext(UserContext);
  const [order, setOrder] = useState(null);
  
  const fetchUserOrder = async (userId) => {
    try {
     // console.log("now it is called in cart provider");
      const data = await getAllOrderByUserId(userId);
      console.log(data);
      setOrder(data);
    } catch (error) {
      setOrder({ items: [] });
    }
  };

  // add item to cart
  const addItem = async (data, next = () => {}) => {
    try {
      const res = await addItemToOrder(data, userData.userId);
      setOrder(res);
      next();
    } catch (error) {
      toast.error("Error in adding item to order", {
        position: "bottom-right",
      });
    }
  };

  // remove item from cart
  const removeItem = async (itemId) => {
    try {
      const newOrder = order.items.filter((item) => item.orderItemId !== itemId);
      setOrder({
        ...order,
        items: newOrder,
      });
      await removeItemFromOrder(userData.userId, itemId);
     
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

  useEffect(() => {
    if (isLogin) {
      // get user cart from database
      fetchUserOrder(userData.userId);
    }
  }, [isLogin]);

  return (
    <OrderContext.Provider
      value={{
        order: order,
        setOrder: setOrder,
        addItem: addItem,
        removeItem: removeItem,
        removeAllItems: removeAllItems,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};
