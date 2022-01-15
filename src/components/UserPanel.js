import { signOut } from "firebase/auth";
import React, { Component } from "react";
import {
  Alert,
  Button,
  Dropdown,
  DropdownButton,
  Form,
  Modal,
} from "react-bootstrap";
import { connect } from "react-redux";
import { auth } from "../firebase";
import { removeUser, removeUserPic } from "../redux/action";
import ProgressBar from "react-bootstrap/ProgressBar";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { getDatabase, ref as refer, set } from "@firebase/database";
class UserPanel extends Component {
  state = {
    err: "",
    show: false,
    file: "",
    progress: "",
  };

  //handle modal
  handleClose = () => this.setState({ show: false });
  handleShow = () => this.setState({ show: true });

  uploadImage = (e) => {
    this.setState({ file: e.target.files[0] });
  };

  //handleImage

  handleSubmit = () => {
    if (this.state.file) {
      const storage = getStorage();
      const storageRef = ref(storage, `files/${this.state.file.name}`);

      const uploadTask = uploadBytesResumable(storageRef, this.state.file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progressbar = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );

          this.setState({ progress: progressbar });
          this.setState({ file: "" });
        },
        (error) => {
          console.log(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((url) => {
            const db = getDatabase();
            set(refer(db, "users/" + this.props.user.uid), {
              username: this.props.user.displayName,
              photoURL: url,
            }).then(() => {
              this.setState({ progress: "" });
              this.handleClose();
            });
          });
        }
      );
    } else {
      this.setState({ err: "No image selected" });
    }
  };

  handlelogout = () => {
    signOut(auth)
      .then(() => {
        this.props.removeUser();
      })
      .then(() => {
        this.props.removeUserPic();
      })
      .catch((error) => {
        this.setState({ err: error });
      });
  };
  render() {
    console.log(this.props.user);
    return (
      <>
        {this.state.err ? <Alert>{this.state.err}</Alert> : ""}
        <div className="d-flex justify-content-center mt-3">
          <DropdownButton
            id="dropdown-basic-button"
            title="Profile"
            variant="warning"
          >
            <Dropdown.Item disabled>
              {this.props.user.displayName}
            </Dropdown.Item>
            <Dropdown.Item onClick={this.handlelogout}>Logout</Dropdown.Item>
            <Dropdown.Item onClick={this.handleShow}>
              Change Profile Pic
            </Dropdown.Item>
          </DropdownButton>
        </div>

        {/* //modal */}

        <Modal
          show={this.state.show}
          onHide={this.handleClose}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>Change Profile Picture</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <input
                type="file"
                name="image"
                placeholder="Upload an Image"
                onChange={this.uploadImage}
              />
            </Form>
            {this.state.progress ? (
              <ProgressBar now={this.state.progress} />
            ) : (
              ""
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleClose}>
              Cancel
            </Button>
            <Button variant="primary" onClick={this.handleSubmit}>
              Ok
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}

export default connect(null, { removeUser, removeUserPic })(UserPanel);
