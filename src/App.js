import React, { Component } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Appbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";

class App extends Component {
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

        {this.state.tracker ? (
          <>
            <Routes>
              <Route path="/" element={<Navigate to="/dashboard" />} />
              <Route path="/login" element={<Navigate to="/dashboard" />} />
              <Route
                path="/registration"
                element={<Navigate to="/dashboard" />}
              />
              <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
          </>
        ) : (
          <>
            <Routes>
              {" "}
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/registration" element={<Signup />} />
              <Route path="/dashboard" element={<Navigate to="/login" />} />
            </Routes>
          </>
        )}
      </BrowserRouter>
    );
  }
}

export default App;
