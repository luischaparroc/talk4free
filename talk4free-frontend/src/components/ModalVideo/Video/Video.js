import React from "react";
import ConnectionStatus from "./ConnectionStatus";
import Publisher from "./Publisher";
import CheckBox from "./CheckBox";
import socketIOClient from "socket.io-client";

import { Button } from "react-bootstrap";
import { FaPhone } from "react-icons/fa";
import { OTSession, OTStreams, OTSubscriber } from "opentok-react";
import "./Video.scss";
import {
  removeUserFromRoom,
  decreaseUserFromRoom
} from "../../../controllers/ApiRequests";

export default class Video extends React.Component {
  state = {
    error: null,
    connected: false,
    apiKey: this.props.apiKey,
    sessionId: this.props.sessionId,
    token: this.props.token,
    userId: this.props.userId,
    roomId: this.props.roomId,
    // Child Components
    audio: true,
    video: false,
    videoSource: "camera",
    otSession: React.createRef()
  };
  sessionEvents = {
    sessionConnected: () => {
      this.setState({ connected: true });
    },
    sessionDisconnected: () => {
      this.setState({ connected: false });
    },
    streamCreated: event => {
      console.log("Stream created!", event);
    },
    streamDestroyed: event => {
      console.log("Stream destroyed!", event);
    }
  };
  onError = err => {
    this.setState({ error: `Failed to connect: ${err.message}` });
  };

  componentCleanup = () => {
    removeUserFromRoom(this.state.roomId, this.state.userId);
    decreaseUserFromRoom(this.state.roomId);
    const socket = socketIOClient(`${process.env.REACT_APP_SOCKECT_URL}`);
    socket.emit("closeVideo", `${this.state.userId}`);
  };

  componentDidMount() {
    this.props.session(this.state.otSession);
    window.addEventListener("beforeunload", this.componentCleanup);
  }

  componentWillUnmount() {
    this.componentCleanup();
    window.removeEventListener("beforeunload", this.componentCleanup);
  }

  setAudio = audio => {
    this.setState({ audio });

    // con esto escucho
    // this.state.otSession.current.sessionHelper.session.on("signal:msg", e =>
    //   console.log(e, e.data)
    // );

    // // con esto envio un signal
    // this.state.otSession.current.sessionHelper.session.signal(
    //   {
    //     type: "msg",
    //     data: "hello lindo"
    //   },
    //   function(error) {
    //     if (error) {
    //       console.log("Error sending signal:", error.name, error.message);
    //     } else {
    //       console.log("sent");
    //     }
    //   }
    // );

    // session.on('signal:msg', function(event) {
    //   var msg = document.createElement('p');
    //   msg.innerText = event.data;
    //   msg.className = event.from.connectionId === session.connection.connectionId ? 'mine' : 'theirs';
    //   msgHistory.appendChild(msg);
    //   msg.scrollIntoView();
    // });
  };

  setVideo = video => {
    this.setState({ video });
  };

  changeVideoSource = videoSource => {
    this.state.videoSource !== "camera"
      ? this.setState({ videoSource: "camera" })
      : this.setState({ videoSource: "screen" });
  };

  render() {
    return (
      <React.Fragment>
        <ConnectionStatus connected={this.state.connected} />
        <OTSession
          ref={this.state.otSession}
          apiKey={this.props.apiKey}
          sessionId={this.props.sessionId}
          token={this.props.token}
          eventHandlers={this.sessionEvents}
          onError={this.onError}
          style={{ diplay: "flex", flexDirection: "column" }}
        >
          {this.state.error ? <div id="error">{this.state.error}</div> : null}
          <div className="publisher">
            <Publisher
              error={this.state.error}
              audio={this.state.audio}
              video={this.state.video}
              videoSource={this.state.videoSource}
              email={this.props.email}
              username={
                this.props.username ? this.props.username : this.props.username2
              }
              img={this.props.img}
            />
            <OTStreams style={{ display: "flex" }}>
              <OTSubscriber
                properties={{
                  // name: this.props.username2,
                  style: {
                    audioLevelDisplayMode: "on",
                    buttonDisplayMode: "off",
                    nameDisplayMode: "on",
                    backgroundImageURI: this.props.imgUrl
                  },
                  inserMode: "after"
                }}
              />
            </OTStreams>
          </div>
        </OTSession>
        {/* Take out the buttons so they will be only for one component */}
        <div className="controls">
          <CheckBox label="Screen" onChange={this.changeVideoSource} />
          <CheckBox
            label="Audio"
            initialChecked={this.state.audio}
            onChange={this.setAudio}
          />
          <CheckBox
            label="Video"
            initialChecked={this.state.video}
            onChange={this.setVideo}
          />
          <Button onClick={this.props.onHangUp}>
            <FaPhone />
          </Button>
        </div>
      </React.Fragment>
    );
  }
}
