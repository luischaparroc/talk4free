import React from "react";
import { OTSubscriber } from "opentok-react";
// import CheckBox from "./CheckBox";
// import { Button } from "react-bootstrap";
// import { FaPhone } from "react-icons/fa";

class Subscriber extends React.Component {
  state = {
    error: null
    // audio: true,
    // video: true
  };

  // setAudio = audio => {
  //   this.setState({ audio });
  // };

  // setVideo = video => {
  //   this.setState({ video });
  // };

  onError = err => {
    this.setState({ error: `Failed to subscribe: ${err.message}` });
  };

  render() {
    return (
      <div className="subscriber">
        Subscriber
        {this.props.error ? <div id="error">{this.props.error}</div> : null}
        <OTSubscriber
          properties={{
            style: {
              audioLevelDisplayMode: "on",
              buttonDisplayMode: "off"
            },
            subscribeToAudio: this.props.audio,
            subscribeToVideo: this.props.video,
            insertMode: "append"
          }}
          onError={this.onError}
        />
        {/* <div className="controls">
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
        </div> */}
      </div>
    );
  }
}
export default Subscriber;
