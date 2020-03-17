import React from "react";
import { uniqueId } from "lodash";
import { FaVideo, FaMicrophone, FaLaptop } from "react-icons/fa";

class CheckBox extends React.Component {
  state = {
    id: uniqueId("Checkbox"),
    isChecked: this.props.initialChecked
  };

  onChange = event => {
    let isChecked = event.currentTarget.checked;
    this.setState({ isChecked });
  };

  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.isChecked !== this.state.isChecked &&
      typeof this.props.onChange === "function"
    ) {
      this.props.onChange(this.state.isChecked);
    }
  }

  checkLabel = () => {
    switch (this.props.label) {
      case "Audio":
        return <FaMicrophone />;
      // break;
      case "Video":
        return <FaVideo />;
      // break;
      case "Screen":
        return <FaLaptop />;
      // break;
      default:
        return "none";
    }
  };

  render() {
    return (
      <div className="controlsBtn">
        {/* <label htmlFor={this.state.id}>{this.props.label}</label> */}
        <label>
          <input
            type="checkbox"
            checked={this.state.isChecked}
            id={this.state.id}
            onChange={this.onChange}
          />
          <span>{this.checkLabel()}</span>
        </label>
      </div>
    );
  }
}
export default CheckBox;
