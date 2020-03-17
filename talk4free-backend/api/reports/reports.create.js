const connection = require("../db_connection").connection;

const create = (data, callback) => {
  let created_at = new Date().toISOString().slice(0, 18);
  let updated_at = created_at;
  connection.query(
    `INSERT INTO reports(reported_by, accused_by, descrip, penalt_on, created_at, updated_at)
              values(?,?,?,?,?,?)`,
    [
      data.reported_by,
      data.accused_by,
      data.descrip,
      data.penalt_on,
      created_at,
      updated_at
    ],
    (error, result) => {
      if (error) {
        return callback(error);
      }
      return callback(null, result);
    }
  );
};

const CreateReport = (req, res) => {
  create(req.body, err => {
    if (err) return res.send(err);
    return res.send("report created successfully");
  });
};

module.exports = {
  CreateReport
};
