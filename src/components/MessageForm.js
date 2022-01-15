import React, { Component } from "react";
import { Alert, Button, Col, Form, Row } from "react-bootstrap";
import { getDatabase, push, ref, set, child } from "@firebase/database";
export class MessageForm extends Component {
  state = { message: "", err: "", typing: false };
  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleMsgSubmit = () => {
    if (this.state.message) {
      const db = getDatabase();
      const postListRef = ref(db, "messages");
      const newPostRef = push(child(postListRef, `${this.props.group.id}`));
      set(newPostRef, {
        message: this.state.message,
        date: Date(),
        sender: this.props.user.uid,
        group: this.props.group.id,
        username: this.props.user.displayName,
        photoURL: this.props.photo,
      }).then(() => {
        this.setState({ message: "" });
      });
      this.setState({ err: "" });
    } else {
      this.setState({ err: "Add a message" });
    }
  };
  render() {
    return (
      <>
        <Form.Control
          size="lg"
          type="text"
          placeholder="Type Here"
          onChange={this.handleChange}
          name="message"
          value={this.state.message}
        />

        <Row className="mt-4">
          <Col sm={6}>
            <div className="d-grid gap-2">
              <Button variant="success" onClick={this.handleMsgSubmit}>
                Send
              </Button>
            </div>
          </Col>
          <Col sm={6}>
            <div className="d-grid gap-2">
              {" "}
              <Button variant="secondary">Media</Button>
            </div>
          </Col>
        </Row>
        {this.state.err ? <Alert variant="danger">{this.state.err}</Alert> : ""}
      </>
    );
  }
}

export default MessageForm;
