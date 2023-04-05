import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "reactstrap";
import { motion } from "framer-motion";

import { Helmet } from "../components/Helmet/Helmet";
import heroImgae from "../assets/images/hero-img.png";
import timerCounter from "../assets/images/counter-timer-img.png";
import { Link } from "react-router-dom";
import { Services } from "../components/Services/Services";
import { ProductsList } from "../components/UI/ProductsList";
import dataProducts from "../assets/data/products";
import { Clock } from "../components/UI/Clock";
import SectionTitle from "../components/SectionTitle";

const Home = () => {
  const [trendingProducts, setTrendingProducts] = useState([]);
  const [salesProducts, setSalesProducts] = useState([]);
  const [mobileProducts, setMobileProducts] = useState([]);
  const [wirelessProducts, setWrelessProducts] = useState([]);
  const [popularProducts, setPopularProducts] = useState([]);

  const year = new Date().getFullYear();

  useEffect(() => {
    const filterChairProducts = dataProducts.filter(
      (item) => item.category === "chair"
    );

    const filterSalesProducts = dataProducts.filter(
      (item) => item.category === "sofa"
    );

    const filterMobileProducts = dataProducts.filter(
      (item) => item.category === "mobile"
    );

    const filterWirelessProducts = dataProducts.filter(
      (item) => item.category === "wireless"
    );

    const filterPopularProducts = dataProducts.filter(
      (item) => item.category === "watch"
    );

    setTrendingProducts(filterChairProducts);
    setSalesProducts(filterSalesProducts);
    setMobileProducts(filterMobileProducts);
    setWrelessProducts(filterWirelessProducts);
    setPopularProducts(filterPopularProducts);
  }, []);

  console.log(trendingProducts);

  return (
    <Helmet title={"Home"}>
      <section className="hero__section">
        <Container>
          <Row>
            <Col lg="6" md="6">
              <div className="hero__content">
                <p className="hero__subtitle">Trending product in {year}</p>
                <h2>Make Your Interior More Minimalistics & Modern</h2>
                <p>
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sunt
                  doloremque vitae facilis repudiandae. Eum, repellendus odio
                  exercitationem reprehenderit corporis atque!
                </p>
                <motion.button whileHover={{ scale: 1.1 }} className="buy__btn">
                  <Link to="/shop">SHOP NOW</Link>
                </motion.button>
              </div>
            </Col>
            <Col lg="6" md="6">
              <div className="hero__img">
                <img src={heroImgae} alt="" />
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      <Services />
      <section className="trending-products">
        <Container>
          <Row>
            <SectionTitle>Trending Products</SectionTitle>
            <ProductsList data={trendingProducts} />
          </Row>
        </Container>
      </section>
      <section className="best__sales">
        <Container>
          <Row>
            <SectionTitle>Best Sales</SectionTitle>
            <ProductsList data={salesProducts} />
          </Row>
        </Container>
      </section>
      <section className="timer__count">
        <Container>
          <Row>
            <Col lg="6" md="6">
              <div className="clock__top-content">
                <h4>Limited Offers</h4>
                <h3>Quality Armchair</h3>
              </div>
              <Clock />
              <motion.button
                whileHover={{ scale: 1.1 }}
                className="buy__btn store__btn"
              >
                <Link to="/shop">Visit Store</Link>
              </motion.button>
            </Col>
            <Col lg="6" md="6" className="text-end">
              <img src={timerCounter} alt="" />
            </Col>
          </Row>
        </Container>
      </section>
      <section className="new__arrivals">
        <Container>
          <Row>
            <SectionTitle>New Arrivals</SectionTitle>
            <ProductsList data={mobileProducts} />
            <ProductsList data={wirelessProducts} />
          </Row>
        </Container>
      </section>
      <section className="popular__category">
        <Container>
          <Row>
            <SectionTitle>Popular Category</SectionTitle>
            <span className="pt-4"></span>
            <ProductsList data={popularProducts} />
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default Home;
