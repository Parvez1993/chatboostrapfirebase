import React, { Component } from "react";
import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";
import Image from "react-bootstrap/Image";
import Mobile from "../images/Mobile.png";
import { FaGoogle } from "react-icons/fa";
import { Navigate } from "react-router-dom";
import {
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../firebase";
import { getDatabase, set, ref } from "firebase/database";
export default class Login extends Component {
  state = {
    email: "",
    password: "",
    error: "",
    success: "",
    loading: false,
    redirect: false,
  };

  //handle Input from the users

  handleInput = (e) => {
    e.preventDefault();
    this.setState({ [e.target.name]: e.target.value });
  };

  //handle Submit

  handleSubmit = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, this.state.email, this.state.password)
      .then((user) => {
        this.setState({ success: "You have logged in Successfully" });
        this.setState({ redirect: true });
      })
      .catch((error) => {
        this.setState({ error: "User/Password not correct" });
      });
  };

  googleLoginHandler = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential?.accessToken;
        // The signed-in user info.
        const user = result.user;
        // console.log({ credential, token, user });

        const db = getDatabase();
        set(ref(db, "users/" + user.uid), {
          username: user.displayName,
          photoURL: user.photoURL,
        });

        this.setState({ redirect: true });
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        console.log({ errorCode, errorMessage, email, credential });
      });
  };

  writeUserData = (user) => {
    const db = getDatabase();
    set(ref(db, "users/" + user.user.uid), {
      username: user.user.displayName,
      photoURL: user.user.photoURL,
    });
  };

  componentDidUpdate() {
    if (this.state.redirect === true) {
      this.timer = setInterval(
        () => this.setState({ success: "Redirect" }),
        5000
      );
    }

    console.log(this.state.success);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  render() {
    return (
      <>
        <div
          className="bg-dark d-flex flex-column justify-content-center"
          style={{ height: "95vh" }}
        >
          <Container className="">
            <Row>
              <Col md={4}>
                <Image src={Mobile} fluid alt="bg" className="h-100" />
              </Col>
              <Col
                md={{ span: 6, offset: 2 }}
                className="border p-5 bg-white border border rounded"
              >
                <h3>Login Form</h3>
                {this.state.error ? (
                  <span className="text-danger">
                    {" "}
                    <Alert variant="danger">{this.state.error}</Alert>
                  </span>
                ) : (
                  ""
                )}

                {this.state.success ? (
                  <span className="text-success">
                    {" "}
                    <Alert variant="success">{this.state.success}</Alert>
                  </span>
                ) : (
                  ""
                )}

                {this.state.success === "Redirect" && (
                  <Navigate to="/dashboard" />
                )}

                <Form
                  className="h-100 d-flex flex-column align-center justify-content-center"
                  onSubmit={this.handleSubmit}
                >
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Enter email"
                      name="email"
                      onChange={this.handleInput}
                      value={this.state.email}
                      style={
                        this.state.error.includes("Email")
                          ? { borderColor: "red" }
                          : {}
                      }
                      required
                    />
                    {this.state.error.includes("Email") ? (
                      <span className="text-danger">{this.state.error}</span>
                    ) : (
                      ""
                    )}
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Password"
                      name="password"
                      value={this.state.password}
                      onChange={this.handleInput}
                      style={
                        this.state.error.includes("Password")
                          ? { borderColor: "red" }
                          : {}
                      }
                    />
                    {this.state.error.includes("Password") ? (
                      <span className="text-danger">{this.state.error}</span>
                    ) : (
                      ""
                    )}
                  </Form.Group>

                  <div className="d-flex justify-content-around mt-4">
                    <Button type="submit" className="primary w-25">
                      <span className="fs-5">Submit</span>
                    </Button>
                    <Button
                      style={{ background: "blue" }}
                      onClick={this.googleLoginHandler}
                    >
                      <span className="fs-5">
                        <FaGoogle className=""></FaGoogle> Sign with Google
                      </span>
                    </Button>
                  </div>
                  <div className="border text-center mt-5 p-2 border-secondary">
                    <h5>Don't have an account? Click here</h5>
                  </div>
                </Form>
              </Col>
            </Row>
          </Container>
        </div>
      </>
    );
  }
}
