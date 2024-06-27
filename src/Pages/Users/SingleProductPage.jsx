import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getProductById } from "../../Services/Product.Service";
import { useState } from "react";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { Badge, Button, Col, Container, Form, Row } from "react-bootstrap";
import { IKContext, IKImage } from "imagekitio-react";
import { useContext } from "react";
import { CartContext } from "../../Context/CartContext";
import { UserContext } from "../../Context/UserContext";
import {OrderContext} from "../../Context/OrderContext";
import { Loader } from "../../Components/Loader";
import { ShowHtml } from "../../Components/ShowHtml";

import {createOrderwithSingleProduct} from "../../Services/Order.Service";

export const SingleProductPage = () => {
  const [product, setProduct] = useState(null);
  document.title = `Product | ${product?.title}`;

  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  const { isLogin } = useContext(UserContext);

  const { productId } = useParams();

  // cart context
  const { addItem } = useContext(CartContext);

  const { addSingleProduct} =useContext(OrderContext);

  // quantity state for product
  const [quantity, setQuantity] = useState(1);

  // handle quantity change
  const handleQuantityChange = (e) => {
    setQuantity(e.target.value);
  };

  const handleAddToCart = (productId, quantity) => {
    if (!isLogin) {
      // if user is not logged in then show toast
      toast.error("Please login to add item to cart", {
        position: "bottom-right",
      });
    } else {
      // if user is logged in then add item to cart
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
    }
  };

  const handleBuyNow = (productId, quantity) => {
    if (!isLogin) {
      // if user is not logged in then show toast
      toast.error("Please login to buy item", {
        position: "bottom-right",
      });
    } else {
      // if user is logged in then add item to cart
      const data = {
        productId,
        quantity,
      };

      // function call to add item to cart
      // addItem(data);
      // navigate(`/place-order`);
      addSingleProduct(data);
     
      navigate(`/order-single-product/${data}`);
//      window.location.href = "/place-order";
    }
  };

  // get product by id
  const fetchProductById = async (productId) => {
    try {
      const data = await getProductById(productId);
     // console.log(data);
      setProduct(data);
      setLoading(false);
    } catch (error) {
      toast.error("Something went wrong! Please try again later");
    }
  };

  useEffect(() => {
    if (productId) {
      fetchProductById(productId);
    }
  }, [productId]);

  return loading ? (
    <Loader show={loading} />
  ) : (
    product && (
      <Container className="mt-3">
        <Row>
          <Col md={5} lg={3}>
            {/* <IKContext
              urlEndpoint={process.env.REACT_APP_IMAGE_KIT_URL}
              publicKey={process.env.REACT_APP_IMAGE_KIT_PUBLIC_KEY}
            >
              <IKImage
                path={`/products/${product.productImage}`}
                transformation={[
                  {
                    height: 250,
                    width: 420,
                  },
                ]}
                loading="lazy"
                width="100%"
                height="100%"
                style={{ objectFit: "cover", borderRadius: "6px" }}
              />
            </IKContext> */}
            <img
                 src={'data:image/jpeg;base64,' +product.image} 
                transformation={[
                  {
                    height: 250,
                    width: 420,
                  },
                ]}
                loading="lazy"
                width="100%"
                height="100%"
                style={{ objectFit: "cover", borderRadius: "6px" }}
              />

          </Col>
          <Col md={7} lg={9}>
            <h5 className="text-muted fw-semibold mb-0">{product.brand}</h5>
            {product.stock =="0"  ? (
              <Badge bg="danger">Out of Stock</Badge>
            ) : (
              ""
            )}
            <h3 className="fw-semibold mb-0">{product.title}</h3> 
            <h4 className="fw-semibold mb-0">{product.productName}</h4>
            <p>{product.shortDescription}</p>

            {/* Quantity */}
            {/* Show quantity options when quantity>0 or stock==true */}
            { product.stock && (
              <div className="mb-5 d-flex gap-2 align-items-center">
                <p className="m-0">Quantity</p>
                <Form.Select
                  size="sm"
                  style={{ width: "75px" }}
                  value={quantity}
                  onChange={handleQuantityChange}
                >
                  {/* If quantity is > 10 then show options till 10 otherwise show options for number of quantities we have */}
                  {product.stock >= 10
                    ? Array.from({ length: 10 }, (_, index) => (
                        <option value={index + 1} key={index}>
                          {index + 1}
                        </option>
                      ))
                    : Array.from({ length: product.stock }, (_, index) => (
                        <option value={index + 1} key={index}>
                          {index + 1}
                        </option>
                      ))}
                </Form.Select>
              </div>
            )}

            <small className="text-danger fw-semibold">
              {product.stock < 10 && product.stock > 0
                ? `Only ${product.stock} left in stock`
                : ""}
            </small>
            {product.discountedPrice ? (
              <div className="text-muted">
                <h4 className="d-inline mb-0 text-decoration-line-through">
                 ₹ {product.unitPrice}
                </h4>
                <h4 className="text-danger ms-2 d-inline mb-0">
                 ₹ {product.discountedPrice}
                </h4>
              </div>
            ) : (
              <div className="me-3">
                <h4>₹ {product.unitPrice}</h4>
              </div>
            )}
            <div className="mt-3">
              <Button
                variant="primary"
                className="me-2"
                disabled={!product.stock }
                onClick={() => {
                  handleBuyNow(product.productId, quantity);
                }}
              >
                Buy now
              </Button>
              <Button
                variant="outline-primary"
                disabled={!product.stock}
                onClick={() => {
                  handleAddToCart(product.productId, quantity);
                }}
              >
                Add to Cart
              </Button>
            </div>
          </Col>
        </Row>
        {/* <Row className="mt-3">
          <Col>
            <ShowHtml htmlText={product.description}></ShowHtml>
          </Col>
        </Row> */}
      </Container>
    )
  );
};
