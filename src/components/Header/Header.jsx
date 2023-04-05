import React, { useEffect, useRef } from "react";
import { Container, Row } from "reactstrap";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Tippy from "@tippyjs/react/headless";

import logo from "../../assets/images/eco-logo.png";
import userIcon from "../../assets/images/user-icon.png";
import { useSelector } from "react-redux";
import { useAuth } from "../custom-hook/useAuth";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase.config";
import { toast } from "react-toastify";

export default function Header() {
  const MENUS_ITEM = [
    { path: "home", title: "Home" },
    { path: "shop", title: "Shop" },
    { path: "about", title: "About" },
    { path: "contact", title: "Contact" },
  ];

  const totalQuantity = useSelector((state) => state.cart.cartItems.length);

  const headerRef = useRef(null);
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  const stickyHeaderFunc = () => {
    window.addEventListener("scroll", () => {
      if (
        document.body.scrollTop > 80 ||
        document.documentElement.scrollTop > 80
      ) {
        headerRef.current.classList.add("sticky__header");
      } else {
        headerRef.current.classList.remove("sticky__header");
      }
    });
  };

  const navigationToCart = () => {
    navigate("/cart");
  };

  const toggleMenuFrofile = () =>
    actionsMenuProfileRef.current.classList.toggle(
      "profile__actions__toggle__menu"
    );

  const logout = () => {
    signOut(auth)
      .then(() => {
        toast.success("logged out successfully!", {
          theme: "dark",
          autoClose: 2000,
        });
        navigate("/home");
      })
      .catch((e) => {
        toast.error(e.message, {
          theme: "dark",
          autoClose: 2000,
        });
      });
  };

  useEffect(() => {
    stickyHeaderFunc();
    return () => window.removeEventListener("scroll", stickyHeaderFunc);
  });
  return (
    <header className="header" ref={headerRef}>
      <Container>
        <Row>
          <div className="nav__wrapper">
            <div className="logo">
              <img src={logo} alt="logo" />
              <div>
                <h1>Multimart</h1>
              </div>
            </div>
            <nav className="navigation">
              <ul className="menu">
                {MENUS_ITEM.map((item, index) => (
                  <motion.li
                    whileHover={{ scale: 1.1 }}
                    key={index + 1}
                    className="nav__item"
                  >
                    <NavLink
                      to={item.path}
                      className={(navClass) =>
                        navClass.isActive ? "nav__item__active" : ""
                      }
                    >
                      {item.title}
                    </NavLink>
                  </motion.li>
                ))}
              </ul>
            </nav>
            <div className="nav__icons">
              <motion.span whileHover={{ scale: 1.2 }} className="fav__icon">
                <i className="ri-heart-line"></i>
                <div className="badge">1</div>
              </motion.span>
              <motion.span
                whileHover={{ scale: 1.2 }}
                className="cart__icon"
                onClick={navigationToCart}
              >
                <i className="ri-shopping-bag-line"></i>
                <div className="badge">{totalQuantity}</div>
              </motion.span>
              <Tippy
                hideOnClick
                interactive={true}
                delay={[0, 400]}
                placement="bottom-start"
                render={(attrs) => (
                  <div className="box__actions" tabIndex="-1" {...attrs}>
                    {currentUser ? (
                      <div className="box__actions__menu" onClick={logout}>
                        <p>Logout</p>
                      </div>
                    ) : (
                      <div className="box__actions__menu">
                        <Link to="/login">Login</Link>
                        <Link to="register">Register</Link>
                      </div>
                    )}
                  </div>
                )}
              >
                <div className="profile__actions">
                  <motion.img
                    whileHover={{ scale: 1.2 }}
                    src={currentUser ? currentUser.photoURL : userIcon}
                    alt="user icon"
                  />
                </div>
              </Tippy>
            </div>
            <div className="mobile__menu">
              <i className="ri-menu-line"></i>
            </div>
          </div>
        </Row>
      </Container>
    </header>
  );
}
