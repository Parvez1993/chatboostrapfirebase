import React, { Component } from "react";
import { getDatabase, ref, onValue } from "firebase/database";
import { Form, Image, ListGroup } from "react-bootstrap";
import { connect } from "react-redux";
import { setFriend, setGroup } from "../redux/action";
export class Friends extends Component {
  state = {
    friends: "",
    err: "",
    click: false,
    active: "",
    firstLoad: true,
    searchTerm: "",
    searchLoading: "",
    searchResults: [],
  };

  componentDidMount() {
    let arr = [];
    const db = getDatabase();
    const groupRef = ref(db, "users");
    onValue(groupRef, (snapshot) => {
      snapshot.forEach((item) => {
        const temp = {
          id: item.key,
          userName: item.val().username,
          photoURL: item.val().photoURL,
        };
        arr.push(temp);
      });
      this.setState({ friends: arr });
      arr = [];
    });
  }

  friendsChange = (friend) => {
    this.props.setGroup(friend);
    this.setState({ active: friend.id });
  };

  //handleSearch
  handleSearchTerm = (e) => {
    this.setState({ searchTerm: e.target.value, searchLoading: true }, () =>
      this.handleSearch()
    );
  };

  handleSearch = () => {
    const friends = [...this.state.friends];

    const regex = new RegExp(this.state.searchTerm, "gi");

    const searchReducer = friends.reduce((init, friends) => {
      if (friends.userName && friends.userName.match(regex)) {
        init.push(friends);
      }

      return init;
    }, []);

    this.setState({ searchResults: searchReducer, searchLoading: false });
  };
  render() {
    return (
      <>
        <div className="d-flex justify-content-between align-items-center mt-2 text-white">
          <div>
            <h5>
              Friends (
              {this.state.friends.length ? this.state.friends.length : 0})
            </h5>
          </div>
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
                        this.friendsChange(item);
                      }}
                    >
                      <div className="d-flex justify-content-between align-items-center">
                        <div>
                          <h6>{item.userName}</h6>
                        </div>
                        <div>
                          <Image
                            src={item.photoURL}
                            alt={item.userName}
                            thumbnail
                            style={{ height: "40px" }}
                          />
                        </div>
                      </div>
                    </ListGroup.Item>
                  </ListGroup>
                );
              })
            : this.state.friends
            ? this.state.friends.map((item, k) => {
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
                        this.friendsChange(item);
                      }}
                    >
                      <div className="d-flex justify-content-between align-items-center">
                        <div>
                          <h6>{item.userName}</h6>
                        </div>
                        <div>
                          <Image
                            src={item.photoURL}
                            alt={item.userName}
                            thumbnail
                            style={{ height: "40px" }}
                          />
                        </div>
                      </div>
                    </ListGroup.Item>
                  </ListGroup>
                );
              })
            : "No Friends :("}
        </div>
      </>
    );
  }
}

export default connect(null, { setFriend, setGroup })(Friends);
