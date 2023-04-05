import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Col, Container, Form, FormGroup, Row } from "reactstrap";
import { Helmet } from "../components/Helmet/Helmet";
import { signInWithEmailAndPassword } from "firebase/auth";
import { toast } from "react-toastify";
import { auth } from "../firebase.config";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const loginAction = (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const userCredential = signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log(user);
      setLoading(false);
      toast.success("Login Successfully!", { theme: "dark", autoClose: 2000 });
      navigate("/home");
    } catch (error) {
      setLoading(false);
      toast.error(error.message, { theme: "dark", autoClose: 2000 });
    }
  };
  return (
    <Helmet title="Login">
      <section>
        <Container>
          <Row>
            <Col lg="6" className="m-auto text-center form__login">
              <h2 className="form__login__title">Login</h2>
              <Form onSubmit={loginAction}>
                <FormGroup className="form__group">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </FormGroup>
                <FormGroup className="form__group">
                  <input
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </FormGroup>
                <button className="buy__btn mt-3">Login</button>
              </Form>
              <p>
                Don't have an account?{" "}
                <Link to="/register">Create an account</Link> <br />
                <Link to="/forgetpassword">Forget password?</Link>
              </p>
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
}
