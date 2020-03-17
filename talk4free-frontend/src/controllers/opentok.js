const OpenTok = require("opentok");
const opentok = new OpenTok(
  process.env.REACT_APP_OPENTOK_API_KEY,
  process.env.REACT_APP_OPENTOK_API_SECRET
);

export default opentok;
