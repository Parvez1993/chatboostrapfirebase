import React, { Component } from "react";
import { Image } from "react-bootstrap";
import Groups from "./Groups";
import UserPanel from "./UserPanel";
import Friends from "./Friends.js";
export class Sidepanel extends Component {
  render() {
    return (
      <>
        <div className="d-flex justify-content-center mt-3">
          <Image
            className="text-center profile"
            src={this.props.photo}
            alt={this.props.user.displayName}
          />
        </div>
        <div>
          <UserPanel user={this.props.user} />
          <Groups user={this.props.user} />
          <Friends user={this.props.user} />
        </div>
      </>
    );
  }
}

export default Sidepanel;
