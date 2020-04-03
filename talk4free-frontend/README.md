# Talk4Free :telephone_receiver: 

### Practice languages at anytime.

<p align="center"><img src="https://talk4free.live/static/media/logo10x10.e15bb8fb.png" width="300" height="300" alt="icon" align="middle"></p>

**Talk4Free** is created to talk to people around the world in many languages such as English, Mandarin, Spanish, French, German, Italian, Portuguese, Arabic, Russian, Japanese, among others.

People can exchange languages and culture, make friends and meet up people around the world.

**See it live:** https://talk4free.live/

## How it works 💡

- [React.js](https://reactjs.org/)
- [Bootstrap](https://getbootstrap.com/)
- [OpenTok](https://tokbox.com/)
- [Gmail API](https://developers.google.com/gmail/api)

### React 🔥
For the front end part, we used ReactJS which is a Javascript library that allows us to write JSX code into out applications, allowing us to control the rendering of components individually.
```javascript
import React, { useState } from "react";

const Home = props => {
  const [rooms, setRooms] = useState("");
  const [users, setUsers] = useState({});
```
### Bootstrap and SASS📚
Combined with CSS libraries like bootstrap we could give Talk4Free a very light and cool look. Bootstrap allows us to have control over the positioning of elements into the DOM, also combined with SASS we can have a so much organized code structure so it can be understood and maintained easily
```javascript
import { Container, Button } from "react-bootstrap";
```
```css
.chatRooms {
  padding: 3rem 0px 2rem 0px;

  text-align: center;
  .lead {
    margin: 30px 10px;
    a {
      font-weight: 500;
    }
  }
  button {
    margin: auto;
    display: flex;
    align-items: center;
    svg {
      margin-left: 5px;
    }
  }
}
```

### OpenTok (Where the magic happens!) 🎩

For the RTC (Real-Time Communication) part, we implemented a very useful tool called OpenTok. OpenTok allows us to make the connections peer to peer through their server so they can communicate in real-time. Opentok gave us an API_SECRET_KEY which we can use to create sessions (Rooms) and tokens for each user interested in joining that session. Every token is unique and can be only used for the room it was created for. Here a graphic example:

<p align="center"><img src="https://tokbox.com/developer/img/infographics/opentok-components@2x.png" width="480" height="360" alt="videocalls" align="middle"></p>

```javascript
const CreateSessionId = async () => {
  const token = getJWT();
  const settings = {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/x-www-form-urlencoded",
      "X-OPENTOK-AUTH": token
    },
    body: {
      archiveMode: "always",
      "p2p.preference": "disabled"
    }
  };
  let sessionId = "";
  try {
    await fetch(`https://api.opentok.com/session/create`, settings)
      .then(res => res.json())
      .then(res => (sessionId = res[0].session_id));
  } catch (e) {
    console.log(e);
  }
  return sessionId;
};
```

### Google API 🔑

For logging in we used the API from google which is very easy to use. You send them the email, and google handles authentication for us, returning an object with all the information we need (name, email, profile picture etc):

```javascript
<GoogleLogin
  clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
  render={renderProps => (
    <React.Fragment>
      <Button
        variant="primary"
        // className="ml-5"
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
```
---

## Installation :construction_worker:

Follow the next steps in the following order:

1. Fork the repository
2. Be sure there are not processes running in the 3000 and 5000 ports.
3. Go to back-end folder, install packages with `npm install` and with `npm start`
4. Go to fron-end folder, install packages with `npm install` and run with `npm start`

## Usage :rocket:

### Quick and easy log in.

Without creating a user profile (username, password, etc), you can sign in to Talk4Free using your Gmail account. Your information will be loaded automatically.

<p align="center"><img src="https://github.com/luischaparroc/talk4free/blob/master/talk4free-frontend/public/quick-login.gif" width="480" height="280" alt="quick-login" align="middle"></p>

### Create or join custom rooms.

You may define the language and maximum number of users when creating a room, or you may join an available room of your choice. There are +20 languages you can choose from. Talk4Free rooms can have from 2 to 5 users.

<p align="center"><img src="https://github.com/luischaparroc/talk4free/blob/master/talk4free-frontend/public/room.gif" width="480" height="360" alt="rooms" align="middle"></p>

### Multiple options in a video call.

You can enable or disable the audio and video on your video calls. You can share your screen with other participants. Also, there is a chat in each room. Talk4Free works in real-time.

<p align="center"><img src="https://github.com/luischaparroc/talk4free/blob/master/talk4free-frontend/public/videocall.gif" width="480" height="360" alt="videocalls" align="middle"></p>

## Contributing :raised_hands:

Feel free to fork the repository and make pull requests.

## Related projects :pushpin:

- [MazeGame](https://github.com/mikesosa/MazeGame)
- [AirBnB Clone](https://github.com/jorgezafra94/AirBnB_clone_v3)
- [Simple Shell](https://github.com/luischaparroc/simple_shell)

## Licensing :memo:

MIT License
