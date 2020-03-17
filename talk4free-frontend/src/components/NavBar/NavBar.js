import React from "react";
import { GoogleLogin, GoogleLogout } from "react-google-login";
import { FaSignInAlt } from "react-icons/fa";

import "./NavBar.scss";
import {
  Container,
  Navbar,
  Nav,
  Button,
  Dropdown,
  Image
} from "react-bootstrap";

class NavBar extends React.Component {
  state = {
    isSignedIn: false,
    userName: "",
    email: "",
    imageUrl: ""
  };

  responseGoogle = res => {
    if (res.profileObj.name) {
      this.setState({
        isSignedIn: true,
        userName: res.profileObj.name,
        email: res.profileObj.email,
        imageUrl: res.profileObj.imageUrl
      });
    }
    this.props.isLoggedIn(this.state);
  };

  logout = () => {
    this.setState({
      isSignedIn: false,
      userName: "",
      email: "",
      imageUrl: ""
    });
    this.props.isLoggedIn(this.state);
  };

  componentDidMount() {
    // Passing login state
    this.props.isLoggedIn(this.state);
  }
  render() {
    const checkLogin = () => {
      if (this.state.isSignedIn) {
        return (
          <React.Fragment>
            <Dropdown>
              <Dropdown.Toggle
                className="ml-5"
                variant="primary"
                id="dropdown-basic"
              >
                {this.state.userName}
                {this.state.isSignedIn ? (
                  <Image
                    src={this.state.imageUrl}
                    style={{ width: "35px" }}
                    roundedCircle
                  />
                ) : (
                  ""
                )}
              </Dropdown.Toggle>

              <Dropdown.Menu className="ml-5">
                <Dropdown.Item>
                  {" "}
                  <GoogleLogout
                    clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
                    render={renderProps => (
                      <Button
                        variant="secondary"
                        onClick={renderProps.onClick}
                        disabled={renderProps.disabled}
                      >
                        {" "}
                        Logout
                      </Button>
                    )}
                    buttonText="Logout"
                    onLogoutSuccess={this.logout}
                  ></GoogleLogout>
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </React.Fragment>
        );
      } else {
        return (
          <GoogleLogin
            clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
            render={renderProps => (
              <React.Fragment>
                <Button
                  variant="primary"
                  className="ml-5"
                  id="signInBtn"
                  onClick={renderProps.onClick}
                  disabled={renderProps.disabled}
                >
                  {this.state.isSignedIn ? this.state.userName : "Sign In"}
                  <FaSignInAlt />
                </Button>
              </React.Fragment>
            )}
            buttonText="Login"
            onSuccess={this.responseGoogle}
            onFailure={this.responseGoogle}
            isSignedIn={true}
            cookiePolicy={"single_host_origin"}
          />
        );
      }
    };
    return (
      <Navbar bg="dark" variant="dark" fixed="top">
        <Container>
          <Navbar.Brand href="#home">
            <Image src={require("./logo5x5.png")} />
            Talk4Free
          </Navbar.Brand>
          <Nav className="ml-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#features">Rooms</Nav.Link>
            <Nav.Link href="#pricing">Pricing</Nav.Link>
          </Nav>
          {checkLogin()}
        </Container>
      </Navbar>
    );
  }
}

export default NavBar;
