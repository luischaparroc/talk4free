const connection = require("../db_connection").connection;

const allusers = callback => {
  connection.query(`SELECT * FROM users`, [], (error, result) => {
    if (error) {
      return callback(error);
    }
    return callback(null, result);
  });
};

const AllUsers = (req, res) => {
  allusers((err, result) => {
    if (err) return res.send(err);
    return res.send(JSON.stringify(result));
  });
};

/* ============================================================== */

const oneusers = (data, callback) => {
  connection.query(
    `SELECT * FROM users WHERE id=?`,
    [data.id],
    (error, result) => {
      if (error) {
        return callback(error);
      }
      return callback(null, result);
    }
  );
};

const OneUsers = (req, res) => {
  oneusers(req.params, (err, result) => {
    if (err) return res.send(err);
    return res.send(JSON.stringify(result));
  });
};

module.exports = {
  AllUsers,
  OneUsers
};
