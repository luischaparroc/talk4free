import React from "react";
import { Modal, Button, Badge } from "react-bootstrap";
import ModalVideo from "../../../../ModalVideo/ModalVideo";
import opentok from "../../../../../controllers/opentok";
import socketIOClient from "socket.io-client";
import {
  UserId,
  addUserToRoom,
  removeUserFromRoom,
  getRoomId,
  increaseUserFromRoom,
  joinInRoomId
} from "../../../../../controllers/ApiRequests";

class JoinRoomModal extends React.Component {
  state = {
    joined: false,
    userId: null,
    roomId: null,
    userToken: null
  };

  onSubmit = async () => {
    // verify if user can join
    const user_id = await UserId(this.props.email);
    const roomId = await getRoomId(this.props.sessionId);
    const is_able = await joinInRoomId(roomId);
    if (is_able) {
      console.log("Joining...");
      const socket = socketIOClient(`${process.env.REACT_APP_SOCKECT_URL}`);
      const user_token = await opentok.generateToken(this.props.sessionId);
      await addUserToRoom(roomId, user_id);
      await increaseUserFromRoom(roomId);

      this.setState({
        joined: true,
        userToken: user_token,
        userId: user_id,
        roomId: roomId
      });
      socket.emit("closeUserSignal", true);
      this.props.onUpdate();
    }
  };

  handleClose = async () => {
    await removeUserFromRoom(this.state.roomId, this.state.userId);
    this.props.handleClose();
  };

  render() {
    if (!this.state.joined) {
      return (
        <Modal show={this.props.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>
              {" "}
              <p>
                <Badge variant="warning">{this.props.lang}</Badge>
                {this.props.level}
              </p>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>Woohoo, you're aboout to join this call!</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.props.handleClose}>
              Cancel
            </Button>
            <Button variant="primary" onClick={this.onSubmit}>
              Join Call
            </Button>
          </Modal.Footer>
        </Modal>
      );
    } else {
      return (
        <ModalVideo
          show={true}
          sessionId={this.props.sessionId}
          token={this.state.userToken}
          roomId={this.state.roomId}
          userId={this.state.userId}
          onUpdate={this.props.onUpdate}
          handleClose={this.handleClose}
          email={this.props.email}
          username2={this.props.username}
          img={this.props.img}
        />
      );
    }
  }
}

export default JoinRoomModal;
