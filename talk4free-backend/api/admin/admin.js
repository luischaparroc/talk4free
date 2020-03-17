const connection = require("../db_connection").connection;

const IsAdm = (data, callback) => {
  connection.query(
    "SELECT adm FROM users WHERE id=?",
    [data.id],
    (err, result) => {
      if (err) return callback(err);
      return callback(null, result);
    }
  );
};
const Adm = (req, res, next) => {
  IsAdm(req.headers, (err, result) => {
    if (err) return res.send(err);
    console.log(result[0].adm);
    if (result[0].adm === 1) {
      next();
    } else {
      res.send("No Authorization");
    }
  });
};

module.exports = {
  Adm
};
