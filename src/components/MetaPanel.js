import React, { Component } from "react";
import { ListGroup } from "react-bootstrap";
import { connect } from "react-redux";

export class MetaPanel extends Component {
  render() {
    console.log(this.props.group);
    return (
      <>
        {this.props.group ? (
          <ListGroup>
            <ListGroup.Item className="m-3">
              Group Created by: {this.props.group.createdBy}
            </ListGroup.Item>
            <ListGroup.Item className="m-3">
              Group Name: {this.props.group.groupName}
            </ListGroup.Item>
            <ListGroup.Item className="m-3">
              Group Tagline: {this.props.group.groupTagline}
            </ListGroup.Item>
          </ListGroup>
        ) : (
          "no"
        )}
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  group: state.group.currentGroup,
});

export default connect(mapStateToProps, null)(MetaPanel);
