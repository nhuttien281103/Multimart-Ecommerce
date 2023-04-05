import React, { useState } from "react";
import { Col, Container, Form, FormGroup, Row } from "reactstrap";
import { Helmet } from "../components/Helmet/Helmet";
import { toast } from "react-toastify";
import { auth } from "../firebase.config";
import { sendPasswordResetEmail } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export const ForgetPassword = () => {
  const [emailtest, setEmail] = useState("");
  const navigate = useNavigate();
  const resetPassword = (e) => {
    e.preventDefault();
    sendPasswordResetEmail(auth, emailtest)
      .then(() => {
        // Password reset email sent!
        console.log("test reset password sent");
        navigate("/login");
        toast.success("Send email!", { theme: "dark", autoClose: 2000 });
      })
      .catch((error) => {
        toast.error(error.message, { theme: "dark", autoClose: 2000 });
      });
  };
  return (
    <Helmet title="Login">
      <section>
        <Container>
          <Row>
            <Col lg="6" className="m-auto text-center form__login">
              <h2 className="form__login__title">Forget password</h2>
              <Form onSubmit={resetPassword}>
                <FormGroup className="form__group">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={emailtest}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </FormGroup>
                <button type="submit" className="buy__btn mt-3">
                  Reset password
                </button>
              </Form>
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};
