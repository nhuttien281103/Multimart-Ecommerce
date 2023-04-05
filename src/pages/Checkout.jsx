import React from "react";
import { useSelector } from "react-redux";
import { Col, Container, Form, FormGroup, Row } from "reactstrap";
import { Helmet } from "../components/Helmet/Helmet";
import { CommonSection } from "../components/UI/CommonSection";
export default function Checkout() {
  const totalQty = useSelector((state) => state.cart.totalQuantity);
  const totalAmount = useSelector((state) => state.cart.totalAmount);

  return (
    <Helmet title="Checkout">
      <CommonSection title="Checkout" />
      <section>
        <Container>
          <Row>
            <Col lg="8" className="checkout">
              <h6 className="checkout__title">Billing Information</h6>
              <Form action="">
                <FormGroup className="form__group">
                  <input
                    type="text"
                    name=""
                    id=""
                    placeholder="Enter your name"
                  />
                </FormGroup>
                <FormGroup className="form__group">
                  <input
                    type="email"
                    name=""
                    id=""
                    placeholder="Enter your Email"
                  />
                </FormGroup>
                <FormGroup className="form__group">
                  <input
                    type="number"
                    name=""
                    id=""
                    placeholder="Phone number"
                  />
                </FormGroup>
                <FormGroup className="form__group">
                  <input type="text" name="" id="" placeholder="Address" />
                </FormGroup>
                <FormGroup className="form__group">
                  <input type="text" name="" id="" placeholder="Postal Code" />
                </FormGroup>
              </Form>
            </Col>
            <Col lg="4">
              <div className="checkout__cart">
                <h6>
                  Total Qty :
                  <span className="checkout__cart__number">
                    {totalQty} items
                  </span>
                </h6>
                <h6>
                  Subtotal :
                  <span className="checkout__cart__number">${totalAmount}</span>
                </h6>
                <h6>
                  <span>
                    Shipping : <br /> Free shipping
                  </span>
                  <span className="checkout__cart__number">$0</span>
                </h6>
                <h4>
                  Total Cost :
                  <span className="checkout__cart__number">${totalAmount}</span>
                </h4>
                <button className="buy__btn auth__btn">Place an order</button>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
}
