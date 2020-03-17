import React from "react";
import { OTSession, OTPublisher, OTStreams, OTSubscriber } from "opentok-react";
import { Button } from "react-bootstrap";
import axios from "axios";
import "./Video.scss";

export default class Video extends React.Component {
  state = {
    apiKey: this.props.apiKey,
    sessionId: this.props.sessionId,
    token: this.props.token,
    otPublisher: React.createRef()
    // publisherVideo: false
    // streamCreated: false
  };

  publisherProperties = {
    // audioFallbackEnabled: false,
    // insertDefaultUI: true,
    // showControls: true,
    // style: {
    //   audioLevelDisplayMode: "on",
    //   buttonDisplayMode: "off"
    // },
    publishVideo: this.props.publisherVideo
  };

  subscriberProperties = {
    subscribeToAudio: true,
    subscribeToVideo: false
  };
  /* ====================== decrease one user ============================*/
  decreaseUserFromRoom = async roomId => {
    const url = `${process.env.REACT_APP_API_URL}/api/rooms/decrease/${roomId}`;
    try {
      await axios({
        method: "PUT",
        headers: {
          token: process.env.REACT_APP_ZAFRA_KEY
        },
        url: url
      });
    } catch (error) {
      console.log(error);
    }
  };

  publisherEventHandlers = {
    streamCreated: event => {
      this.props.onPublished(true);
      console.log("Publisher stream created!");
    },
    streamDestroyed: async event => {
      await this.decreaseUserFromRoom(this.props.roomId);
      this.props.onUpdate();
      console.log("Publisher stream destroyed!");
    }
    // videoDisabled: event => {
    //   console.log("Subscriber video disabled!");
    // },
    // videoEnabled: event => {
    //   console.log("Subscriber video enabled!");
    // }
  };

  getPublisherStats() {
    this.otPublisher
      .getPublisher()
      .getStats((err, stats) => console.log(err, stats));
  }
  handleVideo = () => {
    this.setState({
      publisherVideo: !this.state.publisherVideo
    });
    // this.getPublisherStats();
  };

  render() {
    return (
      <React.Fragment>
        <OTSession
          apiKey={this.state.apiKey}
          sessionId={this.state.sessionId}
          token={this.state.token}
        >
          <OTPublisher
            properties={this.publisherProperties}
            eventHandlers={this.publisherEventHandlers}
          />
          <OTStreams>
            <OTSubscriber
              ref={this.otPublisher}
              properties={this.publisherProperties}
            />
          </OTStreams>
        </OTSession>
        <Button variant="secondary" onClick={this.handleVideo}>
          Video
        </Button>
      </React.Fragment>
    );
  }
}
