const getJWT = () => {
  const jwt = require("jsonwebtoken");
  const secret = process.env.REACT_APP_OPENTOK_API_SECRET; //Replace this with your OpenTok API Secret
  let token = jwt.sign(
    {
      iss: process.env.REACT_APP_OPENTOK_API_KEY, //Replace this with your OpenTok API Key
      ist: "project",
      iat: Math.floor(Date.now() / 1000), // e.g. 1472691002
      exp: Math.floor(Date.now() / 1000) + 300 // e.g. 1472691302
    },
    secret
  );
  return token;
};

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
  // console.log(sessionId);
  return sessionId;
};

export default CreateSessionId;
