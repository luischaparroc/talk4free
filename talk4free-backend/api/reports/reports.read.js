const connection = require("../db_connection").connection;

const readall = (data, callback) => {
  connection.query(`SELECT * FROM reports`, [], (error, result) => {
    if (error) {
      return callback(error);
    }
    return callback(null, result);
  });
};

const ReadAllReports = (req, res) => {
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
    `SELECT * FROM reports WHERE id=?`,
    [data.id],
    (error, result) => {
      if (error) {
        return callback(error);
      }
      return callback(null, result);
    }
  );
};

const ReadOneReport = (req, res) => {
  readone(req.params, (err, result) => {
    if (err) {
      return res.send(err);
    }
    return res.send(JSON.stringify(result));
  });
};

module.exports = {
  ReadAllReports,
  ReadOneReport
};
