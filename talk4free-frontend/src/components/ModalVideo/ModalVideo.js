import React, { useState } from "react";
import { Modal, Col } from "react-bootstrap";
import Video from "./Video/Video";
import Chat from "./Chat/Chat";
import socketIOClient from "socket.io-client";
// import { decreaseUserFromRoom } from "../../controllers/ApiRequests";

const ModalVideo = props => {
  const [show, setShow] = useState(true);
  const [session, setSession] = useState(null);

  const handleClose = () => {
    // Delete one user from the room
    // decreaseUserFromRoom(props.roomId);
    const socket = socketIOClient(`${process.env.REACT_APP_SOCKECT_URL}`);
    socket.emit("closeUserSignal", true);
    socket.emit("closeRoom", true);
    // Check if session is conected
    setShow(false);
    props.handleClose();
  };

  const handleSession = data => {
    setSession(data);
  };
  const handleOTSession = () => {
    if (show) {
      //If not published, make it published.
      return (
        <Video
          apiKey={process.env.REACT_APP_OPENTOK_API_KEY}
          sessionId={props.sessionId}
          token={props.token}
          roomId={props.roomId}
          userId={props.userId}
          onHangUp={handleClose}
          email={props.email}
          username={props.username}
          username2={props.username2}
          img={props.img}
          session={handleSession}
        />
      );
    } else {
      // I do this to unmount the session so it can be disconnected
      return <p>Loading...</p>;
    }
  };

  return (
    <Modal
      show={show}
      onHide={handleClose}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Body className="row" style={{ padding: "0px", margin: "0px" }}>
        <Col md={7} className="video">
          {handleOTSession()}
        </Col>
        <Col md={5} className="chat">
          <Chat
            session={session}
            username={props.username}
            username2={props.username2}
            img={props.img}
          />
        </Col>
      </Modal.Body>
    </Modal>
  );
};

export default ModalVideo;
