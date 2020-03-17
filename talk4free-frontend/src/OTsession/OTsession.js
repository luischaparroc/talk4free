import React from "react";
import credentials from "../credentials";
import { OTSession, OTPublisher, OTStreams, OTSubscriber } from "opentok-react";
import opentok from "../opentok";

class OTsession extends React.Component {
  state = {
    token: "",
    session_id: this.props.session_id
  };
  getToken = async () => {
    const token = opentok.generateToken(this.state.session_id);
    this.setState({ token: token });
  };

  componentDidMount() {
    this.getToken();
  }
  render() {
    if (this.state.token) {
      return (
        <OTSession
          apiKey={credentials.API_KEY}
          sessionId={this.props.session_id}
          token={this.state.token}
        >
          <OTPublisher />
          <OTStreams>
            <OTSubscriber />
          </OTStreams>
        </OTSession>
      );
    } else {
      return <p>Creando...</p>;
    }
  }
}

export default OTsession;
