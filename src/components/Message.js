import {
  getDatabase,
  onChildAdded,
  onChildChanged,
  ref,
} from "firebase/database";
import React, { Component } from "react";
import { Col, Form, Image, ListGroup, Row } from "react-bootstrap";
import MessageForm from "./MessageForm";
import moment from "moment";

export class Message extends Component {
  state = {
    groupMsg: [],
    userCount: [],
    searchTerm: "",
    searchLoading: "",
    searchResults: [],
  };

  componentDidUpdate(previousProps) {
    let arr = [];
    let user = [];
    const db = getDatabase();
    const commentsRef = ref(db, "messages/");
    onChildAdded(commentsRef, (data) => {
      data.forEach((item) => {
        arr.push(item.val());
        if (
          user.indexOf(item.val().sender) === -1 &&
          this.props.group.id === item.val().group
        ) {
          user.push(item.val().sender);
        }
      });

      if (previousProps.group) {
        if (previousProps.group.groupName !== this.props.group.groupName) {
          this.setState({ groupMsg: arr });
          this.setState({ userCount: user });
        }
      } else {
        this.setState({ groupMsg: arr });
        this.setState({ userCount: user });
      }
    });
    onChildChanged(commentsRef, (data) => {
      data.forEach((item) => {
        arr.push(item.val());
        if (
          user.indexOf(item.val().sender) === -1 &&
          this.props.groupName.id === item.val().group
        ) {
          user.push(item.val().sender);
        }
      });

      if (previousProps.group) {
        if (previousProps.group.groupName !== this.props.group.groupName) {
          this.setState({ groupMsg: arr });
          this.setState({ userCount: user });
        }
      } else {
        this.setState({ groupMsg: arr });
        this.setState({ userCount: user });
      }
    });
    arr = [];
  }

  handleSearchTerm = (e) => {
    this.setState({ searchTerm: e.target.value, searchLoading: true }, () =>
      this.handleSearch()
    );
  };

  handleSearch = () => {
    const groupMsg = [...this.state.groupMsg];

    const regex = new RegExp(this.state.searchTerm, "gi");

    const searchReducer = groupMsg.reduce((init, message) => {
      if (message.message && message.message.match(regex)) {
        init.push(message);
      }

      return init;
    }, []);

    this.setState({ searchResults: searchReducer, searchLoading: false });
  };

  render() {
    return (
      <ListGroup>
        <ListGroup.Item style={{ height: "10vh" }}>
          <Row>
            <Col md={6}>
              <h3>Have Fun!!!</h3>
              <p>Total users: {this.state.userCount.length}</p>
            </Col>
            <Col md={6}>
              <Form.Control
                type="text"
                placeholder="search"
                name="searchMessage"
                onChange={this.handleSearchTerm}
              />
            </Col>
          </Row>
        </ListGroup.Item>
        <ListGroup.Item style={{ height: "60vh", overflowY: "scroll" }}>
          <div>
            {this.state.searchTerm
              ? this.state.searchResults.map((i) =>
                  i.group === this.props.group.id ? (
                    <div>
                      <ListGroup>
                        <ListGroup.Item
                          as="li"
                          className="d-flex justify-content-between align-items-start"
                          style={
                            i.sender === this.props.user.uid ? left : right
                          }
                        >
                          <div className="ms-2 me-auto">
                            <div className="fw-bold"> {i.message}</div>
                            Sent by: {i.username} {moment(i.date).fromNow()}
                          </div>
                          <Image
                            src={i.photoURL}
                            alt="pro_pic"
                            style={{
                              height: "30px",
                              width: "30px",
                              borderRadius: "50%",
                            }}
                          />
                        </ListGroup.Item>
                      </ListGroup>
                    </div>
                  ) : (
                    ""
                  )
                )
              : this.state.groupMsg.map((i) =>
                  i.group === this.props.group.id ? (
                    <div>
                      <ListGroup>
                        <ListGroup.Item
                          as="li"
                          className="d-flex justify-content-between align-items-start"
                          style={
                            i.sender === this.props.user.uid ? left : right
                          }
                        >
                          <div className="ms-2 me-auto">
                            <div className="fw-bold"> {i.message}</div>
                            Sent by: {i.username} {moment(i.date).fromNow()}
                          </div>
                          <Image
                            src={i.photoURL}
                            alt="pro_pic"
                            style={{
                              height: "30px",
                              width: "30px",
                              borderRadius: "50%",
                            }}
                          />
                        </ListGroup.Item>
                      </ListGroup>
                    </div>
                  ) : (
                    ""
                  )
                )}
          </div>
        </ListGroup.Item>
        <ListGroup.Item style={{ height: "20vh" }}>
          <MessageForm
            group={this.props.group}
            user={this.props.user}
            photo={this.props.photo}
            friend={this.props.friend}
          />
        </ListGroup.Item>
      </ListGroup>
    );
  }
}

let left = {
  background: "white",
};
let right = {
  background: "pink",
};
export default Message;
