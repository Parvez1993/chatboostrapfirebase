import React, { Component } from "react";
import { Button, Modal, Alert, ListGroup, Form } from "react-bootstrap";
import { PlusCircleFill } from "react-bootstrap-icons";
import { getDatabase, ref, push, set, onValue } from "firebase/database";
import { connect } from "react-redux";
import { setGroup } from "../redux/action";
export class Groups extends Component {
  state = {
    groups: "",
    show: false,
    groupName: "",
    groupTagline: "",
    err: "",
    click: false,
    active: "",
    firstLoad: true,
    searchTerm: "",
    searchLoading: "",
    searchResults: [],
  };

  //   modal handle
  handleClose = () => this.setState({ show: false });
  handleShow = () => this.setState({ show: true });

  //handleInput

  handleInput = async (e) => {
    e.preventDefault();
    let value = e.target.value;
    await this.setState({ [e.target.name]: value });
  };

  formvalidation({ groupName, groupTagline }) {
    if (!groupName.length || !groupTagline.length) {
      this.setState({ err: "Please fill all the Fields" });
    } else {
      return true;
    }
  }

  handleSubmit = (e) => {
    if (this.formvalidation(this.state)) {
      const db = getDatabase();
      const postListRef = ref(db, "groups");
      const newPostRef = push(postListRef);
      set(newPostRef, {
        groupName: this.state.groupName,
        groupTagline: this.state.groupTagline,
        createdBy: this.props.user.displayName,
      }).then(() => {
        this.setState({ err: "" });
        this.setState({ groupName: "" });
        this.setState({ groupTagline: "" });
        this.handleClose();
      });
    } else {
      this.setState({ err: "Cannot Create Please Try Again" });
    }
  };

  // load the groups on first render

  componentDidMount() {
    let arr = [];
    const db = getDatabase();
    const groupRef = ref(db, "groups");
    onValue(groupRef, (snapshot) => {
      snapshot.forEach((item) => {
        const temp = {
          id: item.key,
          groupName: item.val().groupName,
          groupTagline: item.val().groupTagline,
          createdBy: item.val().createdBy,
        };
        arr.push(temp);
      });
      this.setState({ groups: arr }, this.initialGroup);
      arr = [];
    });
  }

  // set initial loading of the group

  initialGroup = () => {
    let firstGroup = this.state.groups[0];
    if (this.state.firstLoad && this.state.groups.length > 0) {
      this.props.setGroup(firstGroup);
      //set active id
      this.setState({ active: firstGroup.id });
    }
  };

  groupChange = (group) => {
    this.props.setGroup(group);
    this.setState({ active: group.id });
  };

  alertClicked = () => {
    this.setState({ click: !this.state.click });
  };

  //handleSearch
  handleSearchTerm = (e) => {
    this.setState({ searchTerm: e.target.value, searchLoading: true }, () =>
      this.handleSearch()
    );
  };

  handleSearch = () => {
    const groups = [...this.state.groups];

    const regex = new RegExp(this.state.searchTerm, "gi");

    const searchReducer = groups.reduce((init, group) => {
      if (group.groupName && group.groupName.match(regex)) {
        init.push(group);
      }

      return init;
    }, []);

    this.setState({ searchResults: searchReducer, searchLoading: false });
  };
  render() {
    return (
      <>
        <div className="d-flex justify-content-between align-items-center mt-5 text-white">
          <div>
            <h5>
              Groups ({this.state.groups.length ? this.state.groups.length : 0})
            </h5>
          </div>
          <div>
            <PlusCircleFill
              style={{ fontSize: "30px" }}
              className="addHover"
              onClick={this.handleShow}
            />
          </div>

          <Modal show={this.state.show} onHide={this.handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Choose a Trendy Group Name</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {this.state.err ? (
                <Alert variant="danger">{this.state.err}</Alert>
              ) : (
                ""
              )}
              <form>
                <div className="row">
                  <div className="col">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Group name"
                      aria-label="Group name"
                      required
                      name="groupName"
                      value={this.state.groupName}
                      onChange={this.handleInput}
                    />
                  </div>
                  <div className="col">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Group tagline"
                      aria-label="Group tagline"
                      required
                      name="groupTagline"
                      value={this.state.groupTagline}
                      onChange={this.handleInput}
                    />
                  </div>
                </div>
              </form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={this.handleClose}>
                Close
              </Button>
              <Button className="fourth" onClick={this.handleSubmit}>
                Create
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
        <Form.Control
          type="text"
          placeholder="search"
          name="searchMessage"
          className="mt-2"
          onChange={this.handleSearchTerm}
        />
        <div
          style={{ height: "120px", overflowY: "scroll", background: "white" }}
          className="mt-3"
        >
          {this.state.searchTerm
            ? this.state.searchResults.map((item, k) => {
                return (
                  <ListGroup
                    key={k}
                    className="list-group-flush"
                    style={{ background: "none" }}
                  >
                    <ListGroup.Item
                      className={
                        item.id === this.state.active
                          ? "menu_item active"
                          : "menu_item"
                      }
                      onClick={() => {
                        this.groupChange(item);
                      }}
                    >
                      <h6>{item.groupName}</h6>{" "}
                    </ListGroup.Item>
                  </ListGroup>
                );
              })
            : this.state.groups
            ? this.state.groups.map((item, k) => {
                return (
                  <ListGroup
                    key={k}
                    className="list-group-flush"
                    style={{ background: "none" }}
                  >
                    <ListGroup.Item
                      className={
                        item.id === this.state.active
                          ? "menu_item active"
                          : "menu_item"
                      }
                      onClick={() => {
                        this.groupChange(item);
                      }}
                    >
                      <h6>{item.groupName}</h6>{" "}
                    </ListGroup.Item>
                  </ListGroup>
                );
              })
            : "No Groups created"}
        </div>
      </>
    );
  }
}

export default connect(null, { setGroup })(Groups);
