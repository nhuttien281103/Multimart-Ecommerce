import React from "react";
import { Link } from "react-router-dom";
import { Col, Container, ListGroup, ListGroupItem, Row } from "reactstrap";

import logo from "../../assets/images/eco-logo.png";
export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="footer">
      <Container>
        <Row>
          <Col lg="4">
            <div className="footer__logo">
              <h1>Multimart</h1>
            </div>
            <p className="footer__text__desc">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia
              maiores earum eligendi officiis officia accusamus quas mollitia.
              Cupiditate, rem est.
            </p>
          </Col>
          <Col lg="3">
            <div className="footer__quick__links">
              <h4 className="footer__quick__links__title">Top Categories</h4>
              <ListGroup>
                <ListGroupItem className="ps-0 border-0">
                  <Link to="#">Mobiles</Link>
                </ListGroupItem>
                <ListGroupItem className="ps-0 border-0">
                  <Link to="#">Modern Sofa</Link>
                </ListGroupItem>
                <ListGroupItem className="ps-0 border-0">
                  <Link to="#">Arm chair</Link>
                </ListGroupItem>
                <ListGroupItem className="ps-0 border-0">
                  <Link to="#">Smart Watches</Link>
                </ListGroupItem>
              </ListGroup>
            </div>
          </Col>
          <Col lg="2">
            <div className="footer__quick__links">
              <h4 className="footer__quick__links__title">Useful Links</h4>
              <ListGroup>
                <ListGroupItem className="ps-0 border-0">
                  <Link to="/shop">Shop</Link>
                </ListGroupItem>
                <ListGroupItem className="ps-0 border-0">
                  <Link to="/cart">Cart</Link>
                </ListGroupItem>
                <ListGroupItem className="ps-0 border-0">
                  <Link to="/login">login</Link>
                </ListGroupItem>
                <ListGroupItem className="ps-0 border-0">
                  <Link to="#">Privacy Policy</Link>
                </ListGroupItem>
              </ListGroup>
            </div>
          </Col>
          <Col lg="3">
            <div className="footer__quick__links">
              <h4 className="footer__quick__links__title">Contact</h4>
              <ListGroup>
                <ListGroupItem className="ps-0 border-0 footer__contact">
                  <span>
                    <i className="ri-map-pin-line"></i>
                  </span>
                  <p>Giồng Lớn, Hòa Ân, Cầu Kè, Trà Vinh</p>
                </ListGroupItem>
                <ListGroupItem className="ps-0 border-0 footer__contact">
                  <span>
                    <i className="ri-phone-line"></i>
                  </span>
                  <p>0377183103</p>
                </ListGroupItem>
                <ListGroupItem className="ps-0 border-0 footer__contact">
                  <span>
                    <i className="ri-mail-line"></i>
                  </span>
                  <p>trannhuttien1010@gmail.com</p>
                </ListGroupItem>
              </ListGroup>
            </div>
          </Col>
          <Col lg="12" className="text-center">
            <p className="footer__copyright">
              Copyright {year} developed by Muhibur Rahman. All right reserved
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}
