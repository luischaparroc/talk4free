import React, { useState } from "react";
import "./CreateRoomModal.scss";
import { Modal, Button, Form, Col, Row } from "react-bootstrap";
import ModalVideo from "../../ModalVideo/ModalVideo";
import Languages from "../../../languagesEmojis";
import { useForm } from "react-hook-form";
import CreateSessionId from "../../../controllers/CreateSessionId";
import opentok from "../../../controllers/opentok";
import socketIOClient from "socket.io-client";
import {
  UserId,
  addUserToRoom,
  removeUserFromRoom,
  getRoomId,
  saveSession
} from "../../../controllers/ApiRequests";

function CreateRoomModal(props) {
  const socket = socketIOClient(`${process.env.REACT_APP_SOCKECT_URL}`);
  const [completed, setCompleted] = useState(false);
  const [sessionId, setSessionId] = useState(null);
  const [userToken, setUserToken] = useState(null);
  const [userId, setUserId] = useState("");
  const [roomId, setRoomId] = useState("");

  const { register, handleSubmit, errors } = useForm();

  const onSubmit = async data => {
    const session_id = await CreateSessionId();
    const user_token = await opentok.generateToken(session_id);
    const user_id = await UserId(props.email);
    console.log(`data ` + data);
    console.log(`session_id ` + session_id);
    console.log(`user_id` + user_id);
    await saveSession(data, session_id, user_id);
    const room_id = await getRoomId(session_id);
    console.log(`room_id ` + room_id + ` user_id ` + user_id);
    await addUserToRoom(room_id, user_id);
    socket.emit("createRoom", true);
    // Setting states
    setSessionId(session_id);
    setUserToken(user_token);
    setUserId(user_id);
    setRoomId(room_id);
    setCompleted(true);
    props.onUpdate();
  };

  const handleClose = async () => {
    // if there is a session goin on
    if (completed) {
      await removeUserFromRoom(roomId, userId);
      props.handleClose();
      setCompleted(false);
      // If no sessions just close the modal
    } else {
      props.handleClose();
    }
  };
  // Rendering the form or video in the modal
  const renderForm = () => {
    return (
      <React.Fragment>
        <Modal.Header>
          <Modal.Title>Create a Room</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Row>
              <Form.Group as={Col}>
                {/* <Form.Label>Language</Form.Label> */}
                <Form.Control
                  as="select"
                  name="lang"
                  ref={register({ required: true })}
                >
                  <option value="">Choose a language</option>
                  {Languages.map((lang, index) => {
                    return (
                      <option value={lang} key={index}>
                        {lang}
                      </option>
                    );
                  })}
                </Form.Control>
                {errors.lang && <small>Please select a language</small>}
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group as={Col} controlId="formGridEmail">
                {/* <Form.Label>Level</Form.Label> */}
                <Form.Control
                  as="select"
                  name="level"
                  ref={register({ required: true })}
                >
                  <option value="">Level</option>
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                </Form.Control>
                {errors.level && <small>Please choose a level</small>}
              </Form.Group>
              <Form.Group as={Col} controlId="formGridEmail">
                {/* <Form.Label>Max People</Form.Label> */}
                <Form.Control
                  as="select"
                  name="maxPeople"
                  ref={register({ required: true })}
                >
                  <option value="">Max People</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                </Form.Control>
                {errors.maxPeople && <small>Please select a number</small>}
              </Form.Group>
            </Form.Row>
            <Form.Row style={{ justifyContent: "center" }}>
              <Button variant="secondary" onClick={props.handleClose}>
                Cancel
              </Button>
              <Button variant="primary" type="submit" className="ml-3 ">
                Create Room
              </Button>
            </Form.Row>
          </Form>
        </Modal.Body>
      </React.Fragment>
    );
  };

  if (!completed) {
    return (
      <Modal show={props.show} onHide={handleClose} id="CreateRoomModal">
        <Row>
          <Col md={4} className="info">
            <Row>
              <div
                className="participant"
                style={{ backgroundImage: `url(${props.img})` }}
              ></div>
              <h4>Remember</h4>
              <p>
                You will get banned if sharing bad topics{" "}
                <a href="#Sdsd">Click here for more details</a>
              </p>
            </Row>
          </Col>
          <Col md={8}>{renderForm()}</Col>
        </Row>
      </Modal>
    );
  } else {
    return (
      <ModalVideo
        show={true}
        sessionId={sessionId}
        token={userToken}
        roomId={roomId}
        userId={userId}
        onUpdate={props.onUpdate}
        email={props.email}
        username={props.username}
        img={props.img}
        handleClose={handleClose}
      />
    );
  }
}

export default CreateRoomModal;
