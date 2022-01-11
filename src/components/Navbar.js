import React, { Component } from "react";
import { Container, Navbar } from "react-bootstrap";

export class Appbar extends Component {
  render() {
    return (
      <Navbar expand="lg" className="primary">
        <Container>
          <Navbar.Brand href="/" className="text-white">
            Timewaste Zone
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
        </Container>
      </Navbar>
    );
  }
}

export default Appbar;
