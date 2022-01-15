import { getDatabase, onChildAdded, ref } from "firebase/database";
import React, { Component } from "react";
import { Col, Form, Image, ListGroup, Row } from "react-bootstrap";
import MessageForm from "./MessageForm";
import moment from "moment";

export class Message extends Component {
  state = {
    groupMsg: [],
  };

  componentDidUpdate(previousProps) {
    let arr = [];
    const db = getDatabase();
    const commentsRef = ref(db, "messages/");
    onChildAdded(commentsRef, (data) => {
      data.forEach((item) => {
        arr.push(item.val());
      });
      console.log(arr);
      if (previousProps.group) {
        if (previousProps.group.groupName !== this.props.group.groupName) {
          this.setState({ groupMsg: arr });
        }
      } else {
        this.setState({ groupMsg: arr });
      }
    });
  }
  render() {
    return (
      <ListGroup>
        <ListGroup.Item style={{ height: "10vh" }}>
          <Row>
            <Col md={6}>
              <h3>Have Fun!!!</h3>
            </Col>
            <Col md={6}>
              <Form.Control type="text" placeholder="search" />
            </Col>
          </Row>
        </ListGroup.Item>
        {console.log(this.state.groupMsg)}
        <ListGroup.Item style={{ height: "60vh", overflowY: "scroll" }}>
          <div>
            {this.state.groupMsg.map((i) =>
              i.group === this.props.group.id ? (
                <div>
                  <ListGroup>
                    <ListGroup.Item
                      as="li"
                      className="d-flex justify-content-between align-items-start"
                      style={i.sender === this.props.user.uid ? left : right}
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
