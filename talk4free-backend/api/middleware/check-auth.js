require("dotenv").config();
module.exports = (req, res, next) => {
  if (req.headers.token === process.env.ZAFRA_KEY) {
    next();
  } else {
    return res.status(401).json({
      message: "Auth failed"
    });
  }
};
