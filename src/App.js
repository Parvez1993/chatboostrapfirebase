import React, { Component } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Appbar from "./components/home/Navbar";
import Dashboard from "./pages/Dashboard";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";

export default class App extends Component {
  state = {
    tracker: false,
  };
  componentDidMount() {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.setState({ tracker: true });
      } else {
        this.setState({ tracker: false });
      }
    });
  }
  render() {
    return (
      <BrowserRouter>
        <Appbar />
        <Routes>
          {this.state.tracker ? (
            <>
              <Route path="/" element={<Dashboard />} />
              <Route path="/login" element={<Dashboard />} />
              <Route path="/registration" element={<Dashboard />} />
              <Route path="/dashboard" element={<Dashboard />} />
            </>
          ) : (
            <>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/registration" element={<Signup />} />
              <Route path="/dashboard" element={<Login />} />
            </>
          )}
        </Routes>
      </BrowserRouter>
    );
  }
}
