// calling the database connection
const connection = require("../db_connection").connection;
// function that create a new session from a body sent
const create = (data, callback) => {
  let created_at = new Date().toISOString().slice(0, 18);
  let updated_at = created_at;
  connection.query(
    `INSERT INTO rooms(session_id, created_at, updated_at, lang, lvl, max_user, active, created_by)
              values(?,?,?,?,?,?,?,?)`,
    [
      data.session_id,
      created_at,
      updated_at,
      data.lang,
      data.lvl,
      data.max_user,
      data.active,
      data.created_by
    ],
    (error, result) => {
      if (error) {
        console.log(error);
        return callback(error);
      }
      return callback(null, result);
    }
  );
};
// get the new body
const Roomcreate = (req, res) => {
  create(req.body, err => {
    if (err) return res.send(err);
    return res.send("The room was created successfully");
  });
};
module.exports = {
  Roomcreate
};
