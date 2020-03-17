const connection = require("../db_connection").connection;

const readall = (data, callback) => {
  connection.query(`SELECT * FROM rooms`, [], (error, result) => {
    if (error) {
      return callback(error);
    }
    return callback(null, result);
  });
};

const ReadAllRooms = (req, res) => {
  readall(req.body, (err, result) => {
    if (err) {
      return res.send(err);
    }
    return res.send(JSON.stringify(result));
  });
};

/* ================================================================= */

const readone = (data, callback) => {
  connection.query(
    `SELECT * FROM rooms WHERE id=?`,
    [data.id],
    (error, result) => {
      if (error) {
        return callback(error);
      }
      return callback(null, result);
    }
  );
};

const ReadOneRoom = (req, res) => {
  readone(req.params, (err, result) => {
    if (err) {
      return res.send(err);
    }
    return res.send(JSON.stringify(result));
  });
};

module.exports = {
  ReadAllRooms,
  ReadOneRoom
};
