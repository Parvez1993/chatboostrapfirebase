import React, { Component } from "react";
import { Container, Navbar, Nav } from "react-bootstrap";

export class Appbar extends Component {
  render() {
    return (
      <Navbar expand="lg" className="primary">
        <Container>
          <Navbar.Brand href="/" className="text-white">
            Timewaste Zone
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link href="/login" className="text-white fs-5 ">
                Login
              </Nav.Link>
              <Nav.Link href="/registration" className="text-white fs-5 ">
                Registration
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
  }
}

export default Appbar;
