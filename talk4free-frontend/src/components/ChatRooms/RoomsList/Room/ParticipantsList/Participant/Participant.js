import React from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
// class Participant extends React.Component {
//   render() {
//     const { participant } = this.props;
//     const style = {
//       backgroundImage: `url(${participant.img})`
//     };
//     // console.log("EN participants", participant);
//     return <div className="participant" style={style}></div>;
//     // return <p>hello</p>;
//   }
// }

// export default Participant;

function Participant(props) {
  const { participant } = props;
  // const style = {
  //   backgroundImage: `url(${participant.img})`
  // };
  return (
    <OverlayTrigger
      placement="top"
      overlay={
        <Tooltip id={`tooltip-top`}>
          <strong>{participant.username}</strong>
        </Tooltip>
      }
    >
      <div
        className="participant"
        style={{ backgroundImage: `url(${participant.img})` }}
      ></div>
    </OverlayTrigger>
  );
}

export default Participant;
