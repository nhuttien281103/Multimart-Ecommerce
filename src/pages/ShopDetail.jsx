import React, { useState } from "react";
import { Helmet } from "../components/Helmet/Helmet";
import data from "../assets/data/products";
import { CommonSection } from "../components/UI/CommonSection";
import { Col, Container, Row } from "reactstrap";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { ProductsList } from "../components/UI/ProductsList";
import { useDispatch } from "react-redux";
import { cartActions } from "../redux/slices/cartSlice";
import { toast } from "react-toastify";

export default function ShopDetail() {
  const { id } = useParams();
  const productItem = data.find((item) => item.id === id);
  const {
    imgUrl,
    productName,
    price,
    avgRating,
    reviews,
    description,
    shortDesc,
    category,
  } = productItem;
  const [tab, setTab] = useState("desc");
  const [rating, setRating] = useState(null);
  const dispatch = useDispatch();
  const addToCart = () => {
    dispatch(
      cartActions.addItem({
        id,
        imgUrl,
        productName,
        price,
      })
    );

    toast.success("Product added successfully", {
      theme: "dark",
      autoClose: 2000,
    });
  };

  const filterRelatedProducts = data.filter(
    (item) => item.category === category
  );

  return (
    <Helmet title={productName}>
      <CommonSection title={productName} />
      <section className="pt-0">
        <Container>
          <Row>
            <Col lg="6">
              <img src={imgUrl} alt="" />
            </Col>
            <Col lg="6">
              <div className="product__details">
                <h2>{productName}</h2>
                <div className="product__details__rating">
                  <div>
                    {Array(5).fill(
                      <span>
                        <i className="ri-star-s-fill"></i>
                      </span>
                    )}
                  </div>
                  <p>
                    (<span>{avgRating}</span> ratings)
                  </p>
                </div>
                <span className="product__details__price">${price}</span>
                <p className="product__details__desc">{description}</p>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  className="buy__btn"
                  onClick={addToCart}
                >
                  Add to cart
                </motion.button>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      <section className="tab__details__wrapper">
        <Container>
          <Row>
            <Col lg="12">
              <div className="tab__wrapper">
                <h6
                  className={tab == "desc" ? "active__tab" : ""}
                  onClick={() => setTab("desc")}
                >
                  Description
                </h6>
                <h6
                  className={tab == "rev" ? "active__tab" : ""}
                  onClick={() => setTab("rev")}
                >
                  Reviews ({reviews.length})
                </h6>
              </div>
              <div className="tab__content">
                {tab == "desc" ? (
                  <p>{description}</p>
                ) : (
                  <div className="tab__review">
                    <ul>
                      {reviews.map((review, index) => (
                        <li key={index}>
                          <h6>User</h6>
                          <span>{review.rating} ( rating)</span>
                          <p>{review.text}</p>
                        </li>
                      ))}
                    </ul>
                    <div className="review__form">
                      <h4>Leave your experience</h4>
                      <form action="">
                        <div className="form__group">
                          <input type="text" placeholder="Enter name..." />
                        </div>
                        <div className="form__group review__rating">
                          <span onClick={() => setRating(1)}>
                            1 <i className="ri-star-s-fill"></i>
                          </span>
                          <span onClick={() => setRating(2)}>
                            2 <i className="ri-star-s-fill"></i>
                          </span>
                          <span onClick={() => setRating(3)}>
                            3 <i className="ri-star-s-fill"></i>
                          </span>
                          <span onClick={() => setRating(4)}>
                            4 <i className="ri-star-s-fill"></i>
                          </span>
                          <span onClick={() => setRating(5)}>
                            5 <i className="ri-star-s-fill"></i>
                          </span>
                        </div>
                        <div className="form__group">
                          <textarea
                            rows={4}
                            type="text"
                            placeholder="Review message..."
                          />
                        </div>
                        <button className="buy__btn mt-2 mb-4">Submit</button>
                      </form>
                    </div>
                  </div>
                )}
              </div>
            </Col>
            <Col lg="12">
              <h2 className="related__title">You might also like</h2>
            </Col>
            <ProductsList data={filterRelatedProducts} />
          </Row>
        </Container>
      </section>
    </Helmet>
  );
}
