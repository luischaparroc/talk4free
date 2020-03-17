import React from "react";
import Participant from "./Participant/Participant";

class ParticipantsList extends React.Component {
  render() {
    return (
      <React.Fragment>
        {this.props.participants.map((participant, index) => {
          return <Participant key={index} participant={participant} />;
        })}
      </React.Fragment>
    );
  }
}

export default ParticipantsList;
