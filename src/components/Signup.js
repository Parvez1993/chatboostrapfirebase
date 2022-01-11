import React, { Component } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Alert,
  Spinner,
} from "react-bootstrap";
import Image from "react-bootstrap/Image";
import Mobile from "../images/register.png";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../firebase";
import { getDatabase, ref, set } from "firebase/database";
import { Navigate } from "react-router-dom";
export default class Signup extends Component {
  state = {
    username: "",
    email: "",
    password: "",
    confirm_password: "",
    error: "",
    success: "",
    loading: false,
    redirect: false,
  };
  handleInput = (e) => {
    e.preventDefault();
    this.setState({ [e.target.name]: e.target.value });
  };

  uploadImage = (e) => {
    this.setState({ file: e.target.files[0] });
  };

  checkForm = ({ username, email, password, confirm_password }) => {
    console.log(username, email, password, confirm_password);
    if (
      !username.length ||
      !email.length ||
      !password.length ||
      !confirm_password
    ) {
      this.setState({ error: "Fill all the form" });
    } else if (password.length < 6) {
      this.setState({ error: "Password must be at least 6 characters" });
    } else if (password !== confirm_password) {
      this.setState({ error: "Confirm Password does not match" });
    } else if (username.length < 4) {
      this.setState({ error: "Username too short" });
    } else {
      return true;
    }
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.setState({ loading: true });
    if (this.checkForm(this.state)) {
      createUserWithEmailAndPassword(
        auth,
        this.state.email,
        this.state.password
      )
        .then((userCredential) => {
          console.log(userCredential);
          updateProfile(auth.currentUser, {
            displayName: this.state.username,
            photoURL:
              "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
          }).then(() => {
            this.writeUserData(userCredential);
          });
        })
        .then(() => {
          this.setState({ username: "" });
          this.setState({ password: "" });
          this.setState({ email: "" });
          this.setState({ confirm_password: "" });
          this.setState({ error: "" });
          this.setState({ loading: false });
          this.setState({ redirect: true });
        })
        .then(() => {
          this.setState({ success: "Created Successfully" });
        })
        .catch((error) => {
          this.setState({ loading: false });
          this.setState({ error: error.message });
        });
    }
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
        () => this.setState({ success: "Redirecting Wait Please Login" }),
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
                <Image
                  src={Mobile}
                  fluid
                  alt="bg"
                  style={{ margin: "100px 100px" }}
                />
              </Col>
              <Col
                md={{ span: 6, offset: 2 }}
                className="border p-5 bg-white border border rounded"
              >
                {this.state.error.includes("Fill") ? (
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
                {this.state.success === "Redirecting Wait Please Login" && (
                  <Navigate to="/login" />
                )}
                <h3>Registration Form</h3>
                <Form
                  className="h-100 d-flex flex-column align-center justify-content-center"
                  onSubmit={this.handleSubmit}
                >
                  <Form.Group className="mb-3" controlId="display Name">
                    <Form.Label>Display Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="username"
                      name="username"
                      value={this.state.username}
                      onChange={this.handleInput}
                      style={
                        this.state.error.includes("Username")
                          ? { borderColor: "red" }
                          : {}
                      }
                    />
                    {this.state.error.includes("Username") ? (
                      <span className="text-danger">{this.state.error}</span>
                    ) : (
                      ""
                    )}

                    {this.state.success === "Redirecting...." && (
                      <Navigate to="/login" />
                    )}
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Enter email"
                      name="email"
                      onChange={this.handleInput}
                      value={this.state.email}
                      required
                    />
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

                  <Form.Group className="mb-3" controlId="confirm Password">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Confirm Password"
                      name="confirm_password"
                      onChange={this.handleInput}
                      value={this.state.confirm_password}
                      style={
                        this.state.error.includes("Confirm")
                          ? { borderColor: "red" }
                          : {}
                      }
                    />
                    {this.state.error.includes("Confirm") ? (
                      <span className="text-danger">{this.state.error}</span>
                    ) : (
                      ""
                    )}
                  </Form.Group>

                  <div className="d-flex justify-content-around mt-4">
                    <Button type="submit" className="primary w-25">
                      {this.state.loading ? (
                        <Spinner
                          as="span"
                          animation="grow"
                          size="sm"
                          role="status"
                          aria-hidden="true"
                        />
                      ) : (
                        ""
                      )}{" "}
                      <span className="fs-5">Submit</span>
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
