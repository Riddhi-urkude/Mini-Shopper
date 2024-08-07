import React, { useContext } from "react";
import { Badge, Button, Card, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../../Context/CartContext";
import { toast } from "react-toastify";
import { UserContext } from "../../Context/UserContext";

export const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const { addItem } = useContext(CartContext);
  const { isLogin } = useContext(UserContext);
  const  userContext  = useContext(UserContext);
  let role="user";
  if(userContext.userData != null){
     role = userContext.userData.role;
  }

  let user = false;
  if(role === "user"){
    user = true;
  }
  const {cart} = useContext(CartContext);
  let cartProducts = '';
  if(cart!=null){
     cartProducts = cart.items.map((item)=>{
      return item.product.productId; 
    });
  }

   const handleAddToCart = (productId, quantity = 1) => {
    if (isLogin) {
      const data = {
        productId,
        quantity,
      };

      // function call to add item to cart
      addItem(data, () => {
        toast.success("Item added to cart", {
          position: "bottom-right",
        });
      });
    } else {
      toast.error("Please login to add item to cart", {
        position: "bottom-right",
      });
    }
  };

  return (
    <Col className="mb-3" md={6} lg={4} xl={3}>
      <Card>
        <img
          src={'data:image/jpeg;base64,' +product.image}   
          alt={product.productName}
          width="100%"
          height="250px"
          onClick={() => navigate(`/product/${product.productId}`)}
          style={{
            objectFit: "cover",
            cursor: "pointer",
          }}
        />
        <Card.Body>
          <div className="d-flex justify-content-between">
            <small className="text-muted fw-semibold">{product.brand}</small>
            {product.stock == 0 ? <Badge bg="danger">Out of Stock</Badge> : ""}
          </div>
          <h6
            className="mb-0 product-title"
            style={{ minHeight: "46px" }}
            onClick={() => navigate(`/product/${product.productId}`)}
          >
            {product.productName.length > 60
              ? product.productName.slice(0, 60) + "..."
              : product.productName}
          </h6>

          <small style={{ minHeight: "68px", display: "inline-block" }}>
            {product.shortDescription.length > 85
              ? product.shortDescription.slice(0, 85) + "..."
              : product.shortDescription}
          </small>
          <div className="d-flex align-items-center mb-1">
            {product.discountedPrice ? (
              <div className="text-muted">
                <del>
                  <small>₹ {product.unitPrice}</small>
                </del>
                <small className="text-danger ms-2">
                ₹ {product.discountedPrice}
                </small>
              </div>
            ) : (
              <div className="me-3">
                <small>₹ {product.unitPrice}</small>
              </div>
            )}
          </div>
          {cartProducts.includes(product.productId) ?(
            <Button
              variant="primary"
              size="sm"
              disabled={true}
            >
              Already Available in Cart
            </Button>
          
             ) :( 
             <Button
                variant="primary"
                size="sm"
                disabled={!product.stock}
                onClick={() => {
                  handleAddToCart(product.productId);
                }}
                hidden={!user}
             >
                Add to Cart
             </Button>
              
           )}
          {/* <Button
            variant="primary"
            size="sm"
            disabled={!product.stock}
            onClick={() => {
              handleAddToCart(product.productId);
            }}
          >
            Add to Cart
          </Button>
           */}
        </Card.Body>
      </Card>
    </Col>
  );
};
