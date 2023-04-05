import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Col, Container, Form, FormGroup, Row } from "reactstrap";
import { Helmet } from "../components/Helmet/Helmet";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db, storage } from "../firebase.config";
import { toast } from "react-toastify";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";

export default function Register() {
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      const storageRef = ref(storage, `images/${Date.now() + username}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        (error) => {
          toast.error(error.message, { theme: "dark", autoClose: 2000 });
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await updateProfile(user, {
              // update user profile
              displayName: username,
              photoURL: downloadURL,
            });

            // store user data db
            await setDoc(doc(db, "users", user.uid), {
              uid: user.uid,
              displayName: username,
              email,
              photoURL: downloadURL,
            });
          });
        }
      );
      console.log(user);
      setLoading(false);
      toast.success("Register successfully!", {
        theme: "dark",
        autoClose: 2000,
      });
      navigate("/login");
    } catch (error) {
      setLoading(false);
      toast.error("Something went wrong", { theme: "dark", autoClose: 2000 });
    }
  };
  return (
    <Helmet title="Register">
      <section>
        <Container>
          <Row>
            <Col lg="6" className="m-auto text-center form__login">
              <h2 className="form__login__title">Register</h2>
              <Form onSubmit={submit}>
                <FormGroup className="form__group">
                  <input
                    type="text"
                    placeholder="Enter username"
                    value={username}
                    onChange={(e) => setUserName(e.target.value)}
                  />
                </FormGroup>
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
                    type="text"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </FormGroup>
                <FormGroup className="form__group">
                  <input
                    type="file"
                    onChange={(e) => setFile(e.target.files[0])}
                  />
                </FormGroup>

                <button type="submit" className="buy__btn mt-3">
                  Create an account
                </button>
              </Form>
              <p>
                Don't have an account? <Link to="/login">Login</Link>
              </p>
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
}
