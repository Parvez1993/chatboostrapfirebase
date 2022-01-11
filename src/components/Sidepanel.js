import React, { Component } from "react";
import { Image } from "react-bootstrap";
import UserPanel from "./UserPanel";

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
        <div className="d-flex justify-content-center mt-3">
          <UserPanel user={this.props.user} />
        </div>
      </>
    );
  }
}

export default Sidepanel;
