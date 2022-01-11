import React, { Component } from "react";
import { Button, Col, Image, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./home.css";
export default class Banner extends Component {
  render() {
    return (
      <Row>
        <Col md={6} sm={12} className="banner_col1 myfilter">
          <div className="bg-white p-5 w-75 position" style={{ opacity: 0.9 }}>
            <div className="text-center py-2">
              <h2>Login and have fun</h2>
              <Link to="/login">
                <Button variant="success" className="btn-lg w-50 mt-3">
                  Login
                </Button>
              </Link>
            </div>
          </div>
        </Col>
        <Col md={6} sm={12} className="banner_col2 myfilter2">
          <div className="bg-dark p-5 w-75 position" style={{ opacity: 0.9 }}>
            <div className="text-center text-white py-2">
              <h2>Join us and find new buddies</h2>
              <Link to="/registration">
                <Button className="btn-lg w-50 mt-3">Register</Button>
              </Link>
            </div>
          </div>
        </Col>
      </Row>
    );
  }
}
