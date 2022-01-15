import { onAuthStateChanged } from "firebase/auth";
import React, { Component } from "react";
import { Col, Row } from "react-bootstrap";
import { connect } from "react-redux";
import { Navigate } from "react-router-dom";
import { auth } from "../firebase";
import { removeUser, setUser, setUserPic } from "../redux/action";
import ColorPanel from "../components/ColorPanel";
import Sidepanel from "../components/Sidepanel";
import Message from "../components/Message";
import MetaPanel from "../components/MetaPanel";
import { getDatabase, onValue, ref } from "firebase/database";

class Dashboard extends Component {
  state = {
    photoUrl: "",
  };
  componentDidMount() {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.props.setUser(user);

        //get values from the database
        const db = getDatabase();
        const groupRef = ref(db, `users/${user.uid}`);
        onValue(groupRef, (snapshot) => {
          // snapshot.forEach((item) => {
          //   // this.props.setUserPic(item.val().photoURL);
          //   console.log(item);
          // });
          this.props.setUserPic(snapshot.val().photoURL);
        });
      } else {
        this.props.removeUser();
        <Navigate to="/login" />;
      }
    });
  }
  render() {
    return (
      <>
        {this.props.isLoading ? (
          "loading"
        ) : (
          <>
            <Row>
              <Col md={1} className="third" style={{ height: "100vh" }}>
                <ColorPanel />
              </Col>
              <Col md={2} className="sixth">
                <Sidepanel user={this.props.user} photo={this.props.photoURL} />
              </Col>
              <Col md={7} className="secondary">
                <Message
                  group={this.props.group}
                  user={this.props.user}
                  photo={this.props.photoURL}
                  friend={this.props.friend}
                />
              </Col>
              <Col md={2} className="fourth">
                <MetaPanel />
              </Col>
            </Row>
          </>
        )}
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  isLoading: state.user.isLoading,
  user: state.user.currentUser,
  photoURL: state.user.photoURL,
  group: state.group.currentGroup,
  friend: state.friend.currentFriend,
});

const mapDispatchToProps = {
  setUser: setUser,
  removeUser: removeUser,
  setUserPic: setUserPic,
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
