const connection = require("../db_connection").connection;

const create = (data, callback) => {
  let created_at = new Date().toISOString().slice(0, 18);
  let updated_at = created_at;
  connection.query(
    `INSERT INTO users(email, username, created_at, updated_at, active, adm, img)
            values(?,?,?,?,?,?,?)`,
    [
      data.email,
      data.username,
      created_at,
      updated_at,
      data.active,
      data.adm,
      data.img
    ],
    (error, result) => {
      if (error) return callback(error);
      return callback(null, result);
    }
  );
};

const createUser = (req, res) => {
  create(req.body, err => {
    if (err) return res.send(err);
    return res.send("User created successfully");
  });
};

module.exports = {
  createUser
};
