import React from "react";
import ParticipantsList from "./ParticipantsList/ParticipantsList";
import JoinRoomModal from "./JoinRoomModal/JoinRoomModal";
import { Row, Col, Button, Badge } from "react-bootstrap";
import "./Room.scss";

class Room extends React.Component {
  state = {
    showModal: false
  };

  showJoinRoomModal = () => {
    if (this.props.isLoggedIn) {
      this.setState({
        showModal: !this.state.showModal
      });
    } else {
      alert("Please sign in");
    }
  };

  render() {
    if (this.state.showModal) {
      return (
        <JoinRoomModal
          show={this.state.showModal}
          handleClose={this.showJoinRoomModal}
          lang={this.props.room.lang}
          level={this.props.room.lvl}
          sessionId={this.props.room.session_id}
          email={this.props.email}
          username={this.props.username}
          img={this.props.img}
          onUpdate={this.props.onUpdate}
        />
      );
    } else {
      return (
        <Col className="text-center room-box">
          <Row className="room-box-header">
            <p>
              <Badge variant="warning">{this.props.room.lang}</Badge>
              {this.props.room.lvl}
            </p>
          </Row>
          <Row className="room-box-body">
            <ParticipantsList participants={this.props.users} />
          </Row>
          <Row className="room-box-footer">
            <Button variant="primary" onClick={this.showJoinRoomModal}>
              <i className="material-icons">perm_phone_msg</i>Join now!
            </Button>
          </Row>
        </Col>
      );
    }
  }
}

export default Room;
