import React from "react";
import { Col, Container, Row, Table } from "reactstrap";
import { Helmet } from "../components/Helmet/Helmet";
import { CommonSection } from "../components/UI/CommonSection";
import { motion } from "framer-motion";
import { cartActions } from "../redux/slices/cartSlice";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

export default function Cart() {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const totalAmount = useSelector((state) => state.cart.totalAmount);
  const navigate = useNavigate();
  const navigationCheckout = () => {
    navigate("/checkout");
  };
  return (
    <Helmet title="Cart">
      <CommonSection title="Shopping Cart" />
      <section>
        <Container>
          <Row>
            <Col lg="9">
              {cartItems.length === 0 ? (
                <h2 className="fs-4 text-center">No item added to the cart!</h2>
              ) : (
                <Table className="table bordered">
                  <thead>
                    <tr>
                      <th>Image</th>
                      <th>Name</th>
                      <th>Price</th>
                      <th>Quantity</th>
                      <th>Remove</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cartItems.map((item, index) => (
                      <Tr key={index} item={item} />
                    ))}
                  </tbody>
                </Table>
              )}
            </Col>
            <Col lg="3">
              <div className="checkout__wrapper">
                <div className="cart__subtotal__wrapper">
                  <h6>Subtotal</h6>
                  <span>${totalAmount}</span>
                </div>
                <p className="cart__desc">
                  taxes and shipping will clculate in check out
                </p>
                <div>
                  <button className="buy__btn checkout__btn">
                    <Link to="/shop">Continute Shopping</Link>
                  </button>
                  <button
                    className="buy__btn checkout__btn"
                    onClick={navigationCheckout}
                  >
                    <Link to="#">Checkout</Link>
                  </button>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
}

const Tr = ({ item }) => {
  const dispatch = useDispatch();
  const deleteItemCart = () => {
    dispatch(cartActions.deleteItemCart(item.id));
  };
  return (
    <tr>
      <td>
        <img src={item.imgUrl} alt="" />
      </td>
      <td>{item.productName}</td>
      <td>${item.price}</td>
      <td>{item.quantity}</td>
      <td>
        <motion.button
          className="btn__remove__cart"
          whileHover={{ scale: 1.2 }}
          onClick={deleteItemCart}
        >
          <i className="ri-delete-bin-line"></i>
        </motion.button>
      </td>
    </tr>
  );
};
